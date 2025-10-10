"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useMemo } from "react";
import { clsx } from "clsx";

import {
  ANIMATION_CONFIG,
  getMotionVariants,
  type Direction,
  type MotionType,
} from "@/utils/motionPresets";
import { useMediaQuery } from "@/utils/useMediaQuery";

export interface AnimatedSectionProps {
  children: React.ReactNode;
  motion?: MotionType;
  direction?: Direction;
  duration?: number;
  delay?: number;
  threshold?: number;
  once?: boolean;
  className?: string;
}

export function AnimatedSection({
  children,
  motion: motionType = "fade",
  direction = "up",
  duration = ANIMATION_CONFIG.durations.default,
  delay = 0,
  threshold = 0.2,
  once = true,
  className,
}: AnimatedSectionProps) {
  const shouldReduceMotion = useReducedMotion();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const { ref, inView } = useInView({
    threshold,
    triggerOnce: once,
  });

  const variants = useMemo(() => {
    const distance = ANIMATION_CONFIG.distance * (isMobile ? ANIMATION_CONFIG.mobileDistanceFactor : 1);
    const rotation = 6 * (isMobile ? ANIMATION_CONFIG.mobileDistanceFactor : 1);

    return getMotionVariants(motionType, { direction, distance, rotation });
  }, [direction, isMobile, motionType]);

  const animationDuration = useMemo(() => {
    const base = Math.min(Math.max(duration, ANIMATION_CONFIG.durations.min), ANIMATION_CONFIG.durations.max);
    return base * (isMobile ? ANIMATION_CONFIG.mobileDistanceFactor : 1);
  }, [duration, isMobile]);

  if (shouldReduceMotion) {
    return (
      <section ref={ref} className={clsx(className)}>
        {children}
      </section>
    );
  }

  return (
    <motion.section
      ref={ref}
      className={clsx("will-change-transform", className)}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      transition={{
        duration: animationDuration,
        delay,
        ease: motionType === "mask-reveal" ? ANIMATION_CONFIG.maskEase : ANIMATION_CONFIG.ease,
      }}
    >
      {children}
    </motion.section>
  );
}