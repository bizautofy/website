/**
 * Single source of truth for site copy.
 * Components import from here so editorial changes never require touching JSX.
 */

import type { LucideIcon } from "lucide-react";
import {
  Globe2,
  MapPin,
  Star,
  Calendar,
  Bot,
  LineChart,
  Search,
  Sparkles,
  ShieldCheck,
  Wallet,
  Clock4,
  HeartHandshake,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Brand & meta
// ---------------------------------------------------------------------------

export const brand = {
  name: "Bizautofy",
  domain: "bizautofy.com",
  tagline: "Modern web presence and smart automation for small businesses.",
  contactEmail: "hello@bizautofy.com",
  responsePromise: "We reply to every message within one business day.",
} as const;

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

export const hero = {
  eyebrow: "Founding customer program — limited spots",
  title: "Look as good online as you are in person.",
  highlight: "in person",
  subtitle:
    "Bizautofy gives small businesses a modern web presence and the smart automation behind it — so owners spend less time on tools and more time on customers.",
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
  body: "We help local and small businesses look as good online as they are in person — and run on autopilot. Bizautofy combines a modern web presence with smart automation so owners can spend less time on tools and more time on customers.",
  pull: "If a customer can find you, trust you, and book you in under 60 seconds — we have done our job.",
} as const;

// ---------------------------------------------------------------------------
// Services / pillars (used on Home bento grid AND Services page)
// ---------------------------------------------------------------------------

export interface Service {
  slug: string;
  icon: LucideIcon;
  title: string;
  short: string;
  long: string;
  deliverables: string[];
  tools: string[];
  outcome: string;
  span?: "default" | "wide" | "tall";
}

export const services: Service[] = [
  {
    slug: "website-brand",
    icon: Globe2,
    title: "Website & brand",
    short:
      "A fast, beautiful site that turns visitors into customers — built once, owned by you.",
    long: "Most small business websites were built years ago and never updated. We start with a clean rebuild on modern tooling — fast loading, mobile-first, accessible — wired to your real services, locations, and call-to-actions. You own the domain, the hosting, and the code.",
    deliverables: [
      "Modern, responsive 5–10 page site",
      "Clear hero, services, location, hours, and contact",
      "On-page SEO + structured data (LocalBusiness schema)",
      "Privacy-friendly analytics, no cookie banners required",
      "Hosted on Vercel or Cloudflare with HTTPS by default",
    ],
    tools: ["Next.js", "Tailwind", "Vercel", "Cloudflare"],
    outcome:
      "A site that loads in under a second, ranks for your name and services, and converts foot traffic into paying customers.",
    span: "wide",
  },
  {
    slug: "local-seo",
    icon: MapPin,
    title: "Local SEO & Google Business",
    short:
      "Show up first when neighbors search — with a Google Business Profile that actually performs.",
    long: "Google Business Profile (GBP) is where most local discovery happens — and most owners have never optimized it past adding hours. We rewrite categories, services, and FAQ entries; add weekly posts; and connect GBP to your site so calls, directions, and bookings all funnel back.",
    deliverables: [
      "Full GBP audit and optimization",
      "Categories, services, attributes, and FAQ refresh",
      "Weekly post + photo schedule (first month done-for-you)",
      "Local citation cleanup (NAP consistency across 30+ directories)",
      "Monthly rank tracking for your key terms",
    ],
    tools: ["Google Business Profile", "Local rank tracker", "Schema.org"],
    outcome:
      "More map-pack appearances, more 'near me' calls, and a profile that out-converts the competition.",
  },
  {
    slug: "reviews-reputation",
    icon: Star,
    title: "Reviews & reputation",
    short:
      "Turn happy customers into a steady stream of 5-star reviews — automatically.",
    long: "Reviews are the modern word of mouth. Happy customers will leave them — but only if you ask, at the right time, in the right way. We set up a private feedback step (so unhappy customers reach you, not Google) and an automated review request triggered by checkout, booking completion, or invoice payment.",
    deliverables: [
      "Branded review request flow (SMS + email)",
      "Private feedback gate to surface issues before public reviews",
      "Auto-trigger from checkout / booking / invoice paid events",
      "Review wall on your website (live, structured-data tagged)",
      "Owner alerts on every new review",
    ],
    tools: ["Twilio / Resend", "GBP API", "Yelp", "Webhook automation"],
    outcome:
      "10–30 new reviews in the first 90 days for most businesses, and a rating that compounds month over month.",
  },
  {
    slug: "booking-payments",
    icon: Calendar,
    title: "Booking & payments",
    short:
      "Let customers book, pay, and reschedule themselves — 24/7, on every device.",
    long: "If your phone has to ring for someone to give you money, you are leaking revenue every night and weekend. We wire up online booking, deposit collection, and payment so customers can self-serve in under a minute — and your calendar stays organized.",
    deliverables: [
      "Online booking embedded on your site and GBP",
      "Deposits or full payment via Stripe",
      "Calendar sync to Google / Outlook",
      "Automated SMS + email reminders (cuts no-shows)",
      "Cancellation and reschedule self-service",
    ],
    tools: ["Stripe", "Google Calendar", "Cal.com / SimplyBook"],
    outcome:
      "Bookings made while you sleep, fewer no-shows, and faster, friendlier checkout.",
    span: "tall",
  },
  {
    slug: "ai-followups",
    icon: Bot,
    title: "AI chat & follow-ups",
    short:
      "Answer every inquiry instantly — even at 11pm on a Sunday.",
    long: "An AI assistant trained on your services, hours, and pricing answers common questions, qualifies leads, and books appointments. When a question is too nuanced, it hands off to you with full context — no copy-pasting, no lost leads.",
    deliverables: [
      "Custom-trained chat trained on your site, FAQs, and policies",
      "Web widget + WhatsApp / SMS / Instagram DM channels",
      "Lead qualification and structured handoff to your inbox",
      "Auto-reply to missed calls with a booking link",
      "Weekly transcript review to keep answers sharp",
    ],
    tools: ["OpenAI", "Twilio", "Make.com", "Custom"],
    outcome:
      "Faster response times, fewer ghosted inquiries, and a clear paper trail of every conversation.",
  },
  {
    slug: "insights-dashboard",
    icon: LineChart,
    title: "Insights dashboard",
    short:
      "One simple weekly view: leads, bookings, reviews, and revenue.",
    long: "Most owners have data scattered across a dozen apps. We build one weekly dashboard that pulls from GBP, Stripe, your booking tool, and reviews — so you know in 30 seconds whether last week was up or down, and why.",
    deliverables: [
      "Weekly emailed dashboard (no logins required)",
      "Leads, bookings, revenue, reviews, GBP impressions",
      "Trend lines vs. previous 4 weeks",
      "Optional Looker Studio / Notion view for deeper dives",
      "Anomaly alerts (sudden drops, review spikes)",
    ],
    tools: ["Looker Studio", "Stripe", "GBP Insights API"],
    outcome:
      "A 30-second weekly read on the health of your business — without opening a single dashboard.",
  },
];

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
    body: "We start with a free 30-minute audit of your site, Google Business Profile, reviews, and current tools. You get a written scorecard — yours to keep, even if we never work together.",
    bullets: [
      "Site speed, SEO, and accessibility scan",
      "Google Business Profile gap analysis",
      "Review velocity and response audit",
      "Tool stack inventory and waste estimate",
    ],
  },
  {
    number: "02",
    title: "Build",
    body: "Pick a package or a custom scope. We rebuild your presence, wire up the automations, and integrate with the tools you already use. Most builds ship in 2–4 weeks.",
    bullets: [
      "Modern site, GBP refresh, review flow",
      "Booking, payments, and AI chat",
      "Done-for-you migration from old vendors",
      "Owner-friendly training video at handoff",
    ],
  },
  {
    number: "03",
    title: "Automate & grow",
    body: "We monitor performance, ship improvements monthly, and send a weekly dashboard. You focus on customers; we keep the lights on, the rankings climbing, and the reviews coming in.",
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
    tagline: "Presence reset.",
    setup: "$1,500 one-time",
    monthly: "$99/mo",
    founderPrice: "$49/mo for founders",
    features: [
      "Modern 5-page website + hosting",
      "Google Business Profile optimization",
      "On-page SEO + structured data",
      "Basic review request flow",
      "Weekly performance email",
    ],
    cta: { label: "Start with Starter", href: "/contact?plan=starter" },
  },
  {
    name: "Growth",
    tagline: "Presence + automation.",
    setup: "$3,500 one-time",
    monthly: "$249/mo",
    founderPrice: "$149/mo for founders",
    features: [
      "Everything in Starter",
      "Online booking + Stripe payments",
      "SMS + email review automation",
      "Local citation cleanup (30+ directories)",
      "Monthly improvement sprint",
    ],
    cta: { label: "Choose Growth", href: "/contact?plan=growth" },
    highlighted: true,
  },
  {
    name: "Pro",
    tagline: "Full operations.",
    setup: "$6,500 one-time",
    monthly: "$549/mo",
    founderPrice: "$349/mo for founders",
    features: [
      "Everything in Growth",
      "Custom AI chat across web, SMS, IG",
      "Looker Studio insights dashboard",
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
    a: "A freelancer ships a site and disappears. Bizautofy is an ongoing partner — we ship the site, then run the SEO, reviews, booking, and automation that actually drive revenue. You get a small team's output for less than the cost of one part-time hire.",
  },
  {
    q: "Do I have to switch tools? I already use Square / Toast / Acuity.",
    a: "No. We integrate with the tools you already use whenever possible. The goal is to make your existing stack work harder, not force you onto ours.",
  },
  {
    q: "How long does it take to launch?",
    a: "Starter usually ships in 2 weeks. Growth and Pro take 3–4 weeks. We send weekly Loom updates so you always know exactly where things stand.",
  },
  {
    q: "Who owns the website and the data?",
    a: "You do. Domain, hosting account, content, and customer data are all in your name from day one. If you ever leave, you walk out with everything.",
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
    a: "We work with English-speaking owners worldwide. Most automations (Stripe, GBP, Calendly, Twilio) work globally — we will flag any region-specific gaps in the audit.",
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
      "Bizautofy is the opposite. It is a small, opinionated set of services that combine a great website, a working Google Business Profile, automatic reviews, online booking, and an AI assistant — all integrated, all measurable, all owned by you.",
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
      body: "30-minute call, written scorecard, yours to keep. No sales pressure.",
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
