import { cn } from "@/lib/utils";

interface MeshGradientProps {
  className?: string;
  variant?: "hero" | "soft" | "accent";
}

/**
 * Decorative section backdrop.
 *
 * Originally rendered floating violet/amber radial-gradient blobs to give
 * each section a soft mesh-gradient feel. Flattened per design direction:
 *   - "hero":   keeps the subtle dotted-grid texture only
 *   - "soft" / "accent": render nothing
 *
 * Kept as a component (rather than removing usages) so any future reintroduction
 * of section backdrops only needs to change this file.
 */
export function MeshGradient({ className, variant = "hero" }: MeshGradientProps) {
  if (variant !== "hero") return null;

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
    >
      <div className="absolute inset-0 grid-bg opacity-60" />
    </div>
  );
}
