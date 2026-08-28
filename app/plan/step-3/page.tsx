"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Sparkles,
  Loader2,
  CheckCircle2,
  Trash2,
  ArrowUp,
  ArrowDown,
  GripVertical,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { TripDetailFields } from "@/components/plan/TripDetailFields";
import { usePlanStore } from "@/store/usePlanStore";

export default function Step3Page() {
  const router = useRouter();
  const {
    extractedDetails,
    recommendations,
    setItinerary,
    setStep,
    updateNote,
    moveRecommendation,
    removeRecommendation,
  } = usePlanStore();
  const [building, setBuilding] = React.useState(false);

  const buildItinerary = async () => {
    if (!extractedDetails) return;
    setBuilding(true);
    try {
      const res = await fetch("/api/gemini/build-itinerary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recommendations, tripDetails: extractedDetails }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setItinerary(data.itinerary);
      setStep(4);
      router.push("/plan/step-4");
    } catch {
      toast.error("Failed to build itinerary.");
    } finally {
      setBuilding(false);
    }
  };

  const kept = recommendations.filter((r) => r.status === "kept");

  return (
    <div className="space-y-8">
      <div className="text-center">
        <Badge variant="ai-pill" icon={<Sparkles className="h-3.5 w-3.5" />}>
          Step 3 · Review
        </Badge>
        <h1 className="mt-4 font-fraunces text-3xl font-semibold">
          Review your trip
        </h1>
        <p className="mt-2 font-outfit text-text-muted">
          Add notes, reorder, or remove places — then we&apos;ll build your
          itinerary.
        </p>
      </div>

      <Card className="p-6">
        <h2 className="mb-4 font-fraunces text-xl font-semibold">Trip details</h2>
        <TripDetailFields details={extractedDetails} />
      </Card>

      <div>
        <div className="mb-4 flex items-center gap-3">
          <CheckCircle2 className="h-6 w-6 text-teal" />
          <div>
            <h2 className="font-fraunces text-lg font-semibold">
              {kept.length} {kept.length === 1 ? "place" : "places"} selected
            </h2>
            <p className="font-outfit text-sm text-text-muted">
              These will be included in your day-by-day itinerary.
            </p>
          </div>
        </div>

        {kept.length === 0 ? (
          <Card className="p-6 text-center font-outfit text-sm text-text-muted">
            No places selected yet. Go back to add recommendations.
          </Card>
        ) : (
          <div className="space-y-4">
            {kept.map((r, i) => (
              <Card key={r.id} className="p-5">
                <div className="flex items-start gap-3">
                  <div className="mt-1 hidden text-text-muted sm:block">
                    <GripVertical className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="tag">{r.category}</Badge>
                      <span className="font-outfit text-xs text-text-muted">
                        {r.matchReason}
                      </span>
                      <div className="ml-auto flex items-center gap-1">
                        <button
                          type="button"
                          aria-label="Move up"
                          disabled={i === 0}
                          onClick={() => moveRecommendation(r.id, "up")}
                          className="rounded-md p-1.5 text-text-muted transition-colors hover:bg-white/5 hover:text-text-primary disabled:cursor-not-allowed disabled:opacity-30"
                        >
                          <ArrowUp className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          aria-label="Move down"
                          disabled={i === kept.length - 1}
                          onClick={() => moveRecommendation(r.id, "down")}
                          className="rounded-md p-1.5 text-text-muted transition-colors hover:bg-white/5 hover:text-text-primary disabled:cursor-not-allowed disabled:opacity-30"
                        >
                          <ArrowDown className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          aria-label="Remove"
                          onClick={() => removeRecommendation(r.id)}
                          className="rounded-md p-1.5 text-text-muted transition-colors hover:bg-red-500/10 hover:text-red-400"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <h3 className="mt-1 font-fraunces text-lg font-semibold">
                      {r.name}
                    </h3>
                    <p className="mt-1 font-outfit text-sm text-text-muted">
                      {r.description}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-3 text-xs text-text-muted">
                      <span>💰 {r.priceRange}</span>
                      <span>⏱ {r.duration}</span>
                      <span>📍 {r.distance}</span>
                    </div>

                    <textarea
                      value={r.note ?? ""}
                      onChange={(e) => updateNote(r.id, e.target.value)}
                      placeholder="Add a note (e.g. book ahead, vegan options)…"
                      rows={2}
                      className="mt-3 w-full resize-none rounded-input border border-border bg-bg-base px-3 py-2 font-outfit text-sm text-text-primary placeholder:text-text-muted focus:border-purple focus:outline-none focus:ring-1 focus:ring-purple"
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-center pt-2">
        <Button
          onClick={buildItinerary}
          size="lg"
          disabled={building || kept.length === 0}
          className="gap-2"
        >
          {building ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Sparkles className="h-5 w-5" />
          )}
          {building ? "Building itinerary..." : "Generate itinerary"}
        </Button>
      </div>
    </div>
  );
}
