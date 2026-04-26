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
    "Book a free 15-minute call or send us a note. We reply to every message within one business day.",
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
              {brand.responsePromise} Or book a free 15-minute call directly.
            </p>
          </div>
        </Container>
      </Section>

      <Section spacing="tight" className="pt-0">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
            <AnimatedSection className="rounded-3xl border border-white/10 bg-card/40 p-8 backdrop-blur-sm sm:p-10">
              <h2 className="font-display text-2xl font-semibold tracking-tight">
                Send us a note
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                The more detail the better. We will reply with a written audit
                offer or a calendar link — whichever you prefer.
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

            <div className="space-y-4">
              <AnimatedSection
                delay={0.05}
                className="rounded-3xl border border-white/10 bg-card/40 p-8 backdrop-blur-sm"
              >
                <h2 className="font-display text-2xl font-semibold tracking-tight">
                  Or book a 15-min call
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Pick a time directly. We will come prepared — please share
                  your business URL when you book.
                </p>
                <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-background/60">
                  {/*
                    Calendly embed placeholder. Replace
                    `BIZAUTOFY_CALENDLY_URL` with your real Calendly username.
                  */}
                  <iframe
                    title="Book a free 15-minute call with Bizautofy"
                    src="https://calendly.com/bizautofy/intro?embed_domain=bizautofy.com&hide_landing_page_details=1&background_color=08061a&text_color=f0f0fa&primary_color=a78bfa"
                    loading="lazy"
                    className="h-[640px] w-full"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
                  />
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.1} className="grid gap-3">
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
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
