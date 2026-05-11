import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Container, Eyebrow, Section } from "@/components/shared/Container";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { MeshGradient } from "@/components/shared/MeshGradient";
import { CTA } from "@/components/home/CTA";
import {
  ServicesSideNav,
  type SideNavGroup,
} from "@/components/services/ServicesSideNav";
import {
  services,
  customerServices,
  internalServices,
  crossServices,
  serviceTracks,
  type Service,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Total automation for small businesses — website, SEO, reviews, booking, payments, AI chat, staff scheduling, bookkeeping, inventory, and a unified owner dashboard.",
};

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://bizautofy.com";

const servicesJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Bizautofy services",
  itemListElement: services.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: s.title,
    description: s.short,
    url: `${SITE_URL}/services#${s.slug}`,
  })),
};

function ServiceArticle({
  service,
  delay,
}: {
  service: Service;
  delay: number;
}) {
  const Icon = service.icon;
  return (
    <AnimatedSection delay={delay} as="article">
      <article
        id={service.slug}
        className="scroll-mt-28 rounded-3xl border border-foreground/10 bg-card/40 p-8 backdrop-blur-sm sm:p-10"
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 ring-1 ring-inset ring-foreground/10">
              <Icon className="h-5 w-5 text-primary" aria-hidden />
            </div>
            <h3 className="mt-5 font-display text-2xl font-bold tracking-tight sm:text-3xl">
              {service.title}
            </h3>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
              {service.long}
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5 lg:max-w-[200px] lg:justify-end">
            {service.tools.map((t) => (
              <Badge key={t} variant="outline">
                {t}
              </Badge>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground/80">
              What you get
            </p>
            <ul className="mt-4 space-y-2.5">
              {service.deliverables.map((d) => (
                <li
                  key={d}
                  className="flex items-start gap-3 text-sm text-foreground/90"
                >
                  <span className="mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-primary/15 text-primary">
                    <Check className="h-3 w-3" />
                  </span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-foreground/10 bg-background/40 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              The outcome
            </p>
            <p className="mt-3 text-sm leading-relaxed text-foreground/90">
              {service.outcome}
            </p>
            <Button asChild variant="ghost" size="sm" className="mt-5 -ml-3">
              <Link
                href={`/contact?service=${service.slug}`}
                aria-label={`Talk to us about ${service.title}`}
              >
                Talk to us about this
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </div>
      </article>
    </AnimatedSection>
  );
}

// Map the content-layer service lists down to just `{ slug, title }` so the
// client-side scrollspy component receives the minimum payload it needs.
const sideNavGroups: SideNavGroup[] = [
  {
    id: serviceTracks[0].id,
    label: serviceTracks[0].label,
    items: customerServices.map((s) => ({ slug: s.slug, title: s.title })),
  },
  {
    id: serviceTracks[1].id,
    label: serviceTracks[1].label,
    items: internalServices.map((s) => ({ slug: s.slug, title: s.title })),
  },
  ...(crossServices.length > 0
    ? [
        {
          id: "cross",
          label: "One view of both",
          items: crossServices.map((s) => ({
            slug: s.slug,
            title: s.title,
          })),
        },
      ]
    : []),
];

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(servicesJsonLd),
        }}
      />
      <Section spacing="tight" className="pt-12 sm:pt-20">
        <MeshGradient variant="soft" />
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>Services</Eyebrow>
            <h1 className="mt-4 font-display text-5xl font-bold tracking-tight text-balance sm:text-6xl">
              Everything you need.{" "}
              <span className="font-serif italic font-normal gradient-text">
                Nothing you don&apos;t.
              </span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground text-balance">
              Seven tightly integrated pillars across two tracks — front of
              house and back office. Buy them as a package, or pick the one you
              need most.
            </p>
          </div>
        </Container>
      </Section>

      <Section spacing="tight" className="pt-0">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[260px_1fr]">
            {/* Sticky side-nav, grouped by track */}
            <aside className="hidden lg:block">
              <nav
                aria-label="Services on this page"
                className="sticky top-24 space-y-6"
              >
                {serviceTracks.map((track) => {
                  const list =
                    track.id === "customer" ? customerServices : internalServices;
                  return (
                    <div key={track.id} className="border-l border-foreground/10 pl-6">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
                        {track.label}
                      </p>
                      <div className="mt-2 space-y-1">
                        {list.map((s) => (
                          <a
                            key={s.slug}
                            href={`#${s.slug}`}
                            className="block py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                          >
                            {s.title}
                          </a>
                        ))}
                      </div>
                    </div>
                  );
                })}
                {crossServices.length > 0 && (
                  <div className="border-l border-foreground/10 pl-6">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
                      One view of both
                    </p>
                    <div className="mt-2 space-y-1">
                      {crossServices.map((s) => (
                        <a
                          key={s.slug}
                          href={`#${s.slug}`}
                          className="block py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                          {s.title}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </nav>
            </aside>

            <div className="space-y-20">
              {serviceTracks.map((track) => {
                const list =
                  track.id === "customer" ? customerServices : internalServices;
                return (
                  <div key={track.id} className="space-y-12">
                    <AnimatedSection className="border-l-2 border-accent/40 pl-5 sm:pl-6">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                        {track.eyebrow}
                      </p>
                      <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                        {track.label}
                      </h2>
                      <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
                        {track.description}
                      </p>
                    </AnimatedSection>
                    {list.map((service, idx) => (
                      <ServiceArticle
                        key={service.slug}
                        service={service}
                        delay={idx * 0.04}
                      />
                    ))}
                  </div>
                );
              })}

              {crossServices.length > 0 && (
                <div className="space-y-12">
                  <AnimatedSection className="border-l-2 border-accent/40 pl-5 sm:pl-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                      One view of both
                    </p>
                    <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                      Front of house meets back office
                    </h2>
                    <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
                      The dashboard that ties everything together — customer
                      metrics next to operational health, on one screen.
                    </p>
                  </AnimatedSection>
                  {crossServices.map((service, idx) => (
                    <ServiceArticle
                      key={service.slug}
                      service={service}
                      delay={idx * 0.04}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </Container>
      </Section>

      <CTA />
    </>
  );
}
