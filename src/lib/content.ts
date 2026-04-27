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
    title: "Audit",
    body: "We start with a free 30-minute audit covering both sides of your business: site, GBP, and reviews on the customer side; tools, scheduling, books, and reporting on the ops side. You get a written scorecard — yours to keep, even if we never work together.",
    bullets: [
      "Site speed, SEO, and accessibility scan",
      "Google Business Profile and review-velocity audit",
      "Tool stack inventory and waste estimate",
      "Back-office gap analysis (scheduling, books, inventory, reporting)",
    ],
  },
  {
    number: "02",
    title: "Build",
    body: "Pick a package or a custom scope. We rebuild your presence, wire up the customer-facing flows, and automate the back-office processes — bookkeeping, scheduling, reporting — that quietly eat your week. Most builds ship in 2–4 weeks.",
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
    title: "Automate & grow",
    body: "We monitor performance, ship improvements monthly, and send a weekly dashboard combining customer and ops metrics. You focus on customers; we keep the lights on, the rankings climbing, the reviews coming in, and the back office running.",
    bullets: [
      "Monthly improvement sprint (1–2 ships / month)",
      "Quarterly strategy review",
      "Real human support, same-day reply",
      "Cancel or pause any time",
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
  title: "Be one of our first 10 — and never pay sticker again.",
  body: "Bizautofy is new on purpose. We are taking on a small, hand-picked group of founding customers in exchange for honest feedback and (eventually) a public case study. In return, you get charter pricing for life, priority on every ship, and direct access to the founder.",
  perks: [
    {
      icon: Wallet,
      title: "Charter pricing — locked",
      body: "Whatever rate you start at is the rate you keep. Forever. Even when public prices double.",
    },
    {
      icon: Clock4,
      title: "Priority on every release",
      body: "Founders get the new automations, integrations, and dashboards weeks before everyone else.",
    },
    {
      icon: HeartHandshake,
      title: "Direct line to the founder",
      body: "No support tier, no chatbot. You text the person who built it — and you get an answer the same day.",
    },
    {
      icon: ShieldCheck,
      title: "30-day money back",
      body: "If the first month is not the best money you spent on your business, we refund it. No essay, no awkwardness.",
    },
  ],
} as const;

// ---------------------------------------------------------------------------
// Pricing
// Tiered to map onto the new positioning:
//   Starter = front-of-house basics
//   Growth  = full customer-facing automation
//   Pro     = total automation (front of house + back office)
// ---------------------------------------------------------------------------

export interface PricingTier {
  name: string;
  tagline: string;
  setup: string;
  monthly: string;
  founderPrice?: string;
  features: string[];
  cta: { label: string; href: string };
  highlighted?: boolean;
}

export const pricing: PricingTier[] = [
  {
    name: "Starter",
    tagline: "Get found and look great online.",
    setup: "$1,500 one-time",
    monthly: "$99/mo",
    founderPrice: "$49/mo for founders",
    features: [
      "Modern 5-page website + hosting",
      "Google Business Profile rebuild and optimization",
      "On-page SEO + structured data",
      "Basic review request flow",
      "Weekly performance email",
    ],
    cta: { label: "Start with Starter", href: "/contact?plan=starter" },
  },
  {
    name: "Growth",
    tagline: "Win and keep more customers, automatically.",
    setup: "$3,500 one-time",
    monthly: "$249/mo",
    founderPrice: "$149/mo for founders",
    features: [
      "Everything in Starter",
      "Online booking + Stripe payments + automated invoicing",
      "AI chat (web + SMS) for inquiries and booking",
      "CRM pipeline with automated follow-ups and review requests",
      "Local citation cleanup (30+ directories)",
      "Monthly improvement sprint",
    ],
    cta: { label: "Choose Growth", href: "/contact?plan=growth" },
    highlighted: true,
  },
  {
    name: "Pro",
    tagline: "Total automation — front of house and back office.",
    setup: "$6,500 one-time",
    monthly: "$549/mo",
    founderPrice: "$349/mo for founders",
    features: [
      "Everything in Growth",
      "Bookkeeping sync (QuickBooks / Xero) with automated reconciliation",
      "Staff scheduling + shift / time-off self-service",
      "Inventory tracking + supplier reorder automation",
      "Owner dashboard combining customer + ops KPIs with anomaly alerts",
      "Quarterly strategy review with founder",
      "Up to 10 hrs/mo of bespoke automation work",
    ],
    cta: { label: "Choose Pro", href: "/contact?plan=pro" },
  },
];

export const pricingNotes = [
  "All plans are month-to-month — cancel any time.",
  "First 10 founding customers get charter pricing locked in for life.",
  "Setup is paid once at kickoff. Monthly starts after handoff.",
  "Need something different? We do custom scopes — just ask.",
];

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
    q: "Do I have to switch tools? I already use Square / Toast / QuickBooks / Acuity.",
    a: "No. We integrate with the tools you already use whenever possible — POS, booking, accounting, payroll, scheduling. The goal is to make your existing stack work harder and talk to itself, not force you onto ours.",
  },
  {
    q: "How long does it take to launch?",
    a: "Starter usually ships in 2 weeks. Growth and Pro take 3–4 weeks. We send weekly Loom updates so you always know exactly where things stand.",
  },
  {
    q: "Who owns the website, the data, and the automations?",
    a: "You do. Domain, hosting account, content, customer data, and the workflow automations themselves all live in your name from day one. If you ever leave, you walk out with everything still working.",
  },
  {
    q: "What if I am not happy?",
    a: "30-day money back, no essay required. After that, you can pause or cancel monthly with 30 days' notice. We are not in the business of trapping anyone.",
  },
  {
    q: "Why are you offering founding pricing?",
    a: "We are new and we know it. We would rather take on 10 perfect founding customers at half price than 50 random clients at full price. In exchange for charter pricing, founders give honest feedback and (eventually) a public case study.",
  },
  {
    q: "Do you work with businesses outside the US?",
    a: "We work with English-speaking owners worldwide. Most automations (Stripe, GBP, Calendly, Twilio, QuickBooks/Xero) work globally — we will flag any region-specific gaps in the audit.",
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
      title: "Start with a free audit",
      body: "30-minute call, written scorecard covering both customer-facing and back-office gaps, yours to keep. No sales pressure.",
    },
    {
      icon: Sparkles,
      title: "Ship in small slices",
      body: "Weekly demos. You see progress every Friday and can redirect at any point.",
    },
    {
      icon: LineChart,
      title: "Prove it with data",
      body: "Every change is tied to a number we agreed on at kickoff. We report on it weekly.",
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
