"use client";

import Link from "next/link";
import { clsx } from "clsx";
import { Suspense, useRef } from "react";

import { Canvas, useFrame } from "@react-three/fiber";
import type { Group } from "three";

import Mascot from "@/components/Mascot";
import { ContactForm } from "@/components/ContactForm";
import { useScrollRotation } from "@/components/useScrollRotation";
import { Hero } from "@/components/sections/Hero";
import { TrueFocus } from "@/components/ReactBits/TrueFocus";
import { TiltedCard } from "@/components/ReactBits/TiltedCard";

import { PortfolioShowcase, type ProjectShowcaseItem } from "@/components/sections/PortfolioShowcase";

import { Button } from "@/components/ui/button";


// --- ОПРЕДЕЛЕНИЯ ВСЕХ КОНСТАНТ ---


// Направления, которые подчёркивают экспертизу в Telegram-ботах и автоматизации поверх лендингов.
const automationServices = [
  {
    title: "Телеграм-боты под процессы",
    description:
      "Проектируем сценарии, подключаем CRM, платёжные системы и аналитические события, чтобы бот приносил заявки без ручной рутины.",
  },
  {
    title: "Системная автоматизация",
    description:
      "Связываем лендинги, ботов и внутренние сервисы: интеграции с Notion, Airtable, AmoCRM и кастомные вебхуки.",
  },
  {
    title: "Лидогенерация без потерь",
    description:
      "Создаём цепочки, где Telegram дополняет лендинги, визитки и страницы под трафик, а данные сразу попадают в воронку.",
  },
] as const;

const projects: ReadonlyArray<ProjectShowcaseItem> = [
  {
    title: "Akulenok — сайт-визитка",
    description:
      "Минималистичный лендинг с высокой конверсией и быстрым onboardingом.",
    tag: "Landing · Бренд",
    href: "https://akulenok-tmz.ru/",
    image: "/placeholder/1.jpg",
    linkLabel: "Смотреть сайт",
    preview: {
      src: "/previews/akulenok-preview.mp4",
      poster: "/placeholder/1.jpg",
      type: "video",
      alt: "Akulenok: интерактивный фрейм с прокруткой сайта",
    },
  },
  {
    title: "Лендинг услуги",
    description:
      "Готовая к рекламе структура: оффер, боли, решение, отзывы и частые вопросы.",
    tag: "Leadgen · Промо",
    image: "/placeholder/2.jpg",
    linkLabel: "Ссылка по запросу",
    preview: {
      src: "/previews/service-preview.mp4",
      poster: "/placeholder/2.jpg",
      type: "video",
      alt: "Лендинг услуги: динамичный просмотр блоков",
    },
  },
  {
    title: "Лендинг под трафик",
    description:
      "B2B-решение с интеграцией аналитики и кастомным конструктором кейсов.",
    tag: "B2B · Услуги",
    image: "/placeholder/3.jpg",
    linkLabel: "Ссылка по запросу",
    preview: {
      src: "/previews/traffic-preview.mp4",
      poster: "/placeholder/3.jpg",
      type: "video",
      alt: "Лендинг под трафик: анимированный просмотр слайдов",
    },
  },
];

const processSteps = [
  {
    title: "Бриф",
    description:
      "Цели, аудитория, ключевые смыслы. Помогаем сформулировать сильный оффер.",
  },
  {
    title: "Дизайн",
    description:
      "Создаём в коде: используем UI-паттерны reactbits, анимации и микровзаимодействия.",
  },
  {
    title: "Запуск",
    description:
      "Домен, Vercel, SSL, аналитика. Подключаем Telegram-бота и CRM по запросу.",
  },
  {
    title: "Оптимизация",
    description:
      "Отслеживаем KPI, тестируем гипотезы, подготавливаем план апгрейдов.",
  },
] as const;

