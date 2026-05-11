import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container, Section } from "@/components/shared/Container";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { MeshGradient } from "@/components/shared/MeshGradient";

export function CTA() {
  return (
    <Section>
      <Container size="narrow">
        <AnimatedSection className="relative overflow-hidden rounded-[2rem] border border-foreground/10 bg-card/30 px-8 py-16 text-center backdrop-blur-sm sm:px-16 sm:py-20">
          <MeshGradient variant="soft" />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl font-display text-4xl font-bold tracking-tight text-balance sm:text-5xl">
              Spend less time on tools.{" "}
              <span className="font-serif italic font-normal gradient-text">
                More time on customers.
              </span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
              Free 15-min fit-check, no commitment. If we&apos;re a fit,
              Discovery is your first deliverable — a written audit and a
              fixed-price plan, in one week.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="xl">
                <Link href="/contact">
                  Book a free 15-min call
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="xl" variant="ghost">
                <Link href="/pricing">See how pricing works</Link>
              </Button>
            </div>
          </div>
        </AnimatedSection>
      </Container>
    </Section>
  );
}
