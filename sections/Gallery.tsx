"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";

import { AnimatedSection } from "@/components/AnimatedSection";
import { ANIMATION_CONFIG } from "@/utils/motionPresets";

const IMAGES = [
  {
    src: "/placeholder/1.jpg",
    title: "Hero-сцена",
    description: "Split-text, параллакс фон и освещённые CTA",
    offset: 20,
  },
  {
    src: "/placeholder/2.jpg",
    title: "Feature-матрица",
    description: "Карточки с 3D-tilt и blur-in анимацией",
    offset: -15,
  },
  {
    src: "/placeholder/3.jpg",
    title: "Галерея",
    description: "Mask-reveal + горизонтальный параллакс",
    offset: 25,
  },
];

interface GalleryCardProps {
  item: (typeof IMAGES)[number];
  progress: MotionValue<number>;
}

function GalleryCard({ item, progress }: GalleryCardProps) {
  const translateY = useTransform(progress, [0, 1], [item.offset, item.offset * -1]);
  // 🧩 Parallax Detail: плавно переводим фото из desaturated к насыщенному состоянию
  const saturation = useTransform(progress, [0, 1], ["grayscale(40%)", "grayscale(0%)"]);

  return (
    <AnimatedSection motion="mask-reveal" once className="h-full">
      <motion.figure
        style={{ y: translateY, filter: saturation }}
        className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-white/30 bg-white/70 shadow-soft backdrop-blur"
        whileHover={{ scale: 1.015 }}
        transition={{ type: "spring", ...ANIMATION_CONFIG.spring }}
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-brand-200/20 via-transparent to-brand-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            aria-hidden
          />
          <motion.div
            className="h-full w-full"
            initial={{ scale: 1.08 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={item.src}
              alt={item.title}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="h-full w-full object-cover"
              priority={false}
            />
          </motion.div>
        </div>
        <figcaption className="flex flex-1 flex-col gap-2 p-6">
          <span className="text-body-xs font-semibold uppercase tracking-[0.25em] text-brand-500">Секция</span>
          <h3 className="text-lg font-semibold text-neutral-900">{item.title}</h3>
          <p className="text-body-sm text-neutral-600">{item.description}</p>
        </figcaption>
      </motion.figure>
    </AnimatedSection>
  );
}

export function Gallery() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const sectionOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.85]);

  return (
    <motion.section ref={ref} id="gallery" className="bg-neutral-950 py-26 text-white" style={{ opacity: sectionOpacity }}>
      <div className="container mx-auto max-w-6xl space-y-10 px-6">
        <AnimatedSection motion="lift" once>
          <div className="flex flex-col gap-4">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-300">Галерея эффектов</span>
            <h2 className="font-display text-display-lg">Как секции выглядят в реальном проекте</h2>
            <p className="max-w-measure text-body-md text-white/70">
              Фото замените на свои — mask-reveal и параллакс сохранятся. Градиенты и blur контролируются через Tailwind классы, а
              изображения подгружаются через Next/Image для оптимизации.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid gap-8 md:grid-cols-3">
          {IMAGES.map((item) => (
            <GalleryCard key={item.title} item={item} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}