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
 * Hydration-safe without the usual `mounted` flag: on the server (and on
 * first client render before next-themes' init effect runs) `resolvedTheme`
 * is `undefined`, so we treat that as the dark default. Once next-themes
 * resolves the user's stored / system preference, the component re-renders
 * with the correct state and the icon swap animates via CSS.
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
        className={cn(
          "absolute h-[18px] w-[18px] transition-all duration-300",
          isDark
            ? "opacity-0 scale-50 -rotate-90"
            : "opacity-100 scale-100 rotate-0"
        )}
      />
      <Moon
        aria-hidden="true"
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
