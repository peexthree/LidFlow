import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx } from "clsx";

const button = cva(
  "inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-medium border transition-all duration-300 ease-figma-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950",
  {
    variants: {
      variant: {
        default:
          "bg-white/10 text-white border-white/20 backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:bg-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]",
        ghost: "bg-transparent text-slate-300 border-transparent hover:bg-white/10 hover:text-white",
        outline: "bg-black/20 text-white border-white/20 backdrop-blur hover:bg-white/10",
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

export function Button({ className, variant, asChild, children, ...buttonProps }: ButtonProps) {
  if (asChild) {
    if (!children || !React.isValidElement(children)) {
      return null;
    }

    const childClassName =
      typeof children.props === "object" && children.props !== null && "className" in children.props
        ? (children.props as { className?: string }).className
        : undefined;

    const merged = clsx(button({ variant }), childClassName, className);

    return React.cloneElement(children, {
      className: merged,
    } as Record<string, unknown>);
  }

  return (
    <button className={clsx(button({ variant }), className)} {...buttonProps}>
      {children}
    </button>
  );
}
