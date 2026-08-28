"use client";

import * as React from "react";
import Link from "next/link";
import { Sparkles, Search, MapPin, Calendar, Wallet } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { NavBar } from "@/components/layout/NavBar";
import { Footer } from "@/components/layout/Footer";
import { usePlanStore } from "@/store/usePlanStore";

const QUICK_PROMPTS = [
  { icon: "🗼", text: "Plan a 5 day trip to Japan under $1,500." },
  { icon: "🏖️", text: "I want a relaxing beach vacation." },
  { icon: "🍜", text: "Plan a weekend trip for food and culture." },
  { icon: "🏕️", text: "Find me a family friendly adventure." },
];

const FEATURES = [
  { icon: MapPin, label: "Smart destinations" },
  { icon: Calendar, label: "Day-by-day plans" },
  { icon: Wallet, label: "Budget aware" },
];

export default function HomePage() {
  const setInputText = usePlanStore((s) => s.setInputText);
  const setStep = usePlanStore((s) => s.setStep);

  const startWithPrompt = (text: string) => {
    setInputText(text);
    setStep(1);
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-purple/20 blur-[120px]" />

      <NavBar />

      <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-20 sm:py-28">
        <div className="flex flex-col items-center text-center">
          <Badge variant="ai-pill" icon={<Sparkles className="h-3.5 w-3.5" />}>
            AI-powered travel planning
          </Badge>

          <h1 className="mt-8 max-w-3xl font-fraunces text-5xl font-semibold leading-tight text-text-primary sm:text-6xl">
            Plan your perfect trip{" "}
            <span className="font-light italic text-gradient">with AI.</span>
          </h1>

          <p className="mt-6 max-w-xl font-outfit text-lg text-text-muted">
            Tell us where you want to go. We&apos;ll craft personalized
            recommendations and a day-by-day itinerary just for you.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <Link href="/plan/step-1">
              <Button size="lg" className="px-8">
                Start planning →
              </Button>
            </Link>
            <Link href="/explore">
              <Button variant="secondary" size="lg" className="px-8">
                Explore destinations
              </Button>
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-text-muted">
            {FEATURES.map((f) => (
              <div key={f.label} className="flex items-center gap-2">
                <f.icon className="h-5 w-5 text-purple" />
                <span className="font-outfit text-sm">{f.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick prompts */}
        <div className="mx-auto mt-20 max-w-3xl">
          <p className="mb-4 text-center font-outfit text-sm text-text-muted">
            Try one of these:
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {QUICK_PROMPTS.map((p) => (
              <Card
                key={p.text}
                className="group cursor-pointer p-5 transition-all duration-200 hover:border-purple hover:shadow-purple-glow"
                onClick={() => startWithPrompt(p.text)}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{p.icon}</span>
                  <p className="font-outfit text-sm text-text-primary">
                    {p.text}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Search bar */}
        <div className="mx-auto mt-12 flex max-w-xl items-center gap-3 rounded-input border border-border bg-bg-card px-4 py-3">
          <Search className="h-5 w-5 text-text-muted" />
          <input
            placeholder="Describe your dream trip..."
            className="w-full bg-transparent font-outfit text-sm text-text-primary placeholder:text-text-muted focus:outline-none"
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.currentTarget.value.trim()) {
                startWithPrompt(e.currentTarget.value.trim());
                window.location.href = "/plan/step-1";
              }
            }}
          />
          <Link href="/plan/step-1">
            <Button size="sm">Go</Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
