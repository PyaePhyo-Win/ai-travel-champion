"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Sparkles, Compass } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import { ItineraryItem } from "@/components/plan/ItineraryItem";
import { PlaceMap } from "@/components/ui/PlaceMap";
import { usePlanStore } from "@/store/usePlanStore";
import type { MapPlace } from "@/types/map";

export default function Step4Page() {
  const router = useRouter();
  const {
    itinerary,
    recommendations,
    inputText,
    extractedDetails,
    tripId,
    setTripId,
  } = usePlanStore();
  const [saving, setSaving] = React.useState(false);

  const saveTrip = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/trips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          inputText,
          extractedDetails,
          recommendations: recommendations.filter((r) => r.status === "kept"),
          itinerary,
          currentStep: 4,
          status: "planning",
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.trip) throw new Error();
      setTripId(data.trip.id);
      toast.success("Trip saved!");
      router.push(`/trip/${data.trip.id}/itinerary`);
    } catch {
      toast.error("Could not save your trip. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const mapPlaces: MapPlace[] = recommendations
    .filter((r) => r.status === "kept" || recommendations.length <= 6)
    .map((r) => ({
      id: r.id,
      name: r.name,
      category: r.category,
      categoryIcon: r.categoryIcon,
      matchScore: r.matchScore,
      lat: r.lat || 35.6895,
      lng: r.lng || 139.6917,
    }));

  if (itinerary.length === 0) {
    return (
      <div className="space-y-6 text-center">
        <Badge variant="ai-pill" icon={<Sparkles className="h-3.5 w-3.5" />}>
          Step 4 · Itinerary
        </Badge>
        <h1 className="font-fraunces text-3xl font-semibold">No itinerary yet</h1>
        <p className="font-outfit text-text-muted">
          Go back and build your itinerary from your kept picks.
        </p>
        <Button onClick={() => router.push("/plan/step-3")}>
          Back to review
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <Badge variant="ai-pill" icon={<Sparkles className="h-3.5 w-3.5" />}>
          Step 4 · Itinerary
        </Badge>
        <h1 className="mt-4 font-fraunces text-3xl font-semibold">
          Your day-by-day plan
        </h1>
      </div>

      <Tabs defaultValue={`day-1`}>
        <div className="flex justify-center">
          <TabsList>
            {itinerary.map((day) => (
              <TabsTrigger key={day.dayNumber} value={`day-${day.dayNumber}`}>
                Day {day.dayNumber}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {itinerary.map((day) => (
          <TabsContent key={day.dayNumber} value={`day-${day.dayNumber}`}>
            <Card className="mb-6 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-fraunces text-xl font-semibold">
                    Day {day.dayNumber}: {day.date}
                  </h2>
                  <p className="font-outfit text-sm text-text-muted">
                    {day.items.length} places · Daily budget{" "}
                    <span className="text-teal">{day.dailyBudget}</span>
                  </p>
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="rounded-card border border-border bg-bg-card p-6">
                {day.items.map((item, i) => (
                  <ItineraryItem
                    key={i}
                    index={i}
                    time={item.time}
                    placeName={item.placeName}
                    duration={item.duration}
                    price={item.price}
                  />
                ))}
              </div>
              <div className="lg:sticky lg:top-24 lg:h-[400px]">
                <PlaceMap places={mapPlaces} showRoute />
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <div className="flex justify-center gap-3 pt-2">
        <Button full className="max-w-md gap-2" onClick={saveTrip} disabled={saving}>
          <Compass className="h-5 w-5" />
          {saving ? "Saving..." : "Save & start navigating"}
        </Button>
      </div>
    </div>
  );
}
