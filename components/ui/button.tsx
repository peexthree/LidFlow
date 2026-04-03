import React from "react";
import { useAudio } from "@/utils/useAudio";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx } from "clsx";

const button = cva(
  "inline-flex items-center justify-center rounded-2xl px-6 py-2.5 text-sm font-medium transition-all duration-300 ease-figma-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-[#e8eaf0] text-brand-600 shadow-neo-raised hover:shadow-neo-inset border-none",
        ghost: "bg-transparent text-slate-600 border-none hover:shadow-neo-inset hover:text-brand-600",
        outline: "bg-[#e8eaf0] text-slate-800 border-none shadow-neo-raised hover:shadow-neo-inset",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof button> {
  asChild?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, asChild, children, onMouseEnter, onClick, ...buttonProps }, ref) => {
  const { playHoverSound, playClickSound } = useAudio();

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    playHoverSound();
    if (onMouseEnter) onMouseEnter(e);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    playClickSound();
    if (onClick) onClick(e);
  };

  if (asChild) {
    if (!children || !React.isValidElement(children)) {
      return null;
    }

    const childClassName =
      typeof children.props === "object" && children.props !== null && "className" in children.props
        ? (children.props as { className?: string }).className
        : undefined;

    const merged = clsx(button({ variant }), childClassName, className);

    return React.cloneElement(children as React.ReactElement<React.ButtonHTMLAttributes<HTMLButtonElement>>, {
      className: merged,
      onMouseEnter: (e: React.MouseEvent<HTMLButtonElement>) => {
        handleMouseEnter(e);
        if ((children as React.ReactElement<React.ButtonHTMLAttributes<HTMLButtonElement>>).props.onMouseEnter) (children as React.ReactElement<React.ButtonHTMLAttributes<HTMLButtonElement>>).props.onMouseEnter?.(e);
      },
      onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
        handleClick(e);
        if ((children as React.ReactElement<React.ButtonHTMLAttributes<HTMLButtonElement>>).props.onClick) (children as React.ReactElement<React.ButtonHTMLAttributes<HTMLButtonElement>>).props.onClick?.(e);
      }
    });
  }

  return (
    <button
      className={clsx(button({ variant }), className)}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      ref={ref}
      {...buttonProps}
    >
      {children}
    </button>
  );
});
Button.displayName = "Button";
