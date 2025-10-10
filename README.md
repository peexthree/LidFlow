# LidFlow — Code‑first Designer

Минималистичный конструктор лендингов **без Figma**. Управление блоками в визуальном интерфейсе, экспорт JSON схемы, современный стек (Next.js 15, React 19, Tailwind).

## Запуск локально

```bash
pnpm i   # или npm i / yarn
pnpm dev # http://localhost:3000
```

## Деплой на Vercel
1. Создайте новый проект на Vercel и импортируйте этот репозиторий (GitHub).
2. Build Command: `next build`
3. Output: `.next`
4. Нажмите Deploy — всё.

## Страницы
- `/` — маркетинговая главная
- `/designer` — визуальный дизайнер блоков

## Заметки
- Блоки в `components/blocks/*`
- Конфигурация страницы в `lib/blocks.tsx`
- Tailwind theme: `tailwind.config.ts`
