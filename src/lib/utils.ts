import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export const SITE = {
  name: "Bizautofy",
  domain: "bizautofy.com",
  url: "https://bizautofy.com",
  tagline:
    "Modern web presence and smart automation for small businesses.",
} as const;
