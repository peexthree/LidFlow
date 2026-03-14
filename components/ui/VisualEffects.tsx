"use client";

import { motion } from "framer-motion";

export function FloatingOrbs() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -left-[10%] -top-[10%] h-[40%] w-[40%] rounded-full bg-cyan-500/10 blur-[120px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute -right-[10%] top-[40%] h-[30%] w-[30%] rounded-full bg-indigo-500/10 blur-[100px]"
      />
    </div>
  );
}
