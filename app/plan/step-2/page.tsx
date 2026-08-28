"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Sparkles, Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { LoadingAnimation } from "@/components/ui/LoadingAnimation";
import { RecommendationCard } from "@/components/plan/RecommendationCard";
import { FeedbackChips } from "@/components/plan/FeedbackChips";
import { PlaceMap } from "@/components/ui/PlaceMap";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/Dialog";
import { usePlanStore } from "@/store/usePlanStore";
import type { MapPlace } from "@/types/map";

export default function Step2Page() {
  const router = useRouter();
  const {
    extractedDetails,
    recommendations,
    setRecommendations,
    toggleKeep,
    keptIds,
    modalMode,
    setModalMode,
    replacedId,
    setReplacedId,
    feedbackChips,
    toggleChip,
    resetFeedback,
  } = usePlanStore();

  const [generating, setGenerating] = React.useState(false);
  const [adapting, setAdapting] = React.useState(false);
  const [filter, setFilter] = React.useState("All Places");
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const [replaceMode, setReplaceMode] = React.useState<"similar" | "different">(
    "similar"
  );

  // Generate recommendations on mount
  React.useEffect(() => {
    if (recommendations.length === 0 && extractedDetails) {
      generateRecs();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const generateRecs = async () => {
    if (!extractedDetails) return;
    setGenerating(true);
    try {
      const res = await fetch("/api/gemini/generate-recs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(extractedDetails),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setRecommendations(data.recommendations);
    } catch {
      toast.error("Failed to generate recommendations.");
    } finally {
      setGenerating(false);
    }
  };

  const submitFeedback = async () => {
    setModalMode(null);
    setAdapting(true);
    try {
      const res = await fetch("/api/gemini/adapt-recs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recommendations,
          feedback: {
            replacedId,
            chips: feedbackChips,
          },
          mode: replaceMode,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setRecommendations(data.recommendations);
      resetFeedback();
      setReplacedId(null);
      toast.success("Recommendations updated!");
    } catch {
      toast.error("Failed to update recommendations.");
    } finally {
      setAdapting(false);
    }
  };

  const mapPlaces: MapPlace[] = recommendations.map((r) => ({
    id: r.id,
    name: r.name,
    category: r.category,
    categoryIcon: r.categoryIcon,
    matchScore: r.matchScore,
    lat: r.lat || 35.6895,
    lng: r.lng || 139.6917,
  }));

  const filtered =
    filter === "All Places"
      ? recommendations
      : recommendations.filter((r) => {
          if (filter === "Restaurants")
            return /restaurant|food|market/i.test(r.category);
          if (filter === "Hotels") return /hotel|stay/i.test(r.category);
          if (filter === "Activities") return /activity|tour|experience/i.test(r.category);
          return true;
        });

  if (generating) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <Badge variant="ai-pill" icon={<Sparkles className="h-3.5 w-3.5" />}>
            Step 2 · Recommendations
          </Badge>
        </div>
        <LoadingAnimation variant="airplane" label="Generating personalized recommendations" />
      </div>
    );
  }

  const allKept =
    recommendations.length > 0 && keptIds.length === recommendations.length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Badge variant="ai-pill" icon={<Sparkles className="h-3.5 w-3.5" />}>
            Step 2 · Recommendations
          </Badge>
          <h1 className="mt-3 font-fraunces text-3xl font-semibold">
            Here&apos;s what we found
          </h1>
        </div>
        <Badge variant="match">
          {keptIds.length} of {recommendations.length} picks accepted
        </Badge>
      </div>

      <Tabs value={filter} onValueChange={setFilter}>
        <TabsList>
          {["All Places", "Restaurants", "Hotels", "Activities"].map((t) => (
            <TabsTrigger key={t} value={t}>
              {t}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          {filtered.map((place) => (
            <RecommendationCard
              key={place.id}
              place={place}
              selected={selectedId === place.id}
              onSelect={setSelectedId}
              onKeep={toggleKeep}
              onReplace={(id) => {
                setReplacedId(id);
                setReplaceMode("similar");
                setModalMode("replace");
              }}
              onEdit={() => {}}
            />
          ))}
        </div>

        <div className="lg:sticky lg:top-24 lg:h-[calc(100vh-8rem)]">
          <PlaceMap
            places={mapPlaces}
            selectedId={selectedId}
            onPlaceClick={setSelectedId}
          />
        </div>
      </div>

      <div className="flex flex-col items-center gap-3 pt-4">
        <div className="flex gap-3">
          <Button
            variant="secondary"
            onClick={() => setModalMode("feedback")}
            disabled={adapting}
          >
            {adapting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : null}
            Refine picks
          </Button>
          <Button
            onClick={() => {
              router.push("/plan/step-3");
            }}
            disabled={!allKept || adapting}
            className="gap-2"
          >
            Review &amp; build itinerary
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        {!allKept && (
          <p className="font-outfit text-xs text-text-muted">
            Keep all {recommendations.length} picks to continue.
          </p>
        )}
      </div>

      {/* Feedback Modal */}
      <Dialog open={modalMode === "feedback"} onOpenChange={(o) => !o && setModalMode(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Refine your recommendations</DialogTitle>
          </DialogHeader>
          <FeedbackChips selected={feedbackChips} onToggle={toggleChip} />
          <DialogFooter>
            <Button variant="secondary" onClick={() => setModalMode(null)}>
              Cancel
            </Button>
            <Button onClick={submitFeedback} disabled={adapting}>
              {adapting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : null}
              Update recommendations
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Replace Modal */}
      <Dialog open={modalMode === "replace"} onOpenChange={(o) => !o && setModalMode(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Replace this pick</DialogTitle>
          </DialogHeader>
          <p className="font-outfit text-sm text-text-muted">
            We&apos;ll find a better alternative based on your preferences. Add
            any quick feedback below.
          </p>
          <div className="grid grid-cols-2 gap-3">
            {(
              [
                { value: "similar", label: "Similar", hint: "Same category" },
                {
                  value: "different",
                  label: "Different category",
                  hint: "New type of place",
                },
              ] as const
            ).map((opt) => {
              const active = replaceMode === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setReplaceMode(opt.value)}
                  className={`rounded-input border p-3 text-left transition-colors ${
                    active
                      ? "border-purple bg-purple/10"
                      : "border-border hover:border-purple/50"
                  }`}
                >
                  <p
                    className={`font-outfit text-sm font-semibold ${
                      active ? "text-text-primary" : "text-text-muted"
                    }`}
                  >
                    {opt.label}
                  </p>
                  <p className="font-outfit text-xs text-text-muted">
                    {opt.hint}
                  </p>
                </button>
              );
            })}
          </div>
          <FeedbackChips selected={feedbackChips} onToggle={toggleChip} />
          <DialogFooter>
            <Button variant="secondary" onClick={() => setModalMode(null)}>
              Cancel
            </Button>
            <Button onClick={submitFeedback} disabled={adapting}>
              {adapting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : null}
              Replace &amp; update
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
