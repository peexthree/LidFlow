"use client";

import { useEffect, useState, useRef } from "react";
import Script from "next/script";
import { Button } from "@/components/ui/button";
import { clsx } from "clsx";

// --- DECLARATION ---
declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        ready: () => void;
        expand: () => void;
        setHeaderColor: (color: string) => void;
        setBackgroundColor: (color: string) => void;
        sendData: (data: string) => void;
        MainButton: {
          setText: (text: string) => void;
          show: () => void;
          hide: () => void;
          onClick: (callback: () => void) => void;
          offClick: (callback: () => void) => void;
        };
      };
    };
  }
}

// --- КОНСТАНТЫ ---
const basePlans = [
  { id: "base", title: "База", desc: "Лидогенерация", price: 25000 },
  { id: "standart", title: "Стандарт", desc: "Управление и БД", price: 45000 },
  { id: "business", title: "Бизнес", desc: "Сложная CRM", price: 75000 },
];

const modules = [
  { id: "ai", title: "Интеграция ИИ (ChatGPT/Gemini)", price: 15000 },
  { id: "payment", title: "Модуль приема платежей (Эквайринг)", price: 10000 },
  { id: "admin", title: "Админ-панель с аналитикой", price: 20000 },
  { id: "video", title: "Видео-аватар на входе", price: 12000 },
];

