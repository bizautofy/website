import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Container, Section } from "@/components/shared/Container";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { MeshGradient } from "@/components/shared/MeshGradient";
import { foundingProgram } from "@/lib/content";

export function FoundingProgram() {
  return (
    <Section>
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-card/40 p-8 backdrop-blur-sm sm:p-12 lg:p-16">
          <MeshGradient variant="accent" />

          <div className="relative grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <AnimatedSection>
              <Badge variant="accent">{foundingProgram.badge}</Badge>
              <h2 className="mt-6 font-display text-4xl font-bold tracking-tight text-balance sm:text-5xl">
                {foundingProgram.title}
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                {foundingProgram.body}
              </p>
              <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <Link href="/contact?founding=true">
                    Apply as a founding customer
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="ghost">
                  <Link href="/pricing">See pricing</Link>
                </Button>
              </div>
            </AnimatedSection>

            <AnimatedSection
              delay={0.1}
              className="grid grid-cols-1 gap-3 sm:grid-cols-2"
            >
              {foundingProgram.perks.map((perk) => {
                const Icon = perk.icon;
                return (
                  <div
                    key={perk.title}
                    className="rounded-2xl border border-white/10 bg-background/40 p-5 backdrop-blur"
                  >
                    <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-accent/15 text-accent ring-1 ring-inset ring-accent/30">
                      <Icon className="h-4 w-4" aria-hidden />
                    </div>
                    <h3 className="mt-4 text-sm font-semibold tracking-tight">
                      {perk.title}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                      {perk.body}
                    </p>
                  </div>
                );
              })}
            </AnimatedSection>
          </div>
        </div>
      </Container>
    </Section>
  );
}
