"use client";

import Image from "next/image";
import { clsx } from "clsx";
import { useState, useMemo } from "react";
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
  mode?: "business" | "creative"; // Добавлено поле mode
};

type PortfolioShowcaseProps = {
  projects: ReadonlyArray<ProjectShowcaseItem>;
};

export function PortfolioShowcase({ projects }: PortfolioShowcaseProps) {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [activeMode, setActiveMode] = useState<"business" | "creative">("business");

  const handleOpenVideo = (src?: string) => {
    if (src) setSelectedVideo(src);
  };

  const handleCloseVideo = () => {
    setSelectedVideo(null);
  };

  const filteredProjects = useMemo(() => {
    return projects.filter(p => !p.mode || p.mode === activeMode);
  }, [projects, activeMode]);

  // Цвета в зависимости от режима
  const isBusiness = activeMode === "business";

  const containerClass = isBusiness
    ? "border-[#66FCF1]/30 bg-[#020304]/80 shadow-[0_20px_50px_rgba(31,140,255,0.15)]"
    : "border-purple-500/30 bg-[#090209]/80 shadow-[0_20px_50px_rgba(168,85,247,0.15)]";

  const toggleBgClass = isBusiness ? "bg-[#66FCF1]" : "bg-purple-500";
  const glowClass = isBusiness ? "bg-cyan-500/20" : "bg-purple-600/20";
  const accentTextClass = isBusiness ? "text-[#66FCF1]" : "text-purple-400";
  const cardBorderHover = isBusiness ? "hover:border-[#66FCF1]/50 hover:shadow-[0_0_40px_rgba(31,140,255,0.1)]" : "hover:border-purple-500/50 hover:shadow-[0_0_40px_rgba(168,85,247,0.1)]";

  return (
    <section id="portfolio" className={clsx("scroll-mt-24 container relative overflow-hidden rounded-none border backdrop-blur-3xl px-6 py-16 transition-colors duration-700 md:px-16", containerClass)} style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%)" }}>
      <div className="pointer-events-none absolute inset-0">
        <div className={clsx("absolute -left-16 top-1/4 h-72 w-72 rounded-full blur-[120px] transition-colors duration-700", glowClass)} />
        <div className={clsx("absolute bottom-0 right-10 h-80 w-80 rounded-full blur-[140px] transition-colors duration-700", isBusiness ? "bg-blue-600/10" : "bg-red-600/10")} />
      </div>

      <div className="relative z-10 space-y-12">
        <header className="flex flex-col gap-8 text-white lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-4">
            <span className={clsx("inline-flex items-center gap-2 rounded-none border px-4 py-1 font-mono text-xs uppercase tracking-[0.15em] transition-colors duration-700", isBusiness ? "border-[#66FCF1]/30 bg-[#020304]/80 text-[#66FCF1]" : "border-purple-500/30 bg-[#090209]/80 text-purple-400")}>
              <span className={clsx("flex h-2 w-2 rounded-none animate-pulse", toggleBgClass)}></span>
              АРСЕНАЛ
            </span>
            <div className="space-y-3">
              <h2 className="text-3xl font-semibold md:text-5xl font-mono">
                {isBusiness ? "Бизнес-логика" : "Креатив и Миры"}
              </h2>
              <p className="max-w-2xl text-base text-slate-300 font-mono md:text-lg">
                {isBusiness
                  ? "TWA-приложения, лендинги, воронки продаж. Фокус на метриках, конверсиях и результатах для бизнеса."
                  : "Создание персонажей, проработка лора, генеративный арт. Глубокое погружение в игровые вселенные."}
              </p>
            </div>
          </div>

          {/* Архитектурный переключатель */}
          <div className="flex items-center gap-4 bg-white/[0.02] border border-white/10 p-1 rounded-none font-mono">
             <button
                onClick={() => setActiveMode("business")}
                className={clsx(
                  "relative px-6 py-2 text-sm font-medium transition-all duration-300",
                  isBusiness ? "text-black" : "text-white/50 hover:text-white"
                )}
             >
                {isBusiness && (
                  <motion.div
                    layoutId="active-toggle"
                    className="absolute inset-0 bg-[#66FCF1]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">БИЗНЕС</span>
             </button>
             <button
                onClick={() => setActiveMode("creative")}
                className={clsx(
                  "relative px-6 py-2 text-sm font-medium transition-all duration-300",
                  !isBusiness ? "text-white" : "text-white/50 hover:text-white"
                )}
             >
                {!isBusiness && (
                  <motion.div
                    layoutId="active-toggle"
                    className="absolute inset-0 bg-purple-600"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">Gamedev</span>
             </button>
          </div>
        </header>

        <motion.div
          key={activeMode}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={clsx("grid gap-6", isBusiness ? "lg:grid-cols-3" : "lg:grid-cols-2")}
        >
          {filteredProjects.map((project, index) => {
            return (
              <article
                key={project.title}
                className={clsx(
                  "group relative flex h-full flex-col overflow-hidden rounded-none border border-white/5 bg-gradient-to-b from-white/[0.03] to-white/[0.01] p-6 backdrop-blur-md transition-all duration-500",
                  cardBorderHover,
                  !isBusiness && index === 0 ? "lg:col-span-2 lg:flex-row" : "flex-col" // Спец дизайн для gamedev
                )}
              >
                <div className="relative flex flex-1 gap-6 w-full h-full flex-col lg:flex-row">
                  {/* Контейнер изображения */}
                  <div className={clsx(
                    "relative overflow-hidden border border-white/10 w-full",
                    !isBusiness && index === 0 ? "lg:w-1/2 aspect-video lg:aspect-auto" : "aspect-video",
                    isBusiness ? "rounded-none" : "rounded-none" // Можно изменить геометрию
                  )}>
                    <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#020304] via-transparent to-transparent opacity-80" />
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition duration-700 ease-out group-hover:scale-110"
                      sizes="(min-width: 1280px) 50vw, 100vw"
                    />
                  </div>

                  {/* Описание и кнопки */}
                  <div className={clsx("flex flex-1 flex-col gap-4 justify-center", !isBusiness && index === 0 ? "lg:w-1/2 lg:p-8" : "")}>
                    <span className={clsx(
                        "inline-flex max-w-max items-center rounded-none px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.15em] border",
                        isBusiness ? "border-[#66FCF1]/30 text-[#66FCF1] bg-[#66FCF1]/10" : "border-purple-500/30 text-purple-400 bg-purple-500/10"
                    )}>
                      {project.tag}
                    </span>
                    <h3 className="text-xl font-semibold text-white font-mono">{project.title}</h3>
                    <p className="flex-1 text-sm leading-[1.5] text-slate-300 font-mono">{project.description}</p>

                    <div className="flex flex-wrap items-center gap-4 mt-auto pt-4 border-t border-white/10">
                      {project.preview?.src && (
                        <button
                          onClick={() => handleOpenVideo(project.preview?.src)}
                          className={clsx(
                            "inline-flex flex-1 items-center justify-center gap-2 rounded-none border px-4 py-3 font-mono text-sm font-semibold text-white backdrop-blur-md transition-all duration-300",
                            isBusiness ? "border-[#66FCF1]/30 bg-white/5 hover:bg-[#66FCF1]/20 hover:shadow-[0_0_20px_rgba(102,252,241,0.3)]" : "border-purple-500/30 bg-white/5 hover:bg-purple-500/20 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                          )}
                        >
                          <svg className={clsx("h-5 w-5", isBusiness ? "fill-[#66FCF1]" : "fill-purple-400")} viewBox="0 0 24 24">
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
                            "inline-flex items-center justify-center gap-2 font-mono text-sm font-medium transition px-4 py-3",
                            accentTextClass,
                            "hover:text-white"
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
        </motion.div>
      </div>

      {/* Модальное окно для видео (оставляем без сильных изменений) */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#020304]/90 backdrop-blur-xl p-4 sm:p-6"
            onClick={handleCloseVideo}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl rounded-none overflow-hidden border border-white/10 bg-[#020304] shadow-[0_0_60px_rgba(31,140,255,0.3)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-4 sm:p-6 bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
                <span className="inline-flex items-center gap-2 rounded-none border border-[#66FCF1]/30 bg-black/50 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-[#66FCF1] backdrop-blur-md">
                  <span className="flex h-1.5 w-1.5 rounded-none bg-[#66FCF1] animate-pulse"></span>
                  LIVE PREVIEW
                </span>

                <button
                  onClick={handleCloseVideo}
                  className="pointer-events-auto flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-none bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/20 hover:scale-110 border border-white/10"
                  aria-label="Закрыть"
                >
                  <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="relative w-full aspect-video bg-black">
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
