"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import { ItineraryItem } from "@/components/plan/ItineraryItem";
import { PlaceMap } from "@/components/ui/PlaceMap";
import type { TripRow } from "@/lib/queries";
import type { MapPlace } from "@/types/map";

export default function ItineraryPage() {
  const params = useParams();
  const id = params.id as string;
  const [trip, setTrip] = React.useState<TripRow | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`/api/trips/${id}`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        setTrip(data.trip as TripRow);
      } catch {
        setTrip(null);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) {
    return <p className="p-12 font-outfit text-text-muted">Loading...</p>;
  }

  const itinerary = trip?.itinerary || [];
  const mapPlaces: MapPlace[] = (trip?.recommendations || []).map((r, i) => ({
    id: r.id || `r-${i}`,
    name: r.name,
    category: r.category,
    categoryIcon: r.categoryIcon,
    matchScore: r.matchScore,
    lat: r.lat || 35.6895,
    lng: r.lng || 139.6917,
  }));

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <Link
        href={`/trip/${id}`}
        className="mb-6 inline-flex items-center gap-2 font-outfit text-sm text-text-muted hover:text-text-primary"
      >
        <ArrowLeft className="h-4 w-4" /> Back to trip
      </Link>

      <div className="mb-8">
        <Badge variant="ai-pill">Itinerary</Badge>
        <h1 className="mt-4 font-fraunces text-4xl font-semibold">
          {trip?.extracted_details?.location} — Day by Day
        </h1>
      </div>

      {itinerary.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="font-outfit text-text-muted">
            No itinerary built yet. Go through the planning flow to generate one.
          </p>
          <Link href="/plan/step-1">
            <Button className="mt-4">Plan a trip</Button>
          </Link>
        </Card>
      ) : (
        <Tabs defaultValue="day-1">
          <div className="flex justify-center">
            <TabsList>
              {itinerary.map((d) => (
                <TabsTrigger key={d.dayNumber} value={`day-${d.dayNumber}`}>
                  Day {d.dayNumber}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          {itinerary.map((day) => (
            <TabsContent key={day.dayNumber} value={`day-${day.dayNumber}`}>
              <Card className="mb-6 p-6">
                <h2 className="font-fraunces text-xl font-semibold">
                  Day {day.dayNumber}: {day.date}
                </h2>
                <p className="font-outfit text-sm text-text-muted">
                  {day.items.length} places · Daily budget{" "}
                  <span className="text-teal">{day.dailyBudget}</span>
                </p>
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
      )}

      <div className="mt-8 flex justify-center">
        <Button full className="max-w-md gap-2" onClick={() => {}}>
          <Compass className="h-5 w-5" /> Start navigating
        </Button>
      </div>
    </div>
  );
}
