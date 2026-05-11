import * as React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "outline" | "accent";
}

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium tracking-tight",
        variant === "default" &&
          "bg-primary/10 text-primary border border-primary/20",
        variant === "outline" &&
          "bg-foreground/5 text-muted-foreground border border-foreground/10",
        variant === "accent" &&
          "bg-accent/15 text-accent border border-accent/25",
        className
      )}
      {...props}
    />
  );
}
