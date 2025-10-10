import Image from "next/image";
import Link from "next/link";

import { ContactForm } from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import { Hero, type HeroHighlight } from "@/components/sections/Hero";

const heroHighlights: ReadonlyArray<HeroHighlight> = [
  {
    title: "Продуманный оффер",
    description: "Выделяем ценность и триггеры доверия для рекламы и органики.",
  },
  {
    title: "Верстка без перегруза",
    description: "Чистый React + Tailwind, адаптив под мобильные и Retina-экраны.",
  },
  {
    title: "Готовность к аналитике",
    description: "UTM, цели, пиксели — всё настроено для запуска кампаний.",
  },
  {
    title: "Доставка за 5 дней",
    description: "От брифа до деплоя на Vercel с автоматическими проверками.",
  },
] as const;

const benefits = [
  {
    title: "Лидогенерация",
    description: "Строим структуру по воронке: оффер, доверие, CTA, социальные доказательства.",
    index: "01",
  },
  {
    title: "Скорость",
    description: "Параллельная работа по контенту и разработке. MVP запускается за 3–5 дней.",
    index: "02",
  },
  {
    title: "Чистый код",
    description: "Next.js 15, строгий TypeScript, автоматические проверки и статическая оптимизация.",
    index: "03",
  },
] as const;

interface ProjectCard {
  title: string;
  description: string;
  tag: string;
  image: string;
  linkLabel: string;
  href?: string;
}

const projects: ReadonlyArray<ProjectCard> = [
  {
    title: "Akulenok — сайт-визитка",
    description: "Минималистичный лендинг с высокой конверсией и быстрым onboardingом.",
    tag: "Landing · Бренд",
    href: "https://akulenok-tmz.ru/",
    image: "/placeholder/1.jpg",
    linkLabel: "Смотреть сайт",
  },
  {
    title: "Лендинг услуги",
    description: "Готовая к рекламе структура: оффер, боли, решение, отзывы и частые вопросы.",
    tag: "Leadgen · Промо",
    image: "/placeholder/2.jpg",
    linkLabel: "Ссылка по запросу",
  },
  {
    title: "Лендинг под трафик",
    description: "B2B-решение с интеграцией аналитики и кастомным конструктором кейсов.",
    tag: "B2B · Услуги",
    image: "/placeholder/3.jpg",
    linkLabel: "Ссылка по запросу",
  },
];

const processSteps = [
  {
    title: "Бриф",
    description: "Цели, аудитория, ключевые смыслы. Помогаем сформулировать сильный оффер.",
  },
  {
    title: "Дизайн",
    description: "Создаём в коде: используем UI-паттерны reactbits, анимации и микровзаимодействия.",
  },
  {
    title: "Запуск",
    description: "Домен, Vercel, SSL, аналитика. Подключаем Telegram-бота и CRM по запросу.",
  },
  {
    title: "Оптимизация",
    description: "Отслеживаем KPI, тестируем гипотезы, подготавливаем план апгрейдов.",
  },
] as const;

