"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  variant?: "negative" | "positive" | "neutral";
}

const variantStyles = {
  negative: {
    base: "border-border text-text-muted hover:border-red-400/50 hover:text-red-300",
    selected: "border-red-400 bg-red-400/15 text-red-300",
  },
  positive: {
    base: "border-border text-text-muted hover:border-teal/50 hover:text-teal",
    selected: "border-teal bg-teal/15 text-teal",
  },
  neutral: {
    base: "border-border text-text-muted hover:border-purple hover:text-text-primary",
    selected: "border-purple bg-purple/15 text-text-purple",
  },
};

export function Chip({
  className,
  selected = false,
  variant = "neutral",
  children,
  ...props
}: ChipProps) {
  const styles = variantStyles[variant];
  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center gap-1.5 rounded-pill border px-4 py-2 font-outfit text-sm font-medium transition-all duration-200",
        selected ? styles.selected : styles.base,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
