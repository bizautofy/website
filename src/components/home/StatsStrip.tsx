import { Container, Eyebrow, Section } from "@/components/shared/Container";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { stats } from "@/lib/content";

export function StatsStrip() {
  return (
    <Section spacing="tight">
      <Container>
        <AnimatedSection className="mx-auto max-w-2xl text-center">
          <Eyebrow>Why this matters</Eyebrow>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            The numbers small business owners cannot ignore.
          </h2>
        </AnimatedSection>

        <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] sm:grid-cols-4">
          {stats.map((stat, idx) => (
            <AnimatedSection
              key={stat.label}
              delay={idx * 0.05}
              className="relative bg-background p-8"
            >
              <div className="font-display text-4xl font-bold tracking-tight gradient-text">
                {stat.value}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {stat.label}
              </p>
            </AnimatedSection>
          ))}
        </div>

        <ol className="mt-6 space-y-1 text-xs text-muted-foreground/70">
          {stats.map((s, i) => (
            <li key={s.sourceUrl}>
              <span className="font-mono">[{i + 1}]</span>{" "}
              <a
                href={s.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-4 hover:text-foreground hover:underline"
              >
                {s.source}
              </a>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
