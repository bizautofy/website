import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Container, Eyebrow, Section } from "@/components/shared/Container";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { faqs } from "@/lib/content";

export function FAQ() {
  return (
    <Section>
      <Container size="narrow">
        <AnimatedSection className="text-center">
          <Eyebrow>Frequently asked</Eyebrow>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-balance sm:text-5xl">
            Real answers,{" "}
            <span className="font-serif italic font-normal gradient-text">
              before you ask.
            </span>
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.05} className="mt-12">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((f, idx) => (
              <AccordionItem key={f.q} value={`faq-${idx}`}>
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
  );
}
