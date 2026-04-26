import { cn } from "@/lib/utils";

interface MeshGradientProps {
  className?: string;
  variant?: "hero" | "soft" | "accent";
}

/**
 * Decorative animated mesh gradient background.
 * Pure CSS — no JS, respects prefers-reduced-motion via globals.css.
 */
export function MeshGradient({ className, variant = "hero" }: MeshGradientProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
    >
      {variant === "hero" && (
        <>
          <div className="absolute -top-40 -left-32 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(167,139,250,0.45),transparent_60%)] blur-3xl float-slow" />
          <div className="absolute top-20 right-[-10%] h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,184,76,0.32),transparent_60%)] blur-3xl float-slow [animation-delay:-3s]" />
          <div className="absolute bottom-[-15%] left-1/3 h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.35),transparent_60%)] blur-3xl float-slow [animation-delay:-6s]" />
          <div className="absolute inset-0 grid-bg opacity-60" />
        </>
      )}
      {variant === "soft" && (
        <>
          <div className="absolute -top-32 left-1/4 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(167,139,250,0.25),transparent_60%)] blur-3xl" />
          <div className="absolute bottom-0 right-1/4 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,184,76,0.18),transparent_60%)] blur-3xl" />
        </>
      )}
      {variant === "accent" && (
        <>
          <div className="absolute -top-20 right-[-10%] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,184,76,0.28),transparent_60%)] blur-3xl float-slow" />
          <div className="absolute -bottom-20 -left-20 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(167,139,250,0.32),transparent_60%)] blur-3xl float-slow [animation-delay:-4s]" />
        </>
      )}
    </div>
  );
}
