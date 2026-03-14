import { useEffect, useRef, useState } from 'react';

interface TrueFocusProps {
  sentence: string;
  manualMode?: boolean;
  blurAmount?: number;
  borderColor?: string;
  glowColor?: string;
  animationDuration?: number;
  pauseBetweenAnimations?: number;
}

export const TrueFocus: React.FC<TrueFocusProps> = ({
  sentence,
  manualMode = false,
  blurAmount = 4,
  borderColor = '#00ffcc',
  glowColor = 'rgba(0, 255, 204, 0.4)',
  animationDuration = 0.5,
  pauseBetweenAnimations = 1.5,
}) => {
  const words = sentence.split(' ');
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (!manualMode) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length);
      }, (animationDuration + pauseBetweenAnimations) * 1000);
      return () => clearInterval(interval);
    }
  }, [manualMode, words.length, animationDuration, pauseBetweenAnimations]);

  return (
    <div
      ref={containerRef}
      className="flex flex-wrap gap-4 items-center justify-center p-8 relative"
    >
      {words.map((word, index) => {
        const isFocused = index === currentIndex;
        return (
          <span
            key={index}
            ref={(el) => {
              if (el) {
                wordRefs.current[index] = el;
              }
            }}
            onMouseEnter={() => manualMode && setCurrentIndex(index)}
            className={`text-4xl font-bold cursor-pointer transition-all duration-${
              animationDuration * 1000
            } ${
              isFocused
                ? `text-white drop-shadow-[0_0_10px_${glowColor}] border-b-2 border-[${borderColor}] opacity-100 scale-110`
                : `text-white/30 blur-[${blurAmount}px] opacity-50 scale-100`
            }`}
            style={{
              transition: `all ${animationDuration}s cubic-bezier(0.4, 0, 0.2, 1)`,
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};
