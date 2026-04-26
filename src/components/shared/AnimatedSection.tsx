"use client";

import { motion, useReducedMotion } from "framer-motion";
import * as React from "react";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "section" | "article";
}

/**
 * Wrapper that fades + slides children into view on scroll.
 * Respects prefers-reduced-motion: skips motion entirely.
 */
export function AnimatedSection({
  children,
  className,
  delay = 0,
  y = 24,
  as = "div",
}: AnimatedSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    if (as === "section") return <section className={className}>{children}</section>;
    if (as === "article") return <article className={className}>{children}</article>;
    return <div className={className}>{children}</div>;
  }

  const MotionTag =
    as === "section"
      ? motion.section
      : as === "article"
      ? motion.article
      : motion.div;

  return (
    <MotionTag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
