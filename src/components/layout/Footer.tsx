import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { brand, nav } from "@/lib/content";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-auto border-t border-white/10 bg-background">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr] md:gap-8">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-xs text-sm text-muted-foreground">
            {brand.tagline}
          </p>
          <p className="text-xs text-muted-foreground/70">
            Made for owners. Built in California. Available everywhere.
          </p>
        </div>

        <div className="space-y-3 text-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground/80">
            Site
          </p>
          <ul className="space-y-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3 text-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground/80">
            Get in touch
          </p>
          <ul className="space-y-2">
            <li>
              <a
                href={`mailto:${brand.contactEmail}`}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {brand.contactEmail}
              </a>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Book a free 15-min call
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 px-6 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:px-8">
          <p>
            © {year} {brand.name}. All rights reserved.
          </p>
          <p className="text-muted-foreground/70">
            We use privacy-friendly analytics. No tracking cookies. No selling
            your data. Ever.
          </p>
        </div>
      </div>
    </footer>
  );
}
