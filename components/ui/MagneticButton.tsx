'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button, ButtonProps } from './button';

interface MagneticButtonProps extends ButtonProps {
  magneticStrength?: number;
  magneticRadius?: number;
}

export function MagneticButton({
  children,
  magneticStrength = 20,
  magneticRadius = 100,
  className,
  ...props
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!buttonRef.current) return;

      const { clientX, clientY } = e;
      const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;

      const distanceX = clientX - centerX;
      const distanceY = clientY - centerY;
      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

      if (distance < magneticRadius) {
        setIsHovered(true);
        // Вычисляем смещение на основе силы магнита
        const x = (distanceX / magneticRadius) * magneticStrength;
        const y = (distanceY / magneticRadius) * magneticStrength;
        setPosition({ x, y });
      } else {
        setIsHovered(false);
        setPosition({ x: 0, y: 0 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [magneticStrength, magneticRadius]);

  return (
    <motion.div
      animate={{
        x: position.x,
        y: position.y,
        scale: isHovered ? 1.05 : 1
      }}
      transition={{
        type: 'spring',
        stiffness: 150,
        damping: 15,
        mass: 0.1
      }}
      style={{ display: 'inline-block' }}
    >
      <Button ref={buttonRef} className={className} {...props}>
        {children}
      </Button>
    </motion.div>
  );
}
