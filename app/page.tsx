import Link from "next/link";
import { clsx } from "clsx";

import { ContactForm } from "@/components/ContactForm";
import { Hero, type HeroHighlight } from "@/components/sections/Hero";
import { PortfolioShowcase, type ProjectShowcaseItem } from "@/components/sections/PortfolioShowcase";
import { ElectricBorder } from "@/components/ui/ElectricBorder";
import { Button } from "@/components/ui/button";
import { paletteStyle } from "@/utils/electricPalettes";

const heroHighlights: ReadonlyArray<HeroHighlight> = [
  {
    title: "Современные технологии",
    description:
      "Адаптивный Next.js 15, оптимизация Core Web Vitals и мгновенные обновления.",
  },
  {
    title: "Высокая конверсия",
    description:
      "Структура блоков проверена на реальных кейсах и усилена A/B-паттернами.",
  },
  {
    title: "Быстрый запуск",
    description:
      "Настраиваем домен, деплой на Vercel и подключаем аналитику без лишней бюрократии.",
  },
];

const benefits = [
  {
    title: "Скорость",
    description: "Код чистый, бандл маленький, загрузка мгновенная. Google любит.",
    index: "01",
  },
  {
    title: "Дизайн",
    description: "Взаимодействия и анимации, которые продают, а не отвлекают.",
    index: "02",
  },
  {
    title: "Цена",
    description: "Нет посредников. Прямая работа с разработчиком.",
    index: "03",
  },
];

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

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050816] text-slate-200">
      <div className="pointer-events-none absolute inset-0">
        <div className="floating-orb top-[-15%] left-[-5%] h-72 w-72 bg-fuchsia-500/30" />
        <div className="floating-orb right-[-10%] top-[20%] h-[22rem] w-[22rem] bg-cyan-500/20" />
        <div className="floating-orb bottom-[-10%] left-1/2 h-80 w-80 -translate-x-1/2 bg-indigo-500/30" />
      </div>

      <div className="relative z-10 space-y-24 py-16 md:py-24">
        <div className="animate-scale-in">
          <Hero highlights={heroHighlights} />
        </div>

        <section className="container relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-12 shadow-[0_40px_120px_rgba(76,29,149,0.25)] backdrop-blur-2xl md:px-12 animate-fade-in-up">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(168,85,247,0.35),_transparent_65%)] opacity-90" />
          <div className="relative space-y-10">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="space-y-4">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.28em] text-white/60">
                  Преимущества
                </span>
                <h2 className="text-3xl font-semibold text-white md:text-4xl">
                  Почему это работает
                </h2>
                <p className="max-w-2xl text-base text-slate-300 md:text-lg">
                  Комбинируем маркетинговую стратегию, строгий TypeScript и визуальные эффекты, чтобы получать заявки, а не лайки.
                </p>
              </div>
              <div className="grid gap-3 text-right text-sm text-white/60 md:text-base">
                <span>Прозрачные сроки — от 7 дней до запуска</span>
                <span>Работаем напрямую, без лишних согласований</span>
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {benefits.map((benefit) => (
                <ElectricBorder
                  key={benefit.title}
                  as="article"
                  className="group relative h-full transition-transform duration-500 hover:-translate-y-2 [--electric-radius:1.5rem]"
                  contentClassName="relative z-10 flex h-full flex-col overflow-hidden bg-white/[0.05] p-6 shadow-[0_25px_80px_rgba(14,165,233,0.18)] transition-colors duration-500 group-hover:bg-white/[0.07]"
                  style={paletteStyle("cyan")}
                >
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.35),_transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative z-10 space-y-3">
                    <span className="text-sm font-semibold uppercase tracking-[0.28em] text-white/50">
                      {benefit.index}
                    </span>
                    <h3 className="text-xl font-semibold text-white">{benefit.title}</h3>
                    <p className="text-sm text-slate-300">{benefit.description}</p>
                  </div>
                </ElectricBorder>
              ))}
            </div>
          </div>
        </section>

        <PortfolioShowcase projects={projects} />

        <section className="container relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-12 shadow-[0_40px_120px_rgba(76,29,149,0.25)] backdrop-blur-2xl md:px-12 animate-fade-in-up">
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
                <ElectricBorder
                  key={step.title}
                  as="li"
                  className="group relative h-full transition-transform duration-500 hover:-translate-y-2 [--electric-radius:1.5rem]"
                  contentClassName="relative z-10 flex h-full flex-col justify-between overflow-hidden bg-white/[0.05] p-6 shadow-[0_25px_80px_rgba(168,85,247,0.2)] transition-colors duration-500 group-hover:bg-white/[0.07]"
                  style={paletteStyle("violet")}
                >
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(236,72,153,0.3),_transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative z-10 space-y-3">
                    <span className="text-sm font-semibold text-white/60">Шаг {index + 1}</span>
                    <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                    <p className="text-sm text-slate-300">{step.description}</p>
                  </div>
                </ElectricBorder>
              ))}
            </ol>
          </div>
        </section>

        <section className="container relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-12 shadow-[0_45px_140px_rgba(14,165,233,0.28)] backdrop-blur-2xl md:px-12 animate-fade-in-up">
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
                <ElectricBorder
                  key={plan.name}
                  as="article"
                  className="group relative h-full transition-transform duration-500 hover:-translate-y-2 [--electric-radius:1.5rem]"
                  contentClassName={clsx(
                    "relative z-10 flex h-full flex-col gap-6 overflow-hidden p-6 shadow-[0_30px_100px_rgba(6,182,212,0.25)] transition-colors duration-500",
                    plan.popular
                      ? "bg-gradient-to-b from-cyan-400/20 via-transparent to-transparent"
                      : "bg-white/[0.05]"
                  )}
                  style={paletteStyle(plan.popular ? "cyan" : "blue")}
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
                </ElectricBorder>
              ))}
            </div>
          </div>
        </section>

        <section className="container relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-12 shadow-[0_40px_120px_rgba(76,29,149,0.25)] backdrop-blur-2xl md:px-12 animate-fade-in-up">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(168,85,247,0.3),_transparent_70%)]" />
          <div className="relative space-y-10">
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
            <div className="grid gap-6 md:grid-cols-3">
              {testimonials.map((testimonial) => (
                <ElectricBorder
                  key={testimonial.name}
                  as="figure"
                  className="group relative h-full transition-transform duration-500 hover:-translate-y-2 [--electric-radius:1.5rem]"
                  contentClassName="relative z-10 flex h-full flex-col justify-between overflow-hidden bg-white/[0.05] p-6 shadow-[0_25px_80px_rgba(168,85,247,0.2)] transition-colors duration-500 group-hover:bg-white/[0.07]"
                  style={paletteStyle("violet")}
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
                </ElectricBorder>
              ))}
            </div>
          </div>
        </section>

        <section className="container relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] via-white/[0.02] to-transparent px-6 py-16 shadow-[0_50px_160px_rgba(14,165,233,0.35)] backdrop-blur-2xl md:grid md:grid-cols-[minmax(0,1fr)_380px] md:gap-12 md:px-12 animate-fade-in-up">
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
