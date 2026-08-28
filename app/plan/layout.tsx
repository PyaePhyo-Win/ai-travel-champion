"use client";

import { StepIndicator } from "@/components/ui/StepIndicator";
import { usePlanStore } from "@/store/usePlanStore";

export default function PlanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const step = usePlanStore((s) => s.step);
  return (
    <div className="min-h-screen">
      <div className="sticky top-0 z-40 border-b border-border bg-bg-base/80 backdrop-blur-md">
        <div className="mx-auto max-w-5xl px-6 py-5">
          <StepIndicator currentStep={step} />
        </div>
      </div>
      <main className="mx-auto max-w-5xl px-6 py-10">{children}</main>
    </div>
  );
}
