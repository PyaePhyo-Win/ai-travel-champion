"use client";

import { StepIndicator } from "@/components/ui/StepIndicator";
import { NavBar } from "@/components/layout/NavBar";
import { usePlanStore } from "@/store/usePlanStore";

export default function PlanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const step = usePlanStore((s) => s.step);
  return (
    <div className="min-h-screen">
      <NavBar />
      <div className="top-16 border-b border-border bg-bg-base/80 backdrop-blur-md">
        <div className="mx-auto max-w-[1600px] px-20 py-3 pt-15">
          <StepIndicator currentStep={step} />
        </div>
      </div>
      <main className="mx-auto max-w-[1700px] pb-10 pt-3">{children}</main>
    </div>
  );
}
