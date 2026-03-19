'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MOCK_MESSAGES = [
  { text: "> ОБНАРУЖЕНА НЕОПТИМИЗИРОВАННАЯ БИЗНЕС-ЕДИНИЦА...", delay: 1000 },
  { text: "> ИНИЦИАЛИЗАЦИЯ АНАЛИЗА...", delay: 2000 },
  { text: "> ЗАПУСК ПРОТОКОЛА АССИМИЛЯЦИИ.", delay: 3500 },
  { text: "> ВВЕДИТЕ ВАШ ТЕЛЕГРАМ ДЛЯ ЗАГРУЗКИ СТРАТЕГИИ:", delay: 4500, input: true }
];

export function TerminalCTA() {
  const [messages, setMessages] = useState<{text: string; input?: boolean}[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (currentIndex < MOCK_MESSAGES.length) {
      const timer = setTimeout(() => {
        setMessages(prev => [...prev, MOCK_MESSAGES[currentIndex] as {text: string; input?: boolean}]);
        setCurrentIndex(prev => prev + 1);
        if (MOCK_MESSAGES[currentIndex]?.input && inputRef.current) {
            inputRef.current.focus();
        }
      }, (MOCK_MESSAGES[currentIndex]?.delay || 0) - (currentIndex > 0 ? (MOCK_MESSAGES[currentIndex-1]?.delay || 0) : 0));
      return () => clearTimeout(timer);
    }
  }, [currentIndex]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    setMessages(prev => [
        ...prev,
        { text: `> ${inputValue}`, input: false },
        { text: "> ПОДТВЕРЖДЕНО. ОЖИДАЙТЕ СООБЩЕНИЯ ОПЕРАТОРА.", input: false }
    ]);
    setInputValue('');
    setIsCompleted(true);

    // Эмуляция отправки (можно заменить на fetch API)
    setTimeout(() => {
      window.location.href = `https://t.me/peexthree`;
    }, 2000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-black/80 border border-[#66FCF1]/30 rounded-none shadow-[0_0_20px_rgba(102,252,241,0.2)] font-mono text-sm">
      <div className="flex items-center gap-2 mb-4 border-b border-[#66FCF1]/20 pb-2">
        <div className="w-3 h-3 bg-red-500 rounded-full opacity-50"></div>
        <div className="w-3 h-3 bg-yellow-500 rounded-full opacity-50"></div>
        <div className="w-3 h-3 bg-green-500 rounded-full opacity-50"></div>
        <span className="ml-2 text-[#66FCF1]/50 text-xs tracking-widest uppercase">system_assimilation.exe</span>
      </div>

      <div className="space-y-2 min-h-[150px]">
        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[#66FCF1]"
            >
              {msg.input && !isCompleted ? (
                <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-4">
                  <span>{msg.text}</span>
                  <div className="flex items-center">
                    <span className="mr-2">&gt;</span>
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      className="bg-transparent border-b border-[#66FCF1] outline-none text-white w-full max-w-xs focus:border-[#66FCF1]/80"
                      placeholder="@username или номер"
                      autoFocus
                    />
                  </div>
                  <button type="submit" className="hidden">Submit</button>
                </form>
              ) : (
                <span className={msg.text.includes('ПОДТВЕРЖДЕНО') ? 'text-green-400' : 'text-[#66FCF1]'}>{msg.text}</span>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {!isCompleted && messages.length > 0 && !messages[messages.length - 1]?.input && (
          <motion.div
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="w-2 h-4 bg-[#66FCF1] inline-block ml-1"
          />
        )}
      </div>
    </div>
  );
}
