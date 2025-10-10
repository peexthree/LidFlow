import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx } from "clsx";

const button = cva(
  "inline-flex items-center justify-center rounded-xl2 px-4 py-2 text-sm font-medium transition border",
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

export function Button({ className, variant, asChild, ...props }: ButtonProps) {
  // Если asChild — клонируем дочерний элемент (например, <Link href="...">)
  // и добавляем ему стили кнопки.
  if (asChild) {
    const child = (props as any).children as React.ReactElement;
    if (!child || !React.isValidElement(child)) return null;
    return React.cloneElement(child, {
      className: clsx(button({ variant }), child.props.className, className),
    });
  }

  // Обычная кнопка
  return (
    <button className={clsx(button({ variant }), className)} {...props} />
  );
}