const pricingPlans = [
  {
    name: "Старт",
    price: "от 25 000 ₽",
    popular: false,
    perks: ["1 экран + CTA", "Быстрый MVP-запуск", "Базовая аналитика"],
  },
  {
    name: "Стандарт",
    price: "от 45 000 ₽",
    popular: true,
    perks: [
      "5–7 секций",
      "Под ключ: домен, SSL, TG-бот",
      "Готов к рекламным кабинетам",
    ],
  },
  {
    name: "Премиум",
    price: "от 75 000 ₽",
    popular: false,
    perks: ["Индивидуальный UI", "Анимации, кейсы, блог", "A/B-эксперименты"],
  },
] as const;

const testimonials = [
  {
    name: "Дарья Акуленок",
    role: "Основатель бренда Akulenok",
    quote:
      "Получили первый поток заявок в день запуска. Дальше дорабатывали секции на лету — всё максимально гибко.",
  },
  {
    name: "Александр Сергеев",
    role: "CEO b2b-сервиса",
    quote:
      "Собрали лендинг за неделю, подключили аналитику и CRM. Команда довольна скоростью и прозрачностью.",
  },
  {
    name: "Анна Петрова",
    role: "Маркетолог",
    quote:
      "Мощная связка дизайна и кода. Все гипотезы внедряются в тот же день, аналитика показывает рост конверсии.",
  },
] as const;
// --- КОНЕЦ ОПРЕДЕЛЕНИЙ КОНСТАНТ ---
function RotatingMascot({ rotationY }: { rotationY: number }) {
  const mascotRef = useRef<Group>(null);

  useFrame(() => {
    if (!mascotRef.current) {
      return;
    }

    // Синхронизация вращения модели с текущим положением скролла.
    mascotRef.current.rotation.y = rotationY;
  });

  return (
    <Mascot
      ref={mascotRef}
      initialPosition={[1.4, -1.1, 0]}
      initialScale={1.45}
    />
  );
}

function MascotCanvas() {
  const rotationY = useScrollRotation({ maxScroll: 1400, maxRotationDeg: 15 });

  return (
    <Canvas
      className="mascot-canvas"
      camera={{ position: [1.2, 1.25, 4.4], fov: 42 }}
      shadows={false}
    >
      <ambientLight intensity={0.85} />
      <directionalLight position={[4, 5, 3]} intensity={1.15} />
      <Suspense fallback={null}>
        <RotatingMascot rotationY={rotationY} />
      </Suspense>
    </Canvas>
  );
}


