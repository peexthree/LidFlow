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
    <div className="w-full max-w-2xl mx-auto p-6 bg-[#e8eaf0]/90 shadow-neo-raised rounded-2xl border-none  font-mono text-sm  relative overflow-hidden" >
      <div className="absolute inset-0  pointer-events-none" />

      <div className="flex items-center gap-2 mb-4 border-b border-slate-300 pb-2 relative z-10">
        <div className="w-3 h-3 bg-red-500 rounded-none opacity-50"></div>
        <div className="w-3 h-3 bg-yellow-500 rounded-none opacity-50"></div>
        <div className="w-3 h-3 bg-green-500 rounded-none opacity-50"></div>
        <span className="ml-2 text-brand-600/50 text-xs tracking-wider uppercase">system_scanner.exe</span>
      </div>

      <div className="space-y-4 min-h-[180px] relative z-10">
        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-brand-600"
            >
              {msg.cta ? (
                <div className="flex flex-col gap-4 mt-6">
                  <span className="text-slate-900 bg-brand-400/20 inline-block px-2 py-1 ">{msg.text}</span>
                  <Link
                    href="https://t.me/peexthree"
                    target="_blank"
                    className="group relative inline-flex items-center justify-center gap-2 shadow-neo-raised rounded-xl bg-[#e8eaf0] border-none px-6 py-3 font-mono text-sm font-bold text-brand-600 transition-all hover:bg-brand-400/20 hover: w-full sm:w-auto self-start"
                  >
                    [ ПОЛУЧИТЬ АУДИТ В TELEGRAM ]
                    <svg className="h-4 w-4 fill-current transition-transform group-hover:translate-x-1" viewBox="0 0 24 24">
                       <path d="M8 5v14l11-7z" />
                    </svg>
                  </Link>
                </div>
              ) : (
                <span className="text-slate-600 drop-">{msg.text}</span>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {messages.length > 0 && !messages[messages.length - 1]?.cta && (
          <motion.div
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="w-2 h-4 bg-brand-400 inline-block ml-1 align-middle "
          />
        )}
      </div>
    </div>
  );
}
