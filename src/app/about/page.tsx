import type { Metadata } from "next";
import { Container, Eyebrow, Section } from "@/components/shared/Container";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { MeshGradient } from "@/components/shared/MeshGradient";
import { CTA } from "@/components/home/CTA";
import { about } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Why we built Bizautofy: a small, opinionated team that combines a great website, working Google Business Profile, automatic reviews, online booking, and an AI assistant for small business owners.",
};

export default function AboutPage() {
  return (
    <>
      <Section spacing="tight" className="pt-12 sm:pt-20">
        <MeshGradient variant="soft" />
        <Container size="narrow">
          <AnimatedSection className="text-center">
            <Eyebrow>About</Eyebrow>
            <h1 className="mt-4 font-display text-5xl font-bold tracking-tight text-balance sm:text-6xl">
              {about.founderNote.title}
            </h1>
          </AnimatedSection>
        </Container>
      </Section>

      <Section spacing="tight" className="pt-0">
        <Container size="narrow">
          <AnimatedSection
            delay={0.05}
            className="space-y-6 rounded-3xl border border-white/10 bg-card/40 p-8 backdrop-blur-sm sm:p-12"
          >
            {about.founderNote.body.map((p, i) => (
              <p
                key={i}
                className="text-lg leading-relaxed text-foreground/90"
              >
                {p}
              </p>
            ))}
            <p className="font-serif italic text-muted-foreground">
              {about.founderNote.signoff}
            </p>
          </AnimatedSection>
        </Container>
      </Section>

      <Section>
        <Container>
          <AnimatedSection className="mx-auto max-w-2xl text-center">
            <Eyebrow>What we believe</Eyebrow>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-balance sm:text-5xl">
              Four values.{" "}
              <span className="font-serif italic font-normal gradient-text">
                We take seriously.
              </span>
            </h2>
          </AnimatedSection>

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {about.values.map((v, idx) => {
              const Icon = v.icon;
              return (
                <AnimatedSection
                  key={v.title}
                  delay={idx * 0.05}
                  className="rounded-2xl border border-white/10 bg-card/40 p-7 backdrop-blur-sm"
                >
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-accent/15 ring-1 ring-inset ring-white/10">
                    <Icon className="h-4 w-4 text-primary" aria-hidden />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold tracking-tight">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {v.body}
                  </p>
                </AnimatedSection>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section>
        <Container size="narrow">
          <AnimatedSection className="text-center">
            <Eyebrow>How we work</Eyebrow>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-balance sm:text-5xl">
              Our methodology.
            </h2>
          </AnimatedSection>

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {about.methodology.map((m, idx) => {
              const Icon = m.icon;
              return (
                <AnimatedSection
                  key={m.title}
                  delay={idx * 0.05}
                  className="rounded-2xl border border-white/10 bg-card/40 p-6 backdrop-blur-sm"
                >
                  <Icon className="h-5 w-5 text-accent" aria-hidden />
                  <h3 className="mt-4 text-base font-semibold tracking-tight">
                    {m.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {m.body}
                  </p>
                </AnimatedSection>
              );
            })}
          </div>
        </Container>
      </Section>

      <CTA />
    </>
  );
}
