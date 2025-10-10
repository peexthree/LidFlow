"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";
import { clsx } from "clsx";

import { ANIMATION_CONFIG } from "@/utils/motionPresets";

export interface SplitTextProps {
  text: string;
  by?: "chars" | "words";
  stagger?: number;
  className?: string;
}

export function SplitText({
  text,
  by = "chars",
  stagger = ANIMATION_CONFIG.stagger.default,
  className,
}: SplitTextProps) {
  const shouldReduceMotion = useReducedMotion();

  const units = useMemo(() => {
    if (by === "words") {
      return text
        .split(/(\s+)/)
        .filter((part) => part.trim().length > 0);
    }

    return Array.from(text);
  }, [by, text]);

  if (shouldReduceMotion) {
    return <span className={clsx(className)}>{text}</span>;
  }

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
      },
    },
  };

  const item = {
    hidden: {
      opacity: 0,
      y: 24,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: ANIMATION_CONFIG.durations.default,
        ease: ANIMATION_CONFIG.ease,
      },
    },
  };

  return (
    <motion.span
      className={clsx("split-text", className)}
      variants={container}
      initial="hidden"
      animate="visible"
      data-type={by}
    >
      {units.map((unit, index) => (
        <motion.span key={`${unit}-${index}`} variants={item}>
          {unit}
        </motion.span>
      ))}
    </motion.span>
  );
}