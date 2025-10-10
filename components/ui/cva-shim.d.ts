declare module "class-variance-authority" {
  import * as React from "react";
  export type VariantProps<T> = any;
  export function cva(base?: string, variants?: any): (...args: any[]) => string;
}
