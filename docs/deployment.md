# Deployment runbook — bizautofy.com

Operational reference for the production deployment of the Bizautofy marketing site.

Last verified end-to-end: **2026-04-26**.

This document describes the *current* live architecture and the steps to rebuild it from scratch. It also captures the gotchas hit during initial setup so they do not have to be rediscovered.

---

## 1. Architecture at a glance

```
┌──────────┐      DNS      ┌────────────────┐    proxied     ┌──────────────┐
│ Visitor  │ ────────────▶ │   Cloudflare   │ ─────────────▶ │    Vercel    │
└──────────┘   anycast IP  │   (DNS + CDN   │  HTTP, TLS 1.3 │  (Next.js 15 │
                           │    + edge)     │  Full(strict)  │   serverless)│
                           └────────────────┘                └──────────────┘
                                   │                                 │
                              MX records                       Server Action
                                   │                                 │
                                   ▼                                 ▼
                           ┌────────────────┐               ┌──────────────┐
                           │   Cloudflare   │               │    Resend    │
                           │ Email Routing  │               │  (DKIM-signed│
                           │ catch-all → GM │               │  outbound)   │
                           └────────────────┘               └──────────────┘
                                   │                                 │
                                   ▼                                 ▼
                              ┌──────────┐                     ┌──────────┐
                              │  Gmail   │ ◀─────────────────  │  Gmail   │
                              │  inbox   │   from hello@..     │  inbox   │
                              └──────────┘                     └──────────┘
```

**Components:**

| Component | Purpose | Plan |
| --- | --- | --- |
| **Squarespace** | Domain registrar only. DNS authority delegated to Cloudflare. | Paid (existing) |
| **Cloudflare** | Authoritative DNS, edge CDN/proxy, TLS termination at edge, Email Routing for inbound mail. | Free |
| **Vercel** | Hosts Next.js app, serverless functions, automatic HTTPS, preview deploys per branch. | Hobby (free) |
| **GitHub** | Source of truth, CI (lint + build), branch protection, Vercel deploy trigger. Public repo `bizautofy/website`. | Free |
| **Resend** | Outbound transactional email (contact form). DKIM/SPF on `send.bizautofy.com`. | Free (3k/mo) |
| **Upstash Redis** | Per-IP sliding-window rate limit on the contact form Server Action. | Free |

**Why this layered shape:**

- Cloudflare proxy gives us DDoS absorption, edge caching, geo distribution, and one place to set TLS policy without paying Vercel for it.
- Vercel handles app build, server functions, image optimization, and tight Next.js integration.
- DNS lives at Cloudflare (not Squarespace, not Vercel) because Cloudflare's DNS is fastest, free, and lets us mix Vercel hosting with Cloudflare Email Routing on the same apex.
- Squarespace stays only as the registrar — there is no website or email on Squarespace.

---

## 2. DNS reference (final state)

Authoritative nameservers at Cloudflare:

```
adel.ns.cloudflare.com
dylan.ns.cloudflare.com
```

These are configured at the registrar (Squarespace).

### Zone records on Cloudflare

| Type | Name | Content | Proxy | Purpose |
| --- | --- | --- | --- | --- |
| `A` | `bizautofy.com` | `76.76.21.21` | Proxied | Apex points at Vercel's edge IP |
| `CNAME` | `www` | `cname.vercel-dns.com` | Proxied | www subdomain points at Vercel |
| `MX` | `send` | `feedback-smtp.us-east-1.amazonses.com` (priority 10) | DNS only | Resend bounce/feedback inbox |
| `TXT` | `send` | `v=spf1 include:amazonses.com ~all` | DNS only | SPF for Resend's send subdomain |
| `TXT` | `resend._domainkey` | (long DKIM public key from Resend) | DNS only | DKIM signing for Resend |
| `TXT` | `bizautofy.com` | `v=spf1 include:amazonses.com include:_spf.mx.cloudflare.net ~all` | DNS only | Apex SPF — combines Resend (outbound via `hello@`) and Cloudflare Email Routing (inbound) |
| `TXT` | `_dmarc` | `v=DMARC1; p=quarantine; rua=mailto:hello@bizautofy.com; sp=quarantine; adkim=s; aspf=s` | DNS only | DMARC. Soft `quarantine` while reputation builds; tighten to `p=reject` after 30 days of clean sending |
| `MX` | `bizautofy.com` | Cloudflare's 3 MX hosts (`route1/2/3.mx.cloudflare.net`, priorities 10/20/30) | DNS only | Inbound mail to apex routed via Cloudflare Email Routing |

