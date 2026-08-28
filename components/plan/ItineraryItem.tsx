"use client";

import * as React from "react";
import { Clock, MapPin, Wallet } from "lucide-react";
import { Card } from "@/components/ui/Card";

interface ItineraryItemProps {
  time: string;
  placeName: string;
  duration: string;
  price: string;
  index: number;
}

export function ItineraryItem({
  time,
  placeName,
  duration,
  price,
  index,
}: ItineraryItemProps) {
  return (
    <div className="relative flex gap-4 pb-6 last:pb-0">
      {/* Timeline */}
      <div className="flex flex-col items-center">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-purple/40 bg-purple/10 font-mono text-xs font-semibold text-text-purple">
          {time}
        </div>
        {index < 10 && (
          <div className="mt-2 w-px flex-1 bg-border" aria-hidden />
        )}
      </div>

      <Card className="flex-1 p-4">
        <div className="flex items-start justify-between gap-3">
          <h4 className="font-outfit text-sm font-semibold text-text-primary">
            {placeName}
          </h4>
          <span className="font-mono text-xs text-teal">{price}</span>
        </div>
        <div className="mt-2 flex items-center gap-4 font-mono text-xs text-text-muted">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> {duration}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" /> {placeName}
          </span>
        </div>
      </Card>
    </div>
  );
}
