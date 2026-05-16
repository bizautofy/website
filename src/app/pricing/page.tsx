import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Container, Eyebrow, Section } from "@/components/shared/Container";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { MeshGradient } from "@/components/shared/MeshGradient";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  pricingDiscovery,
  pricingBuild,
  pricingRun,
  pricingPrinciples,
  foundingGuarantee,
  foundingPassThroughs,
  faqs,
  type PricingBand,
} from "@/lib/content";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Founding customers get launched for free: Discovery ($500 normally), Front-of-house essentials Build ($2,000–$4,000 normally), and the first 12 months of Presence Care ($99–$199/mo normally) — all $0 while spots remain open. You cover only third-party pass-throughs (domain, SMS if used). Deeper bands quoted from your audit, in writing.",
};

export default function PricingPage() {
  // Pull pricing-relevant FAQs (the new ones live in content.ts).
  const pricingFaqs = faqs.filter((f) =>
    /price|pricing|discovery|founding|cancel|happy|long|own|switch/i.test(f.q)
  );

  return (
    <>
      {/* ------------------------------------------------------------ */}
      {/* Hero                                                         */}
      {/* ------------------------------------------------------------ */}
      <Section spacing="tight" className="pt-12 sm:pt-20">
        <MeshGradient variant="soft" />
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>Pricing</Eyebrow>
            <h1 className="mt-4 font-display text-5xl font-bold tracking-tight text-balance sm:text-6xl">
              Custom-built.{" "}
              <span className="font-serif italic font-normal gradient-text">
                Transparently priced.
              </span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground text-balance">
              No flat tiers for work that is never flat. We study your business
              first, then quote in writing — Build and Run, exact dollars,
              before any further work begins.
            </p>
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------------ */}
      {/* How pricing works strip                                      */}
      {/* ------------------------------------------------------------ */}
      <Section spacing="tight" className="pt-0">
        <Container>
          <AnimatedSection className="mx-auto max-w-3xl text-center">
            <Eyebrow>How pricing works</Eyebrow>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              Three steps.{" "}
              <span className="font-serif italic font-normal gradient-text">
                Priced to your business.
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground">
              Only Discovery is a fixed price. Build and Run are quoted from
              your audit — in writing, before any further work.
            </p>
          </AnimatedSection>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              {
                num: "01",
                title: "Discovery",
                copy: "Paid audit. The only fixed price.",
                accent: true,
              },
              {
                num: "02",
                title: "Build",
                copy: "Custom-quoted from Discovery. Fixed-price proposal in writing.",
              },
              {
                num: "03",
                title: "Run",
                copy: "Monthly retainer scoped to what was built. Founding rate locked at signing.",
              },
            ].map((s, idx) => (
              <AnimatedSection
                key={s.num}
                delay={idx * 0.05}
                className={cn(
                  "rounded-2xl border bg-card/40 p-6 backdrop-blur-sm",
                  s.accent
                    ? "border-primary/40 ring-1 ring-primary/20"
                    : "border-foreground/10"
                )}
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-xs text-muted-foreground/70">
                    {s.num}
                  </span>
                  <span className="h-px flex-1 bg-foreground/10" />
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold tracking-tight">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {s.copy}
                </p>
              </AnimatedSection>
            ))}
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------------ */}
      {/* 01 Discovery — large highlighted card                        */}
      {/* ------------------------------------------------------------ */}
      <Section spacing="tight">
        <Container>
          <AnimatedSection className="relative overflow-hidden rounded-[2rem] border border-primary/30 bg-card/40 p-8 backdrop-blur-sm sm:p-12">
            <MeshGradient variant="accent" />

            <div className="relative grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-start">
              <div>
                <Badge variant="default">
                  <Sparkles className="h-3 w-3" /> {pricingDiscovery.badge}
                </Badge>
                <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
                  {pricingDiscovery.name}
                </h2>

                <div className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="font-display text-5xl font-bold tracking-tight gradient-text">
                    {pricingDiscovery.price}
                  </span>
                  {pricingDiscovery.regularPrice && (
                    <span
                      className="text-xl font-semibold text-muted-foreground/60 line-through decoration-foreground/30 decoration-2"
                      aria-label={`Normally ${pricingDiscovery.regularPrice}`}
                    >
                      {pricingDiscovery.regularPrice}
                    </span>
                  )}
                  <span className="text-sm text-muted-foreground">
                    {pricingDiscovery.priceNote}
                  </span>
                </div>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground/80">
                  {pricingDiscovery.duration}
                  {pricingDiscovery.regularPriceNote && (
                    <>
                      <span className="mx-2 text-muted-foreground/40">·</span>
                      <span className="normal-case tracking-normal text-muted-foreground/70">
                        {pricingDiscovery.regularPriceNote}
                      </span>
                    </>
                  )}
                </p>

                <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground/90">
                  {pricingDiscovery.body}
                </p>

                <p className="mt-4 max-w-xl rounded-2xl border border-foreground/10 bg-background/40 p-4 text-sm text-foreground/85">
                  <span className="font-semibold text-foreground">
                    Our promise:{" "}
                  </span>
                  {pricingDiscovery.promise}
                </p>

                <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row">
                  <Button asChild size="lg">
                    <Link href={pricingDiscovery.cta.href}>
                      {pricingDiscovery.cta.label} — {pricingDiscovery.price}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="ghost">
                    <Link href="/contact">Or book a free 15-min call first</Link>
                  </Button>
                </div>
              </div>

              <div className="rounded-2xl border border-foreground/10 bg-background/40 p-6 backdrop-blur">
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-accent/15 text-accent ring-1 ring-inset ring-accent/30">
                  <Search className="h-4 w-4" aria-hidden />
                </div>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground/80">
                  What you get
                </p>
                <ul className="mt-4 space-y-3 text-sm text-foreground/90">
                  {pricingDiscovery.deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-primary/15 text-primary">
                        <Check className="h-3 w-3" />
                      </span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </AnimatedSection>
        </Container>
      </Section>

      {/* ------------------------------------------------------------ */}
      {/* 02 Build engagement shapes                                   */}
      {/* ------------------------------------------------------------ */}
      <Section spacing="tight">
        <Container>
          <AnimatedSection className="mx-auto max-w-3xl text-center">
            <Eyebrow>Step 02 — Build</Eyebrow>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              Three shapes Build usually takes.
            </h2>
            <p className="mt-4 text-base text-muted-foreground">
              Quoted from your Discovery. Fixed price, in writing, before any
              further work.
            </p>
          </AnimatedSection>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {pricingBuild.map((band, idx) => (
              <BandCard key={band.slug} band={band} delay={idx * 0.06} />
            ))}
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------------ */}
      {/* 03 Run retainer bands                                        */}
      {/* ------------------------------------------------------------ */}
      <Section spacing="tight">
        <Container>
          <AnimatedSection className="mx-auto max-w-3xl text-center">
            <Eyebrow>Step 03 — Run</Eyebrow>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              Three retainer bands, scoped to what we built.
            </h2>
            <p className="mt-4 text-base text-muted-foreground">
              Your retainer is scoped from Build at handoff. Founding-customer
              rate locks at signing.
            </p>
          </AnimatedSection>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {pricingRun.map((band, idx) => (
              <BandCard key={band.slug} band={band} delay={idx * 0.06} />
            ))}
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------------ */}
      {/* Founding-customer pass-throughs                              */}
      {/* What "free" covers vs. what stays the customer's. Sits right */}
      {/* below the Build/Run grids so the promo and the caveat are    */}
      {/* never separated in the reader's eye.                         */}
      {/* ------------------------------------------------------------ */}
      <Section spacing="tight">
        <Container size="narrow">
          <AnimatedSection className="rounded-3xl border border-accent/30 bg-card/40 p-8 backdrop-blur-sm sm:p-10">
            <Eyebrow>{foundingPassThroughs.eyebrow}</Eyebrow>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              {foundingPassThroughs.title}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-foreground/85">
              {foundingPassThroughs.intro}
            </p>

            <ul className="mt-8 space-y-4">
              {foundingPassThroughs.items.map((item) => (
                <li
                  key={item.label}
                  className="grid gap-2 rounded-2xl border border-foreground/10 bg-background/40 p-5 sm:grid-cols-[1fr_auto] sm:items-baseline"
                >
                  <div>
                    <p className="font-semibold tracking-tight text-foreground">
                      {item.label}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {item.note}
                    </p>
                  </div>
                  <span className="inline-flex items-center self-start rounded-full bg-accent/15 px-3 py-1 font-mono text-xs font-medium text-accent ring-1 ring-inset ring-accent/30 sm:self-auto">
                    {item.cost}
                  </span>
                </li>
              ))}
            </ul>

            <p className="mt-6 text-sm leading-relaxed text-foreground/85">
              {foundingPassThroughs.footer}
            </p>
          </AnimatedSection>
        </Container>
      </Section>

      {/* ------------------------------------------------------------ */}
      {/* Why we don't quote shrink-wrapped totals                     */}
      {/* ------------------------------------------------------------ */}
      <Section>
        <Container size="narrow">
          <AnimatedSection className="rounded-3xl border border-foreground/10 bg-card/40 p-8 backdrop-blur-sm sm:p-12">
            <Eyebrow>{pricingPrinciples.eyebrow}</Eyebrow>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              {pricingPrinciples.title}
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-foreground/85">
              {pricingPrinciples.body.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </AnimatedSection>
        </Container>
      </Section>

      {/* ------------------------------------------------------------ */}
      {/* Founding-customer guarantee                                  */}
      {/* ------------------------------------------------------------ */}
      <Section spacing="tight">
        <Container size="narrow">
          <AnimatedSection
            delay={0.05}
            className="relative overflow-hidden rounded-3xl border border-accent/30 bg-card/40 p-8 backdrop-blur-sm sm:p-12"
          >
            <MeshGradient variant="accent" />
            <div className="relative">
              <Eyebrow>{foundingGuarantee.eyebrow}</Eyebrow>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
                {foundingGuarantee.title}
              </h2>
              <ul className="mt-8 space-y-3 text-base text-foreground/90">
                {foundingGuarantee.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-accent/15 text-accent">
                      <Check className="h-3 w-3" />
                    </span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>
        </Container>
      </Section>

      {/* ------------------------------------------------------------ */}
      {/* Closing CTA                                                  */}
      {/* ------------------------------------------------------------ */}
      <Section spacing="tight">
        <Container size="narrow">
          <AnimatedSection className="flex flex-col items-center justify-between gap-6 rounded-3xl border border-dashed border-foreground/10 bg-background/40 p-8 text-center sm:flex-row sm:text-left">
            <div>
              <h3 className="font-display text-2xl font-semibold tracking-tight">
                Ready to see what your business could automate?
              </h3>
              <p className="mt-2 max-w-md text-sm text-muted-foreground">
                Founding customers launch free: Discovery, Front-of-house
                essentials Build, and your first 12 months of Presence Care —
                all $0 while spots are open. Third-party pass-throughs only.
              </p>
            </div>
            <Button asChild size="lg" variant="primary">
              <Link href={pricingDiscovery.cta.href}>
                Book my Discovery
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </AnimatedSection>
        </Container>
      </Section>

      {/* ------------------------------------------------------------ */}
      {/* Pricing FAQ                                                  */}
      {/* ------------------------------------------------------------ */}
      <Section>
        <Container size="narrow">
          <AnimatedSection className="text-center">
            <Eyebrow>Pricing FAQ</Eyebrow>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-balance sm:text-5xl">
              Questions, before you ask.
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.05} className="mt-12">
            <Accordion type="single" collapsible className="space-y-3">
              {pricingFaqs.map((f, idx) => (
                <AccordionItem key={f.q} value={`pricing-faq-${idx}`}>
                  <AccordionTrigger>{f.q}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-base leading-relaxed">{f.a}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </AnimatedSection>
        </Container>
      </Section>
    </>
  );
}

// ---------------------------------------------------------------------------
// Reusable card for Build / Run bands
// ---------------------------------------------------------------------------

interface BandCardProps {
  band: PricingBand;
  delay: number;
}

function BandCard({ band, delay }: BandCardProps) {
  const Icon = band.icon;
  const isFoundingPromo = Boolean(band.founding);
  // NOTE: we intentionally do NOT use a negative-margin lift (lg:-mt-4) on the
  // emphasised cards. Lifting only some cards in a CSS Grid row, combined with
  // framer-motion's per-card stagger and inline transforms, produced visible
  // badge misalignment between the "Founding · Free" and "Most common" labels
  // on adjacent cards. All three cards now share the same top Y; emphasis
  // comes from the accent/primary ring + colored badge instead.
  return (
    <AnimatedSection
      delay={delay}
      className={cn(
        "relative flex h-full flex-col rounded-3xl border bg-card/40 p-8 backdrop-blur-sm transition-all duration-300",
        isFoundingPromo
          ? "border-accent/40 ring-1 ring-accent/20"
          : band.highlighted
            ? "border-primary/40 ring-1 ring-primary/20"
            : "border-foreground/10"
      )}
    >
      {/*
        Badges are positioned so their TEXT (not their visible left edge)
        aligns horizontally with the icon below.

        Math:
          Card padding-left:           p-8        = 32px → icon-left
          Badge internal pre-text:     px-3 (12) + Sparkles w-3 (12) + gap-1.5 (6) = 30px
          Required wrapper offset:     32px − 30px = 2px  → left-[2px]

        Result: the "F" in "Free —" / the "M" in "Most common" sits at
        the same x as the icon's left edge directly below. The visible
        badge pill sits flush near the card's top-left corner; the
        sparkles icon visually leads into the text column.
      */}
      {isFoundingPromo ? (
        <span className="absolute -top-3 left-[2px]">
          <Badge variant="accent" className="whitespace-nowrap">
            <Sparkles className="h-3 w-3" /> Free — founding customers
          </Badge>
        </span>
      ) : band.highlighted ? (
        <span className="absolute -top-3 left-[2px]">
          <Badge variant="default" className="whitespace-nowrap">
            <Sparkles className="h-3 w-3" /> Most common
          </Badge>
        </span>
      ) : null}

      <div>
        <div
          className={cn(
            "inline-flex h-10 w-10 items-center justify-center rounded-lg ring-1 ring-inset",
            isFoundingPromo
              ? "bg-accent/15 text-accent ring-accent/30"
              : "bg-primary/15 text-primary ring-primary/30"
          )}
        >
          <Icon className="h-4 w-4" aria-hidden />
        </div>
        <h3 className="mt-5 font-display text-xl font-semibold tracking-tight">
          {band.name}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">{band.tagline}</p>

        {band.founding ? (
          <div className="mt-6 space-y-2">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="font-display text-3xl font-bold tracking-tight gradient-text">
                {band.founding.price}
              </span>
              <span
                className="text-base font-semibold text-muted-foreground/60 line-through decoration-foreground/30 decoration-2"
                aria-label={`Normally ${band.priceRange}`}
              >
                {band.priceRange}
              </span>
            </div>
            <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground/80">
              {band.founding.note}
            </div>
            {band.founding.detail && (
              <p className="pt-1 text-xs leading-relaxed text-foreground/75">
                {band.founding.detail}
              </p>
            )}
            {band.founding.thirdPartyNote && (
              <p className="text-xs leading-relaxed text-muted-foreground/80">
                {band.founding.thirdPartyNote}
              </p>
            )}
          </div>
        ) : (
          <div className="mt-6 space-y-1">
            <div className="font-display text-3xl font-bold tracking-tight gradient-text">
              {band.priceRange}
            </div>
            <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground/80">
              {band.rangeLabel}
            </div>
          </div>
        )}

        <p className="mt-5 text-sm leading-relaxed text-foreground/85">
          <span className="font-semibold text-foreground">Best for: </span>
          {band.bestFor}
        </p>
      </div>

      <ul className="mt-6 flex-1 space-y-2.5 border-t border-foreground/5 pt-6 text-sm text-foreground/90">
        {band.includes.map((f) => (
          <li key={f} className="flex items-start gap-3">
            <span
              className={cn(
                "mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full",
                isFoundingPromo
                  ? "bg-accent/15 text-accent"
                  : "bg-primary/15 text-primary"
              )}
            >
              <Check className="h-3 w-3" />
            </span>
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </AnimatedSection>
  );
}
