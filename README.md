# LidFlow — Scroll Experience

Продакшн-страница на **Next.js 15**, **React 19** и **TypeScript** с современными скролл-анимациями: Lenis для плавности, framer-motion для
контента, GSAP ScrollTrigger для параллаксов и лёгкий Three.js фон. Код разделён на переиспользуемые секции и утилиты для быстрой
кастомизации эффектов.

## Стек и библиотеки

- Next.js 15 (App Router) + строгий TypeScript
- Tailwind CSS 3.4 с кастомными токенами и `tailwind-merge`
- framer-motion 11, react-intersection-observer для входа секций
- GSAP 3 + ScrollTrigger, Lenis для плавного скролла
- Three.js с @react-three/fiber и @react-three/drei для фоновых частиц

## Структура

```
src/
  components/
    AnimatedSection.tsx   // универсальный контейнер с motion-пресетами
    ParallaxSection.tsx   // GSAP ScrollTrigger с управлением слоями
    ScrollProgress.tsx    // индикатор прокрутки
    ThreeBackground.tsx   // галактический фон на three.js
    useLenis.ts           // хук инициализации Lenis
  sections/
    Hero.tsx
    Features.tsx
    Gallery.tsx
    CTA.tsx
    Home.tsx              // сборка главной страницы
  utils/
    gsapClient.ts
    motionPresets.ts
    splitText.tsx
    useMediaQuery.ts
  styles/
    globals.css           // Tailwind + стили для split-text
```

- `ANIMATION_CONFIG` и `motionPresets` находятся в `src/utils/motionPresets.ts`. Меняйте длительности, easing и дистанцию анимаций в одном месте.
- Для маскирующих эффектов и split-text используйте утилиту `SplitText` (`src/utils/splitText.tsx`).
- Параллакс слои задаются пропсом `layers` у `ParallaxSection`: скорость (`speed`) и класс `className`/`content` для оформления.

## Управление эффектами

- **Lenis**: автоматически отключается при `prefers-reduced-motion`. Для жёсткого отключения удалите вызов `useLenis()` из `Home.tsx`.
- **ThreeBackground**: не рендерится на мобильных (`max-width: 768px`) и при coarse pointer. Измените условия в компоненте, чтобы включить на всех устройствах.
- **ScrollTrigger**: регистрируется в `gsapClient.ts` только на клиенте. Для добавления собственных триггеров вызывайте `getGsap()` и работайте внутри `gsap.context`.
- **AnimatedSection**: принимает пропсы `motion`, `direction`, `duration`, `delay`, `threshold`, `once`. На мобильных автоматически уменьшает длительность и дистанции на 20%.

## Запуск и проверки

```bash
npm install
npm run dev
```

Перед деплоем убедитесь, что сборка и линт проходят без ошибок:

```bash
npm run lint
npm run build
```

## Тюнинг и расширение

- Добавляйте новые секции в `src/sections` и подключайте их в `Home.tsx`.
- Для новых split-text заголовков используйте `<SplitText text="..." stagger={0.04} />`.
- Чтобы настроить цвета/градиенты, отредактируйте Tailwind токены в `tailwind.config.ts` и стили в `src/styles/globals.css`.

## Контакты

- Telegram: [@your_username](https://t.me/your_username)
- Email: hello@lidflow.site