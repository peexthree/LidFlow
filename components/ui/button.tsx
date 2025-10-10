import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx } from "clsx";

const button = cva(
  "inline-flex items-center justify-center rounded-xl2 px-4 py-2 text-sm font-medium border transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  {
    variants: {
      variant: {
        default:
          "bg-brand-500 text-white border-brand-500 hover:bg-brand-600",
        ghost: "bg-transparent border-neutral-200 hover:bg-neutral-50",
        outline: "bg-white border-neutral-300 hover:bg-neutral-100",
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