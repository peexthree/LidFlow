'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function SmartScarcity() {
  const [slots, setSlots] = useState<number | null>(null);
  const [loadingPercent, setLoadingPercent] = useState(87);

  useEffect(() => {
    // Симуляция умного дефицита на основе localStorage
    const savedData = localStorage.getItem('lidflow_scarcity');
    const now = new Date().getTime();

    if (savedData) {
      const { timestamp, currentSlots } = JSON.parse(savedData);
      // Если прошло больше 2 дней, слотов стало меньше
      if (now - timestamp > 172800000 && currentSlots > 1) {
        setSlots(1);
        setLoadingPercent(98);
        localStorage.setItem('lidflow_scarcity', JSON.stringify({ timestamp: now, currentSlots: 1 }));
      } else {
        setSlots(currentSlots);
        setLoadingPercent(currentSlots === 1 ? 98 : 92);
      }
    } else {
      // Первый визит - 2 места
      setSlots(2);
      setLoadingPercent(92);
      localStorage.setItem('lidflow_scarcity', JSON.stringify({ timestamp: now, currentSlots: 2 }));
    }
  }, []);

  if (slots === null) return null;

  return (
    <div className="w-full max-w-sm mx-auto mt-8 p-4 border border-red-500/30 bg-red-950/20 backdrop-blur-sm rounded-sm relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-red-500/10">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${loadingPercent}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="h-full bg-red-500/80 shadow-[0_0_10px_rgba(239,68,68,0.8)]"
        />
      </div>

      <div className="flex justify-between items-center text-xs font-mono uppercase tracking-wider mb-2 text-red-400">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          Текущая загрузка: {loadingPercent}%
        </span>
        <span>Осталось мест: {slots}</span>
      </div>

      <p className="text-slate-300 text-xs">
        {slots === 1
          ? "> ВНИМАНИЕ: Последний слот. Бронирование закроется в любой момент."
          : "> Ограниченная пропускная способность. Принимаем только 2 проекта в месяц."}
      </p>
    </div>
  );
}
