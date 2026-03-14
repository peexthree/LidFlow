import { masterpieceServices } from "@/utils/content";
import Link from "next/link";

export function MasterpieceServices() {
  return (
    <section
      id="masterpiece"
      className="container relative overflow-hidden rounded-3xl border border-white/10 bg-[#0F1220]/60 px-6 py-12 shadow-[inset_0_2px_40px_rgba(255,255,255,0.02)] backdrop-blur-3xl animate-fade-in-up md:px-12"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(236,72,153,0.15),_transparent_60%)]" />
      <div className="relative space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 font-mono text-xs uppercase tracking-[0.28em] text-pink-400">
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

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {masterpieceServices.map((service) => (
            <Link
              href="#contact"
              key={service.title}
              className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-b from-white/[0.03] to-white/[0.01] p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] transition-all hover:bg-white/[0.05] hover:shadow-[0_0_40px_rgba(236,72,153,0.1)] hover:-translate-y-1"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(236,72,153,0.15),_transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 border border-white/10 p-3 shadow-inner group-hover:scale-110 transition-transform duration-500">
                  <img src={service.icon} alt={service.title} className="h-full w-full object-contain" />
                </div>
                <h3 className="mb-3 text-lg font-semibold text-white font-mono leading-tight">{service.title}</h3>
                <p className="text-sm text-slate-400 flex-1 leading-relaxed">
                  {service.description}
                </p>

                <div className="mt-6 flex items-center text-xs font-mono text-pink-400 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <span className="mr-2">ОБСУДИТЬ ПРОЕКТ</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
