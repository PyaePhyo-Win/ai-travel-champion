"use client";

import * as React from "react";
import { Pencil, MapPin, Calendar, Wallet, Sparkles, Users, Compass } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import type { ExtractedDetails } from "@/types/trip";

interface TripDetailFieldProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  aiDetected?: boolean;
  onEdit?: () => void;
}

function Field({ icon, label, value, aiDetected, onEdit }: TripDetailFieldProps) {
  return (
    <div className="flex items-center gap-4 rounded-input border border-border bg-bg-card p-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple/10 text-purple">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="font-outfit text-xs text-text-muted">{label}</p>
          {aiDetected && (
            <Badge variant="ai-detected">AI Detected</Badge>
          )}
        </div>
        <p className="truncate font-outfit text-sm font-semibold text-text-primary">
          {value}
        </p>
      </div>
      {onEdit && (
        <button
          onClick={onEdit}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-white/5 hover:text-text-primary"
        >
          <Pencil className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

interface TripDetailFieldsProps {
  details: ExtractedDetails | null;
  onEdit?: (field: keyof ExtractedDetails) => void;
  className?: string;
}

export function TripDetailFields({
  details,
  onEdit,
  className,
}: TripDetailFieldsProps) {
  const fields: TripDetailFieldProps[] = [
    {
      icon: <MapPin className="h-5 w-5" />,
      label: "Location",
      value: details?.location || "—",
      aiDetected: true,
      onEdit: onEdit ? () => onEdit("location") : undefined,
    },
    {
      icon: <Calendar className="h-5 w-5" />,
      label: "Dates",
      value: details?.dates || "—",
      onEdit: onEdit ? () => onEdit("dates") : undefined,
    },
    {
      icon: <Wallet className="h-5 w-5" />,
      label: "Budget",
      value: details
        ? `${details.currency} ${details.budget.toLocaleString()}`
        : "—",
      aiDetected: true,
      onEdit: onEdit ? () => onEdit("budget") : undefined,
    },
    {
      icon: <Compass className="h-5 w-5" />,
      label: "Travel Style",
      value: details?.travelStyle || "—",
      aiDetected: true,
      onEdit: onEdit ? () => onEdit("travelStyle") : undefined,
    },
    {
      icon: <Sparkles className="h-5 w-5" />,
      label: "Interests",
      value: details?.interests.join(" · ") || "—",
      aiDetected: true,
      onEdit: onEdit ? () => onEdit("interests") : undefined,
    },
    {
      icon: <Users className="h-5 w-5" />,
      label: "Travelers",
      value: details?.travelers || "—",
      aiDetected: true,
      onEdit: onEdit ? () => onEdit("travelers") : undefined,
    },
  ];

  return (
    <div className={cn("grid grid-cols-1 gap-3 sm:grid-cols-2", className)}>
      {fields.map((f) => (
        <Field key={f.label} {...f} />
      ))}
    </div>
  );
}
