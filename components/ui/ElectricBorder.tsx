import { clsx } from "clsx";
import { createElement, type ComponentPropsWithoutRef, type ElementType, type ReactNode } from "react";

import styles from "./electric-border.module.css";

export type ElectricBorderProps<T extends ElementType> = {
  /**
   * Allows rendering the electric border as a semantic element like `article` or `li`.
   */
  as?: T;
  children: ReactNode;
  /**
   * Classes applied to the outer wrapper that hosts the animated border.
   */
  className?: string;
  /**
   * Classes applied to the inner content container.
   */
  contentClassName?: string;
  /**
   * Additional classes for the animated gradient border layer.
   */
  borderClassName?: string;
  /**
   * Additional classes for the glow layer.
   */
  glowClassName?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export function ElectricBorder<T extends ElementType = "div">({
  as,
  children,
  className,
  contentClassName,
  borderClassName,
  glowClassName,
  ...rest
}: ElectricBorderProps<T>) {
  const Component = (as ?? "div") as ElementType;

  const componentProps = {
    ...rest,
    className: clsx(styles.wrapper, className),
  } as ComponentPropsWithoutRef<T>;

  return createElement(
    Component,
    componentProps,
    [
      createElement("span", {
        "aria-hidden": true,
        className: clsx(styles.border, borderClassName),
        key: "border",
      }),
      createElement("span", {
        "aria-hidden": true,
        className: clsx(styles.glow, glowClassName),
        key: "glow",
      }),
      createElement(
        "div",
        { className: clsx(styles.inner, contentClassName), key: "content" },
        children,
      ),
    ],
  );
}