import { Check } from "lucide-react";
import { Container, Eyebrow, Section } from "@/components/shared/Container";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { howItWorks } from "@/lib/content";

export function HowItWorks() {
  return (
    <Section>
      <Container>
        <AnimatedSection className="mx-auto max-w-2xl text-center">
          <Eyebrow>How it works</Eyebrow>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-balance sm:text-5xl">
            Three steps.{" "}
            <span className="font-serif italic font-normal gradient-text">
              No surprises.
            </span>
          </h2>
        </AnimatedSection>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {howItWorks.map((step, idx) => (
            <AnimatedSection
              key={step.number}
              delay={idx * 0.08}
              className="relative flex h-full flex-col rounded-3xl border border-foreground/10 bg-card/40 p-8 backdrop-blur-sm"
            >
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-xs text-muted-foreground/70">
                  {step.number}
                </span>
                <span className="h-px flex-1 bg-foreground/10" />
              </div>
              <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {step.body}
              </p>
              <ul className="mt-6 space-y-2.5 border-t border-foreground/5 pt-6 text-sm text-foreground/85">
                {step.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-primary/15 text-primary">
                      <Check className="h-3 w-3" />
                    </span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </Section>
  );
}
