"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Sticky side-nav for the Services page (desktop ≥ lg only).
 *
 * Server-rendered as a plain list of anchor links — no JS needed for the
 * initial paint. After hydration, an IntersectionObserver tracks which
 * `<article id={slug}>` is currently the topmost section past the sticky
 * navbar and highlights the matching link.
 *
 * Tuning:
 *   - The page navbar is `sticky top-0 h-16` (64px) and this nav is
 *     `sticky top-24` (96px), so the active "trip line" sits at ~100px
 *     below the viewport top — just past where content stops being
 *     occluded by the navbar.
 *   - `rootMargin: "-100px 0px -65% 0px"` means a section is considered
 *     active when its top edge lands between 100px and ~35%-of-viewport
 *     from the top. That matches the natural reading position.
 *   - We never reset to `null` after the first match, so the last
 *     section stays highlighted while the user reads the closing CTA
 *     (otherwise the highlight would drop off mid-scroll, which feels
 *     broken).
 *
 * Accessibility: the active link gets `aria-current="true"` so screen
 * readers can announce position. Initial server render has no active
 * link, which matches the first-paint client render — no hydration
 * mismatch.
 */

export interface SideNavItem {
  slug: string;
  title: string;
}

export interface SideNavGroup {
  id: string;
  label: string;
  items: SideNavItem[];
}

interface ServicesSideNavProps {
  groups: SideNavGroup[];
}

export function ServicesSideNav({ groups }: ServicesSideNavProps) {
  const [activeSlug, setActiveSlug] = React.useState<string | null>(null);

  React.useEffect(() => {
    const slugs = groups.flatMap((g) => g.items.map((i) => i.slug));
    const targets = slugs
      .map((slug) => document.getElementById(slug))
      .filter((el): el is HTMLElement => el !== null);

    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Take the topmost intersecting article as "active". If nothing
        // intersects (e.g. the user scrolled past the last section into
        // the closing CTA), keep the previous active — don't reset.
        const intersecting = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              a.boundingClientRect.top - b.boundingClientRect.top
          );

        if (intersecting.length > 0) {
          setActiveSlug(intersecting[0].target.id);
        }
      },
      {
        rootMargin: "-100px 0px -65% 0px",
        threshold: 0,
      }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [groups]);

  return (
    <aside className="hidden lg:block">
      <nav
        aria-label="Services on this page"
        className="sticky top-24 space-y-6"
      >
        {groups.map((group) => (
          <div
            key={group.id}
            className="border-l border-foreground/10 pl-6"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
              {group.label}
            </p>
            <div className="mt-2 space-y-1">
              {group.items.map((item) => {
                const isActive = activeSlug === item.slug;
                return (
                  <a
                    key={item.slug}
                    href={`#${item.slug}`}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "block py-1.5 text-sm transition-colors",
                      isActive
                        ? "text-primary font-semibold"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {item.title}
                  </a>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
