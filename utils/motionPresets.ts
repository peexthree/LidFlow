import type { Variants } from "framer-motion";

export type Direction = "up" | "down" | "left" | "right" | "none";
export type MotionType = "fade" | "fade-slide" | "scale" | "rotate" | "blur" | "mask-reveal" | "lift" | "tilt";

export interface MotionPresetOptions {
  direction?: Direction;
  distance?: number;
  rotation?: number;
}

export const ANIMATION_CONFIG = {
  distance: 48,
  mobileDistanceFactor: 0.75,
  durations: {
    default: 0.9,
    min: 0.6,
    max: 1.4,
  },
  ease: [0.22, 1, 0.36, 1] as const,
  maskEase: [0.33, 1, 0.68, 1] as const,
  // 🧩 Motion Timing: единые настройки пружины для hover/scroll эффектов
  spring: { stiffness: 120, damping: 18, mass: 0.4 },
  stagger: {
    default: 0.045,
    fast: 0.018,
    slow: 0.085,
  },
};

const directionVector: Record<Exclude<Direction, "none">, { x: number; y: number }> = {
  up: { x: 0, y: 1 },
  down: { x: 0, y: -1 },
  left: { x: 1, y: 0 },
  right: { x: -1, y: 0 },
};

const resolveOffset = (direction: Direction = "up", distance = ANIMATION_CONFIG.distance) => {
  if (direction === "none") {
    return { x: 0, y: 0 };
  }

  const vector = directionVector[direction] ?? directionVector.up;
  return {
    x: vector.x * distance,
    y: vector.y * distance,
  };
};

const resolveRotation = (direction: Direction = "up", amount = 6) => {
  if (direction === "none") {
    return amount;
  }

  const sign = direction === "left" || direction === "up" ? -1 : 1;
  return sign * amount;
};

const fade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const fadeSlide = ({ direction, distance }: MotionPresetOptions): Variants => {
  const offset = resolveOffset(direction, distance);
  return {
    hidden: { opacity: 0, x: offset.x, y: offset.y },
    visible: { opacity: 1, x: 0, y: 0 },
  };
};

const scale = (): Variants => ({
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1 },
});

const rotate = ({ direction, rotation }: MotionPresetOptions): Variants => {
  const degrees = resolveRotation(direction, rotation);
  return {
    hidden: { opacity: 0, rotateZ: degrees },
    visible: { opacity: 1, rotateZ: 0 },
  };
};

const blur = ({ direction, distance }: MotionPresetOptions): Variants => {
  const offset = resolveOffset(direction, distance);
  return {
    hidden: { opacity: 0, filter: "blur(8px)", x: offset.x, y: offset.y },
    visible: { opacity: 1, filter: "blur(0px)", x: 0, y: 0 },
  };
};

const maskReveal = (): Variants => ({
  hidden: {
    opacity: 0,
    clipPath: "inset(0% 0% 100% 0%)",
    filter: "blur(6px)",
  },
  visible: {
    opacity: 1,
    clipPath: "inset(0% 0% 0% 0%)",
    filter: "blur(0px)",
  },
});

const lift = (): Variants => ({
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1 },
});

const tilt = ({ direction, distance }: MotionPresetOptions): Variants => {
  const offset = resolveOffset(direction, ((distance ?? ANIMATION_CONFIG.distance) / 2));
  return {
    hidden: { opacity: 0, rotateX: 6, rotateY: -6, x: offset.x, y: offset.y },
    visible: { opacity: 1, rotateX: 0, rotateY: 0, x: 0, y: 0 },
  };
};

export const motionPresets: Record<MotionType, (options: MotionPresetOptions) => Variants> = {
  fade: () => fade,
  "fade-slide": (options) => fadeSlide(options),
  scale: () => scale(),
  rotate: (options) => rotate(options),
  blur: (options) => blur(options),
  "mask-reveal": () => maskReveal(),
  lift: () => lift(),
  tilt: (options) => tilt(options),
};

export const getMotionVariants = (
  type: MotionType,
  options: MotionPresetOptions = {},
): Variants => {
  return motionPresets[type](options);
};