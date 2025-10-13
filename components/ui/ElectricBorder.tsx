'use client';

import { clsx } from 'clsx';
import React, {
  CSSProperties,
  HTMLAttributes,
  PropsWithChildren,
  useMemo
} from 'react';

type ElectricBorderElement = 'div' | 'section' | 'article' | 'li' | 'figure' | 'aside' | 'header' | 'footer';

type ElectricBorderProps = PropsWithChildren<
  Omit<HTMLAttributes<HTMLElement>, 'color'> & {
    as?: ElectricBorderElement;
    contentClassName?: string;
    color?: string;
    speed?: number;
    chaos?: number;
    thickness?: number;
    animated?: boolean;
  }
>;

type ElectricBorderStyleVars = CSSProperties & {
  '--electric-border-color'?: string;
  '--electric-border-thickness'?: string;
  '--electric-border-glow'?: string;
};

const ElectricBorder: React.FC<ElectricBorderProps> = ({
  as: asProp,
  children,
  color = '#5227FF',
  thickness = 2,
  animated: _animated,
  speed: _speed,
  chaos: _chaos,
  className,
  contentClassName,
  style,
  ...rest
}: ElectricBorderProps) => {
  const Element = (asProp ?? 'div') as ElectricBorderElement;
  const normalizedThickness = Math.max(0, thickness);

  // Explicitly acknowledge unused legacy props so ESLint keeps the signature intact for existing consumers.
  void _animated;
  void _speed;
  void _chaos;
  const wrapperStyle = useMemo<ElectricBorderStyleVars>(
    () => ({
      '--electric-border-color': `var(--electric-color-2, ${color})`,
      '--electric-border-thickness': `${normalizedThickness}px`,
      '--electric-border-glow': `var(--electric-glow-color, rgba(82, 39, 255, 0.35))`,
      ...(style ?? {})
    }),
    [color, normalizedThickness, style]
  );

  const strokeStyle: CSSProperties = {
    borderStyle: 'solid',
    borderWidth: 'var(--electric-border-thickness)',
    borderColor: 'var(--electric-border-color)',
    borderRadius: 'inherit'
  };

  const glowStyle: CSSProperties = {
    background: 'radial-gradient(circle, var(--electric-border-glow), transparent 70%)',
    borderRadius: 'inherit'
  };

  return (
    <Element
      className={clsx('relative isolate overflow-visible rounded-[inherit]', className)}
      style={wrapperStyle}
      {...rest}
    >
      <div className="pointer-events-none absolute inset-0 rounded-[inherit]" style={strokeStyle} aria-hidden />
      <div
        className="pointer-events-none absolute -inset-6 -z-[1] opacity-40 blur-3xl"
        style={glowStyle}
        aria-hidden
      />
      <div className={clsx('relative rounded-[inherit]', contentClassName)}>{children}</div>
    </Element>
  );
};

export { ElectricBorder };
export default ElectricBorder;