const pricingPlans = [
  {
    name: "Старт",
    price: "от 25 000 ₽",
    popular: false,
    perks: [
      "1 экран + CTA",
      "Быстрый MVP-запуск",
      "Базовая аналитика",
    ],
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
    perks: [
      "Индивидуальный UI",
      "Анимации, кейсы, блог",
      "A/B-эксперименты",
    ],
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
    <div className="space-y-24 py-16 md:py-24">
      <Hero highlights={heroHighlights} />

      <section id="benefits" className="container space-y-10">
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold text-neutral-900 md:text-[32px] md:leading-[1.2]">
            Почему это работает
          </h2>
          <p className="max-w-2xl text-lg text-neutral-600">
            Комбинируем маркетинговую стратегию, строгий TypeScript и визуальные эффекты, чтобы получать заявки, а не лайки.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {benefits.map((benefit) => (
            <article
              key={benefit.title}
              className="group relative flex h-full flex-col gap-3 overflow-hidden rounded-2xl border border-neutral-200 bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-[0_30px_60px_rgba(15,23,42,0.12)]"
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: "radial-gradient(circle at top, rgba(14,165,233,0.15), transparent 70%)" }} />
              <div className="relative z-10 text-sm font-semibold text-brand-600">{benefit.index}</div>
              <h3 className="relative z-10 text-xl font-semibold text-neutral-900">{benefit.title}</h3>
              <p className="relative z-10 text-neutral-600">{benefit.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="portfolio" className="container space-y-10">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-semibold text-neutral-900 md:text-[32px] md:leading-[1.2]">
              Недавние проекты
            </h2>
            <p className="text-neutral-500">Настоящие ссылки — по запросу. Ниже часть публичных работ.</p>
          </div>
          <span className="text-sm text-neutral-500">Ещё кейсы обсудим при созвоне</span>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.title}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-[0_35px_70px_rgba(15,23,42,0.14)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}

                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(min-width: 1024px) 350px, (min-width: 768px) 45vw, 90vw"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />
              </div>
              <div className="relative flex flex-1 flex-col gap-3 p-6">
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-400">
                  {project.tag}
                </span>
                <h3 className="text-lg font-semibold text-neutral-900">{project.title}</h3>
                <p className="flex-1 text-sm text-neutral-600">{project.description}</p>
                {project.href ? (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-brand-600 underline decoration-dotted underline-offset-4 transition hover:text-brand-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white"


                  >
                    {project.linkLabel}
                  </a>
                ) : (
                  <span className="text-sm text-neutral-400">{project.linkLabel}</span>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="process" className="container space-y-10">
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold text-neutral-900 md:text-[32px] md:leading-[1.2]">
            Как идёт работа
          </h2>
          <p className="max-w-2xl text-lg text-neutral-600">
            Прозрачный пайплайн: понятные этапы, быстрые ревью, никаких «ещё недельку на дизайн».
          </p>
        </div>
        <ol className="grid gap-6 md:grid-cols-4">
          {processSteps.map((step, index) => (
            <li
              key={step.title}
              className="group relative flex h-full flex-col gap-3 overflow-hidden rounded-2xl border border-neutral-200 bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-[0_30px_60px_rgba(15,23,42,0.12)]"
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: "radial-gradient(circle at top, rgba(14,165,233,0.18), transparent 75%)" }} />
              <div className="relative z-10 text-sm font-semibold text-brand-600">Шаг {index + 1}</div>
              <h3 className="relative z-10 text-lg font-semibold text-neutral-900">{step.title}</h3>
              <p className="relative z-10 text-sm text-neutral-600">{step.description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="pricing" className="container space-y-10">
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold text-neutral-900 md:text-[32px] md:leading-[1.2]">
            Стоимость и пакеты
          </h2>
          <p className="max-w-2xl text-lg text-neutral-600">
            Каждый тариф можно кастомизировать под ваши задачи: дополнительные блоки, интеграции, мультиязычность.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {pricingPlans.map((plan) => (
            <article
              key={plan.name}
              className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-[0_30px_70px_rgba(15,23,42,0.14)] ${plan.popular ? "border-brand-200 ring-1 ring-brand-200" : "border-neutral-200"}`}
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: "radial-gradient(circle at top, rgba(14,165,233,0.15), transparent 75%)" }} />
              <div className="relative z-10 flex flex-col gap-4">
                <div>
                  <span className="text-sm font-semibold uppercase tracking-[0.25em] text-neutral-400">
                    {plan.name}

                  </span>
                  <p className="mt-3 text-3xl font-semibold text-neutral-900">{plan.price}</p>
                </div>
                <ul className="space-y-2 text-sm text-neutral-600">
                  {plan.perks.map((perk) => (
                    <li key={perk}>• {perk}</li>
                  ))}
                </ul>
                <Button
                  asChild
                  className="mt-auto inline-flex w-full justify-center rounded-xl2 bg-brand-500 py-3 text-base font-semibold text-white shadow-[0_18px_45px_rgba(14,165,233,0.28)] transition-transform duration-300 ease-out hover:-translate-y-0.5 hover:bg-brand-400 hover:shadow-[0_20px_55px_rgba(14,165,233,0.45)]"
                >
                  <Link href="#contact">Хочу такой</Link>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="reviews" className="container space-y-10">
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold text-neutral-900 md:text-[32px] md:leading-[1.2]">
            Что говорят клиенты
          </h2>
          <p className="max-w-2xl text-lg text-neutral-600">
            Работаем прозрачно: регулярные созвоны, понятные отчёты по аналитике, быстро реагируем на гипотезы.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <figure
              key={testimonial.name}
              className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-neutral-200 bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-[0_30px_60px_rgba(15,23,42,0.12)]"
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: "radial-gradient(circle at top, rgba(14,165,233,0.12), transparent 70%)" }} />
              <blockquote className="relative z-10 text-neutral-600">“{testimonial.quote}”</blockquote>
              <figcaption className="relative z-10 mt-4">
                <div className="text-sm font-semibold text-neutral-900">{testimonial.name}</div>
                <div className="text-xs uppercase tracking-[0.25em] text-neutral-400">{testimonial.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section id="contact" className="container grid gap-12 rounded-2xl border border-neutral-200 bg-neutral-50 px-6 py-16 shadow-soft md:grid-cols-[minmax(0,1fr)_400px] md:px-12">
        <div className="space-y-6">
          <h2 className="text-3xl font-semibold text-neutral-900 md:text-[32px] md:leading-[1.2]">
            Заполните заявку — и обсудим проект
          </h2>
          <p className="text-lg text-neutral-600">
            Отвечаю в течение рабочего дня. Подготовлю структуру, бюджет и таймлайн, а также варианты апсейлов.
          </p>
          <ul className="space-y-2 text-neutral-600">
            <li>
              • Telegram:
              <a
                className="ml-1 inline-flex items-center gap-1 text-brand-600 underline decoration-dotted underline-offset-4 transition hover:text-brand-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-50"
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
        <ContactForm />
      </section>
    </div>
  );
}