# Bizautofy

Modern marketing site for [bizautofy.com](https://bizautofy.com) — a service that helps local and small businesses look as good online as they are in person, and run on autopilot.

Built with Next.js 15 (App Router, React 19), Tailwind CSS v4, shadcn/ui, framer-motion, Resend, and Upstash.

## Local development

```bash
npm install
cp .env.example .env.local   # fill in keys (optional locally)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Common scripts:

```bash
npm run dev      # dev server (Turbopack)
npm run build    # production build
npm run start    # start production server locally
npm run lint     # eslint
```

## Project structure

```
src/
├─ app/                  # App Router pages, sitemap, robots, OG image, server actions
├─ components/
│  ├─ home/              # Home page sections
│  ├─ layout/            # Navbar, Footer, Logo
│  ├─ shared/            # MeshGradient, AnimatedSection, Container, Section
│  ├─ ui/                # shadcn primitives (Button, Card, Accordion, ...)
│  └─ forms/ContactForm.tsx
└─ lib/
   ├─ content.ts         # All site copy in one typed file
   ├─ contact-schema.ts  # zod schema (shared client/server)
   ├─ rate-limit.ts      # Upstash sliding-window limiter
   └─ utils.ts
```

All copy lives in `src/lib/content.ts` so updates do not require touching components.

## Environment variables

See `.env.example`. Required for production:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL (e.g. `https://bizautofy.com`) |
| `RESEND_API_KEY` | Sends contact-form emails via Resend |
| `CONTACT_FROM_EMAIL` | Verified sender address (e.g. `Bizautofy <hello@bizautofy.com>`) |
| `CONTACT_TO_EMAIL` | Inbox that receives inquiries |
| `UPSTASH_REDIS_REST_URL` | Upstash REST URL for per-IP rate limiting |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash REST token |

If Resend is not configured the form still validates and rate-limits; submissions fall through with a helpful error so you notice in dev. If Upstash is not configured the limiter falls back to in-memory (per-instance) which is fine for local dev only.

## Security posture

- Contact submissions go through a Next.js Server Action (CSRF-safe), with:
  - `zod` validation on both client and server
  - Honeypot field + minimum dwell-time to defeat naive bots
  - Per-IP sliding-window rate limit (`@upstash/ratelimit`)
  - No PII in logs
- Site-wide security headers are set in `next.config.ts`:
  - `Strict-Transport-Security` (HSTS, 2y, includeSubDomains, preload)
  - `Content-Security-Policy` (nonceless, scoped to required hosts)
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: SAMEORIGIN`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy` denies camera/mic/geolocation, scopes payment to self
- All third-party hosts are explicitly allow-listed in CSP (Calendly for booking, Resend for outbound, Upstash for limiter).

## Deployment

The production site runs on **Cloudflare → Vercel** with **Resend** for outbound email and **Cloudflare Email Routing** for inbound. DNS lives at Cloudflare; the registrar is Squarespace; the GitHub repo (public) auto-deploys to Vercel.

For the full step-by-step deployment runbook, including DNS records, environment variables, lessons learned, troubleshooting, and disaster recovery, see:

**→ [`docs/deployment.md`](./docs/deployment.md)**

That document is the source of truth for operations. This README intentionally stays a quick project intro.

## Roadmap (post-v1)

- Blog/MDX for SEO long-tail
- Real case studies as the founding-customer cohort closes
- Customer portal for ongoing automation dashboards
