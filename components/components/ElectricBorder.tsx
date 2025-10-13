import React, { CSSProperties, PropsWithChildren, useMemo } from 'react';

import './ElectricBorder.css';

type ElectricBorderProps = PropsWithChildren<{
  color?: string;
  thickness?: number;
  className?: string;
  style?: CSSProperties;
}>;

type ElectricBorderStyleVars = CSSProperties & {
  '--electric-border-color'?: string;
  '--eb-border-width'?: string;
  '--eb-border-glow'?: string;
};

const ElectricBorder: React.FC<ElectricBorderProps> = ({
  children,
  color = '#5227FF',
  thickness = 2,
  className,
  style
}: ElectricBorderProps) => {
  const mergedStyle = useMemo<ElectricBorderStyleVars>(
    () => ({
      '--electric-border-color': color,
      '--eb-border-width': `${Math.max(0, thickness)}px`,
      '--eb-border-glow': 'rgba(82, 39, 255, 0.35)',
      ...(style ?? {})
    }),
    [color, thickness, style]
  );

  const classes = ['electric-border', className].filter(Boolean).join(' ');

  return (
    <div className={classes} style={mergedStyle}>
      <div className="eb-outline" aria-hidden />
      <div className="eb-glow" aria-hidden />
      <div className="eb-content">{children}</div>
    </div>
  );
};

export default ElectricBorder;