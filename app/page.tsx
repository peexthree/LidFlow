"use client";


import Image from "next/image";




import { ContactForm } from "@/components/ContactForm";
import { Hero } from "@/components/sections/Hero";
import { MasterpieceServices } from "@/components/sections/MasterpieceServices";
import { TrueFocus } from "@/components/ReactBits/TrueFocus";
import { TiltedCard } from "@/components/ReactBits/TiltedCard";
import { DynamicPricing } from "@/components/twa/DynamicPricing";

import { PortfolioShowcase, type ProjectShowcaseItem } from "@/components/sections/PortfolioShowcase";




// --- ОПРЕДЕЛЕНИЯ ВСЕХ КОНСТАНТ ---


// Направления, которые подчёркивают экспертизу в Telegram-ботах и автоматизации поверх лендингов.
const automationServices = [
  {
    icon: "/tg-bot-core.svg",
    title: "Телеграм-боты, Которые Делают Деньги",
    description:
      "Забудьте про рутину. Мы проектируем ботов, которые прогревают лидов, закрывают сделки и принимают оплаты 24/7. Ваша команда отдыхает — бот продаёт.",
  },
  {
    icon: "/api-gateway.svg",
    title: "Тотальная Автоматизация",
    description:
      "Никаких потерянных клиентов. Идеальная связка: Лендинг + TWA + CRM (AmoCRM, Notion, Airtable). Все данные синхронизированы. Все заявки под контролем.",
  },
  {
    icon: "/logic-tree.svg",
    title: "Агрессивная Лидогенерация",
    description:
      "Мы не ждём, мы забираем рынок. Telegram-воронки и мощные веб-интерфейсы захватывают трафик и втягивают пользователя в непрерывный процесс покупки.",
  },
] as const;

const projects: ReadonlyArray<ProjectShowcaseItem> = [
  {
    title: "Akulenok — 10X Конверсия",
    description:
      "Агрессивный лендинг, бьющий точно в цель. Моментальный онбординг, никаких лишних кликов — только продажи.",
    tag: "Доминирование · Бренд",
    href: "https://akulenok-tmz.ru/",
    image: "/placeholder/n1.jpeg",
    linkLabel: "УВИДЕТЬ В ДЕЛЕ",
    preview: {
      src: "/placeholder/video_2026-03-11_21-55-31%20(online-video-cutter.com)%20(2).mp4",
      poster: "/placeholder/n1.jpeg",
      type: "video",
      alt: "Akulenok: интерактивный фрейм с прокруткой сайта",
    },
  },
  {
    title: "Лизинг и точка",
    description:
      "Структура, созданная для того, чтобы забирать деньги у конкурентов. Жесткий оффер, отработка возражений, мощный CTA.",
    tag: "Трафик · Продажи",
    image: "/placeholder/n2.jpeg",
    linkLabel: "ЗАПРОСИТЬ ДОСТУП",
    preview: {
      src: "/placeholder/video_2026-03-11_21-55-31%20(online-video-cutter.com)%20(3).mp4",
      poster: "/placeholder/n2.jpeg",
      type: "video",
      alt: "Лизинг и точка: динамичный просмотр блоков",
    },
  },
  {
    title: "fermerHub",
    description:
      "Корпоративное решение, которое продаёт на высокий чек. Сквозная аналитика и доказательная база, которая закрывает сделки.",
    tag: "B2B · Масштабирование",
    image: "/placeholder/n3.jpeg",
    linkLabel: "ЗАПРОСИТЬ ДОСТУП",
    preview: {
      src: "/placeholder/11.03.2026_22.21.54_REC.mp4",
      poster: "/placeholder/n3.jpeg",
      type: "video",
      alt: "fermerHub: анимированный просмотр слайдов",
    },
  },
];

