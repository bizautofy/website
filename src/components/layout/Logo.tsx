import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  withText?: boolean;
}

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
      <span
        aria-hidden="true"
        className="relative grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-primary via-violet-400 to-accent shadow-[0_8px_24px_-8px_rgba(167,139,250,0.7)]"
      >
        <span className="absolute inset-[2px] rounded-md bg-background" />
        <span className="relative text-sm font-bold text-foreground">b</span>
      </span>
      {withText && (
        <span className="text-lg font-semibold text-foreground">
          bizautofy
        </span>
      )}
    </Link>
  );
}
