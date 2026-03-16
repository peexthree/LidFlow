import re

with open('app/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace pricingPlans array definition
old_pricing_def = """const pricingPlans = [
  {
    name: "Быстрый Старт",
    price: "от 25 000 ₽",
    popular: false,
    perks: ["MVP за считанные дни", "Мощный оффер + CTA", "Базовая связка аналитики"],
  },
  {
    name: "Полное Доминирование",
    price: "от 45 000 ₽",
    popular: true,
    perks: [
      "5–7 высококонверсионных экранов",
      "TG-бот + Интеграции под ключ",
      "Сразу готов к жесткому трафику",
    ],
  },
  {
    name: "10X Масштабирование",
    price: "от 75 000 ₽",
    popular: false,
    perks: ["Premium Motion & 3D", "AI Интеграции & Автоматизация", "Пожизненное A/B тестирование"],
  },
] as const;"""

new_pricing_def = """const pricingPlans = [
  {
    name: "Старт",
    price: "от 15 000 ₽",
    popular: false,
    perks: ["Бот-визитка / Лидогенератор", "Сбор заявок", "Базовая поддержка", "Быстрый старт за 2 дня"],
  },
  {
    name: "Бизнес",
    price: "от 45 000 ₽",
    popular: true,
    perks: [
      "Полноценный бот для продаж",
      "Каталог товаров и услуг",
      "Интеграция с корзиной (E-commerce)",
      "Индивидуальная логика",
    ],
  },
  {
    name: "Масштаб",
    price: "от 90 000 ₽",
    popular: false,
    perks: ["Полноценный Telegram WebApp", "Индивидуальный UI/UX дизайн", "Магазин / Запись на услуги", "Сложные интеграции"],
  },
] as const;

const additionalModules = [
  { name: "Интеграция с amoCRM / Битрикс24", price: "от 15 000 ₽" },
  { name: "Интеграция ИИ (ChatGPT-ассистент)", price: "от 20 000 ₽" },
  { name: "Подключение онлайн-кассы (ЮKassa)", price: "от 5 000 ₽" },
  { name: "Базовая Админ-панель", price: "от 15 000 ₽" },
  { name: "Фильтр антимата / Приветствие", price: "от 3 000 ₽" },
  { name: "Развертывание на сервере клиента", price: "от 8 000 ₽" },
] as const;"""

content = content.replace(old_pricing_def, new_pricing_def)

# Add Upsell UI right below the Pricing cards
old_pricing_ui = """            <div className="grid gap-6 md:grid-cols-3">
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
                      <Link href="#contact">НАЧАТЬ ЭКСПАНСИЮ</Link>
                    </Button>
                  </div>
                </article>
              ))}
            </div>"""

new_pricing_ui = """            <div className="grid gap-6 md:grid-cols-3">
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
                      <Link href="#contact">НАЧАТЬ РАБОТУ</Link>
                    </Button>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.02] p-6 shadow-inner md:p-8">
              <h3 className="mb-6 text-xl font-semibold text-white md:text-2xl">Дополнительные модули</h3>
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {additionalModules.map((module) => (
                  <li key={module.name} className="flex items-center justify-between rounded-xl bg-white/5 p-4 transition-colors hover:bg-white/10">
                    <span className="text-sm font-medium text-slate-300">{module.name}</span>
                    <span className="whitespace-nowrap rounded-md bg-white/10 px-2.5 py-1 text-xs font-semibold text-cyan-300">{module.price}</span>
                  </li>
                ))}
              </ul>
            </div>"""

content = content.replace(old_pricing_ui, new_pricing_ui)

# Make heading less snobby
content = content.replace('Цена Доминирования', 'Тарифы и Инвестиции')

with open('app/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
