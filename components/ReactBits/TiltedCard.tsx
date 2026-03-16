import { useSpring, animated } from '@react-spring/web';
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
  showMobileWarning?: boolean;
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
  showMobileWarning = false,
  showTooltip = false,
  displayOverlayContent = false,
  overlayContent,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const [{ rotateX, rotateY, scale }, api] = useSpring(() => ({
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    config: { mass: 5, tension: 350, friction: 40 },
  }));

  const [{ opacity }, opacityApi] = useSpring(() => ({ opacity: 0 }));

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    setX(mouseX);
    setY(mouseY);
    api.start({ rotateX: yPct * rotateAmplitude * -1, rotateY: xPct * rotateAmplitude, scale: scaleOnHover });
    opacityApi.start({ opacity: 1 });
  };

  const handleMouseLeave = () => {
    api.start({ rotateX: 0, rotateY: 0, scale: 1 });
    opacityApi.start({ opacity: 0 });
  };

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: containerWidth, height: containerHeight, perspective: '1000px' }}
    >
      <animated.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative flex items-center justify-center rounded-[15px] cursor-pointer"
        style={{
          width: imageWidth,
          height: imageHeight,
          transform: rotateX.to((rx) => rotateY.to((ry) => scale.to((s) => `rotateX(${rx}deg) rotateY(${ry}deg) scale(${s})`))) as unknown as string,
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
      >
        <div
          className="absolute top-0 left-0 w-full h-full bg-contain bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${imageSrc})`, transform: 'translateZ(30px)' }}
        ></div>
        {displayOverlayContent && overlayContent && (
          <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center rounded-[15px] p-6 text-center transform translateZ(50px)">
            {overlayContent}
          </div>
        )}
      </animated.div>
      {showTooltip && (
        <animated.div
          className="pointer-events-none absolute top-0 left-0 text-white bg-black/50 px-3 py-1 rounded-md whitespace-nowrap opacity-0"
          style={{ opacity, transform: `translate3d(${x}px, ${y}px, 0)` }}
        >
          {captionText}
        </animated.div>
      )}
    </div>
  );
};
