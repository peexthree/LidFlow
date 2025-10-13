"use client";

import { MotionConfig } from "framer-motion";
import { type ReactNode, useMemo } from "react";

interface MotionProviderProps {
    children: ReactNode;
}

export function MotionProvider({ children }: MotionProviderProps) {
    // 🧩 Motion System: единый transition по всему приложению
    const transition = useMemo(
        () => ({ duration: 0.9, ease: [0.22, 1, 0.36, 1] as const }),
        [],
    );

    return (
        <MotionConfig reducedMotion="user" transition={transition}>
            {children}
        </MotionConfig>
    );
}