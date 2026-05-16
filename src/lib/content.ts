/**
 * Single source of truth for site copy.
 * Components import from here so editorial changes never require touching JSX.
 */

import type { LucideIcon } from "lucide-react";
import {
  Globe2,
  HeartHandshake,
  Calendar,
  Users,
  Receipt,
  Boxes,
  LineChart,
  Search,
  Sparkles,
  ShieldCheck,
  Wallet,
  Clock4,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Brand & meta
// ---------------------------------------------------------------------------

export const brand = {
  name: "Bizautofy",
  domain: "bizautofy.com",
  tagline:
    "Total automation for small businesses — front-of-house and back-office.",
  contactEmail: "hello@bizautofy.com",
  responsePromise: "We reply to every message within one business day.",
} as const;

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

export const hero = {
  eyebrow: "Founding customer program — limited spots",
  title: "Run on autopilot. Look great while doing it.",
  highlight: "autopilot",
  subtitle:
    "Bizautofy automates the work that fills an owner's day — customer discovery, bookings, reviews, payments, staff scheduling, bookkeeping, and reporting — so the business runs without you in the middle of it.",
  primaryCta: { label: "Book a free 15-min call", href: "/contact" },
  secondaryCta: { label: "See what we automate", href: "/services" },
  trustStrip: [
    "30-day money back",
    "No long lock-ins",
    "Owner-first pricing",
  ],
} as const;

// ---------------------------------------------------------------------------
// Mission
// ---------------------------------------------------------------------------

export const mission = {
  eyebrow: "Our mission",
  body: "We automate the work that runs a small business — both the customer-facing side (discovery, booking, reviews, communication) and the operational side (staff, finance, inventory, reporting). Owners get back the hours they spend on tools and admin, and a business that keeps running when they step away.",
  pull: "If your business runs cleanly on the day you take off — we have done our job.",
} as const;

// ---------------------------------------------------------------------------
// Services / pillars
// Two tracks: customer-facing ("front of house") and internal-operations
// ("back office"), plus one cross-cutting pillar that combines both.
// Used on the Home bento grid AND the Services page.
// ---------------------------------------------------------------------------

export type ServiceTrack = "customer" | "internal" | "cross";

export interface Service {
  slug: string;
  icon: LucideIcon;
  title: string;
  short: string;
  long: string;
  deliverables: string[];
  tools: string[];
  outcome: string;
  track: ServiceTrack;
  span?: "default" | "wide" | "tall";
}

export const services: Service[] = [
  // -------------------------------------------------------------------------
  // Track 1 — Customer-facing ("front of house")
  // -------------------------------------------------------------------------
  {
    slug: "web-presence",
    icon: Globe2,
    title: "Web presence & discovery",
    short:
      "A fast, beautiful site and a Google Business Profile that actually shows up — built once, owned by you.",
    long: "Most small business websites were built years ago, and most Google Business Profiles were never optimized past adding hours. We rebuild your site on modern tooling — fast, mobile-first, accessible — and rebuild your GBP so neighbors searching nearby actually find you. The two are wired together: same services, same hours, same call-to-actions, working in lockstep.",
    deliverables: [
      "Modern, responsive 5–10 page site",
      "Clear hero, services, location, hours, and contact",
      "On-page SEO + LocalBusiness structured data",
      "Full Google Business Profile rebuild and weekly post schedule",
      "Local citation cleanup across 30+ directories (NAP consistency)",
      "Privacy-friendly analytics, no cookie banners required",
    ],
    tools: ["Next.js", "Tailwind", "Google Business Profile", "Vercel"],
    outcome:
      "A site that loads in under a second and a profile that out-converts the competition — so 'near me' searches turn into walk-ins and calls.",
    track: "customer",
    span: "wide",
  },
  {
    slug: "customer-relationships",
    icon: HeartHandshake,
    title: "Customer relationships & CRM",
    short:
      "Capture every lead, answer every question, and turn one-time customers into repeats — automatically.",
    long: "Reviews, missed calls, DMs, and form fills are all leads — and most slip through the cracks because there's no one to answer at 11pm on a Sunday. We set up a single pipeline that captures everything, an AI assistant that answers and qualifies in your voice, automated review requests that fire after the right events, and retention campaigns that bring customers back.",
    deliverables: [
      "Unified CRM pipeline (web forms, calls, SMS, DMs, GBP messages)",
      "Custom AI chat trained on your services, FAQs, and policies",
      "Auto-reply to missed calls with a booking link",
      "Branded review request flow (SMS + email) with private feedback gate",
      "Win-back and 'we miss you' campaigns triggered by inactivity",
      "Owner alerts on every new lead and review",
    ],
    tools: ["OpenAI", "Twilio", "Resend", "GBP API"],
    outcome:
      "Faster response times, more 5-star reviews, and a steady stream of repeat customers — without you typing a single follow-up.",
    track: "customer",
  },
  {
    slug: "booking-payments",
    icon: Calendar,
    title: "Booking, payments & invoicing",
    short:
      "Let customers book, pay, reschedule, and get receipts themselves — 24/7.",
    long: "If your phone has to ring for someone to give you money, you are leaking revenue every night and weekend. We wire up online booking, deposit collection, recurring billing, and automated invoicing so customers self-serve in under a minute, your calendar stays organized, and the books reconcile themselves.",
    deliverables: [
      "Online booking embedded on your site and GBP",
      "Deposits, full payment, or recurring billing via Stripe",
      "Automated invoicing with payment reminders",
      "Calendar sync to Google / Outlook",
      "Automated SMS + email confirmations and reminders",
      "Cancellation and reschedule self-service",
    ],
    tools: ["Stripe", "Google Calendar", "Cal.com / SimplyBook"],
    outcome:
      "Bookings made while you sleep, fewer no-shows, faster checkout, and invoices that pay themselves.",
    track: "customer",
  },

  // -------------------------------------------------------------------------
  // Track 2 — Internal operations ("back office")
  // -------------------------------------------------------------------------
  {
    slug: "staff-scheduling",
    icon: Users,
    title: "Staff & scheduling",
    short:
      "Build the schedule once, let staff swap shifts and request time off themselves — no more group texts.",
    long: "Scheduling, shift swaps, time-off requests, and labor-cost tracking eat hours of every owner's week. We replace the spreadsheet (or the group text) with a self-service tool your team can use from their phones — and tie it to payroll so hours flow through automatically.",
    deliverables: [
      "Self-service schedule with shift swap and pickup",
      "Time-off requests with one-tap approvals",
      "Clock-in / clock-out from phone with geofencing",
      "Labor-cost dashboard against revenue (target % alerts)",
      "Automated reminders before each shift",
      "Hours export to payroll on schedule",
    ],
    tools: ["When I Work / Homebase / 7shifts", "Twilio", "Custom"],
    outcome:
      "A schedule that builds itself, a team that takes care of its own swaps, and labor costs you can actually see weekly.",
    track: "internal",
  },
  {
    slug: "finance-bookkeeping",
    icon: Receipt,
    title: "Finance & bookkeeping",
    short:
      "Stripe, bank, and invoices flow into QuickBooks or Xero on their own — books reconciled, taxes ready.",
    long: "Most owners pay an accountant by the hour to sort transactions that should sort themselves. We connect your sales, bank account, and expenses to QuickBooks or Xero with rule-based categorization, automated reconciliation, and clean monthly close — so come tax time, you are not scrambling.",
    deliverables: [
      "QuickBooks or Xero sync (Stripe, bank, POS, invoices)",
      "Automated transaction categorization with custom rules",
      "Monthly reconciliation and close",
      "Receipt capture by email or photo",
      "Payroll prep handoff to Gusto / Rippling",
      "Quarterly tax-ready P&L, balance sheet, and cash-flow report",
    ],
    tools: ["QuickBooks", "Xero", "Stripe", "Gusto"],
    outcome:
      "Books that match your bank account every Monday morning, a clean trail for your accountant, and a much smaller bill at tax time.",
    track: "internal",
  },
  {
    slug: "inventory-vendor",
    icon: Boxes,
    title: "Inventory & vendor management",
    short:
      "Stock levels track themselves, reorders fire automatically, and your supplier orders write themselves.",
    long: "Stockouts cost sales; over-ordering ties up cash. We connect your point-of-sale and inventory system to reorder rules and your suppliers — so when stock crosses a threshold, the next purchase order is ready to send (or sends itself), with the right SKUs and quantities based on your sales velocity.",
    deliverables: [
      "Live stock levels synced from POS / e-commerce",
      "Reorder rules with safety stock and lead-time-aware triggers",
      "Auto-drafted purchase orders to your suppliers",
      "Supplier price-change and back-order alerts",
      "Top SKU and dead-stock reporting",
      "Multi-location stock balancing (if applicable)",
    ],
    tools: ["Square / Shopify / Toast", "EDI / supplier APIs", "Custom"],
    outcome:
      "No more 'we're out' moments, less cash tied up in slow stock, and purchase orders that just appear in your inbox already filled in.",
    track: "internal",
  },

  // -------------------------------------------------------------------------
  // Cross-cutting — pulls signal from both tracks into one owner view
  // -------------------------------------------------------------------------
  {
    slug: "owner-intelligence",
    icon: LineChart,
    title: "Owner intelligence",
    short:
      "One weekly view of the whole business — customer metrics and operational health, in one place.",
    long: "Most owners have data scattered across a dozen apps and no time to log into any of them. We build one weekly dashboard that combines the customer side (leads, bookings, reviews, GBP impressions, revenue) with the operational side (labor cost %, gross margin, cash flow, top SKUs, inventory turns) — so you know in 30 seconds whether last week was up or down, and exactly why.",
    deliverables: [
      "Weekly emailed dashboard (no logins required)",
      "Customer KPIs: leads, bookings, revenue, reviews, GBP impressions",
      "Ops KPIs: labor %, gross margin, cash on hand, top / dead SKUs",
      "Trend lines vs. previous 4 weeks",
      "Anomaly alerts (sudden drops, review spikes, cash-flow risk)",
      "Optional Looker Studio / Notion view for deeper dives",
    ],
    tools: ["Looker Studio", "Stripe", "QuickBooks", "GBP Insights API"],
    outcome:
      "A 30-second weekly read on the health of your whole business — front of house and back office, on one screen.",
    track: "cross",
    span: "wide",
  },
];

// Convenience accessors so components don't have to filter inline.
export const customerServices = services.filter((s) => s.track === "customer");
export const internalServices = services.filter((s) => s.track === "internal");
export const crossServices = services.filter((s) => s.track === "cross");

export const serviceTracks = [
  {
    id: "customer" as const,
    label: "Front of house",
    eyebrow: "Customer-facing automation",
    description:
      "Get found by neighbors, capture every lead, answer instantly, take payment, and bring customers back — all without you typing.",
  },
  {
    id: "internal" as const,
    label: "Back office",
    eyebrow: "Internal operations automation",
    description:
      "Schedule staff, reconcile books, manage inventory, and prep payroll — the work that quietly eats your week, running on its own.",
  },
] as const;

// ---------------------------------------------------------------------------
// How it works
// ---------------------------------------------------------------------------

export interface Step {
  number: string;
  title: string;
  body: string;
  bullets: string[];
}

export const howItWorks: Step[] = [
  {
    number: "01",
    title: "Discovery",
    body: "Every engagement starts with a Discovery & Automation Audit. Founding customers get it free as part of the founding program (normally $500, refundable into Build). We shadow your operation, document customer-facing and back-office systems, and deliver a written audit, a prioritized automation roadmap, and a fixed-price proposal for everything that follows. Want a free 15-minute fit-check first? Book it on the contact page.",
    bullets: [
      "90-minute kickoff and on-site / virtual shadowing",
      "Written audit of front-of-house and back-office systems",
      "Prioritized automation roadmap with effort and ROI estimates",
      "Fixed-price proposal for Build and Run before any further work",
    ],
  },
  {
    number: "02",
    title: "Build",
    body: "We execute the proposal at the price we quoted. Modern site, GBP, customer-facing automations, back-office integrations — exactly what we scoped, on a timeline we agreed at kickoff. Most builds ship in 2–6 weeks. Founding customers get the Front-of-house essentials Build free (normally $2,000–$4,000) while spots are open — you cover only third-party pass-throughs. Deeper Build bands (Customer-facing automation, Total automation) are quoted from Discovery; 50% on kickoff, 50% on handoff.",
    bullets: [
      "Modern site, GBP refresh, review and CRM flows",
      "Booking, payments, invoicing, and AI chat",
      "Staff scheduling, bookkeeping sync, inventory automation",
      "Done-for-you migration from old vendors",
      "Owner-friendly training video at handoff",
    ],
  },
  {
    number: "03",
    title: "Run",
    body: "After handoff we monitor performance, ship improvements monthly, and send a weekly dashboard combining customer and ops metrics. Founding customers get Presence Care free for the first 12 months (normally $99–$199/mo); months 13–24 lock at the founding-customer band rate, and CPI cap applies forever after — no surprise hikes, ever.",
    bullets: [
      "Monthly improvement sprint (1–2 ships / month)",
      "Quarterly strategy review",
      "Real human support, same-day reply",
      "Cancel any time with 30 days' notice",
    ],
  },
];

// ---------------------------------------------------------------------------
// Industry stats (sourced footnotes — no fake client numbers)
// ---------------------------------------------------------------------------

export interface Stat {
  value: string;
  label: string;
  source: string;
  sourceUrl: string;
}

export const stats: Stat[] = [
  {
    value: "33.3M",
    label: "Small businesses in the United States",
    source: "U.S. SBA Office of Advocacy, 2024 profile",
    sourceUrl: "https://advocacy.sba.gov/2024/03/21/2024-small-business-profile/",
  },
  {
    value: "≈30%",
    label: "of small US businesses still have no website",
    source: "Forbes Advisor, Small Business Statistics 2024",
    sourceUrl: "https://www.forbes.com/advisor/business/small-business-statistics/",
  },
  {
    value: "5×",
    label: "more views for complete Google Business Profiles vs. incomplete ones",
    source: "Google, Business Profile Help",
    sourceUrl:
      "https://support.google.com/business/answer/7091",
  },
  {
    value: "93%",
    label: "of consumers say online reviews influence their purchase decisions",
    source: "BrightLocal Local Consumer Review Survey 2024",
    sourceUrl: "https://www.brightlocal.com/research/local-consumer-review-survey/",
  },
];

// ---------------------------------------------------------------------------
// Founding customer program
// ---------------------------------------------------------------------------

export const foundingProgram = {
  badge: "Founding customer",
  title: "Be one of our first 10. Get launched for free.",
  body: "Bizautofy is new on purpose. We are taking on a small, hand-picked group of founding customers in exchange for honest feedback and (eventually) a public case study. In return: Discovery, the Front-of-house essentials Build, and your first 12 months of Presence Care are all free — you cover only the third-party pass-throughs we don't control (domain, SMS if used). Your retainer rate then locks at signing for 24 months, capped at inflation forever after, and your original scope stays at the price you signed at for as long as we run together.",
  perks: [
    {
      icon: Sparkles,
      title: "Free to launch — Discovery + FOH essentials Build",
      body: "Discovery audit ($500 normally) and the Front-of-house essentials Build ($2,000–$4,000 normally) — both $0 for founding customers while spots remain open. You cover only third-party pass-throughs.",
    },
    {
      icon: ShieldCheck,
      title: "Presence Care free for 12 months",
      body: "Hosting, monitoring, monthly updates, GBP posts, summary email — normally $99–$199/mo, free for your first year. Months 13–24 lock at the founding rate; CPI cap thereafter.",
    },
    {
      icon: Wallet,
      title: "Rate locked for 24 months",
      body: "The retainer rate you sign at is the rate you pay for two full years. No surprise hikes, no fine print.",
    },
    {
      icon: LineChart,
      title: "CPI cap forever after",
      body: "After 24 months we adjust only by U.S. BLS Urban CPI. Never more. We put it in the contract.",
    },
    {
      icon: Clock4,
      title: "Original scope, original price",
      body: "Whatever we built and run for you at signing stays at that price for as long as we work together. New scope is quoted at current rates — but you always pay the founding rate for that band.",
    },
    {
      icon: HeartHandshake,
      title: "Direct line to the founder",
      body: "No support tier, no chatbot. You text the person who built it — and you get an answer the same day.",
    },
  ],
} as const;

// ---------------------------------------------------------------------------
// Pricing — three-step engagement
//   01  Discovery  →  $500 list price, free for founding customers (promo).
//                     Refundable into Build at the list price; the founding-
//                     customer rate ($0) holds as long as founding spots are
//                     open. The only fixed price on the site.
//   02  Build      →  custom-quoted from Discovery; ranges shown to anchor
//   03  Run        →  monthly retainer scoped to what was built
//
// Why it's structured this way: every small business has a different stack
// (Square vs Toast, QuickBooks vs Xero, one location vs three). Selling
// shrink-wrapped tiers either undercharges or overcharges almost everyone.
// The audit is the product entry point. Everything else is custom.
// ---------------------------------------------------------------------------

export const pricingDiscovery = {
  badge: "Step 01 — Discovery",
  name: "Discovery & Automation Audit",
  // Promotional founding-customer price. Once founding spots fill, swap
  // `price` back to `regularPrice` and clear `priceNote` / `regularPrice`.
  price: "Free",
  priceNote: "for founding customers — limited spots",
  regularPrice: "$500",
  regularPriceNote: "list price after founding program closes",
  duration: "1 week turnaround",
  promise:
    "Yours to keep — even if you never engage us further. Founding customers pay nothing for Discovery as part of the founding program; once founding spots are filled, Discovery is $500, fully credited toward Build if you proceed within 30 days.",
  body: "We don't quote Build or Run numbers without studying the business first — but we don't charge our founding customers to do it, either. Discovery is the entry point on every engagement; right now it's free as part of the founding program, and it always comes with a written, fixed-price proposal in your hands before any further work begins.",
  deliverables: [
    "90-minute kickoff and on-site / virtual shadowing",
    "Written audit of customer-facing systems (site, GBP, reviews, booking, comms)",
    "Written audit of back-office systems (POS, accounting, scheduling, inventory)",
    "Prioritized automation roadmap with effort and ROI estimates",
    "Fixed-price proposal for Build (one-time) and Run (monthly)",
    "Yours to keep — even if you never engage us further",
  ],
  cta: { label: "Book my Discovery", href: "/contact?plan=discovery" },
} as const;

export interface PricingBand {
  slug: string;
  icon: LucideIcon;
  name: string;
  tagline: string;
  priceRange: string;
  rangeLabel: string;
  bestFor: string;
  includes: string[];
  highlighted?: boolean;
  /**
   * Optional founding-customer promotion. When present, the card shows the
   * promo price (e.g. "Free") with the `priceRange` strikethrough and a
   * sub-note. Mirrors the pattern used for Discovery (`pricingDiscovery`).
   *
   * Once founding spots fill, delete the `founding` block here to revert
   * the card to standard pricing — no other code changes required.
   */
  founding?: {
    price: string;
    note: string;
    detail?: string;
    thirdPartyNote?: string;
  };
}

export const pricingBuild: PricingBand[] = [
  {
    slug: "foh-essentials",
    icon: Globe2,
    name: "Front-of-house essentials",
    tagline: "Get found and look great online — first.",
    priceRange: "$2,000 – $4,000",
    rangeLabel: "typical Build",
    bestFor:
      "Owners whose immediate problem is presence and discovery. Often Phase 1 of a larger automation plan.",
    includes: [
      "Modern responsive 5–10 page website",
      "Google Business Profile rebuild + on-page SEO",
      "Local citation cleanup across 30+ directories",
      "Basic review request flow (SMS or email)",
      "Privacy-friendly analytics, no cookie banners",
    ],
    founding: {
      price: "Free",
      note: "for founding customers — limited spots",
      detail:
        "One-time Build at $0 while founding spots remain open. Yours to keep when we hand off, regardless of whether you continue with Run.",
      thirdPartyNote:
        "You cover third-party pass-throughs only — domain renewal, SMS via Twilio if used, and any optional paid directory listings. Full breakdown below.",
    },
  },
  {
    slug: "customer-automation",
    icon: HeartHandshake,
    name: "Customer-facing automation",
    tagline: "Win and keep more customers, hands-off.",
    priceRange: "$5,000 – $9,000",
    rangeLabel: "typical Build",
    bestFor:
      "Owners with a working presence who lose money to missed calls, manual booking, slow review velocity, and one-time customers who don't return.",
    includes: [
      "Everything in Front-of-house essentials",
      "Online booking + Stripe payments + automated invoicing",
      "AI chat (web + SMS) trained on your services",
      "Unified CRM pipeline with auto-replies and follow-ups",
      "Branded review pipeline with private feedback gate",
      "Win-back and retention campaigns",
    ],
    highlighted: true,
  },
  {
    slug: "total-automation",
    icon: LineChart,
    name: "Total automation",
    tagline: "Front of house + back office, on autopilot.",
    priceRange: "$10,000 – $25,000+",
    rangeLabel: "typical Build",
    bestFor:
      "Owners who want the whole business — customer journey and internal operations — running without them in the middle of it. Range depends on POS / accounting stack and number of locations.",
    includes: [
      "Everything in Customer-facing automation",
      "Bookkeeping sync (QuickBooks / Xero) with automated reconciliation",
      "Staff scheduling, shift swap, and time-off self-service",
      "Inventory tracking + supplier reorder automation",
      "Owner dashboard combining customer and ops KPIs",
      "Done-for-you data migration from legacy tools",
    ],
  },
];

export const pricingRun: PricingBand[] = [
  {
    slug: "presence-care",
    icon: ShieldCheck,
    name: "Presence Care",
    tagline: "Keep the lights on. Keep the rankings climbing.",
    priceRange: "$99 – $199 / mo",
    rangeLabel: "typical retainer",
    bestFor:
      "Front-of-house essentials builds. Hosting, monitoring, content updates, GBP posts, monthly summary email.",
    includes: [
      "Hosting, SSL, security headers, uptime monitoring",
      "Monthly content / GBP post updates",
      "Performance and SEO drift monitoring",
      "Monthly summary email with the numbers that matter",
      "Real human support, same-day reply",
    ],
    founding: {
      price: "Free",
      note: "first 12 months for founding customers",
      detail:
        "Months 1–12 at $0 while founding spots remain open. Months 13–24 lock at the founding-customer band rate (within your standard $99–$199/mo range) for the rest of the 24-month rate-lock window; CPI cap applies thereafter — same promise as everything else founding.",
      thirdPartyNote:
        "You cover third-party pass-throughs only — domain renewal, optional SMS via Twilio, and Vercel hosting upgrade if traffic outgrows the free tier (rare). Full breakdown below.",
    },
  },
  {
    slug: "customer-operations",
    icon: HeartHandshake,
    name: "Customer Operations",
    tagline: "Tune the customer machine every month.",
    priceRange: "$349 – $599 / mo",
    rangeLabel: "typical retainer",
    bestFor:
      "Customer-facing automation builds. Continuous tuning of the review pipeline, AI chat, and CRM, plus a monthly improvement sprint.",
    includes: [
      "Everything in Presence Care",
      "AI chat upkeep and prompt tuning",
      "Review pipeline tuning and response oversight",
      "CRM hygiene and segmentation updates",
      "Monthly improvement sprint (1–2 ships / month)",
      "Weekly dashboard with customer KPIs",
    ],
    highlighted: true,
  },
  {
    slug: "full-operations",
    icon: LineChart,
    name: "Full Operations",
    tagline: "We run the whole automation layer.",
    priceRange: "$749 – $1,499+ / mo",
    rangeLabel: "typical retainer",
    bestFor:
      "Total automation builds. Continuous oversight of bookkeeping reconciliation, scheduling rules, inventory thresholds, vendor automation, and your custom dashboard.",
    includes: [
      "Everything in Customer Operations",
      "Bookkeeping reconciliation oversight",
      "Scheduling rule updates and labor-cost tuning",
      "Inventory threshold and vendor automation upkeep",
      "Custom owner dashboard maintenance",
      "Quarterly strategy review with the founder",
    ],
  },
];

export const pricingPrinciples = {
  eyebrow: "Why we don't quote shrink-wrapped totals",
  title: "Custom-built means custom-priced.",
  body: [
    "Every small business runs on a different stack. Square versus Toast. QuickBooks versus Xero. One location versus three. Four employees versus eighteen. The integration depth — and the price — depends entirely on what we find inside the business, not on what tier you click on a website.",
    "So we sell the audit, not the answer. While founding spots remain open, three things are free: Discovery ($500 normally), the Front-of-house essentials Build ($2,000–$4,000 normally), and Presence Care for the first 12 months ($99–$199/mo normally). You cover only third-party pass-throughs — domain, SMS if used, the occasional paid directory listing. Everything beyond Front-of-house essentials (Customer-facing automation, Total automation, the deeper Run bands) gets a written, fixed-price proposal in Discovery. You always know the number before any further work begins.",
    "The ranges above are real — they cover most engagements at our practice scale. If your situation falls outside them, we will tell you in the audit, with the math to back it.",
  ],
} as const;

// ---------------------------------------------------------------------------
// Founding-customer pass-throughs
// What "free" actually covers vs. what stays the owner's responsibility.
// Used by the pricing page callout and by the FAQ. Numbers are conservative
// estimates; the Discovery audit gives the customer-specific figure.
// ---------------------------------------------------------------------------

export const foundingPassThroughs = {
  eyebrow: "What 'free' covers — and what stays yours",
  title: "Our work is free. Third-party fees stay third-party.",
  intro:
    "While founding spots remain open, Bizautofy's work on Discovery, Front-of-house essentials Build, and the first 12 months of Presence Care is $0. You still cover the third-party services we don't control. There are four — and most engagements only hit two of them.",
  items: [
    {
      label: "Domain registration / renewal",
      cost: "~$12–25 / year",
      note: "Paid to your registrar (Squarespace, Namecheap, Cloudflare, etc.). If you already own your domain, this is just your existing renewal — nothing new.",
    },
    {
      label: "SMS messaging (Twilio)",
      cost: "~$0.0075 per US SMS",
      note: "Only if your Build includes review request SMS, AI chat over SMS, or appointment reminders by text. Email-only flows skip this entirely. Typical Front-of-house essentials customer: $0–$15 / mo.",
    },
    {
      label: "Paid directory listings",
      cost: "$0–$200 one-time, typical",
      note: "Most local citations are free. A few (Yelp Enhanced, BBB, niche industry directories) charge listing fees. We always tell you before paying any of these — they're opt-in.",
    },
    {
      label: "Hosting overage",
      cost: "$0 in ~95% of cases",
      note: "Vercel's free Hobby tier covers small-business traffic. If you outgrow it (rare for FOH essentials), the Pro upgrade is $20/mo paid directly to Vercel — your account, your bill.",
    },
  ],
  footer:
    "Everything else — design, build, deploy, GBP rebuild, monitoring, support, monthly updates, the founder's time — is on us. The Discovery audit gives you a specific pass-through estimate for your business before you sign anything.",
} as const;

export const foundingGuarantee = {
  eyebrow: "Founding-customer guarantee",
  title: "The price you sign at is the price that holds.",
  bullets: [
    "Discovery is free for founding customers — a $500 audit, on us, while spots are open.",
    "Front-of-house essentials Build is free for founding customers — normally $2,000–$4,000. You cover only third-party pass-throughs (domain, SMS if used).",
    "Presence Care is free for your first 12 months — normally $99–$199/mo. After month 12, your rate locks at the founding-customer band rate.",
    "Your retainer rate is locked at signing for 24 months — no rate hikes, ever.",
    "After 24 months, we adjust only by U.S. BLS Urban CPI. Never more. It is in the contract.",
    "Your original scope stays at your original price for as long as we run together.",
    "New automations and new locations are quoted at current rates — but you always pay the founding-customer rate for that band.",
    "Cancel Run any time with 30 days' notice.",
  ],
} as const;

// ---------------------------------------------------------------------------
// FAQ
// ---------------------------------------------------------------------------

export interface Faq {
  q: string;
  a: string;
}

export const faqs: Faq[] = [
  {
    q: "How is Bizautofy different from a freelance web designer?",
    a: "A freelancer ships a site and disappears. Bizautofy is an ongoing partner — we ship the site, then run the SEO, reviews, booking, and customer-facing automation that drive revenue, and we automate your back office (scheduling, books, inventory, reporting) so the business runs without you in the middle of it. You get a small team's output for less than the cost of one part-time hire.",
  },
  {
    q: "Is Bizautofy just websites and SEO?",
    a: "No — that is the front of the house. Bizautofy automates the back office too: bookkeeping, staff scheduling, inventory, vendor orders, and a single dashboard that combines customer metrics with operational health. The website is the most visible piece, but most of the value shows up in the hours an owner gets back every week.",
  },
  {
    q: "Why don't you publish flat package prices?",
    a: "Because automating a small business is not a flat-priced product — it is an integration. Two coffee shops on the same block can have different POS systems, different bookkeeping software, different staff size, different inventory practices. Selling them the same shrink-wrapped tier would mean either undercharging one or overcharging the other. Discovery is the only fixed price on this site; everything else is scoped to what we find, with the exact dollar figures in writing before any further work begins.",
  },
  {
    q: "Why is Discovery $500 normally — and free for founding customers?",
    a: "Free audits attract tire-kickers and reward fast, generic templates, so we list Discovery at $500: it pays for a real week studying your business — both the customer-facing side and the operational side — and you walk away with a written audit, a prioritized roadmap, and a fixed-price proposal you can keep, even if you never engage us further. As a founding-customer promotion, while spots remain open we waive the $500 entirely — same audit, same deliverables, no payment up front. Once founding spots are filled the $500 list price returns; we still refund it if the audit alone isn't worth it, and credit it 100% toward Build if you proceed within 30 days.",
  },
  {
    q: "What exactly is free for founding customers? And what do I still pay for?",
    a: "Three things are free while founding spots remain open: (1) the Discovery audit (normally $500), (2) the Front-of-house essentials Build — modern site, GBP rebuild, citation cleanup, review setup, privacy-friendly analytics (normally $2,000–$4,000), and (3) the first 12 months of Presence Care — hosting, monitoring, monthly content/GBP updates, summary email, human support (normally $99–$199/mo). What you still pay for is the third-party services we don't control: your domain registration/renewal (~$12–25/yr at your registrar), SMS messages if your build uses them (~$0.0075 per US SMS via Twilio — most owners $0–$15/mo), the occasional opt-in paid directory listing during citation cleanup ($0–$200 one-time typical), and Vercel hosting only if your traffic outgrows the free tier (rare; $20/mo direct to Vercel). Deeper Build bands (Customer-facing automation, Total automation) and deeper Run bands (Customer Operations, Full Operations) are still custom-quoted from your Discovery audit — at the founding-customer rate. We spell out the exact pass-through estimate for your business in Discovery before you sign anything.",
  },
  {
    q: "How does founding-customer pricing work?",
    a: "While founding spots are open: Discovery is free, the Front-of-house essentials Build is free, and Presence Care is free for your first 12 months — you cover only third-party pass-throughs. Whatever retainer rate you sign at then locks for 24 months — no hikes. After 24 months we adjust only by U.S. BLS Urban CPI, never more. Your original scope stays at the original price for as long as we run together. If your business grows and you add deeper automations (Customer-facing automation, Total automation, deeper Run bands), the new work is quoted at then-current rates — but you always pay the founding-customer rate for that band. Cancel any time with 30 days' notice.",
  },
  {
    q: "Do I have to switch tools? I already use Square / Toast / QuickBooks / Acuity.",
    a: "No. We integrate with the tools you already use whenever possible — POS, booking, accounting, payroll, scheduling. The goal is to make your existing stack work harder and talk to itself, not force you onto ours.",
  },
  {
    q: "How long does an engagement take?",
    a: "Discovery is one week. Build is typically 2–6 weeks depending on shape — Front-of-house essentials is fastest; Total automation runs longer for complex multi-location operations. Run starts the month after handoff. We send weekly Loom updates throughout Build so you always know exactly where things stand.",
  },
  {
    q: "Who owns the website, the data, and the automations?",
    a: "You do. Domain, hosting account, content, customer data, and the workflow automations themselves all live in your name from day one. If you ever leave, you walk out with everything still working.",
  },
  {
    q: "What if I am not happy?",
    a: "30-day money back on Discovery, no essay required. After Build, you can pause or cancel Run monthly with 30 days' notice. We are not in the business of trapping anyone.",
  },
  {
    q: "Do you work with businesses outside the US?",
    a: "We work with English-speaking owners worldwide. Most automations (Stripe, GBP, Calendly, Twilio, QuickBooks / Xero) work globally — we will flag any region-specific gaps in the audit.",
  },
];

// ---------------------------------------------------------------------------
// About / values
// ---------------------------------------------------------------------------

export const about = {
  founderNote: {
    title: "Why I built Bizautofy",
    body: [
      "I have spent years building software for large companies and watching small business owners — the people who actually keep neighborhoods alive — get sold expensive, complicated tools they never have time to use.",
      "Bizautofy is the opposite. It is one integrated automation layer that runs both sides of a small business — the front of house (website, Google Business Profile, reviews, booking, customer comms) and the back office (staff scheduling, bookkeeping, inventory, reporting). All measurable, all owned by you.",
      "We are deliberately small. We pick our customers carefully, ship weekly, and answer the phone. If that sounds like the kind of partner you have been looking for, let's talk.",
    ],
    signoff: "— The Bizautofy team",
  },
  values: [
    {
      icon: ShieldCheck,
      title: "Owner-first.",
      body: "Every decision starts with: 'Will the owner have a better day because of this?' If not, we kill it.",
    },
    {
      icon: Wallet,
      title: "Honest pricing.",
      body: "Public prices, no setup tricks, no surprise renewals. You always know what you pay and why.",
    },
    {
      icon: LineChart,
      title: "Measurable outcomes.",
      body: "If we cannot show it on a weekly dashboard, we do not promise it. Vibes are not a deliverable.",
    },
    {
      icon: HeartHandshake,
      title: "Real humans.",
      body: "No tier-1 outsourced support. The founder still answers — and intends to keep it that way.",
    },
  ],
  methodology: [
    {
      icon: Search,
      title: "Discovery comes first",
      body: "Every engagement begins with a paid Discovery — a written audit covering customer-facing and back-office systems, plus a fixed-price proposal you keep. No shrink-wrapped tiers, no surprise totals.",
    },
    {
      icon: Sparkles,
      title: "Ship in small slices",
      body: "Weekly demos. You see progress every Friday and can redirect at any point during Build.",
    },
    {
      icon: LineChart,
      title: "Prove it with data",
      body: "Every change is tied to a number we agreed on at kickoff. We report on it weekly during Run.",
    },
  ],
} as const;

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------

export const nav = [
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;
