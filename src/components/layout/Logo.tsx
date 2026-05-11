import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  withText?: boolean;
}

/**
 * Bizautofy lockup: woven-vesica mark + "bizautofy" wordmark with a flat
 * brand-color underline under "biz".
 *
 * Hybrid approach:
 *   - Mark: inline SVG. Two arcs woven so violet sits in front of amber at the
 *     top crossing and amber stays in front at the bottom crossing.
 *     Stroke colors are driven by `--brand-mark-violet` / `--brand-mark-amber`
 *     (defined per theme in globals.css) so the duotone deepens on the light
 *     cream background instead of washing out.
 *   - Wordmark: real HTML text in `text-foreground` so it inherits the page font
 *     and stays crisp at any zoom/dpi, plus adapts to light/dark themes.
 */
export function Logo({ className, withText = true }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="Bizautofy home"
      className={cn(
        "group inline-flex items-center gap-2 font-display tracking-tight",
        className
      )}
    >
      <Mark
        className={cn(
          // Icon-only stays compact at 40px square.
          // With wordmark, the mark is sized so the visible frame
          // extends ~10px above the cap-top and ~10px below the baseline
          // of the text-2xl wordmark (round caps factored in).
          withText ? "h-14 w-14 shrink-0" : "h-10 w-10 shrink-0"
        )}
      />
      {withText && (
        <span className="text-2xl font-bold leading-none tracking-tight text-foreground">
          <span className="relative inline-block">
            biz
            <span
              aria-hidden="true"
              className="absolute inset-x-0 -bottom-0.5 h-[2px] rounded-full bg-primary"
            />
          </span>
          autofy
        </span>
      )}
    </Link>
  );
}

function Mark({ className }: { className?: string }) {
  return (
    <svg
      role="img"
      aria-label="Bizautofy"
      viewBox="0 0 128 128"
      className={className}
    >
      {/*
        Woven vesica:
          1) Full violet arc (gets covered by amber at both crossings)
          2) Full amber arc on top
          3) Upper half of violet redrawn on top -> violet sits in front of
             amber at the TOP crossing only; amber stays in front at the
             BOTTOM crossing.
        Stroke colors come from CSS vars so the duotone re-tunes per theme.
      */}
      <g strokeWidth="9" fill="none" strokeLinecap="round">
        <path
          d="M 38 24 A 36 36 0 0 1 38 104"
          className="stroke-brand-violet"
        />
        <path
          d="M 90 24 A 36 36 0 0 0 90 104"
          className="stroke-brand-amber"
        />
        <path
          d="M 38 24 A 40 40 0 0 1 78 64"
          className="stroke-brand-violet"
        />
      </g>
    </svg>
  );
}