export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050816] text-slate-200">
      <MascotCanvas />
      <div className="pointer-events-none absolute inset-0">
        <div className="floating-orb top-[-15%] left-[-5%] h-72 w-72 bg-fuchsia-500/30" />
        <div className="floating-orb right-[-10%] top-[20%] h-[22rem] w-[22rem] bg-cyan-500/20" />
        <div className="floating-orb bottom-[-10%] left-1/2 h-80 w-80 -translate-x-1/2 bg-indigo-500/30" />
      </div>

      <div className="relative z-10 space-y-24 py-16 md:py-24">
        <div className="animate-scale-in">
          <Hero />
        </div>
       

        {/* Секция Услуги (Bento Box) */}
        <section
          id="services"
          className="container relative overflow-hidden rounded-3xl border border-white/10 bg-[#0F1220]/60 px-6 py-12 shadow-[inset_0_2px_40px_rgba(255,255,255,0.02)] backdrop-blur-3xl animate-fade-in-up md:px-12"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(31,140,255,0.15),_transparent_60%)]" />
          <div className="relative space-y-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8">
              <div className="space-y-4">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 font-mono text-xs uppercase tracking-[0.28em] text-cyan-400">
                  <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></span>
                  SERVICES.EXE
                </span>
                <h2 className="text-3xl font-semibold tracking-tight text-white md:text-5xl font-mono">
                  Что мы <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">собираем</span>
                </h2>
              </div>
              <p className="max-w-md text-base text-slate-400 md:text-right">
                Разработка масштабируемых веб-интерфейсов на <span className="font-mono text-white">Next.js</span> с упором на конверсию и производительность.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-12 md:grid-rows-2">
              <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-b from-white/[0.03] to-white/[0.01] p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] transition-all hover:bg-white/[0.05] hover:shadow-[0_0_40px_rgba(31,140,255,0.1)] md:col-span-8 md:row-span-1">
                 <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                   <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                 </div>
                 <h3 className="mb-3 text-2xl font-semibold text-white font-mono">Корпоративные сайты</h3>
                 <p className="mb-6 max-w-lg text-slate-400 flex-1">
                   Сложные многостраничные порталы для бизнеса. Интеграция с CRM, CMS, сложная фильтрация и кабинеты пользователей.
                 </p>
                 <div className="flex gap-2">
                   {['React', 'Next.js', 'Tailwind'].map(tech => (
                     <span key={tech} className="rounded bg-white/5 px-2 py-1 font-mono text-xs text-slate-300 border border-white/10">{tech}</span>
                   ))}
                 </div>
              </article>

              <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-b from-white/[0.03] to-white/[0.01] p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] transition-all hover:bg-white/[0.05] hover:shadow-[0_0_40px_rgba(236,72,153,0.1)] md:col-span-4 md:row-span-1">
                 <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-pink-500/10 text-pink-400">
                   <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                 </div>
                 <h3 className="mb-3 text-xl font-semibold text-white font-mono">Промо-лендинги</h3>
                 <p className="text-slate-400">
                   Конверсионные страницы для запуска продуктов, мероприятий или рекламы. Максимальная скорость и вау-эффекты.
                 </p>
              </article>

              <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-b from-white/[0.03] to-white/[0.01] p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] transition-all hover:bg-white/[0.05] hover:shadow-[0_0_40px_rgba(168,85,247,0.1)] md:col-span-5 md:row-span-1">
                 <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                   <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                 </div>
                 <h3 className="mb-3 text-xl font-semibold text-white font-mono">SaaS Интерфейсы</h3>
                 <p className="text-slate-400">
                   Проектирование и разработка интерфейсов для веб-приложений. Dashboard, аналитика, настройки.
                 </p>
              </article>

              <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-b from-white/[0.03] to-white/[0.01] p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] transition-all hover:bg-white/[0.05] hover:shadow-[0_0_40px_rgba(20,184,166,0.1)] md:col-span-7 md:row-span-1">
                 <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(20,184,166,0.15),_transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                 <div className="relative z-10 flex flex-col h-full">
                   <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-500/10 text-teal-400">
                     <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>
                   </div>
                   <h3 className="mb-3 text-2xl font-semibold text-white font-mono">E-commerce / Каталоги</h3>
                   <p className="mb-6 text-slate-400 flex-1">
                     Быстрые каталоги товаров с удобной навигацией. Оптимизированы для SEO и высоких нагрузок. Подключение корзины и оплат.
                   </p>
                   <div className="flex gap-2 mt-auto">
                     {['Supabase', 'Stripe', 'Framer Motion'].map(tech => (
                       <span key={tech} className="rounded bg-white/5 px-2 py-1 font-mono text-xs text-slate-300 border border-white/10">{tech}</span>
                     ))}
                   </div>
                 </div>
              </article>
            </div>
          </div>
        </section>

