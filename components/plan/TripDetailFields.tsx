"use client";

import * as React from "react";
import type { ExtractedDetails } from "@/types/trip";
import { cn } from "@/lib/utils";

interface TripDetailFieldProps {
  emoji: string;
  label: string;
  value?: string;
  placeholder: string;
  detected?: boolean;
  compact?: boolean;
}

function Field({
  emoji,
  label,
  value,
  placeholder,
  detected,
  compact,
}: TripDetailFieldProps) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-2xl border bg-[#12131f]",
        detected ? "border-purple/40" : "border-border",
        compact ? "gap-0 p-3" : "gap-1 p-4"
      )}
    >
      <div className="flex items-center gap-2">
        <span className="font-outfit text-sm leading-none">{emoji}</span>
        <span className="font-outfit text-xs font-medium leading-none text-text-muted">
          {label}
        </span>
      </div>
      <p
        className={cn(
          "font-outfit leading-none text-[#3a3b55]",
          compact ? "pt-1.5 text-xs" : "pt-1 text-sm"
        )}
      >
        {value || placeholder}
      </p>
    </div>
  );
}

interface TripDetailFieldsProps {
  details: ExtractedDetails | null;
  className?: string;
}

export function TripDetailFields({
  details,
  className,
}: TripDetailFieldsProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      <Field
        emoji="📍"
        label="Location"
        value={details?.location}
        placeholder="Where do you want to go?"
        detected={!!details?.location}
      />

      <div className="pt-3">
        <Field
          emoji="📅"
          label="Dates"
          value={details?.dates}
          placeholder="When are you traveling?"
          detected={!!details?.dates}
        />
      </div>

      <div className="pt-3">
        <Field
          emoji="💰"
          label="Budget"
          value={
            details
              ? `${details.currency} ${details.budget.toLocaleString()}`
              : undefined
          }
          placeholder="Not specified"
          detected={!!details?.budget}
        />
      </div>

      <div className="pt-3">
        <Field
          emoji="✨"
          label="Interests"
          value={details?.interests?.join(" · ")}
          placeholder="What do you enjoy doing?"
          detected={!!details?.interests?.length}
        />
      </div>

      <div className="grid grid-cols-2 gap-3 pt-3">
        <Field
          emoji="🌿"
          label="Travel style"
          value={details?.travelStyle}
          placeholder="Your pace"
          detected={!!details?.travelStyle}
          compact
        />
        <Field
          emoji="👤"
          label="Travelers"
          value={details?.travelers}
          placeholder="How many?"
          detected={!!details?.travelers}
          compact
        />
      </div>
    </div>
  );
}
