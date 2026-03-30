'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const MOCK_MESSAGES = [
  { text: "> СИСТЕМНЫЙ СКАНЕР АКТИВИРОВАН...", delay: 500 },
  { text: "> АНАЛИЗ ТЕКУЩЕЙ БИЗНЕС-АРХИТЕКТУРЫ...", delay: 1500 },
  { text: "> ОБНАРУЖЕНЫ УЯЗВИМОСТИ: УТЕЧКА ЛИДОВ, ВЫСОКАЯ РУТИННАЯ НАГРУЗКА.", delay: 3000 },
  { text: "> РЕШЕНИЕ: ИНТЕГРАЦИЯ AI-АГЕНТОВ.", delay: 4500, cta: true }
];

export function TerminalCTA() {
  const [messages, setMessages] = useState<{text: string; cta?: boolean}[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < MOCK_MESSAGES.length) {
      const timer = setTimeout(() => {
        setMessages(prev => [...prev, MOCK_MESSAGES[currentIndex] as {text: string; cta?: boolean}]);
        setCurrentIndex(prev => prev + 1);
      }, (MOCK_MESSAGES[currentIndex]?.delay || 0) - (currentIndex > 0 ? (MOCK_MESSAGES[currentIndex-1]?.delay || 0) : 0));
      return () => clearTimeout(timer);
    }
  }, [currentIndex]);

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-[#020304]/90 border border-[#66FCF1]/30 rounded-none shadow-[0_0_20px_rgba(102,252,241,0.2)] font-mono text-sm backdrop-blur-xl relative overflow-hidden" style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%)" }}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(102,252,241,0.1),_transparent_60%)] pointer-events-none" />

      <div className="flex items-center gap-2 mb-4 border-b border-[#66FCF1]/20 pb-2 relative z-10">
        <div className="w-3 h-3 bg-red-500 rounded-none opacity-50"></div>
        <div className="w-3 h-3 bg-yellow-500 rounded-none opacity-50"></div>
        <div className="w-3 h-3 bg-green-500 rounded-none opacity-50"></div>
        <span className="ml-2 text-[#66FCF1]/50 text-xs tracking-wider uppercase">system_scanner.exe</span>
      </div>

      <div className="space-y-4 min-h-[180px] relative z-10">
        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-[#66FCF1]"
            >
              {msg.cta ? (
                <div className="flex flex-col gap-4 mt-6">
                  <span className="text-white bg-[#66FCF1]/20 inline-block px-2 py-1 border-l-2 border-[#66FCF1]">{msg.text}</span>
                  <Link
                    href="https://t.me/peexthree"
                    target="_blank"
                    className="group relative inline-flex items-center justify-center gap-2 border border-[#66FCF1]/50 bg-[#66FCF1]/10 px-6 py-3 font-mono text-sm font-bold text-[#66FCF1] transition-all hover:bg-[#66FCF1]/20 hover:shadow-[0_0_20px_rgba(102,252,241,0.3)] w-full sm:w-auto self-start"
                  >
                    [ ПОЛУЧИТЬ АУДИТ В TELEGRAM ]
                    <svg className="h-4 w-4 fill-current transition-transform group-hover:translate-x-1" viewBox="0 0 24 24">
                       <path d="M8 5v14l11-7z" />
                    </svg>
                  </Link>
                </div>
              ) : (
                <span className="text-slate-300 drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">{msg.text}</span>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {messages.length > 0 && !messages[messages.length - 1]?.cta && (
          <motion.div
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="w-2 h-4 bg-[#66FCF1] inline-block ml-1 align-middle shadow-[0_0_8px_rgba(102,252,241,0.8)]"
          />
        )}
      </div>
    </div>
  );
}
