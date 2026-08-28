import * as React from "react";
import { cn } from "@/lib/utils";

type BadgeVariant =
  | "ai-pill"
  | "status"
  | "match"
  | "ai-detected"
  | "tag"
  | "neutral";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  icon?: React.ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
  "ai-pill":
    "bg-purple/15 border border-purple/40 text-text-purple rounded-pill",
  status:
    "bg-teal-bg border border-teal/30 text-teal rounded-pill",
  match:
    "bg-purple/10 border border-purple/30 text-text-purple rounded-tag font-mono",
  "ai-detected":
    "bg-purple/10 border border-purple/30 text-text-purple rounded-tag text-[10px] uppercase tracking-wider font-outfit font-semibold",
  tag: "bg-white/5 border border-border text-text-muted rounded-tag",
  neutral: "bg-white/5 border border-border text-text-primary rounded-pill",
};

export function Badge({
  className,
  variant = "ai-pill",
  icon,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 font-outfit text-xs font-medium",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {icon}
      {children}
    </span>
  );
}
