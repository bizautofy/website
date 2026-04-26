import { Hero } from "@/components/home/Hero";
import { MissionStatement } from "@/components/home/MissionStatement";
import { BentoFeatures } from "@/components/home/BentoFeatures";
import { HowItWorks } from "@/components/home/HowItWorks";
import { StatsStrip } from "@/components/home/StatsStrip";
import { FoundingProgram } from "@/components/home/FoundingProgram";
import { FAQ } from "@/components/home/FAQ";
import { CTA } from "@/components/home/CTA";
import { faqs } from "@/lib/content";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.a,
    },
  })),
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd),
        }}
      />
      <Hero />
      <MissionStatement />
      <BentoFeatures />
      <HowItWorks />
      <StatsStrip />
      <FoundingProgram />
      <FAQ />
      <CTA />
    </>
  );
}
