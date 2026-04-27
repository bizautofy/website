import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container, Eyebrow, Section } from "@/components/shared/Container";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { MeshGradient } from "@/components/shared/MeshGradient";
import {
  customerServices,
  internalServices,
  crossServices,
  serviceTracks,
  type Service,
} from "@/lib/content";
import { cn } from "@/lib/utils";

function ServiceTile({ service, delay }: { service: Service; delay: number }) {
  const Icon = service.icon;
  return (
    <AnimatedSection
      delay={delay}
      className={cn(
        "h-full",
        service.span === "wide" && "sm:col-span-2 lg:col-span-3",
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
}

function TrackHeader({
  eyebrow,
  label,
  description,
}: {
  eyebrow: string;
  label: string;
  description: string;
}) {
  return (
    <AnimatedSection className="mt-16 flex flex-col gap-3 border-l-2 border-accent/40 pl-5 sm:flex-row sm:items-end sm:justify-between sm:gap-8 sm:pl-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          {eyebrow}
        </p>
        <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
          {label}
        </h3>
      </div>
      <p className="max-w-md text-sm leading-relaxed text-muted-foreground sm:text-right">
        {description}
      </p>
    </AnimatedSection>
  );
}

export function BentoFeatures() {
  const customerTrack = serviceTracks.find((t) => t.id === "customer")!;
  const internalTrack = serviceTracks.find((t) => t.id === "internal")!;

  return (
    <Section>
      <MeshGradient variant="soft" />
      <Container>
        <AnimatedSection className="mx-auto max-w-2xl text-center">
          <Eyebrow>What we do</Eyebrow>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-balance sm:text-5xl">
            Two tracks.{" "}
            <span className="font-serif italic font-normal gradient-text">
              One automation layer.
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-balance">
            Front-of-house automations win and keep customers. Back-office
            automations give you your evenings back. We do both — and tie them
            together so you can see the whole business on one screen.
          </p>
        </AnimatedSection>

        {/* Track 1 — customer-facing */}
        <TrackHeader
          eyebrow={customerTrack.eyebrow}
          label={customerTrack.label}
          description={customerTrack.description}
        />
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[18rem]">
          {customerServices.map((service, idx) => (
            <ServiceTile
              key={service.slug}
              service={service}
              delay={idx * 0.05}
            />
          ))}
        </div>

        {/* Track 2 — internal operations */}
        <TrackHeader
          eyebrow={internalTrack.eyebrow}
          label={internalTrack.label}
          description={internalTrack.description}
        />
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[18rem]">
          {internalServices.map((service, idx) => (
            <ServiceTile
              key={service.slug}
              service={service}
              delay={idx * 0.05}
            />
          ))}
        </div>

        {/* Cross-cutting — pulls signal from both tracks */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[18rem]">
          {crossServices.map((service, idx) => (
            <ServiceTile
              key={service.slug}
              service={service}
              delay={idx * 0.05}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
