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
  borderColor = '#66FCF1', // Cyberpunk Cyan по умолчанию
  glowColor = 'rgba(102, 252, 241, 0.4)',
  animationDuration = 0.5,
  pauseBetweenAnimations = 1.5,
}) => {
  const words = sentence.split(' ');
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLSpanElement>(null);
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
    <span
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
            // Заменяем динамические классы Tailwind на встроенные стили (style),
            // чтобы избежать проблем с JIT-компиляцией, и добавляем киберпанк стилистику.
            className={`text-4xl font-bold cursor-pointer font-mono tracking-wider ${
              isFocused
                ? `text-[#66FCF1] border-b-2 border-transparent`
                : `text-white/30`
            }`}
            style={{
              transition: `all ${animationDuration}s cubic-bezier(0.4, 0, 0.2, 1)`,
              filter: isFocused ? 'none' : `blur(${blurAmount}px)`,
              opacity: isFocused ? 1 : 0.5,
              transform: isFocused ? 'scale(1.1)' : 'scale(1)',
              borderBottomColor: isFocused ? borderColor : 'transparent',
              textShadow: isFocused ? `0 0 10px ${glowColor}` : 'none',
              // Убираем любые скругления
              borderRadius: '0',
            }}
          >
            {word}
          </span>
        );
      })}
    </span>
  );
};
