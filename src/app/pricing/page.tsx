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
  faqs,
  type PricingBand,
} from "@/lib/content";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Custom-built means custom-priced. Discovery is the only fixed price — $500, refundable into Build. Everything else is scoped from your audit, in writing, before any further work begins.",
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
                    : "border-white/10"
                )}
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-xs text-muted-foreground/70">
                    {s.num}
                  </span>
                  <span className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
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
                  <span className="text-sm text-muted-foreground">
                    {pricingDiscovery.priceNote}
                  </span>
                </div>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground/80">
                  {pricingDiscovery.duration}
                </p>

                <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground/90">
                  {pricingDiscovery.body}
                </p>

                <p className="mt-4 max-w-xl rounded-2xl border border-white/10 bg-background/40 p-4 text-sm text-foreground/85">
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

              <div className="rounded-2xl border border-white/10 bg-background/40 p-6 backdrop-blur">
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
      {/* Why we don't quote shrink-wrapped totals                     */}
      {/* ------------------------------------------------------------ */}
      <Section>
        <Container size="narrow">
          <AnimatedSection className="rounded-3xl border border-white/10 bg-card/40 p-8 backdrop-blur-sm sm:p-12">
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
          <AnimatedSection className="flex flex-col items-center justify-between gap-6 rounded-3xl border border-dashed border-white/10 bg-background/40 p-8 text-center sm:flex-row sm:text-left">
            <div>
              <h3 className="font-display text-2xl font-semibold tracking-tight">
                Ready to see what your business could automate?
              </h3>
              <p className="mt-2 max-w-md text-sm text-muted-foreground">
                Discovery is one week. $500 — refundable into Build.
                No shrink-wrapped tiers, no surprise totals.
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
  return (
    <AnimatedSection
      delay={delay}
      className={cn(
        "relative flex h-full flex-col rounded-3xl border bg-card/40 p-8 backdrop-blur-sm transition-all duration-300",
        band.highlighted
          ? "border-primary/40 ring-1 ring-primary/20 lg:-mt-4 lg:mb-4"
          : "border-white/10"
      )}
    >
      {band.highlighted && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge variant="default">
            <Sparkles className="h-3 w-3" /> Most common
          </Badge>
        </span>
      )}

      <div>
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15 text-primary ring-1 ring-inset ring-primary/30">
          <Icon className="h-4 w-4" aria-hidden />
        </div>
        <h3 className="mt-5 font-display text-xl font-semibold tracking-tight">
          {band.name}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">{band.tagline}</p>

        <div className="mt-6 space-y-1">
          <div className="font-display text-3xl font-bold tracking-tight gradient-text">
            {band.priceRange}
          </div>
          <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground/80">
            {band.rangeLabel}
          </div>
        </div>

        <p className="mt-5 text-sm leading-relaxed text-foreground/85">
          <span className="font-semibold text-foreground">Best for: </span>
          {band.bestFor}
        </p>
      </div>

      <ul className="mt-6 flex-1 space-y-2.5 border-t border-white/5 pt-6 text-sm text-foreground/90">
        {band.includes.map((f) => (
          <li key={f} className="flex items-start gap-3">
            <span className="mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-primary/15 text-primary">
              <Check className="h-3 w-3" />
            </span>
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </AnimatedSection>
  );
}
