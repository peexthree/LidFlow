"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const messages = [
  "Анализ профиля...",
  "Синхронизация с нейроматрицей...",
  "Доступ разрешен."
];

export function AssimilationScreen({ onComplete }: { onComplete: () => void }) {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [text, setText] = useState("");
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (currentMessage >= messages.length) {
      setTimeout(() => {
        setIsVisible(false);
        setTimeout(onComplete, 800); // Wait for exit animation
      }, 500);
      return;
    }

    const fullText = messages[currentMessage];
    if (!fullText) return;
    let i = 0;
    setText(""); // Reset text for new line

    const typingInterval = setInterval(() => {
      setText(fullText.slice(0, i + 1));
      i++;
      if (i === fullText.length) {
        clearInterval(typingInterval);
        setTimeout(() => setCurrentMessage(prev => prev + 1), 800);
      }
    }, 40); // Fast typing speed

    return () => clearInterval(typingInterval);
  }, [currentMessage, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="assimilation"
          initial={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", opacity: 1 }}
          exit={{
            clipPath: "polygon(50% 50%, 50% 0, 100% 50%, 50% 100%, 0 50%, 50% 0)",
            opacity: 0,
            scale: 1.2
          }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#020304] text-[#66FCF1] font-mono overflow-hidden pointer-events-auto"
        >
          {/* Abstract geometric background pulses */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(102,252,241,0.15)_0%,_transparent_60%)] animate-pulse-soft" />

          <div className="relative z-10 w-full max-w-3xl px-6 text-center">
            <h1 className="text-xl md:text-3xl font-bold tracking-[0.2em] uppercase leading-relaxed h-[3rem]">
              {text}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-4 h-[1em] bg-[#66FCF1] ml-3 align-middle shadow-[0_0_15px_#66FCF1]"
              />
            </h1>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
