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
        setTimeout(onComplete, 500); // Faster exit
      }, 300);
      return;
    }

    const fullText = messages[currentMessage];
    if (!fullText) return;
    let i = 0;
    setText("");

    const typingInterval = setInterval(() => {
      setText(fullText.slice(0, i + 1));
      i++;
      if (i === fullText.length) {
        clearInterval(typingInterval);
        setTimeout(() => setCurrentMessage(prev => prev + 1), 400); // Faster transition
      }
    }, 25); // Faster typing speed

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
            scale: 1.1
          }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#020304] text-[#66FCF1] font-mono overflow-hidden pointer-events-auto"
        >
          {/* Hexagon Grid Background - ReactBits style */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='103.92304845413263' viewBox='0 0 60 103.92304845413263' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 103.92304845413263L0 86.60254037844386L0 51.96152422706631L30 34.64101615137754L60 51.96152422706631L60 86.60254037844386Z' fill='none' stroke='%2366FCF1' stroke-width='1' stroke-opacity='0.5'/%3E%3Cpath d='M30 51.96152422706631L0 34.64101615137754L0 0L30 -17.32050807568877L60 0L60 34.64101615137754Z' fill='none' stroke='%2366FCF1' stroke-width='1' stroke-opacity='0.5'/%3E%3C/svg%3E")`,
            backgroundSize: '60px 103.92px',
            animation: 'slideBg 20s linear infinite'
          }} />

          {/* Abstract geometric background pulses */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(102,252,241,0.2)_0%,_transparent_50%)] animate-pulse" />

          <div className="relative z-10 w-full max-w-3xl px-6 flex flex-col items-center">
            {/* Spinning Loader */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className="mb-8 w-16 h-16 border-t-2 border-r-2 border-[#66FCF1] rounded-full shadow-[0_0_15px_#66FCF1]"
              style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
            />

            <h1 className="text-xl md:text-3xl font-bold tracking-[0.2em] uppercase leading-relaxed h-[3rem] text-center w-full">
              {text}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.6 }}
                className="inline-block w-3 h-[1em] bg-[#66FCF1] ml-2 align-middle shadow-[0_0_10px_#66FCF1]"
              />
            </h1>

            {/* Progress bar line */}
            <div className="mt-8 w-64 h-[2px] bg-white/10 relative overflow-hidden">
                <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: `${((currentMessage + 1) / messages.length) * 100}%` }}
                    transition={{ duration: 0.4 }}
                    className="absolute top-0 left-0 h-full bg-[#66FCF1] shadow-[0_0_10px_#66FCF1]"
                />
            </div>
          </div>

          <style dangerouslySetInnerHTML={{__html: `
            @keyframes slideBg {
              from { background-position: 0 0; }
              to { background-position: 60px 103.92px; }
            }
          `}} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
