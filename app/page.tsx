import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "@/components/ui/icons";

export default function Home() {
  return (
    <section className="container py-20">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl md:text-6xl font-semibold leading-tight">
            Дизайн как в Figma — <span className="text-brand-600">но прямо в коде</span>
          </h1>
          <p className="mt-6 text-lg text-neutral-600">
            Собирайте лендинги из готовых блоков, настраивайте стили, экспортируйте.
            Никакой Figma — всё на TypeScript, React и Tailwind.
          </p>
          <div className="mt-8 flex gap-4">
            <Button asChild>
              <Link href="/designer">Открыть дизайнер <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button variant="ghost" asChild>
              <a href="https://vercel.com/docs">Документация Vercel</a>
            </Button>
          </div>
          <ul className="mt-10 grid sm:grid-cols-2 gap-3 text-sm text-neutral-600">
            <li className="p-3 rounded-xl border shadow-soft">Библиотека блоков (Hero, Features, Gallery, CTA)</li>
            <li className="p-3 rounded-xl border shadow-soft">Визуальные настройки (цвета, сетка, отступы)</li>
            <li className="p-3 rounded-xl border shadow-soft">Экспорт JSON схемы и страницы</li>
            <li className="p-3 rounded-xl border shadow-soft">Готов к деплою на Vercel</li>
          </ul>
        </div>
        <div className="rounded-2xl border shadow-soft p-6">
          <video autoPlay muted loop playsInline className="rounded-xl w-full">
            <source src="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4" type="video/mp4" />
          </video>
          <p className="text-center text-sm text-neutral-500 mt-2">Демо-анимация</p>
        </div>
      </div>
    </section>
  );
}
