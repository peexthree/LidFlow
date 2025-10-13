import Image from "next/image";
import { clsx } from "clsx";

import { ElectricBorder } from "@/components/ui/ElectricBorder";
import type { ElectricPaletteKey } from "@/utils/electricPalettes";
import { paletteStyle } from "@/utils/electricPalettes";

export type ProjectShowcaseItem = {
  title: string;
  description: string;
  tag: string;
  image: string;
  linkLabel: string;
  href?: string;
};

type PortfolioShowcaseProps = {
  projects: ReadonlyArray<ProjectShowcaseItem>;
};

const accentSequence: ReadonlyArray<ElectricPaletteKey> = ["blue", "cyan", "violet"];

const linkAccent = [
  "text-cyan-200 hover:text-cyan-100",
  "text-sky-200 hover:text-sky-100",
  "text-indigo-200 hover:text-indigo-100",
] as const;

const badgeAccent = [
  "bg-gradient-to-r from-cyan-500/30 via-sky-500/20 to-transparent text-cyan-100",
  "bg-gradient-to-r from-fuchsia-500/25 via-blue-500/20 to-transparent text-sky-100",
  "bg-gradient-to-r from-amber-400/30 via-rose-400/20 to-transparent text-amber-100",
] as const;

/**
 * Витрина портфолио с электрическими рамками и свечением, повторяющая композицию из референса.
 */
export function PortfolioShowcase({ projects }: PortfolioShowcaseProps) {
  return (
    <section className="container relative overflow-hidden rounded-[38px] border border-white/10 bg-gradient-to-br from-[#050b1f] via-[#040616] to-[#02030a] px-6 py-16 shadow-[0_60px_160px_rgba(30,64,175,0.45)] backdrop-blur-3xl md:px-16">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-16 top-1/4 h-72 w-72 rounded-full bg-cyan-500/25 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-blue-600/20 blur-[140px]" />
        <div className="absolute -right-10 top-10 h-64 w-64 rounded-full bg-fuchsia-500/20 blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.12),_transparent_60%)]" />
      </div>

      <div className="relative z-10 space-y-12">
        <header className="flex flex-col gap-5 text-white lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.32em] text-white/60">
              Портфолио
            </span>
            <div className="space-y-3">
              <h2 className="text-3xl font-semibold md:text-4xl">Недавние проекты</h2>
              <p className="max-w-2xl text-base text-white/70 md:text-lg">
                Настоящие ссылки — по запросу. Ниже часть публичных работ.
              </p>
            </div>
          </div>
          <span className="text-sm text-white/60">Ещё кейсы обсудим при созвоне</span>
        </header>

        <div className="grid gap-6 lg:grid-cols-3">
          {projects.map((project, index) => {
            const palette = accentSequence[index % accentSequence.length] ?? "blue";
            const linkClass = linkAccent[index % linkAccent.length] ?? linkAccent[0];
            const badgeClass = badgeAccent[index % badgeAccent.length] ?? badgeAccent[0];

            return (
              <ElectricBorder
                key={project.title}
                as="article"
                className="group relative h-full transition-transform duration-500 hover:-translate-y-3 [--electric-radius:1.75rem]"
                contentClassName="relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/5 bg-white/[0.03] p-6 shadow-[0_45px_140px_rgba(37,99,235,0.22)] backdrop-blur-xl transition-colors duration-500 group-hover:bg-white/[0.06]"
                style={paletteStyle(palette)}
              >
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.35),_transparent_65%)]" />
                </div>
                <div className="relative flex flex-1 flex-col gap-6">
                  <div className="relative overflow-hidden rounded-[1.2rem] border border-white/10">
                    <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#040b22] via-transparent to-transparent" />
                    <div className="absolute inset-0 z-10 opacity-0 transition duration-500 group-hover:opacity-60" />
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition duration-700 ease-out group-hover:scale-110"
                      sizes="(min-width: 1280px) 320px, (min-width: 1024px) 28vw, (min-width: 768px) 45vw, 90vw"
                    />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.32),_transparent_70%)] opacity-0 mix-blend-screen transition duration-500 group-hover:opacity-100" />
                  </div>

                  <div className="flex flex-1 flex-col gap-4">
                    <span className={clsx("inline-flex max-w-max items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em]", badgeClass)}>
                      {project.tag}
                    </span>
                    <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                    <p className="flex-1 text-sm leading-relaxed text-white/70">{project.description}</p>

                    {project.href ? (
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noreferrer"
                        className={clsx(
                          "inline-flex items-center gap-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050816]",
                          linkClass,
                          "focus-visible:ring-cyan-300/60"
                        )}
                      >
                        {project.linkLabel}
                        <span aria-hidden className="text-base">→</span>
                      </a>
                    ) : (
                      <span className="text-sm font-medium text-white/50">{project.linkLabel}</span>
                    )}
                  </div>
                </div>
              </ElectricBorder>
            );
          })}
        </div>
      </div>
    </section>
  );
}
