"use client";

import Image from "next/image";
import { clsx } from "clsx";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type PointerEvent as ReactPointerEvent,
  type FocusEvent as ReactFocusEvent,
} from "react";

import { ElectricBorder } from "@/components/ui/ElectricBorder";
import type { ElectricPaletteKey } from "@/utils/electricPalettes";
import { paletteStyle } from "@/utils/electricPalettes";

type ProjectPreviewMedia = {
  src: string;
  /**
   * Используется как fallback-постер для видео-анимации.
   */
  poster?: string;
  /**
   * Дополнительный альтернативный текст для описания анимации.
   */
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

type PreviewStyle = {
  top: number;
  left: number;
  width: number;
  height: number;
};

const PREVIEW_ASPECT_RATIO = 16 / 9;
const PREVIEW_MAX_WIDTH = 1600;
const PREVIEW_MIN_WIDTH = 320;
const PREVIEW_MARGIN = 16;

const computePreviewStyle = (): PreviewStyle | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  const availableWidth = Math.max(0, viewportWidth - PREVIEW_MARGIN * 2);
  const availableHeight = Math.max(0, viewportHeight - PREVIEW_MARGIN * 2);

  if (availableWidth <= 0 || availableHeight <= 0) {
    return null;
  }

  let width = Math.min(PREVIEW_MAX_WIDTH, availableWidth);
  if (width < PREVIEW_MIN_WIDTH && availableWidth >= PREVIEW_MIN_WIDTH) {
    width = PREVIEW_MIN_WIDTH;
  }

  let height = Math.round(width / PREVIEW_ASPECT_RATIO);

  if (height > availableHeight) {
    height = availableHeight;
    if (height <= 0) {
      return null;
    }

    width = Math.min(Math.round(height * PREVIEW_ASPECT_RATIO), availableWidth);
    if (width <= 0) {
      return null;
    }

    height = Math.round(width / PREVIEW_ASPECT_RATIO);
  }

  const maxTop = viewportHeight - height - PREVIEW_MARGIN;
  const maxLeft = viewportWidth - width - PREVIEW_MARGIN;

  const top = Math.min(
    Math.max(PREVIEW_MARGIN, Math.round((viewportHeight - height) / 2)),
    Math.max(PREVIEW_MARGIN, maxTop)
  );
  const left = Math.min(
    Math.max(PREVIEW_MARGIN, Math.round((viewportWidth - width) / 2)),
    Math.max(PREVIEW_MARGIN, maxLeft)
  );

  return { top, left, width, height } satisfies PreviewStyle;
};

/**
 * Витрина портфолио с электрическими рамками и свечением, повторяющая композицию из референса.
 */
export function PortfolioShowcase({ projects }: PortfolioShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [previewStyle, setPreviewStyle] = useState<PreviewStyle | null>(null);

  const hidePreview = useCallback(() => {
    setActiveIndex(null);
    setPreviewStyle(null);
  }, []);

  const updatePreview = useCallback(() => {
    const nextStyle = computePreviewStyle();
    setPreviewStyle(nextStyle);
  }, []);

  const showPreview = useCallback((index: number) => {
    setActiveIndex(index);
    const nextStyle = computePreviewStyle();
    setPreviewStyle(nextStyle);
  }, []);

  useEffect(() => {
    if (activeIndex === null) {
      return;
    }

    updatePreview();
    window.addEventListener("resize", updatePreview);
    window.addEventListener("scroll", updatePreview, true);

    return () => {
      window.removeEventListener("resize", updatePreview);
      window.removeEventListener("scroll", updatePreview, true);
    };
  }, [activeIndex, updatePreview]);

  const handlePointerEnter = useCallback(
    (index: number) => (event: ReactPointerEvent<HTMLElement>) => {
      void event;
      showPreview(index);
    },
    [showPreview]
  );

  const handlePointerDown = useCallback(
    (index: number) => (event: ReactPointerEvent<HTMLElement>) => {
      void event;
      showPreview(index);
    },
    [showPreview]
  );

  const handlePointerLeave = useCallback(() => {
    hidePreview();
  }, [hidePreview]);

  const handlePointerUp = useCallback(
    (event: ReactPointerEvent<HTMLElement>) => {
      if (event.pointerType === "touch") {
        hidePreview();
      }
    },
    [hidePreview]
  );

  const handleFocus = useCallback(
    (index: number) => (event: ReactFocusEvent<HTMLElement>) => {
      void event;
      showPreview(index);
    },
    [showPreview]
  );

  const handleBlur = useCallback(() => {
    hidePreview();
  }, [hidePreview]);

  const previewContent = useMemo(() => {
    if (activeIndex === null) {
      return null;
    }

    const project = projects[activeIndex];
    if (!project) {
      return null;
    }

    return project.preview;
  }, [activeIndex, projects]);

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
                tabIndex={0}
                onPointerEnter={handlePointerEnter(index)}
                onPointerDown={handlePointerDown(index)}
                onPointerLeave={handlePointerLeave}
                onPointerCancel={handlePointerLeave}
                onPointerUp={handlePointerUp}
                onFocus={handleFocus(index)}
                onBlur={handleBlur}
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

      {activeIndex !== null && previewStyle && (
        <div
          className="pointer-events-none fixed z-50 transition-opacity duration-200"
          style={{
            top: previewStyle.top,
            left: previewStyle.left,
            width: previewStyle.width,
            height: previewStyle.height,
            opacity: previewContent ? 1 : 0.8,
          }}
        >
          <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/15 bg-[#0b122c]/80 shadow-[0_40px_120px_rgba(30,64,175,0.45)] backdrop-blur-xl">
            {/*
              Подсказка с анимированным предпросмотром проекта. Показывается при наведении или фокусе на карточке.
            */}
            {previewContent ? (
              previewContent.type === "image" ? (
                <div className="absolute inset-0">
                  <Image
                    src={previewContent.src}
                    alt={previewContent.alt ?? "Предпросмотр проекта"}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 320px, calc(100vw - 3rem)"
                  />
                </div>
              ) : (
                <video
                  className="absolute inset-0 h-full w-full object-cover"
                  src={previewContent.src}
                  poster={previewContent.poster}
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  Ваш браузер не поддерживает видео-тег.
                </video>
              )
            ) : (
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.35),_transparent_70%)]" />
            )}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#050b1f] via-[#050b1f]/60 to-transparent p-4">
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/60">Live preview</p>
              {activeIndex !== null && projects[activeIndex] ? (
                <p className="text-sm font-semibold text-white">
                  {projects[activeIndex]?.title}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}