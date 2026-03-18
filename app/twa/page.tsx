"use client";
import { ArtifactGallery } from "@/components/twa/ArtifactGallery";
import { AssimilationScreen } from "@/components/twa/AssimilationScreen";

import { useEffect, useState, useRef } from "react";
import Script from "next/script";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { clsx } from "clsx";
import { AnimatePresence, motion } from "framer-motion";

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
  { id: "base", title: "Старт", desc: "Только Landing (Свирепая конверсия)", price: 12000, features: ["Многоуровневое меню навигации", "Умная форма заявки", "Система мгновенных алертов", "Базовый пульт управления"] },
  { id: "business", title: "Бизнес", desc: "Telegram Web App (Внутри экосистемы)", price: 25000, features: ["Интерактивный каталог", "Модуль корзины и чекаута", "Прямой биллинг (Оплата онлайн)", "Система записи (Букинг)", "Экспорт данных"] },
  { id: "scale", title: "Доминация", desc: "Full-Stack доминация (Landing + TWA + Bot)", price: 60000, features: ["Полноценный Web-интерфейс (TWA)", "Продвинутый Личный Кабинет", "Сложные фильтры", "Бесшовная интеграция с CRM"] },
];

const modules = [
  { id: "crm", title: "Интеграция с amoCRM / Битрикс24", price: 8000 },
  { id: "ai", title: "Интеграция ИИ (Автономный продавец)", price: 12000 },
  { id: "payment", title: "Подключение онлайн-кассы / Крипты", price: 5000 },
  { id: "admin", title: "Продвинутая Админ-панель", price: 15000 },
  { id: "video", title: "3D Motion, GSAP, Cyberpunk эффекты", price: 10000 },
  { id: "referral", title: "Реферальная система", price: 9000 },
  { id: "analytics", title: "Сквозная аналитика", price: 12000 },
  { id: "push", title: "Push-уведомления (Массовые рассылки)", price: 4000 },
  { id: "i18n", title: "Мультиязычность (i18n)", price: 8000 },
  { id: "deploy", title: "Развертывание на сервере клиента", price: 25000 },
];

const securityFeatures = [
  {
    icon: "/data-armor.svg",
    title: "100% IP",
    desc: "Код передается через GitHub и принадлежит только вам.",
  },
  {
    icon: "/cloud-server.svg",
    title: "0% Аренда",
    desc: "Никаких скрытых платежей за пользование платформой.",
  },
  {
    icon: "/api-gateway.svg",
    title: "SLA 99.9%",
    desc: "Размещение на отказоустойчивых серверах Render и Supabase.",
  },
];

const cases = [
  {
    id: "lizing",
    title: "Лизинг и точка",
    metric: "Трафик · Продажи",
    image: "/placeholder/n2.jpeg",
    videoSrc: "/placeholder/video_2026-03-11_21-55-31%20(online-video-cutter.com)%20(3).mp4"
  },
  {
    id: "fermer",
    title: "fermerHub (B2B)",
    metric: "B2B · Масштабирование",
    image: "/placeholder/n3.jpeg",
    videoSrc: "/placeholder/11.03.2026_22.21.54_REC.mp4"
  },
  {
    id: "akulenok",
    title: "Akulenok (Конверсия)",
    metric: "Доминирование · Бренд",
    image: "/placeholder/n1.jpeg",
    videoSrc: "/placeholder/video_2026-03-11_21-55-31%20(online-video-cutter.com)%20(2).mp4"
  },
];
// --- КОНЕЦ КОНСТАНТ ---

