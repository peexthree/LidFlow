'use client';

import { clsx } from 'clsx';
import React, {
  CSSProperties,
  HTMLAttributes,
  PropsWithChildren,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef
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
  }
>;

type AnimateWithBegin = SVGAnimateElement & { beginElement?: () => void };
const ElectricBorder: React.FC<ElectricBorderProps> = ({
  as: asProp,
  children,
  color = '#5227FF',
  speed = 1,
  chaos = 1,
  thickness = 2,
  className,
  contentClassName,
  style,
  ...rest
}: ElectricBorderProps) => {
  const Element = (asProp ?? 'div') as ElectricBorderElement;
  const rawId = useId().replace(/[:]/g, '');
  const filterId = `turbulent-displace-${rawId}`;
  const svgRef = useRef<SVGSVGElement | null>(null);
  const rootRef = useRef<HTMLElement | null>(null);
  const strokeRef = useRef<HTMLDivElement | null>(null);
  const normalizedThickness = Math.max(0, thickness);

  const layerStyles = useMemo(() => {
    const borderValue = `${normalizedThickness}px solid ${color}`;
    return {
      stroke: { border: borderValue },
      glow1: {
        border: borderValue,
        opacity: 0.5,
        filter: `blur(${0.5 + normalizedThickness * 0.25}px)`
      },
      glow2: {
        border: borderValue,
        opacity: 0.5,
        filter: `blur(${2 + normalizedThickness * 0.5}px)`
      },
      backgroundGlow: {
        transform: 'scale(1.08)',
        filter: 'blur(32px)',
        opacity: 0.3,
        background: `linear-gradient(-30deg, ${color}, transparent, ${color})`
      }
    } satisfies Record<string, CSSProperties>;
  }, [color, normalizedThickness]);
  const updateAnim = useCallback(() => {
    const svg = svgRef.current;
    const host = rootRef.current;
    if (!svg || !host) return;

    if (strokeRef.current) {
      strokeRef.current.style.filter = `url(#${filterId})`;
    }

    const width = Math.max(
      1,
      Math.round(host.clientWidth || host.getBoundingClientRect().width || 0)
    );
    const height = Math.max(
      1,
      Math.round(host.clientHeight || host.getBoundingClientRect().height || 0)
    );

    const dyAnims = Array.from(
      svg.querySelectorAll<SVGAnimateElement>('feOffset > animate[attributeName="dy"]')
    );
    const [firstDy, secondDy] = dyAnims;
    if (firstDy && secondDy) {
      firstDy.setAttribute('values', `${height}; 0`);
      secondDy.setAttribute('values', `0; -${height}`);
    }

    const dxAnims = Array.from(
      svg.querySelectorAll<SVGAnimateElement>('feOffset > animate[attributeName="dx"]')
    );
    const [firstDx, secondDx] = dxAnims;
    if (firstDx && secondDx) {
      firstDx.setAttribute('values', `${width}; 0`);
      secondDx.setAttribute('values', `0; -${width}`);
    }

    const baseDur = 6;
    const dur = Math.max(0.001, baseDur / (speed || 1));
    [...dyAnims, ...dxAnims].forEach(animation => animation.setAttribute('dur', `${dur}s`));

    const disp = svg.querySelector('feDisplacementMap');
    if (disp) disp.setAttribute('scale', String(30 * (chaos || 1)));

    const filterEl = svg.querySelector<SVGFilterElement>(`#${CSS.escape(filterId)}`);
    if (filterEl) {
      filterEl.setAttribute('x', '-200%');
      filterEl.setAttribute('y', '-200%');
      filterEl.setAttribute('width', '500%');
      filterEl.setAttribute('height', '500%');
    }

    const animElements: AnimateWithBegin[] = [...dyAnims, ...dxAnims];
    requestAnimationFrame(() => {
      animElements.forEach(animation => {
        if (typeof animation.beginElement === 'function') {
          try {
            animation.beginElement();
          } catch {
            // Some browsers may throw when restarting SMIL animations; ignore gracefully.
          }
        }
      });
    });
  }, [chaos, filterId, speed]);

  useEffect(() => {
    updateAnim();
  }, [updateAnim]);

  useLayoutEffect(() => {
    const host = rootRef.current;
    if (!host) return;

    const ro = new ResizeObserver(() => updateAnim());
    ro.observe(host);
    updateAnim();
    return () => ro.disconnect();
  }, [updateAnim]);

  return (
    <Element
      ref={(node: HTMLElement | null) => {
        rootRef.current = node;
      }}
      className={clsx('relative isolate overflow-visible rounded-[inherit]', className)}
      style={style}
      {...rest}
    >
      <svg
        ref={svgRef}
        aria-hidden
        focusable="false"
        className="pointer-events-none fixed opacity-[0.001]"
        style={{ left: -10000, top: -10000, width: 10, height: 10 }}
      >
        <defs>
          <filter id={filterId} colorInterpolationFilters="sRGB" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise1" seed="1" />
            <feOffset in="noise1" dx="0" dy="0" result="offsetNoise1">
              <animate attributeName="dy" values="700; 0" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>

            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise2" seed="1" />
            <feOffset in="noise2" dx="0" dy="0" result="offsetNoise2">
              <animate attributeName="dy" values="0; -700" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>

            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise1" seed="2" />
            <feOffset in="noise1" dx="0" dy="0" result="offsetNoise3">
              <animate attributeName="dx" values="490; 0" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>

            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise2" seed="2" />
            <feOffset in="noise2" dx="0" dy="0" result="offsetNoise4">
              <animate attributeName="dx" values="0; -490" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>

            <feComposite in="offsetNoise1" in2="offsetNoise2" result="part1" />
            <feComposite in="offsetNoise3" in2="offsetNoise4" result="part2" />
            <feBlend in="part1" in2="part2" mode="color-dodge" result="combinedNoise" />
            <feDisplacementMap
              in="SourceGraphic"
              in2="combinedNoise"
              scale="30"
              xChannelSelector="R"
              yChannelSelector="B"
            />
          </filter>
        </defs>

        <title>Electric border animation filter</title>
      </svg>

      <div className="pointer-events-none absolute inset-0 z-[2] rounded-[inherit]">
        <div
          ref={strokeRef}
          className="pointer-events-none absolute inset-0 rounded-[inherit] box-border"
          style={layerStyles.stroke}
        />
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] box-border"
          style={layerStyles.glow1}
        />
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] box-border"
          style={layerStyles.glow2}
        />
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] box-border -z-[1]"
          style={layerStyles.backgroundGlow}
        />
      </div>

      <div className={clsx('relative z-[1] rounded-[inherit]', contentClassName)}>{children}</div>
    </Element>
  );
};

export { ElectricBorder };
export default ElectricBorder;