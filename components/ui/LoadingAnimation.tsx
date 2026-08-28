"use client";

import * as React from "react";
import { Plane, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingProps {
  variant?: "airplane" | "update";
  label?: string;
  className?: string;
}

export function LoadingAnimation({
  variant = "airplane",
  label = "Analyzing your trip",
  className,
}: LoadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 py-12",
        className
      )}
    >
      <div className="relative h-20 w-20">
        <div className="absolute inset-0 rounded-full border border-purple/30" />
        <div className="absolute inset-0 animate-spin-slow rounded-full border-t-2 border-purple" />
        <div className="absolute inset-0 flex items-center justify-center text-purple">
          {variant === "airplane" ? (
            <Plane className="h-7 w-7" />
          ) : (
            <RefreshCw className="h-7 w-7" />
          )}
        </div>
      </div>
      <div className="flex items-center gap-2 font-outfit text-sm text-text-muted">
        <span className="animate-pulse">{label}</span>
        <span className="flex gap-1">
          <span className="animate-bounce [animation-delay:-0.3s]">.</span>
          <span className="animate-bounce [animation-delay:-0.15s]">.</span>
          <span className="animate-bounce">.</span>
        </span>
      </div>
    </div>
  );
}
