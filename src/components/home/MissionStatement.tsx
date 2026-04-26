import { Container, Eyebrow, Section } from "@/components/shared/Container";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { mission } from "@/lib/content";

export function MissionStatement() {
  return (
    <Section spacing="tight">
      <Container size="narrow">
        <AnimatedSection className="text-center">
          <Eyebrow>{mission.eyebrow}</Eyebrow>
          <p className="mt-6 font-display text-2xl font-medium tracking-tight text-balance sm:text-3xl">
            {mission.body}
          </p>
          <blockquote className="mt-10 border-l-2 border-accent pl-6 text-left font-serif text-xl italic text-foreground/90 sm:text-2xl">
            “{mission.pull}”
          </blockquote>
        </AnimatedSection>
      </Container>
    </Section>
  );
}
