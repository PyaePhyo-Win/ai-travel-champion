"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { MessageSquare, Bot, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { NavBar } from "@/components/layout/NavBar";
import { Footer } from "@/components/layout/Footer";
import { usePlanStore } from "@/store/usePlanStore";

const QUICK_PROMPTS = [
  { icon: "🗼", text: "Plan a 5 day trip to Japan under $1,500." },
  { icon: "🏖️", text: "I want a relaxing beach vacation." },
  { icon: "🍜", text: "Plan a weekend trip for food and culture." },
  { icon: "🏕️", text: "Find me a family friendly adventure." },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Describe your trip",
    description:
      "Talk naturally \u2014 no forms, no dropdowns. Just tell us what you want.",
    icon: MessageSquare,
  },
  {
    step: "02",
    title: "AI builds your plan",
    description:
      "Extracts details, checks constraints, and curates personalized recommendations.",
    icon: Bot,
  },
  {
    step: "03",
    title: "Refine & go",
    description:
      "Keep, replace, or adjust any pick. AI adapts until you\u2019re happy.",
    icon: Sparkles,
  },
];

const DESTINATIONS = [
  { name: "Tokyo", src: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop" },
  { name: "Beach", src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop" },
  { name: "Mountains", src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&h=300&fit=crop" },
  { name: "Reykjavik", src: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=400&h=300&fit=crop" },
  { name: "Landscape", src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop" },
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
      <NavBar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative mx-auto max-w-4xl px-6 pt-20 pb-16 text-center sm:pt-28">
          <div className="pointer-events-none absolute top-1/4 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple/15 blur-[120px]" />

          <Badge variant="ai-pill" icon={<span className="h-1.5 w-1.5 rounded-full bg-purple" />}>
            AI-powered travel planning
          </Badge>

          <h1 className="mt-8 max-w-3xl font-fraunces text-5xl font-medium leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
            Plan your perfect trip{" "}
            <span className="font-light italic text-gradient">with AI.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl font-outfit text-xl leading-relaxed text-text-muted">
            Tell us where you want to go, what you love, and what matters to
            you. We&apos;ll build a trip around you.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/plan/step-1">
              <Button size="lg" className="px-8">
                Start planning
                <span className="ml-1">&rarr;</span>
              </Button>
            </Link>
            <Link href="/explore">
              <Button variant="secondary" size="lg" className="px-8">
                Explore destinations
              </Button>
            </Link>
          </div>

          {/* Destination Images Carousel */}
          <div className="mt-16 flex items-center justify-center gap-4 overflow-hidden">
            {DESTINATIONS.map((dest, i) => (
              <div
                key={dest.name}
                className={`relative h-40 flex-shrink-0 overflow-hidden rounded-xl ${
                  i === 2 ? "h-44 w-[195px]" : "w-[186px]"
                }`}
              >
                <Image
                  src={dest.src}
                  alt={dest.name}
                  fill
                  className="object-cover"
                  sizes="186px"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Quick Prompts Section */}
        <section className="mx-auto max-w-5xl px-6 py-16">
          <p className="mb-6 text-center font-outfit text-sm font-medium uppercase tracking-[0.14em] text-text-muted">
            Try a quick prompt
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {QUICK_PROMPTS.map((p) => (
              <button
                key={p.text}
                onClick={() => startWithPrompt(p.text)}
                className="flex flex-col items-start gap-3 rounded-2xl border border-border bg-bg-card p-5 text-left transition-all duration-200 hover:border-purple/50 hover:bg-white/[0.02]"
              >
                <span className="text-2xl">{p.icon}</span>
                <p className="font-outfit text-sm text-text-muted">{p.text}</p>
              </button>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="mx-auto max-w-5xl px-6">
          <div className="h-px bg-border" />
        </div>

        {/* How WanderAI Works Section */}
        <section className="mx-auto max-w-5xl px-6 py-20">
          <p className="mb-10 text-center font-outfit text-sm font-medium uppercase tracking-[0.14em] text-text-muted">
            How WanderAI works
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {HOW_IT_WORKS.map((item) => (
              <div
                key={item.step}
                className="rounded-2xl border border-border bg-bg-card p-6"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/5">
                  <item.icon className="h-5 w-5 text-text-muted" />
                </div>
                <p className="mb-1 font-mono text-xs text-purple">{item.step}</p>
                <h3 className="font-fraunces text-lg font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 font-outfit text-sm leading-relaxed text-text-muted">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
