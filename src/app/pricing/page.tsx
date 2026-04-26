import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Sparkles } from "lucide-react";
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
import { pricing, pricingNotes, faqs } from "@/lib/content";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Three transparent packages and an honest custom option. Founding customers lock charter pricing in for life.",
};

export default function PricingPage() {
  // Use the most relevant FAQs for the pricing page
  const pricingFaqs = faqs.filter((f) =>
    /pricing|founding|cancel|owner|happy|differ/i.test(f.q)
  );

  return (
    <>
      <Section spacing="tight" className="pt-12 sm:pt-20">
        <MeshGradient variant="soft" />
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>Pricing</Eyebrow>
            <h1 className="mt-4 font-display text-5xl font-bold tracking-tight text-balance sm:text-6xl">
              Honest pricing.{" "}
              <span className="font-serif italic font-normal gradient-text">
                No surprises.
              </span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground text-balance">
              Pick a package, or talk to us about a custom scope. Founding
              customers lock charter pricing in for life.
            </p>
          </div>
        </Container>
      </Section>

      <Section spacing="tight" className="pt-0">
        <Container>
          <div className="grid gap-4 lg:grid-cols-3">
            {pricing.map((tier, idx) => (
              <AnimatedSection
                key={tier.name}
                delay={idx * 0.06}
                className={cn(
                  "relative flex h-full flex-col rounded-3xl border bg-card/40 p-8 backdrop-blur-sm transition-all duration-300",
                  tier.highlighted
                    ? "border-primary/40 ring-1 ring-primary/20 lg:-mt-4 lg:mb-4"
                    : "border-white/10"
                )}
              >
                {tier.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge variant="default">
                      <Sparkles className="h-3 w-3" /> Most popular
                    </Badge>
                  </span>
                )}

                <div>
                  <h3 className="font-display text-2xl font-semibold tracking-tight">
                    {tier.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {tier.tagline}
                  </p>

                  <div className="mt-6 space-y-1">
                    <div className="font-display text-4xl font-bold tracking-tight gradient-text">
                      {tier.monthly}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      then monthly &middot;{" "}
                      <span className="text-foreground/80">{tier.setup}</span>{" "}
                      setup
                    </div>
                    {tier.founderPrice && (
                      <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-xs text-accent">
                        <Sparkles className="h-3 w-3" />
                        {tier.founderPrice}
                      </div>
                    )}
                  </div>
                </div>

                <ul className="mt-8 flex-1 space-y-2.5 border-t border-white/5 pt-6 text-sm text-foreground/90">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-primary/15 text-primary">
                        <Check className="h-3 w-3" />
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  className="mt-8 w-full"
                  variant={tier.highlighted ? "primary" : "secondary"}
                >
                  <Link href={tier.cta.href}>
                    {tier.cta.label}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection
            delay={0.2}
            className="mt-10 rounded-2xl border border-white/10 bg-card/40 p-6 backdrop-blur-sm"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground/80">
              Fine print, in plain English
            </p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {pricingNotes.map((n) => (
                <li
                  key={n}
                  className="flex items-start gap-3 text-sm text-foreground/85"
                >
                  <span className="mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-accent/15 text-accent">
                    <Check className="h-3 w-3" />
                  </span>
                  {n}
                </li>
              ))}
            </ul>
          </AnimatedSection>

          <AnimatedSection
            delay={0.25}
            className="mt-10 flex flex-col items-center justify-between gap-6 rounded-3xl border border-dashed border-white/10 bg-background/40 p-8 text-center sm:flex-row sm:text-left"
          >
            <div>
              <h3 className="font-display text-2xl font-semibold tracking-tight">
                Need something different?
              </h3>
              <p className="mt-2 max-w-md text-sm text-muted-foreground">
                We design custom scopes for owners with unusual workflows,
                multi-location operations, or specific tools. Tell us what you
                need.
              </p>
            </div>
            <Button asChild size="lg" variant="primary">
              <Link href="/contact?plan=custom">
                Request a custom scope
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </AnimatedSection>
        </Container>
      </Section>

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
