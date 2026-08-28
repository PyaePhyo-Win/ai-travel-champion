import * as React from "react";
import { cn } from "@/lib/utils";

interface MatchBarProps {
  score: number;
  reason?: string;
  className?: string;
}

export function MatchBar({ score, reason, className }: MatchBarProps) {
  const clamped = Math.max(0, Math.min(100, score));
  const barWidth = Math.round((clamped / 100) * 22);
  return (
    <div className={cn("space-y-1.5", className)}>
      <div className="flex items-center justify-between">
        <span className="font-mono text-sm font-semibold text-text-purple">
          {clamped}%
        </span>
        {reason && (
          <span className="font-outfit text-xs text-text-muted">{reason}</span>
        )}
      </div>
      <div
        className="flex h-1.5 w-full gap-[2px] rounded-pill bg-white/5 overflow-hidden"
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        {Array.from({ length: 22 }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-full flex-1 rounded-pill",
              i < barWidth ? "bg-purple" : "bg-transparent"
            )}
          />
        ))}
      </div>
    </div>
  );
}