**Critical rules:**

1. There must be **exactly one SPF TXT** at the apex. Multiple SPF records is an RFC violation and silently breaks deliverability.
2. MX records can never be proxied. Cloudflare's HTTP proxy (orange cloud) does not handle SMTP.
3. Apex A record must stay proxied (orange cloud) for security headers / WAF / DDoS to apply.
4. The `_domainkey` parent (without `resend.` prefix) is **not** used. Resend keys it under `resend._domainkey`. Do not put a placeholder DKIM record at `_domainkey` — multiple DKIM selectors in the same parent confuses some receivers.

---

## 3. Step-by-step initial deployment

This is the order in which the site went from empty repo to live with a working contact form.

### 3.1 Local scaffolding

```bash
# Create the project
npx create-next-app@latest bizautofy/website \
  --typescript --tailwind --eslint --app --src-dir \
  --import-alias '@/*' \
  --registry=https://registry.npmjs.org/

cd bizautofy/website

# Pin Node
echo 22 > .nvmrc

# Force public registry so corporate registries don't poison installs
echo 'registry=https://registry.npmjs.org/' > .npmrc

# Install runtime dependencies
npm install framer-motion lucide-react react-hook-form zod resend \
  @upstash/ratelimit @upstash/redis \
  @radix-ui/react-accordion @radix-ui/react-label \
  class-variance-authority clsx tailwind-merge

# Install dev dependencies
npm install -D @tailwindcss/typography
```

Key local files added:

- `.nvmrc` → `22`
- `.npmrc` → forces public npm registry
- `next.config.ts` → security headers (HSTS, CSP, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy). CSP includes `'unsafe-eval'` only when `NODE_ENV !== "production"` to keep the dev server functional without weakening production.

### 3.2 Application code

See `src/` tree in [README.md](../README.md). Notable patterns:

- All site copy in `src/lib/content.ts` (single source of truth).
- Contact form is a **Server Action** at `src/app/actions/contact.ts`. CSRF-safe by default (Next.js Server Actions sign the action ID).
- Honeypot field is named `hp_x` (intentionally non-semantic; password managers fill anything labeled "Website" with the page URL — see §6 lesson learned).
- Schema (`src/lib/contact-schema.ts`) is shared between client and server validation.

### 3.3 GitHub setup

Repository: `https://github.com/bizautofy/website` (public, owned by `bizautofy` org which is owned by personal account `kgkgithub02`).

```bash
git init
git add .
git commit -m "feat: initial scaffold"

# Use SSH alias 'github.com-gk' (configured in ~/.ssh/config) to map to the
# personal account's SSH key, distinct from the work account's default key.
git remote add origin git@github.com-gk:bizautofy/website.git
git branch -M main
git push -u origin main
```

`~/.ssh/config` snippet:

```ssh-config
Host github.com-gk
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519_github2
  IdentitiesOnly yes
```

This separates personal (`kgkgithub02`) and work GitHub identities on the same machine. The work key was the SSH default, so a vanilla `git@github.com:...` URL would authenticate as the work account and get "Repository not found" on the personal org.

### 3.4 GitHub CI (`.github/workflows/ci.yml`)

Runs `npm ci`, `npm run lint`, `npm run build` on push to `main` and on PRs. Pinned to Node 22 via `.nvmrc`. `permissions: contents: read` and `concurrency: cancel-in-progress` are set for security and cost.

