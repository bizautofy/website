"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * Theme provider for the site.
 *
 * Tokens live in globals.css:
 *   :root  -> light theme defaults
 *   .dark  -> dark theme overrides
 *
 * next-themes sets/clears the `dark` class on <html> based on the active
 * theme, persists the user's choice in localStorage, and runs an inline
 * script before paint to avoid a flash of the wrong theme on first load.
 */
export function ThemeProvider(
  props: React.ComponentProps<typeof NextThemesProvider>
) {
  return <NextThemesProvider {...props} />;
}