const processSteps = [
  {
    title: "10X Бриф",
    description:
      "Мы не задаём глупых вопросов. Мы выясняем, где ваши деньги и как их забрать быстрее всего. Формируем оффер, от которого невозможно отказаться.",
  },
  {
    title: "High-End Архитектура",
    description:
      "Пишем код, который работает быстрее ваших конкурентов. Премиум дизайн, никаких тяжелых шаблонов. Только чистый перфоманс.",
  },
  {
    title: "Агрессивный Запуск",
    description:
      "Выкатываем в продакшн. Vercel, SSL, идеальный Lighthouse. Интегрируем ботов и CRM. Готовы принимать трафик с первой секунды.",
  },
  {
    title: "Масштабирование и Доминация",
    description:
      "Анализируем KPI, тестируем гипотезы, внедряем апсейлы. Мы не останавливаемся — мы увеличиваем отрыв от конкурентов.",
  },
] as const;

const pricingPlans = [
  {
    name: "Старт",
    price: "от 12 000 ₽",
    popular: false,
    perks: ["Многоуровневое меню навигации", "Умная форма заявки", "Система мгновенных алертов", "Базовый пульт управления"],
  },
  {
    name: "Бизнес",
    price: "от 25 000 ₽",
    popular: true,
    perks: [
      "Всё из тарифа «Старт»",
      "Интерактивный каталог товаров/услуг",
      "Модуль корзины и чекаута",
      "Прямой биллинг (онлайн-оплата)",
      "Система записи (Букинг)",
      "Экспорт данных",
    ],
  },
  {
    name: "Масштаб",
    price: "от 60 000 ₽",
    popular: false,
    perks: ["Всё из тарифа «Бизнес»", "Полноценный Web-интерфейс (TWA)", "Продвинутый Личный Кабинет", "Сложные фильтры (как на маркетплейсах)", "Бесшовная интеграция с CRM (amoCRM/Битрикс24)"],
  },
] as const;

const additionalModules = [
  { name: "Интеграция с amoCRM / Битрикс24", price: "от 8 000 ₽" },
  { name: "Интеграция ИИ (ChatGPT-ассистент)", price: "от 12 000 ₽" },
  { name: "Подключение онлайн-кассы / Крипты", price: "от 5 000 ₽" },
  { name: "Продвинутая Админ-панель", price: "от 15 000 ₽" },
  { name: "Видео-аватар на входе", price: "от 7 000 ₽" },
  { name: "Реферальная система", price: "от 9 000 ₽" },
  { name: "Сквозная аналитика", price: "от 12 000 ₽" },
  { name: "Push-уведомления (Массовые рассылки)", price: "от 4 000 ₽" },
  { name: "Мультиязычность (i18n)", price: "от 8 000 ₽" },
  { name: "Развертывание на сервере клиента", price: "от 5 000 ₽" },
] as const;

const testimonials = [
  {
    name: "Дарья Акуленок",
    role: "Основатель бренда Akulenok",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    quote:
      "Бот-визитка окупил себя за первые выходные. Настроили сбор заявок, теперь мы не теряем клиентов из Telegram, пока спим. Работают быстро, четко, без воды.",
  },
  {
    name: "Александр Сергеев",
    role: "Владелец розничного магазина",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    quote:
      "Интеграция каталога и корзины в Telegram сработала на отлично. Заказы падают сразу в CRM. Это именно то решение, которое нужно малому бизнесу для быстрого старта.",
  },
  {
    name: "Анна Петрова",
    role: "Директор салона красоты",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026703d",
    quote:
      "Сделали удобную запись на услуги прямо через бота. Клиенты довольны, администратор разгружен. Вложения вернулись буквально за первый месяц работы.",
  },
] as const;
// --- КОНЕЦ ОПРЕДЕЛЕНИЙ КОНСТАНТ ---


