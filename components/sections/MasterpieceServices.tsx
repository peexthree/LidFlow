import { masterpieceServices } from "@/utils/content";
import Link from "next/link";
import Image from "next/image";

export function MasterpieceServices() {
  // Duplicating the array to create a seamless infinite scroll effect
  const repeatedServices = [...masterpieceServices, ...masterpieceServices];

  return (
    <section
      id="masterpiece"
      className="container relative overflow-hidden rounded-3xl border border-white/10 bg-[#0F1220]/60 px-0 py-12 shadow-[inset_0_2px_40px_rgba(255,255,255,0.02)] backdrop-blur-3xl animate-fade-in-up sm:px-0"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(236,72,153,0.15),_transparent_60%)]" />

      <div className="relative space-y-10 px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 font-mono text-xs uppercase tracking-[0.15em] text-pink-400">
              <span className="flex h-2 w-2 rounded-full bg-pink-400 animate-pulse"></span>
              MASTERPIECE.OS
            </span>
            <h2 className="text-3xl font-semibold tracking-tight text-white md:text-5xl font-mono">
              Реестр <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">High-Ticket</span> услуг
            </h2>
          </div>
          <p className="max-w-md text-base text-slate-400 md:text-right">
            Визуальные триггеры для закрытия конкретных болей вашего бизнеса и увеличения прибыли x10.
          </p>
        </div>
      </div>

      {/* Бесконечная карусель */}
      <div className="relative w-full overflow-hidden mt-10">
        {/* Градиенты по краям для плавного исчезновения */}
        <div className="absolute left-0 top-0 bottom-0 z-10 w-12 md:w-32 bg-gradient-to-r from-[#0F1220] to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 z-10 w-12 md:w-32 bg-gradient-to-l from-[#0F1220] to-transparent pointer-events-none" />

        <div className="flex w-[200%] md:w-[200%] lg:w-max animate-infinite-scroll hover:[animation-play-state:paused] gap-6 px-6 md:px-12 pb-8">
          {repeatedServices.map((service, idx) => (
            <Link
              href="#contact"
              key={`${service.title}-${idx}`}
              // Фиксированная ширина карточек: по 3 на десктопе, 1-2 на мобильных
              className="group relative flex h-[320px] w-[300px] shrink-0 md:w-[350px] lg:w-[400px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-6 shadow-[0_15px_40px_rgba(236,72,153,0.1)] transition-all hover:-translate-y-2 hover:bg-white/[0.08] hover:shadow-[0_25px_50px_rgba(236,72,153,0.2)] backdrop-blur-xl"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(236,72,153,0.2),_transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 border border-white/10 p-2 shadow-inner group-hover:scale-110 group-hover:bg-white/10 transition-transform duration-500">
                  <Image src={service.icon} alt={service.title} width={32} height={32} className="h-full w-full object-contain drop-shadow-md" />
                </div>

                <h3 className="mb-3 text-lg font-semibold text-white font-mono leading-[1.2]">{service.title}</h3>
                <p className="text-sm text-slate-400 flex-1 leading-[1.5] line-clamp-4 group-hover:text-slate-300 transition-colors">
                  {service.description}
                </p>

                <div className="mt-6 flex items-center text-xs font-mono font-bold text-pink-400 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <span className="mr-2 uppercase tracking-wider">Обсудить проект</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
