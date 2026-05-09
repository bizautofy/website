import type { Metadata } from "next";
import { Suspense } from "react";
import { Mail, Clock4, ShieldCheck } from "lucide-react";
import { Container, Eyebrow, Section } from "@/components/shared/Container";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { MeshGradient } from "@/components/shared/MeshGradient";
import { ContactForm } from "@/components/forms/ContactForm";
import { brand } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us about your business. We reply to every message within one business day with a calendar link or a written audit offer.",
};

const reassurances = [
  {
    icon: Clock4,
    title: "One business day reply",
    body: "Real human answer, never a chatbot.",
  },
  {
    icon: ShieldCheck,
    title: "We never share your info",
    body: "Your message goes only to us. No data brokers, no email lists.",
  },
  {
    icon: Mail,
    title: "Prefer email?",
    body: brand.contactEmail,
  },
];

export default function ContactPage() {
  return (
    <>
      <Section spacing="tight" className="pt-12 sm:pt-20">
        <MeshGradient variant="soft" />
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>Contact</Eyebrow>
            <h1 className="mt-4 font-display text-5xl font-bold tracking-tight text-balance sm:text-6xl">
              Tell us about your{" "}
              <span className="font-serif italic font-normal gradient-text">
                business.
              </span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground text-balance">
              {brand.responsePromise} We reply with a calendar link or a written
              audit offer — whichever you prefer.
            </p>
          </div>
        </Container>
      </Section>

      <Section spacing="tight" className="pt-0">
        <Container size="narrow">
          <AnimatedSection className="rounded-3xl border border-white/10 bg-card/40 p-8 backdrop-blur-sm sm:p-10">
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              Send us a note
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              The more detail the better. The more we know about your business,
              the better we can scope the right next step — a 15-min fit-check,
              a written audit, or a fast email answer.
            </p>
            <div className="mt-8">
              <Suspense
                fallback={
                  <div className="h-96 animate-pulse rounded-2xl bg-white/[0.03]" />
                }
              >
                <ContactForm />
              </Suspense>
            </div>
          </AnimatedSection>

          <AnimatedSection
            delay={0.1}
            className="mt-8 grid gap-3 sm:grid-cols-3"
          >
            {reassurances.map((r) => {
              const Icon = r.icon;
              return (
                <div
                  key={r.title}
                  className="flex items-start gap-4 rounded-2xl border border-white/10 bg-card/40 p-5 backdrop-blur-sm"
                >
                  <div className="inline-flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-accent/15 text-accent ring-1 ring-inset ring-accent/30">
                    <Icon className="h-4 w-4" aria-hidden />
                  </div>
                  <div>
                    <p className="text-sm font-semibold tracking-tight">
                      {r.title}
                    </p>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {r.body}
                    </p>
                  </div>
                </div>
              );
            })}
          </AnimatedSection>
        </Container>
      </Section>
    </>
  );
}
