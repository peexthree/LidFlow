import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';

interface TiltedCardProps {
  imageSrc: string;
  altText: string;
  captionText: string;
  containerHeight?: string;
  containerWidth?: string;
  imageHeight?: string;
  imageWidth?: string;
  scaleOnHover?: number;
  rotateAmplitude?: number;
  showTooltip?: boolean;
  displayOverlayContent?: boolean;
  overlayContent?: React.ReactNode;
}

export const TiltedCard: React.FC<TiltedCardProps> = ({
  imageSrc,
  altText,
  captionText,
  containerHeight = '300px',
  containerWidth = '300px',
  imageHeight = '300px',
  imageWidth = '300px',
  scaleOnHover = 1.1,
  rotateAmplitude = 14,
  showTooltip = false,
  displayOverlayContent = false,
  overlayContent,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Framer Motion values для физики
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Настройка пружины: жесткость, затухание, масса (похоже на mass: 5, tension: 350, friction: 40)
  const springConfig = { stiffness: 120, damping: 20, mass: 1 };

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [rotateAmplitude, -rotateAmplitude]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-rotateAmplitude, rotateAmplitude]), springConfig);
  const scale = useSpring(isHovered ? scaleOnHover : 1, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const currentMouseX = e.clientX - rect.left;
    const currentMouseY = e.clientY - rect.top;

    // Позиция для тултипа
    setX(currentMouseX);
    setY(currentMouseY);

    // Нормализованные значения от -0.5 до 0.5
    mouseX.set(currentMouseX / width - 0.5);
    mouseY.set(currentMouseY / height - 0.5);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: containerWidth, height: containerHeight, perspective: '1000px' }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative flex items-center justify-center cursor-pointer border border-[#66FCF1]/20 shadow-[0_0_15px_rgba(102,252,241,0.1)] backdrop-blur-sm"
        style={{
          width: imageWidth,
          height: imageHeight,
          rotateX,
          rotateY,
          scale,
          transformStyle: 'preserve-3d',
          willChange: 'transform',
          // Cyberpunk hard angles: custom clip-path instead of standard border-radius
          clipPath: 'polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)',
          backgroundColor: '#020304'
        }}
      >
        <div
          role="img"
          aria-label={altText}
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${imageSrc})`,
            transform: 'translateZ(30px)',
            opacity: 0.8
          }}
        ></div>
        {displayOverlayContent && overlayContent && (
          <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center p-6 text-center transform translateZ(50px)">
            {overlayContent}
          </div>
        )}
      </motion.div>
      {showTooltip && (
        <motion.div
          className="pointer-events-none absolute top-0 left-0 text-[#66FCF1] bg-[#020304]/80 border border-[#66FCF1]/40 px-3 py-1 whitespace-nowrap backdrop-blur-md font-mono text-xs uppercase tracking-wider"
          initial={{ opacity: 0 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            x,
            y,
          }}
          transition={{ type: "tween", ease: "linear", duration: 0.1 }}
          style={{
             clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)',
             // Сдвиг тултипа, чтобы он не перекрывал курсор
             translateX: 15,
             translateY: 15
          }}
        >
          {captionText}
        </motion.div>
      )}
    </div>
  );
};