export default function TWAPage() {

  const calculatorRef = useRef<HTMLDivElement>(null);

  const [selectedBase, setSelectedBase] = useState<string>("");
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [isAssimilated, setIsAssimilated] = useState(false);

  useEffect(() => {
    // Check if Telegram WebApp is available
    if (typeof window !== "undefined" && window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();
      window.Telegram.WebApp.setHeaderColor("#02030a");
      window.Telegram.WebApp.setBackgroundColor("#02030a");
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

  const handleOpenVideo = (src: string) => {
    setSelectedVideo(src);
  };

  const handleCloseVideo = () => {
    setSelectedVideo(null);
  };

  return (
    <>
      {!isAssimilated && (
        <AssimilationScreen onComplete={() => setIsAssimilated(true)} />
      )}
    <div className={clsx("relative min-h-screen overflow-x-hidden bg-transparent text-slate-200 pb-16 font-sans transition-opacity duration-1000", !isAssimilated ? "opacity-0 pointer-events-none absolute inset-0" : "opacity-100")}>
      <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />

      {/* Одинаковый фон из реакта (floating orbs) */}
      <div className="pointer-events-none fixed inset-0 z-[-1]">
        <div className="floating-orb top-[-15%] left-[-5%] h-72 w-72 bg-fuchsia-500/30 blur-3xl" />
        <div className="floating-orb right-[-10%] top-[20%] h-[22rem] w-[22rem] bg-[#66FCF1]/20 blur-3xl" />
        <div className="floating-orb bottom-[-10%] left-1/2 h-80 w-80 -translate-x-1/2 bg-indigo-500/30 blur-[140px]" />
      </div>
{/* 1. Hero-блок «Интеллект Системы» (Финотоговая B2B версия) */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden bg-[#020304] border-b border-white/5">
        
        {/* СЛОЙ 1: ВИДЕО (Полноэкранное холст от края до края) */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            // object-cover гарантирует растяжение на весь экран без пустых полос
            className="w-full h-full object-cover pointer-events-none"
          >
            <source src="/demo.mp4" type="video/mp4" />
          </video>
          
          {/* ИЗОЛИРОВАННОЕ ЗАТЕМНЕНИЕ: Мягкий радиальный градиент по центру 
              Обеспечивает 100% читаемость текста, оставляя края видео чистыми.
          */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(2,3,10,0.5)_0%,transparent_65%)] pointer-events-none"></div>
          
          {/* Нижний градиент для плавного перехода к следующей секции */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#020304] to-transparent pointer-events-none"></div>
        </div>

        {/* СЛОЙ 2: КОНТЕНТ (Парящая современная типографика) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          // Убраны тяжелые подложки, блюры и кастомная геометрия
          className="relative z-10 space-y-8 max-w-3xl mx-auto mt-20 md:mt-0"
        >
          <div className="space-y-4">
            {/* Значок статуса в современном чистом стиле */}
            <span className="inline-flex items-center gap-2 rounded-full border border-[#66FCF1]/20 bg-[#66FCF1]/5 px-4 py-1 text-[10px] md:text-xs uppercase tracking-[0.28em] text-[#66FCF1] shadow-[0_0_15px_rgba(34,211,238,0.1)]">
              <span className="flex h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-[#66FCF1] animate-pulse shadow-[0_0_10px_#22d3ee]"></span>
              ИНТЕЛЛЕКТ СИСТЕМЫ
            </span>
            
            {/* Крупный заголовок с усиленными тенями для читаемости */}
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-white leading-tight drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
              Архитектура <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#66FCF1] to-blue-500 drop-shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                автономного бизнеса
              </span>
            </h1>
            
            {/* Описание */}
            <p className="text-sm md:text-lg text-slate-100 max-w-xl mx-auto leading-relaxed mt-4 font-medium drop-shadow-[0_2px_2px_rgba(0,0,0,0.9)]">
              Создание независимых IT-активов: Telegram-системы с ИИ под ключ. <br className="hidden md:block" />
              <span className="font-semibold text-white">Без абонентской платы разработчику.</span>
            </p>
          </div>

          {/* ИТОГОВАЯ КОММЕРЧЕСКАЯ КНОПКА (rounded-none, коммерческий градиент) */}
          <Button
            onClick={scrollToCalculator}
            // Премиальный B2B стиль: скругление rounded-none, современный градиент, глубокая тень
            className="mt-8 px-10 py-5 text-base md:text-lg font-bold text-white bg-gradient-to-r from-blue-600 to-[#66FCF1] rounded-none shadow-[0_8px_25px_rgba(59,130,246,0.3)] transition-all duration-300 hover:scale-105 hover:from-blue-500 hover:to-[#66FCF1] hover:shadow-[0_12px_35px_rgba(59,130,246,0.5)] active:scale-95"
          >
            Настроить систему
          </Button>
        </motion.div>
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

        <div className="space-y-8 relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(31,140,255,0.15),_transparent_60%)] pointer-events-none rounded-none" />

          {/* База */}
          <div className="rounded-none border border-white/10 bg-white/[0.03] p-6 shadow-[inset_0_2px_40px_rgba(255,255,255,0.02)] backdrop-blur-xl relative z-10" style={{ clipPath: "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)" }}>
            <h3 className="text-xl font-semibold text-[#66FCF1] mb-6 flex items-center gap-2 font-mono">
              <span className="bg-[#66FCF1]/10 text-[#66FCF1] p-1 rounded-md text-xs">1</span>
              Выбор базы
            </h3>
            <div className="grid gap-4 md:grid-cols-3">
              {basePlans.map((plan) => (
                <label
                  key={plan.id}
                  className={clsx(
                    "cursor-pointer relative overflow-hidden flex flex-col justify-between p-5 rounded-none transition-all duration-300",
                    selectedBase === plan.id
                      ? "border border-[#66FCF1]/50 bg-[#66FCF1]/10 shadow-[0_0_15px_rgba(65,174,255,0.4)] ring-1 ring-[#66FCF1]/50"
                      : "border border-white/5 bg-white/[0.02] hover:bg-white/[0.1] backdrop-blur-md"
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
                    <div className="font-semibold text-white mb-1 text-lg font-mono">{plan.title}</div>
                    <div className="text-sm text-cyan-200 mb-4">{plan.desc}</div>
                    <ul className="space-y-2 mb-6">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                          <span className="mt-0.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#66FCF1]" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-auto text-lg font-mono text-[#66FCF1] font-bold drop-shadow-sm border-t border-white/10 pt-4">
                    от {plan.price.toLocaleString("ru-RU")} ₽
                  </div>

                  {/* Indicator */}
                  {selectedBase === plan.id && (
                     <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-[#66FCF1] animate-pulse drop-shadow-[0_0_5px_rgba(65,174,255,1)]"></div>
                  )}
                </label>
              ))}
            </div>
          </div>

          {/* Доп. Модули */}
          <div className="rounded-none border border-white/10 bg-white/[0.03] p-6 shadow-[inset_0_2px_40px_rgba(255,255,255,0.02)] backdrop-blur-xl relative z-10" style={{ clipPath: "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)" }}>
            <h3 className="text-xl font-semibold text-pink-400 mb-6 flex items-center gap-2 font-mono">
              <span className="bg-pink-400/10 text-pink-400 p-1 rounded-md text-xs">2</span>
              Дополнительные модули
            </h3>
            <div className="grid gap-3 md:grid-cols-2">
              {modules.map((mod) => (
                <label
                  key={mod.id}
                  className={clsx(
                    "cursor-pointer flex items-center justify-between p-4 rounded-none transition-all duration-300",
                    selectedModules.includes(mod.id)
                      ? "border border-pink-400/50 bg-pink-400/10 ring-1 ring-pink-500/50 shadow-[0_0_15px_rgba(236,72,153,0.3)]"
                      : "border border-white/5 bg-white/[0.02] hover:bg-white/[0.1] backdrop-blur-md"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={clsx(
                        "w-5 h-5 rounded border flex items-center justify-center transition-colors shadow-sm",
                        selectedModules.includes(mod.id)
                          ? "border-pink-400 bg-pink-400"
                          : "border-slate-500 bg-white/5"
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
                  <span className="text-sm font-mono text-pink-300 font-medium">
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
          <div className="rounded-none border border-blue-500/30 bg-blue-500/10 p-6 backdrop-blur-2xl flex flex-col md:flex-row items-center justify-between gap-4 relative z-10 shadow-[0_0_30px_rgba(59,130,246,0.15)]">
            <div className="text-slate-300 font-medium uppercase tracking-widest text-xs">Предварительная оценка инвестиций:</div>
            <div className="text-3xl md:text-4xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#66FCF1] drop-shadow-[0_0_15px_rgba(65,174,255,0.6)]">
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

        <div className="grid gap-6 md:grid-cols-3 relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(236,72,153,0.1),_transparent_60%)] pointer-events-none" />

          {securityFeatures.map((feature, idx) => (
             <article key={idx} className="group relative overflow-hidden rounded-none border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] transition-all duration-300 hover:bg-white/[0.08] hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(236,72,153,0.15)] backdrop-blur-xl z-10">
                 <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-none bg-white/5 border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] transition-transform group-hover:scale-110 duration-300">
                   <Image src={feature.icon} alt={feature.title} width={32} height={32} className="opacity-90 group-hover:opacity-100 drop-shadow-md" />
                 </div>
                 <h3 className="mb-3 text-xl font-semibold text-white font-mono">{feature.title}</h3>
                 <p className="text-sm text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
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
            <p className="text-sm text-slate-400 max-w-md mx-auto font-medium">Проекты, которые уже приносят прибыль.</p>
        </div>


        <ArtifactGallery artifacts={cases.map((c) => ({ id: c.id, title: c.title, metric: c.metric, image: c.image, videoSrc: c.videoSrc }))} onOpenVideo={handleOpenVideo} />
      </section>

      {/* Модальное окно для видео (TWA) */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#02030a]/90 backdrop-blur-xl p-4 sm:p-6"
            onClick={handleCloseVideo}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl rounded-none overflow-hidden border border-white/10 bg-gradient-to-b from-[#0a122c] to-[#040816] shadow-[0_0_60px_rgba(31,140,255,0.3)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Хедер модалки */}
              <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-4 sm:p-6 bg-gradient-to-b from-black/60 to-transparent pointer-events-none">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[#66FCF1] backdrop-blur-md shadow-sm">
                  <span className="flex h-1.5 w-1.5 rounded-full bg-[#66FCF1] animate-pulse"></span>
                  LIVE DEMO
                </span>

                <button
                  onClick={handleCloseVideo}
                  className="pointer-events-auto flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/20 hover:scale-110 border border-white/10 shadow-lg"
                  aria-label="Закрыть"
                >
                  <svg className="h-5 w-5 sm:h-6 sm:w-6 drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Видеоплеер */}
              <div className="relative w-full aspect-video bg-black rounded-b-[2rem]">
                <video
                  src={selectedVideo}
                  className="absolute inset-0 w-full h-full object-contain"
                  controls
                  autoPlay
                  playsInline
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
        </div>
    </>
  );
}