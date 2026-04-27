import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MeshGradient } from "@/components/shared/MeshGradient";
import { Container } from "@/components/shared/Container";
import { brand, hero } from "@/lib/content";

export function Hero() {
  const [before, after] = hero.title.split(hero.highlight);
  return (
    <section className="relative overflow-hidden pt-12 pb-24 sm:pt-20 sm:pb-32">
      <MeshGradient variant="hero" />
      <Container>
        <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-tight text-foreground/90 backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-accent" aria-hidden />
            <span>{hero.eyebrow}</span>
          </div>

          <h1 className="mt-8 font-display text-5xl font-bold tracking-tight text-balance sm:text-6xl md:text-7xl">
            {before}
            <span className="font-serif italic font-normal gradient-text">
              {hero.highlight}
            </span>
            {after}
          </h1>

          <p className="mt-6 max-w-2xl font-serif text-xl italic text-foreground/85 text-balance sm:text-2xl">
            {brand.tagline}
          </p>

          <p className="mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg text-balance">
            {hero.subtitle}
          </p>

          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href={hero.primaryCta.href}>
                {hero.primaryCta.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href={hero.secondaryCta.href}>
                {hero.secondaryCta.label}
              </Link>
            </Button>
          </div>

          <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
            {hero.trustStrip.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span
                  aria-hidden
                  className="h-1 w-1 rounded-full bg-accent"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
