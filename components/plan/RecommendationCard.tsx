"use client";

import * as React from "react";
import { KeepButton } from "@/components/ui/KeepButton";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { MatchBar } from "@/components/ui/MatchBar";
import { Card } from "@/components/ui/Card";
import { Check, RefreshCw, Pencil, Clock, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Recommendation } from "@/types/trip";

interface RecommendationCardProps {
  place: Recommendation;
  onKeep: (id: string) => void;
  onReplace: (id: string) => void;
  onEdit: (id: string) => void;
  selected?: boolean;
  onSelect?: (id: string) => void;
}

export function RecommendationCard({
  place,
  onKeep,
  onReplace,
  onEdit,
  selected,
  onSelect,
}: RecommendationCardProps) {
  const isKept = place.status === "kept";
  return (
    <Card
      className={cn(
        "flex flex-col gap-4 p-5 transition-all duration-200",
        selected && "border-purple shadow-purple-glow",
        isKept && "border-teal/40"
      )}
      onClick={() => onSelect?.(place.id)}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span className="text-2xl">{place.categoryIcon}</span>
          <div>
            <h3 className="font-fraunces text-lg font-semibold text-text-primary">
              {place.name}
            </h3>
            <p className="font-outfit text-xs text-text-muted">
              {place.category}
            </p>
          </div>
        </div>
        <Badge variant="match">{place.matchScore}%</Badge>
      </div>

      <p className="font-outfit text-sm text-text-muted">{place.description}</p>

      <MatchBar score={place.matchScore} reason={place.matchReason} />

      <div className="flex items-center gap-4 font-mono text-xs text-text-muted">
        <span className="text-teal">{place.priceRange}</span>
        <span className="flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" /> {place.duration}
        </span>
        <span className="flex items-center gap-1">
          <MapPin className="h-3.5 w-3.5" /> {place.distance}
        </span>
      </div>

      <div className="flex items-center gap-2 pt-1">
        <KeepButton
          variant={isKept ? "kept" : "default"}
          icon={isKept ? <Check className="h-4 w-4" /> : null}
          onClick={(e) => {
            e.stopPropagation();
            onKeep(place.id);
          }}
        >
          {isKept ? "Kept" : "Keep"}
        </KeepButton>
        <Button
          variant="danger"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onReplace(place.id);
          }}
        >
          <RefreshCw className="h-4 w-4" /> Replace
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            onEdit(place.id);
          }}
        >
          <Pencil className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}