const securityFeatures = [
  {
    icon: (
      <svg className="w-8 h-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    title: "100% IP",
    desc: "Код передается через GitHub и принадлежит только вам.",
  },
  {
    icon: (
      <svg className="w-8 h-8 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    title: "0% Аренда",
    desc: "Никаких скрытых платежей за пользование платформой.",
  },
  {
    icon: (
      <svg className="w-8 h-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
      </svg>
    ),
    title: "SLA 99.9%",
    desc: "Размещение на отказоустойчивых серверах Render и Supabase.",
  },
];

const cases = [
  {
    id: "lizing",
    title: "Lizing-Phi (Финтех)",
    metric: "Экономия времени админа: 80 часов/мес",
    image: "/placeholder/1.jpg",
  },
  {
    id: "fermer",
    title: "FermerHub (Агро-сектор)",
    metric: "Конверсия в заявку +45%",
    image: "/placeholder/2.jpg",
  },
  {
    id: "akulenok",
    title: "Акуленок (Образование)",
    metric: "Рост ROI на 120%",
    image: "/placeholder/3.jpg",
  },
];
// --- КОНЕЦ КОНСТАНТ ---

export default function TWAPage() {
  const calculatorRef = useRef<HTMLDivElement>(null);

  const [selectedBase, setSelectedBase] = useState<string>("");
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    // Check if Telegram WebApp is available
    if (typeof window !== "undefined" && window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();
      window.Telegram.WebApp.setHeaderColor("#0B0C10");
      window.Telegram.WebApp.setBackgroundColor("#0B0C10");
    }
  }, []);

  useEffect(() => {
    // Calculate total price
    let basePrice = 0;
    if (selectedBase) {
      basePrice = basePlans.find((p) => p.id === selectedBase)?.price || 0;
    }

    const modsPrice = selectedModules.reduce((acc, modId) => {
      const mod = modules.find((m) => m.id === modId);
      return acc + (mod?.price || 0);
    }, 0);

    const total = basePrice + modsPrice;
    setTotalPrice(total);

    // Telegram MainButton Logic
    if (typeof window !== "undefined" && window.Telegram && window.Telegram.WebApp) {
      const mainButton = window.Telegram.WebApp.MainButton;
      if (selectedBase || selectedModules.length > 0) {
        mainButton.setText("Сформировать запрос для Архитектора");
        mainButton.show();
        mainButton.onClick(handleMainButtonClick);
      } else {
        mainButton.hide();
        mainButton.offClick(handleMainButtonClick);
      }
    }

    // Cleanup event listener on change
    return () => {
       if (typeof window !== "undefined" && window.Telegram && window.Telegram.WebApp) {
           window.Telegram.WebApp.MainButton.offClick(handleMainButtonClick);
       }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBase, selectedModules]);

  const handleMainButtonClick = () => {
      if (typeof window !== "undefined" && window.Telegram && window.Telegram.WebApp) {
          const data = {
             base: selectedBase,
             modules: selectedModules,
             totalPrice: totalPrice
          };
          window.Telegram.WebApp.sendData(JSON.stringify(data));
      }
  };

  const scrollToCalculator = () => {
    if (calculatorRef.current) {
      calculatorRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleModuleToggle = (id: string) => {
    setSelectedModules((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  return (
    <div className="relative min-h-screen bg-[#0B0C10] text-slate-200 overflow-x-hidden pb-16 font-sans">
      <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />

      {/* 1. Hero-блок «Интеллект Системы» */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-60 mix-blend-screen"
          >
            <source src="/previews/service-preview.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B0C10]/40 to-[#0B0C10] backdrop-blur-[2px]"></div>
        </div>

        <div className="relative z-10 space-y-8 max-w-2xl mx-auto mt-20 md:mt-0">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-[10px] md:text-xs uppercase tracking-[0.28em] text-cyan-400">
              <span className="flex h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-cyan-400 animate-pulse"></span>
              ИНТЕЛЛЕКТ СИСТЕМЫ
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white font-mono leading-tight">
              Архитектура <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-[0_0_15px_rgba(65,174,255,0.4)]">автономного бизнеса</span>
            </h1>
            <p className="text-sm md:text-lg text-slate-300 max-w-xl mx-auto leading-relaxed mt-4">
              Создание независимых IT-активов: Telegram-системы с ИИ под ключ. <br className="hidden md:block" />
              <span className="font-semibold text-white">Без абонентской платы разработчику.</span>
            </p>
          </div>

          <Button
            onClick={scrollToCalculator}
            className="mt-6 rounded-xl2 bg-gradient-to-r from-cyan-600 to-blue-600 py-6 px-8 text-base md:text-lg font-bold text-white shadow-[0_0_30px_rgba(31,140,255,0.4)] transition-all duration-300 hover:scale-105 hover:from-cyan-500 hover:to-blue-500"
          >
            Настроить систему
          </Button>
        </div>
      </section>

      {/* 2. Интерактивный калькулятор «Инвестиции в рост» */}
      <section ref={calculatorRef} className="container mx-auto px-4 py-16 max-w-3xl">
        <div className="space-y-4 mb-10 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-[10px] uppercase tracking-[0.28em] text-white/60">
              КАЛЬКУЛЯТОР
            </span>
            <h2 className="text-2xl md:text-4xl font-semibold text-white font-mono">Инвестиции в рост</h2>
            <p className="text-sm text-slate-400 max-w-md mx-auto">
              Соберите свой продукт. Точный расчёт архитектуры под ваши задачи.
            </p>
        </div>

        <div className="space-y-8">
          {/* База */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-[inset_0_2px_40px_rgba(255,255,255,0.02)] backdrop-blur-3xl">
            <h3 className="text-xl font-semibold text-cyan-400 mb-6 flex items-center gap-2 font-mono">
              <span className="bg-cyan-400/10 text-cyan-400 p-1 rounded-md text-xs">1</span>
              Выбор базы
            </h3>
            <div className="grid gap-4 md:grid-cols-3">
              {basePlans.map((plan) => (
                <label
                  key={plan.id}
                  className={clsx(
                    "cursor-pointer relative overflow-hidden flex flex-col justify-between p-5 rounded-2xl border transition-all duration-300",
                    selectedBase === plan.id
                      ? "border-cyan-400/50 bg-cyan-400/10 shadow-[0_0_20px_rgba(31,140,255,0.2)]"
                      : "border-white/5 bg-white/[0.02] hover:bg-white/[0.05]"
                  )}
                >
                  <input
                    type="radio"
                    name="base"
                    value={plan.id}
                    checked={selectedBase === plan.id}
                    onChange={() => setSelectedBase(plan.id)}
                    className="sr-only"
                  />
                  <div>
                    <div className="font-semibold text-white mb-1 font-mono">{plan.title}</div>
                    <div className="text-xs text-slate-400">{plan.desc}</div>
                  </div>
                  <div className="mt-4 text-sm font-mono text-cyan-300 font-medium">
                    {plan.price.toLocaleString("ru-RU")} ₽
                  </div>

                  {/* Indicator */}
                  {selectedBase === plan.id && (
                     <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
                  )}
                </label>
              ))}
            </div>
          </div>

          {/* Доп. Модули */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-[inset_0_2px_40px_rgba(255,255,255,0.02)] backdrop-blur-3xl">
            <h3 className="text-xl font-semibold text-pink-400 mb-6 flex items-center gap-2 font-mono">
              <span className="bg-pink-400/10 text-pink-400 p-1 rounded-md text-xs">2</span>
              Дополнительные модули
            </h3>
            <div className="space-y-3">
              {modules.map((mod) => (
                <label
                  key={mod.id}
                  className={clsx(
                    "cursor-pointer flex items-center justify-between p-4 rounded-2xl border transition-all duration-300",
                    selectedModules.includes(mod.id)
                      ? "border-pink-400/50 bg-pink-400/10"
                      : "border-white/5 bg-white/[0.02] hover:bg-white/[0.05]"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={clsx(
                        "w-5 h-5 rounded border flex items-center justify-center transition-colors",
                        selectedModules.includes(mod.id)
                          ? "border-pink-400 bg-pink-400"
                          : "border-slate-500"
                      )}
                    >
                      {selectedModules.includes(mod.id) && (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className="text-sm font-medium text-slate-200">{mod.title}</span>
                  </div>
                  <span className="text-sm font-mono text-pink-300">
                    +{mod.price.toLocaleString("ru-RU")} ₽
                  </span>
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={selectedModules.includes(mod.id)}
                    onChange={() => handleModuleToggle(mod.id)}
                  />
                </label>
              ))}
            </div>
          </div>

          {/* Итог */}
          <div className="rounded-3xl border border-blue-500/20 bg-blue-500/5 p-6 backdrop-blur-3xl flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-slate-300 font-medium">Предварительная оценка инвестиций:</div>
            <div className="text-3xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              {totalPrice > 0 ? `${totalPrice.toLocaleString("ru-RU")} ₽` : "0 ₽"}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Модуль «Безопасность и Владение» */}
      <section className="container mx-auto px-4 py-16 max-w-4xl border-t border-white/5">
        <div className="space-y-4 mb-10 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-[10px] uppercase tracking-[0.28em] text-white/60">
              ГАРАНТИИ
            </span>
            <h2 className="text-2xl md:text-4xl font-semibold text-white font-mono">Безопасность и Владение</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {securityFeatures.map((feature, idx) => (
             <article key={idx} className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] transition-all hover:bg-white/[0.05] backdrop-blur-md">
                 <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-white/5 border border-white/10">
                   {feature.icon}
                 </div>
                 <h3 className="mb-3 text-xl font-semibold text-white font-mono">{feature.title}</h3>
                 <p className="text-sm text-slate-400 leading-relaxed">
                   {feature.desc}
                 </p>
             </article>
          ))}
        </div>
      </section>

      {/* 4. Шоурум кейсов (Портфолио) */}
      <section className="container mx-auto px-4 py-16 max-w-5xl border-t border-white/5">
         <div className="space-y-4 mb-10 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-[10px] uppercase tracking-[0.28em] text-white/60">
              РЕЗУЛЬТАТЫ
            </span>
            <h2 className="text-2xl md:text-4xl font-semibold text-white font-mono">Шоурум кейсов</h2>
            <p className="text-sm text-slate-400 max-w-md mx-auto">Проекты, которые уже приносят прибыль.</p>
        </div>

        {/* Скроллируемый контейнер */}
        <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scrollbar-hide">
           {cases.map((project) => (
              <article key={project.id} className="snap-center shrink-0 w-[280px] md:w-[350px] overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] flex flex-col group transition-transform duration-300 hover:-translate-y-2">
                 <div className="relative h-48 w-full bg-white/5 overflow-hidden">
                    {/* Placeholder for image */}
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center text-slate-700 font-mono text-sm">
                      [IMG: {project.id}]
                    </div>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                 </div>
                 <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-lg font-bold text-white mb-2 font-mono">{project.title}</h3>
                    <div className="mt-auto inline-flex items-center justify-center rounded-lg bg-cyan-500/10 px-3 py-2 text-xs font-medium text-cyan-400 border border-cyan-500/20">
                       {project.metric}
                    </div>
                 </div>
              </article>
           ))}
        </div>
      </section>

    </div>
  );
}
