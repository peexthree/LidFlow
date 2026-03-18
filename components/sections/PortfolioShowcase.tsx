"use client";

import Image from "next/image";
import { clsx } from "clsx";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type ProjectPreviewMedia = {
  src: string;
  poster?: string;
  alt?: string;
  type?: "video" | "image";
};

export type ProjectShowcaseItem = {
  title: string;
  description: string;
  tag: string;
  image: string;
  linkLabel: string;
  href?: string;
  preview?: ProjectPreviewMedia;
};

type PortfolioShowcaseProps = {
  projects: ReadonlyArray<ProjectShowcaseItem>;
};

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

export function PortfolioShowcase({ projects }: PortfolioShowcaseProps) {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const handleOpenVideo = (src?: string) => {
    if (src) setSelectedVideo(src);
  };

  const handleCloseVideo = () => {
    setSelectedVideo(null);
  };

  return (
    <section id="portfolio" className="scroll-mt-24 container relative overflow-hidden rounded-[38px] border border-white/10 bg-gradient-to-br from-[#050b1f] via-[#040616] to-[#02030a] px-6 py-16 shadow-[0_60px_160px_rgba(30,64,175,0.45)] backdrop-blur-3xl md:px-16">
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
            const linkClass = linkAccent[index % linkAccent.length] ?? linkAccent[0];
            const badgeClass = badgeAccent[index % badgeAccent.length] ?? badgeAccent[0];

            return (
              <article
                key={project.title}
                className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/5 bg-white/[0.03] p-6 shadow-[0_45px_140px_rgba(37,99,235,0.22)] backdrop-blur-xl transition-transform duration-500 hover:-translate-y-3 transition-colors hover:bg-white/[0.06]"
              >
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.35),_transparent_65%)]" />
                </div>

                <div className="relative flex flex-1 flex-col gap-6">
                  {/* Контейнер изображения (всегда видим) */}
                  <div className="relative overflow-hidden rounded-[1.2rem] border border-white/10 aspect-video w-full">
                    <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#040b22] via-transparent to-transparent opacity-80" />
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition duration-700 ease-out group-hover:scale-110"
                      sizes="(min-width: 1280px) 320px, (min-width: 1024px) 28vw, (min-width: 768px) 45vw, 90vw"
                    />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.32),_transparent_70%)] opacity-0 mix-blend-screen transition duration-500 group-hover:opacity-100 pointer-events-none" />
                  </div>

                  {/* Описание и кнопки */}
                  <div className="flex flex-1 flex-col gap-4">
                    <span className={clsx("inline-flex max-w-max items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em]", badgeClass)}>
                      {project.tag}
                    </span>
                    <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                    <p className="flex-1 text-sm leading-relaxed text-white/70">{project.description}</p>

                    <div className="flex flex-wrap items-center gap-4 mt-auto pt-4 border-t border-white/10">
                      {project.preview?.src && (
                        <button
                          onClick={() => handleOpenVideo(project.preview?.src)}
                          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white shadow-[0_0_15px_rgba(31,140,255,0.1)] backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(31,140,255,0.3)] hover:-translate-y-1"
                        >
                          <svg className="h-5 w-5 fill-cyan-400" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                          Демо видео
                        </button>
                      )}

                      {project.href && (
                        <a
                          href={project.href}
                          target="_blank"
                          rel="noreferrer"
                          className={clsx(
                            "inline-flex items-center justify-center gap-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050816] px-4 py-3",
                            linkClass,
                            "focus-visible:ring-cyan-300/60"
                          )}
                        >
                          {project.linkLabel}
                          <span aria-hidden className="text-base">→</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Модальное окно для видео */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#050b1f]/90 backdrop-blur-xl p-4 sm:p-6"
            onClick={handleCloseVideo}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl rounded-[2rem] overflow-hidden border border-white/10 bg-gradient-to-b from-[#0a122c] to-[#040816] shadow-[0_0_60px_rgba(31,140,255,0.3)]"
              onClick={(e) => e.stopPropagation()} // Предотвращаем закрытие при клике на само видео
            >
              {/* Хедер модалки */}
              <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-4 sm:p-6 bg-gradient-to-b from-black/60 to-transparent pointer-events-none">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-cyan-400 backdrop-blur-md">
                  <span className="flex h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                  LIVE PREVIEW
                </span>

                <button
                  onClick={handleCloseVideo}
                  className="pointer-events-auto flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/20 hover:scale-110 border border-white/10"
                  aria-label="Закрыть"
                >
                  <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Видеоплеер */}
              <div className="relative w-full aspect-video bg-black rounded-b-[2rem]">
                <video
                  src={selectedVideo}
                  className="absolute inset-0 w-full h-full object-contain"
                  controls
                  autoPlay
                  playsInline
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
