import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container, Eyebrow, Section } from "@/components/shared/Container";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { MeshGradient } from "@/components/shared/MeshGradient";
import { services } from "@/lib/content";
import { cn } from "@/lib/utils";

export function BentoFeatures() {
  return (
    <Section>
      <MeshGradient variant="soft" />
      <Container>
        <AnimatedSection className="mx-auto max-w-2xl text-center">
          <Eyebrow>What we do</Eyebrow>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-balance sm:text-5xl">
            Six pillars.{" "}
            <span className="font-serif italic font-normal gradient-text">
              One team.
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-balance">
            Everything a modern small business needs to be found, trusted, and
            booked — built once and run for you.
          </p>
        </AnimatedSection>

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[18rem]">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <AnimatedSection
                key={service.slug}
                delay={idx * 0.05}
                className={cn(
                  "h-full",
                  service.span === "wide" && "lg:col-span-2",
                  service.span === "tall" && "lg:row-span-2"
                )}
              >
                <Link
                  href={`/services#${service.slug}`}
                  className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-card/40 p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-card/60 gradient-border"
                >
                  <div className="absolute -top-20 -right-20 h-48 w-48 rounded-full bg-primary/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

                  <div>
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/15 ring-1 ring-inset ring-white/10">
                      <Icon className="h-5 w-5 text-primary" aria-hidden />
                    </div>
                    <h3 className="mt-6 font-display text-xl font-semibold tracking-tight">
                      {service.title}
                    </h3>
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                      {service.short}
                    </p>
                  </div>

                  <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary opacity-80 transition-opacity group-hover:opacity-100">
                    Learn more
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </Link>
              </AnimatedSection>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
