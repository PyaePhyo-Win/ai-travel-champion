"use client";

import * as React from "react";

interface QuickPromptCardsProps {
  onSelect: (text: string) => void;
  className?: string;
}

const PROMPTS = [
  { icon: "🌅", text: "Weekend getaway" },
  { icon: "🍜", text: "Food & culture" },
  { icon: "🏖️", text: "Relaxing vacation" },
  { icon: "🧗", text: "Adventure trip" },
  { icon: "👨‍👩‍👧", text: "Family trip" },
];

export function QuickPromptCards({ onSelect, className }: QuickPromptCardsProps) {
  return (
    <div className={className}>
      <p className="mb-3 font-outfit text-xs font-medium text-text-muted">
        Try a quick prompt
      </p>
      <div className="flex flex-wrap gap-2">
        {PROMPTS.map((p) => (
          <button
            key={p.text}
            type="button"
            onClick={() => onSelect(p.text)}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-bg-card px-3 py-1.5 font-outfit text-sm text-text-muted transition-all duration-200 hover:border-purple hover:text-text-primary"
          >
            <span>{p.icon}</span>
            <span>{p.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
