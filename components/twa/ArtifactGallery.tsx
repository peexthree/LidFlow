"use client";

import { TiltedCard } from "@/components/ReactBits/TiltedCard";
import { useCallback } from "react";
import { motion } from "framer-motion";

interface Artifact {
  id: string;
  title: string;
  metric: string;
  image: string;
  videoSrc?: string;
}

interface ArtifactGalleryProps {
  artifacts: Artifact[];
  onOpenVideo?: (src: string) => void;
}

export function ArtifactGallery({ artifacts, onOpenVideo }: ArtifactGalleryProps) {
  // Web Audio API for synthetic click sound
  const playHoverSound = useCallback(() => {
    try {
      const WebAudioContext = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
      if (!WebAudioContext) return;

      const ctx = new WebAudioContext();
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.05);

      gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // Ignore audio errors (e.g. if user hasn't interacted yet)
    }
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-8">
      {artifacts.map((artifact, idx) => (
        <motion.div
          key={artifact.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: idx * 0.1 }}
          onMouseEnter={playHoverSound}
          className="relative group w-full"
        >
          {/* Cyberpunk corner brackets */}
          <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-[#66FCF1]/50 opacity-0 group-hover:opacity-100 transition-opacity z-20" />
          <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-[#66FCF1]/50 opacity-0 group-hover:opacity-100 transition-opacity z-20" />

          <div
            className="w-full h-[320px] md:h-[350px] cursor-pointer"
            onClick={() => artifact.videoSrc && onOpenVideo?.(artifact.videoSrc)}
          >
            <TiltedCard
              imageSrc={artifact.image}
              altText={artifact.title}
              captionText="ПОДРОБНЕЕ"
              containerHeight="100%"
              containerWidth="100%"
              imageHeight="100%"
              imageWidth="100%"
              scaleOnHover={1.05}
              rotateAmplitude={12}
              showTooltip={true}
              displayOverlayContent={true}
              overlayContent={
                <div className="flex flex-col items-center justify-end h-full pb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="bg-[#020304]/80 text-[#66FCF1] px-4 py-2 border border-[#66FCF1]/30 font-mono text-sm tracking-widest backdrop-blur-md" style={{ clipPath: "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)" }}>
                    ИНИЦИАЛИЗАЦИЯ
                  </span>
                </div>
              }
            />
          </div>

          <div className="mt-6 flex flex-col border-l-2 border-[#66FCF1]/30 pl-4 py-1 relative">
            <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-[#66FCF1] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <span className="inline-flex max-w-max items-center px-2 py-0.5 text-[10px] font-mono text-[#66FCF1] mb-2 bg-[#66FCF1]/10 border border-[#66FCF1]/20">
              {artifact.metric}
            </span>
            <h3 className="text-xl font-bold text-white font-mono tracking-wide">{artifact.title}</h3>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
