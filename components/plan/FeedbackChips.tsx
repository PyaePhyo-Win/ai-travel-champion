"use client";

import * as React from "react";
import { Chip } from "@/components/ui/Chip";
import { Badge } from "@/components/ui/Badge";

const NEGATIVE = [
  "Too expensive",
  "Too far away",
  "Not interested",
  "Too crowded",
];

const POSITIVE = [
  "More local experiences",
  "More relaxing",
  "More food",
];

interface FeedbackChipsProps {
  selected: { negative: string[]; positive: string[] };
  onToggle: (group: "negative" | "positive", value: string) => void;
}

export function FeedbackChips({ selected, onToggle }: FeedbackChipsProps) {
  return (
    <div className="space-y-4">
      <div>
        <Badge variant="tag" className="mb-2">
          Refine
        </Badge>
        <div className="flex flex-wrap gap-2">
          {NEGATIVE.map((c) => (
            <Chip
              key={c}
              variant="negative"
              selected={selected.negative.includes(c)}
              onClick={() => onToggle("negative", c)}
            >
              {c}
            </Chip>
          ))}
        </div>
      </div>
      <div>
        <Badge variant="tag" className="mb-2">
          Preferences
        </Badge>
        <div className="flex flex-wrap gap-2">
          {POSITIVE.map((c) => (
            <Chip
              key={c}
              variant="positive"
              selected={selected.positive.includes(c)}
              onClick={() => onToggle("positive", c)}
            >
              {c}
            </Chip>
          ))}
        </div>
      </div>
    </div>
  );
}