{/* Секция о Telegram-ботах и автоматизации: подчёркиваем, что делаем больше, чем лендинги */}
        <section
          id="automation"
          className="container relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-12 shadow-[0_45px_140px_rgba(14,165,233,0.28)] backdrop-blur-2xl animate-fade-in-up md:px-12"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.24),_transparent_68%)]" />
          <div className="relative space-y-10">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.28em] text-white/60">
                Автоматизация
              </span>
              <h2 className="text-3xl font-semibold text-white md:text-4xl">
                <TrueFocus sentence="Телеграм-боты и интеллектуальные процессы" manualMode={false} />
              </h2>
              <p className="max-w-2xl text-base text-slate-300 md:text-lg">
                Мы создаём лучшие Telegram-боты и автоматизируем системы вокруг них: от лендингов и визиток до страниц для лидогенерации — вся связка работает как единый продукт.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {automationServices.map((service) => (
                <article
                  key={service.title}
                  className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] p-6 shadow-[0_30px_100px_rgba(59,130,246,0.25)] transition-transform duration-500 hover:-translate-y-2 transition-colors group-hover:bg-white/[0.08]"
                >
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.35),_transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative z-10 space-y-3">
                    <h3 className="text-xl font-semibold text-white">{service.title}</h3>
                    <p className="text-sm text-slate-300">{service.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        <div className="animate-fade-in-up">
          <PortfolioShowcase projects={projects} />
        </div>

        {/* Секция Процесс */}
        <section
          className="container relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-12 shadow-[0_40px_120px_rgba(76,29,149,0.25)] backdrop-blur-2xl animate-fade-in-up md:px-12"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.28),_transparent_70%)]" />
          <div className="relative space-y-10">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.28em] text-white/60">
                Процесс
              </span>
              <h2 className="text-3xl font-semibold text-white md:text-4xl">Как идёт работа</h2>
              <p className="max-w-2xl text-base text-slate-300 md:text-lg">
                Прозрачный пайплайн: понятные этапы, быстрые ревью, никаких «ещё недельку на дизайн».
              </p>
            </div>
            <ol className="grid gap-6 md:grid-cols-4">
              {processSteps.map((step, index) => (
                <li
                  key={step.title}
                  className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] p-6 shadow-[0_25px_80px_rgba(168,85,247,0.2)] transition-transform duration-500 hover:-translate-y-2 transition-colors group-hover:bg-white/[0.07]"
                >
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(236,72,153,0.3),_transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative z-10 space-y-3">
                    <span className="text-sm font-semibold text-white/60">Шаг {index + 1}</span>
                    <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                    <p className="text-sm text-slate-300">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Секция Стоимость */}
        <section
          className="container relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-12 shadow-[0_45px_140px_rgba(14,165,233,0.28)] backdrop-blur-2xl animate-fade-in-up md:px-12"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(14,165,233,0.28),_transparent_70%)]" />
          <div className="relative space-y-10">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.28em] text-white/60">
                Стоимость
              </span>
              <h2 className="text-3xl font-semibold text-white md:text-4xl">
                Стоимость и пакеты
              </h2>
              <p className="max-w-2xl text-base text-slate-300 md:text-lg">
                Каждый тариф можно кастомизировать под ваши задачи: дополнительные блоки, интеграции, мультиязычность.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {pricingPlans.map((plan) => (
                <article
                  key={plan.name}
                  className={clsx(
                    "group relative flex h-full flex-col gap-6 overflow-hidden rounded-3xl border border-white/10 p-6 shadow-[0_30px_100px_rgba(6,182,212,0.25)] transition-transform duration-500 hover:-translate-y-2 transition-colors",
                    plan.popular
                      ? "bg-gradient-to-b from-cyan-400/20 via-transparent to-transparent"
                      : "bg-white/[0.05]"
                  )}
                >
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(6,182,212,0.3),_transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative z-10 flex flex-1 flex-col gap-6">
                    <div>
                      <span className="text-sm font-semibold uppercase tracking-[0.28em] text-white/50">
                        {plan.name}
                      </span>
                      <p className="mt-3 text-3xl font-semibold text-white">{plan.price}</p>
                    </div>
                    <ul className="space-y-3 text-sm text-slate-300">
                      {plan.perks.map((perk) => (
                        <li key={perk} className="flex items-start gap-2">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                          <span>{perk}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      asChild
                      className="mt-auto inline-flex w-full justify-center rounded-xl2 bg-cyan-500 py-3 text-base font-semibold text-white shadow-[0_18px_45px_rgba(6,182,212,0.38)] transition-transform duration-300 ease-out hover:-translate-y-0.5 hover:bg-cyan-400 hover:shadow-[0_20px_55px_rgba(6,182,212,0.45)]"
                    >
                      <Link href="#contact">Хочу такой</Link>
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Секция Отзывы */}
        <section
          className="container relative overflow-visible rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-12 shadow-[0_40px_120px_rgba(76,29,149,0.25)] backdrop-blur-2xl animate-fade-in-up md:px-12"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(168,85,247,0.3),_transparent_70%)]" />

          <div className="relative z-20 space-y-10"> {/* Добавляем z-20, чтобы контент был над изображением */}
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.28em] text-white/60">
                Отзывы
              </span>
              <h2 className="text-3xl font-semibold text-white md:text-4xl">
                Что говорят клиенты
              </h2>
              <p className="max-w-2xl text-base text-slate-300 md:text-lg">
                Работаем прозрачно: регулярные созвоны, понятные отчёты по аналитике, быстро реагируем на гипотезы.
              </p>
            </div>

            {/* Контейнер для отзывов, чтобы оставить место для талисмана */}
            <div className="grid gap-6 md:grid-cols-3">
              {testimonials.map((testimonial) => (
                <figure
                  key={testimonial.name}
                  className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] p-6 shadow-[0_25px_80px_rgba(168,85,247,0.2)] transition-transform duration-500 hover:-translate-y-2 transition-colors group-hover:bg-white/[0.07]"
                >
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(236,72,153,0.32),_transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <blockquote className="relative z-10 text-base text-slate-200">
                    “{testimonial.quote}”
                  </blockquote>
                  <figcaption className="relative z-10 mt-6 space-y-1">
                    <div className="text-sm font-semibold text-white">{testimonial.name}</div>
                    <div className="text-xs uppercase tracking-[0.28em] text-white/50">
                      {testimonial.role}
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          {/* Блок с изображением tal2.webp - Позиционирование в правом верхнем углу, поднято выше */}
          <div
            aria-hidden="true"
            className="absolute top-[-240px] right-[-180px] hidden lg:block z-10"
          >
            <div className="relative h-[300px] w-[300px]">
              <TiltedCard
                imageSrc="/tal2.webp"
                altText="Талисман LidFlow"
                captionText="Талисман LidFlow"
                containerHeight="300px"
                containerWidth="300px"
                imageHeight="300px"
                imageWidth="300px"
              />
            </div>
          </div>
        </section>

        {/* Секция Контакты */}
        <section
          id="contact"
          className="container relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] via-white/[0.02] to-transparent px-6 py-16 shadow-[0_50px_160px_rgba(14,165,233,0.35)] backdrop-blur-2xl animate-fade-in-up md:grid md:grid-cols-[minmax(0,1fr)_380px] md:gap-12 md:px-12"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(6,182,212,0.28),_transparent_65%)]" />
          <div className="relative space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.28em] text-white/60">
              Контакты
            </span>
            <h2 className="text-3xl font-semibold text-white md:text-4xl">
              Заполните заявку — и обсудим проект
            </h2>
            <p className="text-base text-slate-300 md:text-lg">
              Отвечаю в течение рабочего дня. Подготовлю структуру, бюджет и таймлайн, а также варианты апсейлов.
            </p>
            <ul className="space-y-2 text-sm text-slate-300 md:text-base">
              <li>
                • Telegram:
                <a
                  className="ml-1 inline-flex items-center gap-1 text-cyan-300 underline decoration-dotted underline-offset-4 transition hover:text-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050816]"
                  href="https://t.me/peexthree"
                  target="_blank"
                  rel="noreferrer"
                >
                  @peexthree
                </a>
              </li>
              <li>• Email: linderop@yandex.ru</li>
              <li>• Время ответа: до 1 часа в рабочие дни</li>
            </ul>
          </div>
          <div className="relative mt-10 md:mt-0">
            <ContactForm />
          </div>
        </section>
      </div>
    </div>
  );
}
