import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, fadeIn, scaleIn, stagger } from "@/lib/anim";

type RevealProps = {
  children: React.ReactNode;
  variant?: "fadeUp" | "fadeIn" | "scaleIn";
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "span";
  amount?: number;
  once?: boolean;
};

const variants = { fadeUp, fadeIn, scaleIn };

/** Fade/slide an element in as it scrolls into view. Respects reduced-motion. */
export function Reveal({
  children,
  variant = "fadeUp",
  delay = 0,
  className,
  as = "div",
  amount = 0.3,
  once = true,
}: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      variants={variants[variant]}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}

/** Wraps children in a stagger container; each direct <Reveal> child animates in sequence. */
export function RevealGroup({
  children,
  className,
  gap = 0.12,
  delay = 0,
  amount = 0.2,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  gap?: number;
  delay?: number;
  amount?: number;
  as?: "div" | "section" | "ul";
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      variants={stagger(gap, delay)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
    >
      {children}
    </MotionTag>
  );
}
