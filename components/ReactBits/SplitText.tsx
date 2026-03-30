import { motion, useAnimation, useInView, Variants } from 'framer-motion';
import { useEffect, useRef } from 'react';

// framer-motion useInView MarginType
type MarginValue = `${number}px` | `${number}%`;
type MarginType = MarginValue | `${MarginValue} ${MarginValue}` | `${MarginValue} ${MarginValue} ${MarginValue}` | `${MarginValue} ${MarginValue} ${MarginValue} ${MarginValue}`;

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  animationFrom?: { opacity: number; transform: string };
  animationTo?: { opacity: number; transform: string };
  threshold?: number;
  rootMargin?: MarginType;
  textAlign?: 'left' | 'right' | 'center' | 'justify';
  onLetterAnimationComplete?: () => void;
}

export const SplitText: React.FC<SplitTextProps> = ({
  text = '',
  className = '',
  delay = 100, // В framer-motion stagger будет в секундах
  animationFrom = { opacity: 0, transform: 'translate3d(0,40px,0)' },
  animationTo = { opacity: 1, transform: 'translate3d(0,0,0)' },
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'center',
  onLetterAnimationComplete,
}) => {
  const letters = text.split('');
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: threshold, margin: rootMargin });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible').then(() => {
        if (onLetterAnimationComplete) {
          onLetterAnimationComplete();
        }
      });
    }
  }, [isInView, controls, onLetterAnimationComplete]);

  // Конвертируем transform строки в объекты для framer-motion,
  // но чтобы сохранить оригинальный API компонента, мы используем initial/animate
  const extractY = (transformStr: string) => {
    const match = transformStr.match(/translate3d\([^,]+,([^,]+),/);
    return match && match[1] ? match[1].trim() : '0px';
  };

  const yFrom = extractY(animationFrom.transform);
  const yTo = extractY(animationTo.transform);

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: delay / 1000, // delay приходит в ms, framer-motion использует секунды
      },
    },
  };

  const letterVariants: Variants = {
    hidden: {
      opacity: animationFrom.opacity,
      y: yFrom
    },
    visible: {
      opacity: animationTo.opacity,
      y: yTo,
      transition: {
        type: 'spring',
        damping: 20,
        stiffness: 100
      }
    },
  };

  return (
    <motion.span
      ref={ref}
      className={`split-parent overflow-hidden inline ${className}`}
      style={{ textAlign, whiteSpace: 'normal', wordWrap: 'break-word' }}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          variants={letterVariants}
          style={{ display: 'inline-block', willChange: 'transform, opacity' }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.span>
  );
};