### 3.5 Branch protection (Cloudflare Rulesets)

Repository → **Settings → Rules → Rulesets → New ruleset** → Branch ruleset:

- Name: `protect main`
- Enforcement: **Active**
- Target: **Default branch**
- Rules enabled:
  - Restrict deletions
  - Block force pushes
  - Require linear history
  - Require a pull request before merging (0 approvals — solo dev)
  - Require conversation resolution before merging
  - Require status checks to pass → check **build** (the `build` job from `ci.yml`)

**Gotcha:** GitHub will not let you select a status check that has never run. First push the workflow, open a PR (just to make CI run), then come back and select `build` in the ruleset.

**Gotcha 2:** Rulesets only enforce on private repos at the GitHub Team tier ($4/user/mo). On the free tier, **the repo must be public** for rules to apply. The marketing-site repo contains no secrets (env vars are only on Vercel) so making it public is safe and unlocks free protection.

### 3.6 Vercel project import

1. [vercel.com/new](https://vercel.com/new) → **Import Git Repository** → `bizautofy/website`.
2. Framework preset: **Next.js** (auto-detected).
3. Root directory: leave as repo root.
4. Build command / output directory: defaults.
5. Click **Deploy**. First build takes ~90 sec.

The site is now live at `website-<random>.vercel.app`. No custom domain yet.

### 3.7 Environment variables on Vercel

Vercel → project → **Settings → Environment Variables**. Each one set for **Production** and **Preview**:

| Name | Example value | Source |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://bizautofy.com` | Hardcoded |
| `RESEND_API_KEY` | `re_xxx...` | Resend → API Keys (see §3.10) |
| `CONTACT_FROM_EMAIL` | `Bizautofy <hello@bizautofy.com>` | The address that signs outbound mail; must be on a Resend-verified domain |
| `CONTACT_TO_EMAIL` | `your-real-inbox@gmail.com` | Where contact-form messages land |
| `UPSTASH_REDIS_REST_URL` | `https://<region>-<id>.upstash.io` | Upstash console |
| `UPSTASH_REDIS_REST_TOKEN` | (long token) | Upstash console |

After changing any env var: **Deployments → latest → ⋯ → Redeploy** (env vars are baked into the function bundle at build time for production).

### 3.8 Domain migration (Squarespace → Cloudflare → Vercel)

This was the most involved step. Sequence matters.

**3.8.1 Add zone to Cloudflare**

1. Cloudflare → **Add a Site** → enter `bizautofy.com` → Free plan → **Continue**.
2. Cloudflare scans existing DNS at Squarespace and imports records. Review the imported list — it may include records you want to discard.
3. Cloudflare assigns two nameservers (in our case `adel.ns.cloudflare.com` and `dylan.ns.cloudflare.com`).

**3.8.2 Update nameservers at registrar**

Squarespace → Domains → `bizautofy.com` → **DNS** → **Nameservers** → choose **Use custom nameservers** → enter the two Cloudflare nameservers → Save.

Propagation typically completes in 10–60 min. Verify with:

```bash
dig +short NS bizautofy.com
# expect: adel.ns.cloudflare.com.   dylan.ns.cloudflare.com.
```

When Cloudflare's dashboard flips the zone status from **Pending** to **Active**, propagation is sufficient.

**3.8.3 Clean up imported DNS records**

Cloudflare imports whatever Squarespace had. For our use case we deleted:

- All A records pointing to Squarespace IPs (`198.185.159.144`, `198.185.159.145`, `198.49.23.144`, `198.49.23.145`).
- The `CNAME _domainconnect → _domainconnect.domains.squarespace.com` (Squarespace setup helper, no longer needed).
- Any AAAA records on the apex pointing to Squarespace IPv6 ranges.

**Gotcha that cost ~30 minutes:** the apex was returning `server: Squarespace` even after attaching the domain to Vercel. Root cause was *Cloudflare-imported A records still pointing at Squarespace IPs*. Cloudflare's orange-cloud proxy hides the upstream IP from a casual `dig`, but `curl -sSI https://bizautofy.com/` revealing `server: Squarespace` and `x-contextid` headers proved the origin was wrong. Fix: in Cloudflare DNS, ensure exactly one A record on the apex with content `76.76.21.21`, proxied.

**3.8.4 Add Vercel records**

Vercel → project → **Settings → Domains** → **Add Domain** → `bizautofy.com` → choose "Add bizautofy.com and redirect www.bizautofy.com to it". Vercel adds both names. For each one, Vercel shows the required DNS record. We added the equivalent in Cloudflare:

| Type | Name | Content | Proxy |
| --- | --- | --- | --- |
| `A` | `bizautofy.com` (i.e. `@`) | `76.76.21.21` | Proxied |
| `CNAME` | `www` | `cname.vercel-dns.com` | Proxied |

**3.8.5 Cloudflare TLS policy**

Cloudflare → SSL/TLS → **Overview** → set encryption mode to **Full (strict)**. Anything else is wrong:

- "Off" / "Flexible" → traffic between Cloudflare and Vercel goes over plaintext HTTP (downgrade attack vector).
- "Full" → TLS to Vercel but does not validate the cert, vulnerable to MITM.
- "Full (strict)" → TLS + cert validation. **Required.** Vercel auto-provisions a Let's Encrypt cert that Cloudflare validates.

Cloudflare → SSL/TLS → **Edge Certificates**:

- Always Use HTTPS: **On**
- Automatic HTTPS Rewrites: **On**
- Minimum TLS Version: **TLS 1.2**

**3.8.6 Verify**

```bash
# Should return Cloudflare proxy IPs (104.21.x or 172.67.x), NOT Squarespace's 198.x
dig +short A bizautofy.com

# Headers should show server: cloudflare (not Squarespace), x-vercel-id present,
# our CSP header present
curl -sSI https://bizautofy.com/ | grep -iE 'server|x-vercel-id|content-security'
```

### 3.9 Local DNS caching gotcha

After NS migration, `https://bizautofy.com/` may still resolve to Squarespace IPs **on your local network only** because your home router caches DNS aggressively with long TTLs. Public resolvers (1.1.1.1, 8.8.8.8, 9.9.9.9) and the Cloudflare authoritative NS will all return the correct IPs.

**Verify the world's view from your phone over cellular** (not Wi-Fi). The site loads correctly there.

To fix locally, either:

- Reboot the router (clears its DNS cache).
- Or manually set device DNS to `1.1.1.1` and run `sudo killall -HUP mDNSResponder; sudo dscacheutil -flushcache`.
- Or just wait 1–24 hours for the router cache to expire.

### 3.10 Resend setup

1. Sign up at [resend.com](https://resend.com).
2. **Domains → Add Domain** → `bizautofy.com` → region `us-east-1` (Vercel functions in `iad1`/`sfo1` both work — we chose `us-east-1`).
3. Resend shows the DNS records to add (1× MX, 2× TXT, sometimes a DMARC suggestion). Add each in Cloudflare:
   - All records have **Name** values that include `send.` or `resend._domainkey.` — Cloudflare auto-strips the apex suffix, so just enter the leftmost label (`send`, `resend._domainkey`).
   - All Resend records must be **DNS only** (gray cloud).
4. Back on Resend, click **Verify DNS Records**. Wait 1–3 min.
5. **API Keys → Create API Key**:
   - Name: `bizautofy-vercel-prod`
   - Permission: **Sending access** (least privilege; not Full access)
   - Domain: `bizautofy.com` (restricts the key to only this domain)
   - **Copy the key value once shown — it cannot be retrieved later.**
6. Paste into Vercel `RESEND_API_KEY`. Redeploy.

**Gotcha that cost ~20 minutes:** Resend's SDK (`resend.emails.send()`) **does not throw on non-2xx responses**. It returns `{ data: null, error: {...} }`. The original code wrapped the call in `try/catch {}` and only handled thrown exceptions, so an invalid API key silently produced fake success and zero log entries. Fix is in `src/app/actions/contact.ts` — explicit `if (result.error) ...` branch with `console.error` so Vercel runtime logs surface the failure reason.

### 3.11 Cloudflare Email Routing

Once Resend is sending outbound, set up inbound so anyone emailing `hello@bizautofy.com` directly reaches Gmail.

1. Cloudflare → `bizautofy.com` → **Email → Email Routing** → **Get started**.
2. Cloudflare proposes adding 3 MX records and 1 SPF TXT record. **Review the SPF carefully:** it conflicts with the existing Resend SPF on the apex. You must merge them into a single SPF record (RFC 7208 prohibits multiple SPF TXT records on the same name):
   ```
   v=spf1 include:amazonses.com include:_spf.mx.cloudflare.net ~all
   ```
   After Cloudflare's automation creates its record, edit it to the merged value and delete any duplicates.
3. **Destination addresses → Add destination address** → enter your Gmail → Cloudflare sends a verification email → click the link.
4. **Routing rules**:
   - Custom address `hello@bizautofy.com` → Send to → your Gmail.
   - Catch-all → Send to → your Gmail. (Catches typos, `info@`, `support@`, etc.)
5. Test by emailing `hello@bizautofy.com` from another account; it should reach Gmail within ~30 sec.

---

## 4. Operational runbook

### 4.1 Deploying a code change

Standard flow:

```bash
git checkout -b feat/your-change
# edit code
npm run lint && npm run build   # local sanity check
git add -A && git commit -m "feat: ..."
git push -u origin feat/your-change
```

Open a PR on GitHub. The `build` CI check runs automatically. Vercel posts a comment with a Preview URL. Test the change there. Merge when CI is green; Vercel auto-deploys to production within ~90 sec of the merge.

**Never commit directly to `main`** — branch protection blocks it (and even if it didn't, you would skip the preview test).

### 4.2 Rollback

Two options:

1. **Vercel instant rollback (preferred for hot incidents):** Vercel → project → **Deployments** → find the last known good deployment → **⋯ → Promote to Production**. Takes ~5 sec, no rebuild. The bad commit stays in `main` history, but production traffic moves back to the older bundle. Then fix forward in a normal PR.
2. **Git revert (if you want main to also reflect the rollback):** `git revert <bad-sha>` → push → Vercel deploys the revert commit.

### 4.3 Where to look when something breaks

| Symptom | Look here |
| --- | --- |
| Site not loading at all | 1. Vercel project Deployments page (latest deployment status). 2. Cloudflare zone status. 3. `curl -sSI https://bizautofy.com/` — check `server` header. |
| Site loading but stale content | Vercel cache. Promote a fresh deploy or click **Purge Cache** at Cloudflare → Caching. |
| Contact form errors | Vercel project → **Logs** tab → filter to last 5 min → look for `[contact] ...` lines. The server action logs explicitly: `resend accepted: id=...` (success), `resend rejected: name=... msg=...` (Resend API error), `dropped: honeypot tripped` / `dropped: anti-bot timestamp` / `dropped: rate limit` (silent drops). |
| Emails not arriving | 1. Resend → **Logs** tab — is the message there? Status: Delivered / Bounced / Failed. 2. Gmail spam folder (especially during reputation buildup). 3. `dig +short TXT bizautofy.com` — exactly one SPF record? |
| Inbound mail not working | Cloudflare → Email Routing → **Activity** log. Check destination address still verified. |
| Build failing on PR | GitHub Actions tab → click the failing run → check `lint` then `build` step output. |

### 4.4 Routine maintenance

| Cadence | Task |
| --- | --- |
| Weekly | Skim Vercel runtime logs for unexpected errors. Skim Resend bounce/complaint reports. |
| Monthly | `npm outdated`. Update non-major dependency bumps via PR. Run `npm audit`. |
| Quarterly | Revalidate Cloudflare TLS settings and security headers (e.g., [securityheaders.com](https://securityheaders.com/?q=https%3A%2F%2Fbizautofy.com&followRedirects=on)). Check if you can tighten DMARC from `p=quarantine` to `p=reject`. |
| Annually | Check domain expiry at Squarespace. Rotate Resend API key. |

### 4.5 Spinning up a fresh local dev environment

```bash
git clone git@github.com-gk:bizautofy/website.git
cd website
nvm use      # picks up Node 22 from .nvmrc
npm ci       # exact-versions install from package-lock.json
cp .env.example .env.local
# Optional: paste your dev keys into .env.local. Without keys, the contact form
# falls through with a clear dev-mode message; everything else works.
npm run dev
```

---

## 5. Security & privacy posture

### 5.1 At the edge (Cloudflare)

- TLS 1.2+ only.
- Full (strict) origin validation.
- HSTS via Vercel response headers (preload-eligible).
- DDoS absorption + WAF (free tier covers basic L7).
- All TXT/MX records DNS-only; only HTTP-relevant records proxied.

### 5.2 At the app (Vercel + Next.js)

Headers set in `next.config.ts`:

- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
- `Content-Security-Policy` — strict allow-list of `self` + Resend + Upstash + Google fonts. `'unsafe-inline'` permitted only for styles (Tailwind requires it). `'unsafe-eval'` only in `NODE_ENV !== "production"`.
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: SAMEORIGIN` (defense-in-depth alongside CSP `frame-ancestors`)
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=(), payment=(self)`

### 5.3 Contact form

- Server Actions (CSRF tokens managed by Next.js).
- `zod` validation on both client and server using the same schema.
- Honeypot field `hp_x` (intentionally non-semantic, off-screen, `aria-hidden`, `tabIndex=-1`).
- Anti-bot timestamp (instant submits < 1.5 s after render are silently dropped).
- Per-IP sliding-window rate limit via Upstash (5 req / 10 min).
- HTML-escapes user content in email rendering to prevent injection in mail clients.
- No PII in logs ever. Server-side breadcrumbs use only `name` (not full email) and a redacted email prefix.

### 5.4 Email authentication

- **SPF**: apex permits Resend (Amazon SES infrastructure) and Cloudflare's MX hosts to send as `@bizautofy.com`. `~all` softfail during reputation build, plan to tighten to `-all` after 30 days.
- **DKIM**: Resend signs all outbound from `hello@bizautofy.com` using the `resend._domainkey` selector.
- **DMARC**: `p=quarantine` initially. Reports go to `hello@bizautofy.com` (which Cloudflare Email Routing forwards to Gmail).

### 5.5 Secrets management

- **No secrets in source code or in the repo.** `.env.example` only lists names + dummy values.
- `.env.local` is in `.gitignore`.
- Production secrets live only in Vercel's encrypted env-var store and in their original consoles (Resend, Upstash).
- API keys use least-privilege scoping (Resend "Sending access" scoped to `bizautofy.com`).
- Key rotation: Resend API key every 12 months or on personnel change.

---

## 6. Lessons learned (so the next person doesn't repeat them)

These are the issues that took meaningful debugging time.

1. **Cloudflare imports your old DNS — including records you don't want.** When adding a zone, Cloudflare scans the registrar's existing records and pulls them in. After updating nameservers, the old hosting target may still be served because the imported A record points there. **Always audit Cloudflare's imported records before celebrating.**

2. **Local routers cache DNS aggressively.** After NS migration, your home/office router can serve stale answers for hours after the world has moved on. Test from cellular or a different network before assuming DNS is broken. `dig @1.1.1.1` and `dig @<authoritative-ns>` are the source of truth.

3. **VPNs block UDP/53 and sometimes block DoH host resolution.** Diagnostic tools that rely on `dig` will fail silently behind some corporate VPNs. Solution: drop the VPN briefly to verify, or use `curl --resolve` to bypass DNS entirely with a known IP.

4. **Password managers fill any field labeled "Website" with the page URL.** A honeypot field named `website` defeats the purpose — real users get the field auto-filled by 1Password / Apple Keychain / Chrome and trip the bot detector. Use a non-semantic field name (`hp_x` or similar) and *do not* include a `<label>Website</label>` wrapper.

5. **The Resend SDK does not throw on non-2xx.** `await resend.emails.send(...)` resolves with `{ data: null, error: {...} }` for things like invalid API keys. A `try { ... } catch {}` will not catch these. Always check `result.error` explicitly and log the failure with name + message. (Same advice applies to most modern fetch-based SDKs.)

6. **First emails from a new domain land in Gmail spam.** Even with perfect SPF/DKIM/DMARC, Gmail uses sender reputation. New domains have none. Mark a few transactional emails as "Not spam," add the sender to contacts, and after 5–10 successful sends across a few days, deliverability becomes reliable. **This is normal, not a bug.**

7. **GitHub Rulesets require status checks to have run at least once before they appear in the picker.** First push the workflow, run it via a PR, then revisit the ruleset to attach the now-known check. Don't try to fully configure protection before any CI has executed.

8. **GitHub Rulesets on free orgs only enforce against public repos.** Marketing site has no IP — make the repo public, gain free protection. Private with rules requires the GitHub Team plan.

9. **One SPF TXT record per name. Period.** RFC 7208 is unforgiving; multiple SPF TXTs are treated as `permerror` and break deliverability silently. When adding a second sender (e.g., enabling Cloudflare Email Routing on a domain that already sends via Resend), merge the includes into a single SPF record.

10. **`NODE_ENV` is `"production"` on Vercel during runtime.** Code paths gated on `NODE_ENV !== "production"` (like dev-mode fallback messages) will not fire on Vercel. Don't rely on these to silently work without an API key in production — fail loud instead.

---

## 7. Disaster-recovery quick reference

| Scenario | First action | Recovery time |
| --- | --- | --- |
| Bad deploy breaks production | Vercel → Deployments → Promote previous build | ~5 sec |
| Cloudflare zone deleted accidentally | Re-add zone, re-import records from this doc § 2 | ~15 min + DNS propagation |
| Domain expires at Squarespace | Renew Squarespace; Cloudflare DNS independent of registrar | ~10 min if caught fast |
| Resend account locked/billing | Switch `CONTACT_FROM_EMAIL` to `Bizautofy <onboarding@resend.dev>` (Resend's shared sender) and remove `RESEND_API_KEY` errors | ~2 min |
| GitHub repo deleted | Re-create from local clone (`git push --mirror`); reconnect Vercel; rules need to be reapplied | ~30 min |
| Compromised Resend API key | Resend → API Keys → revoke. Create new key. Update Vercel. Redeploy. Audit Resend Logs for suspicious sends. | ~10 min |
| Compromised Vercel account | Vercel → Settings → Sessions → revoke all. Rotate `RESEND_API_KEY`, `UPSTASH_REDIS_REST_TOKEN`. Force-deploy a known-good commit. | ~30 min |

---

## 8. URLs and accounts referenced

| Service | URL | Account |
| --- | --- | --- |
| Production site | https://bizautofy.com | — |
| Vercel deployment alias | website-seven-alpha-14.vercel.app | — |
| GitHub repo | https://github.com/bizautofy/website | org `bizautofy`, owner `kgkgithub02` |
| Cloudflare dashboard | https://dash.cloudflare.com | (your Cloudflare account) |
| Vercel project | https://vercel.com/dashboard | (your Vercel account) |
| Resend dashboard | https://resend.com | (your Resend account) |
| Upstash console | https://console.upstash.com | (your Upstash account) |
| Squarespace registrar | https://account.squarespace.com | (your Squarespace account) |
| Status / public health checks | https://www.bizautofy.com (200) + https://bizautofy.com (307 → www) | — |
