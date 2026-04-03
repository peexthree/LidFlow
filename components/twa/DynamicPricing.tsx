"use client";

import { usePricingStore, PRICING_STEPS } from "@/store/usePricingStore";
import { motion, animate, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

function RunningNumber({ value }: { value: number }) {
  const count = useMotionValue(0);
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    const animation = animate(count, value, {
      duration: 1.5,
      ease: "circOut",
      onUpdate: (latest) => {
        setDisplayValue(Math.floor(latest).toLocaleString("ru-RU"));
      }
    });
    return animation.stop;
  }, [value, count]);

  return <span>{displayValue} ₽</span>;
}

export function DynamicPricing() {
  const { currentStepIndex, selectedOptions, totalPrice, isComplete, selectOption, nextStep, reset } = usePricingStore();
  const step = PRICING_STEPS[currentStepIndex];

  if (isComplete) {
    const generateTelegramLink = () => {
      let message = "🔥 Запрос на разработку (Архитектура LIDFLOW)\n\n";
      PRICING_STEPS.forEach(step => {
        const selectedIds = selectedOptions[step.id] || [];
        if (selectedIds.length > 0) {
          message += `\n💡 ${step.question}\n`;
          selectedIds.forEach(id => {
            const opt = step.options.find(o => o.id === id);
            if (opt) {
              message += `  - ${opt.label} (${opt.price.toLocaleString("ru-RU")} ₽)\n`;
            }
          });
        }
      });
      message += `\n💰 Оценочный бюджет: ${totalPrice.toLocaleString("ru-RU")} ₽\n\nГотов обсудить детали интеграции.`;

      return `https://t.me/peexthree?text=${encodeURIComponent(message)}`;
    };

    return (
      <div className="relative overflow-hidden border border-[#66FCF1]/30 bg-[#e8eaf0] p-8 md:p-12 " >
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-400 opacity-5 blur-[80px]" />
        <h3 className="text-2xl font-mono text-brand-600 mb-6">Анализ завершен</h3>
        <p className="text-slate-600 mb-8">Сформирован оптимальный вектор масштабирования вашей системы.</p>

        <div className="mb-8 p-6 bg-white/[0.02] border border-white/10" >
          <div className="text-xs uppercase tracking-[0.1em] text-slate-900/50 mb-2">Объем инвестиций</div>
          <div className="text-4xl md:text-5xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#66FCF1] to-blue-400">
            <RunningNumber value={totalPrice} />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <Button asChild className="bg-brand-400 text-black hover:bg-[#45ece0]  font-bold uppercase tracking-wider rounded-none" >
            <a href={generateTelegramLink()} target="_blank" rel="noopener noreferrer">
              Передать архитектуру разработчику
            </a>
          </Button>
          <Button variant="outline" onClick={reset} className="rounded-none border-white/20 text-slate-900 hover:bg-white/5 uppercase tracking-wider text-xs" >
            Пересчитать
          </Button>
        </div>
      </div>
    );
  }

  if (!step) return null;

  const currentSelection = selectedOptions[step.id] || [];

  return (
    <div className="relative border border-white/10 bg-[#e8eaf0]/80  p-6 md:p-10 shadow-2xl overflow-hidden" >
      {/* HUD Elements */}
      <div className="absolute top-4 right-4 flex gap-2 opacity-50">
        <div className="w-2 h-2 bg-brand-400 animate-pulse" />
        <div className="w-2 h-2 bg-brand-400 animate-pulse" style={{ animationDelay: "0.2s" }} />
      </div>

      <div className="mb-8">
        <span className="text-[10px] font-mono text-brand-600/70 uppercase tracking-[0.15em]">
          ШАГ {currentStepIndex + 1} / {PRICING_STEPS.length}
        </span>
        <motion.h3
          key={step.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl md:text-2xl font-mono text-slate-900 mt-3"
        >
          &gt; {step.question}
        </motion.h3>
      </div>

      <div className="space-y-4 mb-10">
        {step.options.map((option, idx) => (
          <motion.button
            key={option.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            onClick={() => {
              selectOption(step.id, option.id, option.price, step.multiple);
              // Auto-advance if not multiple
              if (!step.multiple) {
                setTimeout(nextStep, 400);
              }
            }}
            className={`w-full text-left p-5 transition-all duration-300 font-mono text-sm relative border ${
              currentSelection.includes(option.id)
                ? "bg-brand-400/10 border-[#66FCF1] text-brand-600 "
                : "bg-white/5 border-white/10 text-slate-600 hover:bg-white/10 hover:border-white/30"
            }`}

          >
            <div className="flex justify-between items-center relative z-10">
              <span>{option.label}</span>
              {currentSelection.includes(option.id) && (
                <span className="text-xs uppercase tracking-wider text-brand-600 animate-pulse">[ВЫБРАНО]</span>
              )}
            </div>
            {/* Cyberpunk corner accent */}
            {currentSelection.includes(option.id) && (
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#66FCF1]" />
            )}
          </motion.button>
        ))}
      </div>

      <div className="flex justify-between items-end border-t border-white/10 pt-6">
        <div className="font-mono">
          <div className="text-[10px] text-slate-900/40 uppercase tracking-[0.1em] mb-1">СИНХРОНИЗИРОВАННАЯ ОЦЕНКА</div>
          <div className="text-2xl text-brand-600 font-bold">
            <RunningNumber value={totalPrice} />
          </div>
        </div>

        {step.multiple && (
          <Button onClick={nextStep} className="bg-white/10 text-slate-900 hover:bg-white/20 rounded-none text-xs font-mono uppercase tracking-wider" >
            Подтвердить
          </Button>
        )}
      </div>
    </div>
  );
}
