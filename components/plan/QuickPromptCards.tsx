"use client";

import * as React from "react";
import { Card } from "@/components/ui/Card";

interface QuickPromptCardsProps {
  onSelect: (text: string) => void;
  className?: string;
}

const PROMPTS = [
  { icon: "🗼", text: "Plan a 5 day trip to Japan under $1,500." },
  { icon: "🏖️", text: "I want a relaxing beach vacation." },
  { icon: "🍜", text: "Plan a weekend trip for food and culture." },
  { icon: "🏕️", text: "Find me a family friendly adventure." },
];

export function QuickPromptCards({ onSelect, className }: QuickPromptCardsProps) {
  return (
    <div className={className}>
      <p className="mb-3 font-outfit text-sm text-text-muted">
        Or try one of these:
      </p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {PROMPTS.map((p) => (
          <Card
            key={p.text}
            className="cursor-pointer p-4 transition-all duration-200 hover:border-purple hover:shadow-purple-glow"
            onClick={() => onSelect(p.text)}
          >
            <div className="flex items-start gap-3">
              <span className="text-xl">{p.icon}</span>
              <p className="font-outfit text-sm text-text-primary">{p.text}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
