import * as React from "react";
import { cn } from "@/lib/utils";

interface StepIndicatorProps {
  currentStep: number;
  className?: string;
}

const STEPS = [
  { num: 1, label: "Tell us about your trip" },
  { num: 2, label: "Recommendations" },
  { num: 3, label: "Review" },
  { num: 4, label: "Itinerary" },
];

export function StepIndicator({ currentStep, className }: StepIndicatorProps) {
  return (
    <div className={cn("flex items-center justify-center w-full", className)}>
      <ol className="flex items-center gap-2 sm:gap-4">
        {STEPS.map((step, i) => {
          const isCompleted = step.num < currentStep;
          const isActive = step.num === currentStep;
          return (
            <React.Fragment key={step.num}>
              <li className="flex items-center gap-3">
                <div
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border font-outfit text-sm font-semibold transition-all duration-300",
                    isCompleted &&
                      "bg-purple border-purple text-white shadow-purple-glow",
                    isActive &&
                      "bg-purple/20 border-purple text-text-purple shadow-purple-glow",
                    !isCompleted &&
                      !isActive &&
                      "bg-transparent border-border text-text-muted"
                  )}
                >
                  {isCompleted ? "✓" : step.num}
                </div>
                <span
                  className={cn(
                    "hidden sm:block font-outfit text-sm transition-colors",
                    isActive
                      ? "text-text-primary font-semibold"
                      : isCompleted
                        ? "text-text-purple"
                        : "text-text-muted"
                  )}
                >
                  {step.label}
                </span>
              </li>
              {i < STEPS.length - 1 && (
                <div
                  className={cn(
                    "h-px w-8 sm:w-16 transition-colors duration-300",
                    step.num < currentStep ? "bg-purple" : "bg-border"
                  )}
                />
              )}
            </React.Fragment>
          );
        })}
      </ol>
    </div>
  );
}
