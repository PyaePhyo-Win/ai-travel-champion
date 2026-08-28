import * as React from "react";
import { cn } from "@/lib/utils";

type KeepButtonVariant = "default" | "hover" | "kept" | "disable";

interface KeepButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: KeepButtonVariant;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

const variantStyles: Record<KeepButtonVariant, string> = {
  default:
    "bg-transparent border border-purple/50 text-text-purple hover:bg-purple/10 hover:border-purple",
  hover: "bg-purple/15 border border-purple text-text-purple",
  kept: "bg-teal/15 border border-teal text-teal hover:bg-teal/25",
  disable: "bg-transparent border border-border text-text-muted opacity-50 cursor-not-allowed",
};

export const KeepButton = React.forwardRef<HTMLButtonElement, KeepButtonProps>(
  ({ className, variant = "default", icon, children, disabled, ...props }, ref) => {
    const isDisabled = disabled || variant === "disable";
    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={cn(
          "inline-flex items-center justify-center gap-1.5 rounded-input px-4 py-2 font-outfit text-sm font-semibold transition-all duration-200",
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {icon}
        {children}
      </button>
    );
  }
);
KeepButton.displayName = "KeepButton";
