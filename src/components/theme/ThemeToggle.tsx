"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

/**
 * Sun/moon button that flips between light and dark.
 *
 * Why no `mounted` flag: hiding the toggle until mount creates its own visible
 * pop. Instead we render the dark-default variant on the server and let the
 * client re-render with the resolved theme after hydration. The `className`
 * on the button and on each icon WILL differ between server and client when
 * the resolved theme is "light", so we mark all three nodes with
 * `suppressHydrationWarning` — this is exactly the kind of "intentional
 * server/client divergence" that prop is designed for. Note that
 * `suppressHydrationWarning` does NOT cascade to children, so each icon
 * needs the prop directly even though the parent button has it too.
 */
export function ThemeToggle({ className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme !== "light"; // undefined or "dark" -> dark
  const nextLabel = isDark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={nextLabel}
      title={nextLabel}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      suppressHydrationWarning
      className={cn(
        "relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-foreground/10 bg-foreground/5 text-foreground transition-colors hover:bg-foreground/10",
        className
      )}
    >
      <Sun
        aria-hidden="true"
        suppressHydrationWarning
        className={cn(
          "absolute h-[18px] w-[18px] transition-all duration-300",
          isDark
            ? "opacity-0 scale-50 -rotate-90"
            : "opacity-100 scale-100 rotate-0"
        )}
      />
      <Moon
        aria-hidden="true"
        suppressHydrationWarning
        className={cn(
          "absolute h-[18px] w-[18px] transition-all duration-300",
          isDark
            ? "opacity-100 scale-100 rotate-0"
            : "opacity-0 scale-50 rotate-90"
        )}
      />
    </button>
  );
}