export default function Home() {

  return (
    <div className="relative min-h-screen overflow-hidden bg-transparent text-slate-200"><div className="pointer-events-none absolute inset-0">
        <div className="floating-orb top-[-15%] left-[-5%] h-72 w-72 bg-fuchsia-500/30" />
        <div className="floating-orb right-[-10%] top-[20%] h-[22rem] w-[22rem] bg-[#66FCF1]/20" />
        <div className="floating-orb bottom-[-10%] left-1/2 h-80 w-80 -translate-x-1/2 bg-indigo-500/30" />
      </div>

      {/* Hero section removed from padded container so it starts exactly at the top edge */}

      <div className="relative z-10 w-full">
        <Hero />
      </div>
       
      <div className="relative z-10 space-y-24 py-16 md:py-24">

        {/* Секция Юридический щит / Trust Signals */}
        <section id="about" className="scroll-mt-24 container relative overflow-hidden rounded-none border border-white/10 bg-white/[0.02] px-6 py-10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] backdrop-blur-xl animate-fade-in-up md:px-12">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.05),_transparent_70%)]" />
          <div className="relative z-10 grid gap-8 text-center md:grid-cols-3 md:gap-12">
            <div className="flex flex-col items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-none bg-white/5 shadow-inner">
                <Image src="/data-armor.svg" alt="Договор ИП" width={32} height={32} className="h-8 w-8 text-[#66FCF1]" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Работа по договору ИП</h3>
                <p className="mt-2 text-sm text-slate-400">Официально, прозрачно, с закрывающими документами.</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-none bg-white/5 shadow-inner">
                <Image src="/web-architecture.svg" alt="Передача прав на код" width={32} height={32} className="h-8 w-8 text-[#66FCF1]" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">100% права на код</h3>
                <p className="mt-2 text-sm text-slate-400">Полная передача исходников и доступов к серверам.</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-none bg-white/5 shadow-inner">
                <Image src="/ui-ux.svg" alt="Строгое NDA" width={32} height={32} className="h-8 w-8 text-[#66FCF1]" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Строгое NDA</h3>
                <p className="mt-2 text-sm text-slate-400">Защита вашей идеи, клиентской базы и данных.</p>
              </div>
            </div>
          </div>
        </section>


        {/* Секция Услуги (Bento Box) */}
        <section
          id="services"
          className="container relative overflow-hidden rounded-none border border-white/10 bg-[#0F1220]/60 px-6 py-12 shadow-[inset_0_2px_40px_rgba(255,255,255,0.02)] backdrop-blur-3xl animate-fade-in-up md:px-12"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(31,140,255,0.15),_transparent_60%)]" />
          <div className="relative space-y-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8">
              <div className="space-y-4">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 font-mono text-xs uppercase tracking-[0.28em] text-[#66FCF1]">
                  <span className="flex h-2 w-2 rounded-full bg-[#66FCF1] animate-pulse"></span>
                  ВАШ АРСЕНАЛ.EXE
                </span>
                <h2 className="text-3xl font-semibold tracking-tight text-white md:text-5xl font-mono">
                  Что вы <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#66FCF1] to-blue-500">получаете</span>
                </h2>
              </div>
              <p className="max-w-md text-base text-slate-400 md:text-right">
                Я не пишу код ради кода. Я строю цифровые активы, которые приносят прибыль. Вам нужен результат? Пишите. Мы разберем вашу бизнес-модель и сделаем ее в 10 раз эффективнее.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-12 md:grid-rows-2">
              <article className="group relative flex h-full flex-col overflow-hidden rounded-none border border-white/5 bg-gradient-to-b from-white/[0.03] to-white/[0.01] p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] transition-all hover:bg-white/[0.05] hover:shadow-[0_0_40px_rgba(31,140,255,0.1)] md:col-span-8 md:row-span-1">
                 <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-none bg-blue-500/10 text-blue-400">
                   <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                 </div>
                 <h3 className="mb-3 text-2xl font-semibold text-white font-mono">МАШИНА ПРОДАЖ В ТЕЛЕГРАМ</h3>
                 <p className="mb-6 max-w-lg text-slate-400 flex-1">
                   TWA и боты, которые работают как лучшие менеджеры по продажам. Идеальные воронки, автоматизация и CRM-интеграции.
                 </p>
                 <div className="flex gap-2">
                   {['React', 'Vite', 'Zustand'].map(tech => (
                     <span key={tech} className="rounded bg-white/5 px-2 py-1 font-mono text-xs text-slate-300 border border-white/10">{tech}</span>
                   ))}
                 </div>
              </article>

              <article className="group relative flex h-full flex-col overflow-hidden rounded-none border border-white/5 bg-gradient-to-b from-white/[0.03] to-white/[0.01] p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] transition-all hover:bg-white/[0.05] hover:shadow-[0_0_40px_rgba(236,72,153,0.1)] md:col-span-4 md:row-span-1">
                 <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-none bg-pink-500/10 text-pink-400">
                   <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                 </div>
                 <h3 className="mb-3 text-xl font-semibold text-white font-mono">HIGH-END ИНТЕРФЕЙСЫ</h3>
                 <p className="text-slate-400">
                   Безупречный UI/UX, который заставляет покупать. Никаких дешевых шаблонов. Чистый код, эффект стекла и максимальная конверсия.
                 </p>
              </article>

              <article className="group relative flex h-full flex-col overflow-hidden rounded-none border border-white/5 bg-gradient-to-b from-white/[0.03] to-white/[0.01] p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] transition-all hover:bg-white/[0.05] hover:shadow-[0_0_40px_rgba(168,85,247,0.1)] md:col-span-5 md:row-span-1">
                 <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-none bg-purple-500/10 text-purple-400">
                   <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                 </div>
                 <h3 className="mb-3 text-xl font-semibold text-white font-mono">ПРЕМИАЛЬНЫЙ MOTION</h3>
                 <p className="text-slate-400">
                   Ваши клиенты должны испытывать ВАУ-эффект. Плавные GSAP анимации, 3D элементы и видеоаватары, которые продают эмоцию.
                 </p>
              </article>

              <article className="group relative flex h-full flex-col overflow-hidden rounded-none border border-white/5 bg-gradient-to-b from-white/[0.03] to-white/[0.01] p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] transition-all hover:bg-white/[0.05] hover:shadow-[0_0_40px_rgba(20,184,166,0.1)] md:col-span-7 md:row-span-1">
                 <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(20,184,166,0.15),_transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                 <div className="relative z-10 flex flex-col h-full">
                   <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-none bg-teal-500/10 text-teal-400">
                     <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>
                   </div>
                   <h3 className="mb-3 text-2xl font-semibold text-white font-mono">ИСКУССТВЕННЫЙ ИНТЕЛЛЕКТ. ДОМИНАЦИЯ.</h3>
                   <p className="mb-6 text-slate-400 flex-1">
                     Не отставайте от технологий. Внедряем LLM, генерируем премиальный контент (Midjourney + Photoshop) и AI-аватары (Veo3). Оставьте конкурентов в прошлом веке.
                   </p>
                   <div className="flex gap-2 mt-auto">
                     {['ChatGPT', 'Midjourney', 'AI Voice'].map(tech => (
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
          className="container relative overflow-hidden rounded-none border border-white/10 bg-white/[0.03] px-6 py-12 shadow-[0_45px_140px_rgba(14,165,233,0.28)] backdrop-blur-2xl animate-fade-in-up md:px-12" style={{ clipPath: "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)" }}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.24),_transparent_68%)]" />
          <div className="relative space-y-10">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.28em] text-white/60">
                10X АВТОМАТИЗАЦИЯ
              </span>
              <h2 className="text-3xl font-semibold text-white md:text-4xl">
                <TrueFocus sentence="Автоматизируй или умри. Телеграм-боты для бизнеса." manualMode={false} />
              </h2>
              <p className="max-w-2xl text-base text-slate-300 md:text-lg">
                Хватит терять клиентов из-за человеческого фактора. Наши Telegram-боты и связки интегрируются в единый, безотказный механизм генерации прибыли.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {automationServices.map((service) => (
                <article
                  key={service.title}
                  className="group relative h-full overflow-hidden rounded-none border border-white/10 bg-white/[0.05] p-6 shadow-[0_30px_100px_rgba(59,130,246,0.25)] transition-transform duration-500 hover:-translate-y-2 transition-colors group-hover:bg-white/[0.08]"
                >
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.35),_transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative z-10 space-y-3">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-none bg-blue-500/10">
                      <Image src={service.icon} alt={service.title} width={48} height={48} className="h-full w-full object-contain" unoptimized />
                    </div>
                    <h3 className="text-xl font-semibold text-white">{service.title}</h3>
                    <p className="text-sm text-slate-300">{service.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        <div className="animate-fade-in-up">
          <MasterpieceServices />
        </div>

        <div className="animate-fade-in-up">
          <PortfolioShowcase projects={projects} />
        </div>

        {/* Секция Процесс */}
        <section
          className="container relative overflow-hidden rounded-none border border-white/10 bg-white/[0.03] px-6 py-12 shadow-[0_40px_120px_rgba(76,29,149,0.25)] backdrop-blur-2xl animate-fade-in-up md:px-12" style={{ clipPath: "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)" }}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.28),_transparent_70%)]" />
          <div className="relative space-y-10">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.28em] text-white/60">
                10X ПРОЦЕСС
              </span>
              <h2 className="text-3xl font-semibold text-white md:text-4xl">Как мы забираем рынок</h2>
              <p className="max-w-2xl text-base text-slate-300 md:text-lg">
                Никаких долгих согласований. Мы действуем жестко, быстро и на результат. Вы платите за скорость и доминирование.
              </p>
            </div>
            <ol className="grid gap-6 md:grid-cols-4">
              {processSteps.map((step, index) => (
                <li
                  key={step.title}
                  className="group relative h-full overflow-hidden rounded-none border border-white/10 bg-white/[0.05] p-6 shadow-[0_25px_80px_rgba(168,85,247,0.2)] transition-transform duration-500 hover:-translate-y-2 transition-colors group-hover:bg-white/[0.07]"
                >
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(236,72,153,0.3),_transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative z-10 space-y-3">
                    <span className="text-sm font-semibold text-white/60">ФАЗА {index + 1}</span>
                    <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                    <p className="text-sm text-slate-300">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>



        {/* Секция TWA Teaser */}
        <section
          className="container relative overflow-hidden rounded-none border border-[#66FCF1]/30 bg-[#020304] px-6 py-16 shadow-[0_0_50px_rgba(102,252,241,0.1)] md:px-12 my-20 z-10" style={{ clipPath: "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)" }}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(102,252,241,0.1),_transparent_70%)]" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#66FCF1] opacity-5 blur-[100px]" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="space-y-6 max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-none border border-[#66FCF1]/30 bg-[#66FCF1]/5 px-4 py-1 text-xs uppercase tracking-[0.2em] text-[#66FCF1] font-mono">
                TELEGRAM WEB APPS
              </span>
              <h2 className="text-3xl font-mono font-bold text-white md:text-5xl uppercase tracking-wider">
                Сайты <span className="text-red-500 line-through decoration-4 opacity-70">умирают</span>.<br />
                Телеграм — новая <span className="text-[#66FCF1]">монополия</span>.
              </h2>
              <p className="text-lg text-slate-300">
                Загоните клиентов в экосистему, из которой они не захотят выходить. Откажитесь от слива трафика на внешние сайты. Создайте автономный отдел продаж прямо в мессенджере.
              </p>
              <ul className="space-y-2 text-sm font-mono text-slate-400">
                <li className="flex items-center gap-2"><span className="text-[#66FCF1]">✓</span> Конверсия x3 выше стандартных Landing Pages</li>
                <li className="flex items-center gap-2"><span className="text-[#66FCF1]">✓</span> Мгновенный биллинг и push-уведомления (без спам-фильтров)</li>
                <li className="flex items-center gap-2"><span className="text-[#66FCF1]">✓</span> Бесшовная интеграция с ИИ-ассистентами</li>
              </ul>
            </div>

            <div className="w-full md:w-auto flex-shrink-0">
              <a href="/twa" className="group relative inline-flex w-full md:w-auto items-center justify-center gap-3 bg-[#66FCF1] px-8 py-5 font-mono text-lg font-bold text-black uppercase tracking-widest shadow-[0_0_30px_rgba(102,252,241,0.4)] transition-all hover:bg-[#45ece0] hover:shadow-[0_0_50px_rgba(102,252,241,0.6)]" style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%)" }}>
                <span>Войти в TWA-Матрицу</span>
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
                {/* Cyberpunk corner accent */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-black opacity-50" />
              </a>
            </div>
          </div>
        </section>


        {/* Секция Стоимость */}
        <section id="pricing" className="scroll-mt-24 container relative py-20 z-10">
          {/* Добавлен блюр фон для лучшей читаемости текста */}
          <div className="absolute inset-0 z-[-1] bg-slate-950/60 backdrop-blur-xl rounded-[40px] shadow-[0_0_100px_rgba(0,0,0,0.8)] border border-white/5 m-4"></div>

          <div className="space-y-4 mb-12">
            <span className="inline-flex items-center gap-2 rounded-none border border-[#66FCF1]/30 bg-[#66FCF1]/5 px-4 py-1 text-xs uppercase tracking-[0.2em] text-[#66FCF1] font-mono">
              ВЫЧИСЛЕНИЕ СТОИМОСТИ
            </span>
            <h2 className="text-3xl font-mono text-white md:text-5xl uppercase tracking-wider">
              Динамический Прайсинг
            </h2>
          </div>

          {/* Базовые тарифы */}
          <div className="grid gap-8 md:grid-cols-3 mb-16 relative z-10">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-none border p-8 transition-all duration-300 ${
                  plan.popular
                    ? "border-[#66FCF1] bg-[#66FCF1]/5 shadow-[0_0_30px_rgba(102,252,241,0.15)] hover:bg-[#66FCF1]/10"
                    : "border-white/10 bg-white/[0.02] hover:bg-white/[0.05]"
                }`}
                style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)" }}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-[#66FCF1] px-3 py-1 text-[10px] font-bold text-black uppercase tracking-widest">
                    Популярный
                  </div>
                )}
                <div>
                  <h3 className="font-mono text-2xl text-white mb-2 uppercase">{plan.name}</h3>
                  <div className="text-3xl font-bold text-[#66FCF1] mb-6">{plan.price}</div>
                  <ul className="space-y-3 mb-8">
                    {plan.perks.map((perk, i) => (
                      <li key={i} className="flex items-start text-sm text-slate-300">
                        <svg className="w-5 h-5 mr-3 text-[#66FCF1] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="leading-tight">{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Visual anchor point */}
                <div className={`absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 ${plan.popular ? "border-[#66FCF1]" : "border-white/20"} opacity-50`} />
              </div>
            ))}
          </div>

          {/* Дополнительные модули */}
          <div className="mb-16 relative z-10">
            <h3 className="text-xl font-mono text-white uppercase mb-6 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-[#66FCF1]"></span>
              Дополнительные модули
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {additionalModules.map((module, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between border border-white/5 bg-white/[0.01] p-4 hover:border-white/20 transition-colors"
                >
                  <span className="text-sm text-slate-300 font-medium">{module.name}</span>
                  <span className="text-xs font-mono text-[#66FCF1] whitespace-nowrap ml-4 bg-[#66FCF1]/10 px-2 py-1">{module.price}</span>
                </div>
              ))}
            </div>
          </div>

          <DynamicPricing />
        </section>

        {/* Секция Отзывы */}
        <section
          className="container relative overflow-visible rounded-none border border-white/10 bg-white/[0.03] px-6 py-12 shadow-[0_40px_120px_rgba(76,29,149,0.25)] backdrop-blur-2xl animate-fade-in-up md:px-12" style={{ clipPath: "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)" }}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(168,85,247,0.3),_transparent_70%)]" />

          <div className="relative z-20 space-y-10"> {/* Добавляем z-20, чтобы контент был над изображением */}
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.28em] text-white/60">
                ДОКАЗАТЕЛЬСТВА
              </span>
              <h2 className="text-3xl font-semibold text-white md:text-4xl">
                Те, кто уже сделал 10X
              </h2>
              <p className="max-w-2xl text-base text-slate-300 md:text-lg">
                Цифры не лгут. Люди, которые инвестировали в High-End продукты, уже делят прибыль. Ознакомьтесь с фактами.
              </p>
            </div>

            {/* Контейнер для отзывов, чтобы оставить место для талисмана */}
            <div className="grid gap-6 md:grid-cols-3">
              {testimonials.map((testimonial) => (
                <figure
                  key={testimonial.name}
                  className="group relative h-full overflow-hidden rounded-none border border-white/10 bg-white/[0.05] p-6 shadow-[0_25px_80px_rgba(168,85,247,0.2)] transition-transform duration-500 hover:-translate-y-2 transition-colors group-hover:bg-white/[0.07]"
                >
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(236,72,153,0.32),_transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <blockquote className="relative z-10 text-base text-slate-200">
                    “{testimonial.quote}”
                  </blockquote>
                  <figcaption className="relative z-10 mt-6 flex items-center gap-4">
                    <Image src={testimonial.avatar} alt={testimonial.name} width={48} height={48} className="h-12 w-12 rounded-full border-2 border-white/10 object-cover shadow-sm" unoptimized />
                    <div className="space-y-1">
                      <div className="text-sm font-semibold text-white">{testimonial.name}</div>
                      <div className="text-xs text-white/60">
                        {testimonial.role}
                      </div>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          {/* Блок с изображением tal2.webp - Позиционирование в правом верхнем углу, поднято выше */}
          <div
            aria-hidden="true"
            className="absolute top-[-240px] right-[-180px] hidden lg:block z-10 mix-blend-screen"
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
          className="container relative overflow-hidden rounded-none border border-white/10 bg-gradient-to-br from-white/[0.04] via-white/[0.02] to-transparent px-6 py-16 shadow-[0_50px_160px_rgba(14,165,233,0.35)] backdrop-blur-2xl animate-fade-in-up md:grid md:grid-cols-[minmax(0,1fr)_380px] md:gap-12 md:px-12"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(6,182,212,0.28),_transparent_65%)]" />
          <div className="relative space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.28em] text-white/60">
              СВЯЗЬ. ДЕЙСТВИЕ.
            </span>
            <h2 className="text-3xl font-semibold text-white md:text-4xl">
              ВРЕМЯ ДЕЙСТВОВАТЬ. ХВАТИТ ЖДАТЬ.
            </h2>
            <p className="text-base text-slate-300 md:text-lg">
              Оставьте заявку прямо сейчас. Я свяжусь с вами, и мы построим стратегию доминации в вашей нише. Без воды. Только бизнес.
            </p>
            <ul className="space-y-2 text-sm text-slate-300 md:text-base">
              <li>
                • Telegram:
                <a
                  className="ml-1 inline-flex items-center gap-1 text-[#66FCF1] underline decoration-dotted underline-offset-4 transition hover:text-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#66FCF1]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050816]"
                  href="https://t.me/peexthree"
                  target="_blank"
                  rel="noreferrer"
                >
                  @peexthree
                </a>
              </li>
              <li>• Email: linderop@yandex.ru</li>
              <li>• Скорость реакции: Молниеносная (в рабочее время)</li>
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
