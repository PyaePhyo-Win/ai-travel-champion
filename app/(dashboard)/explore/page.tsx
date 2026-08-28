"use client";

import * as React from "react";
import { Search, MapPin, Sparkles, Star } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { usePlanStore } from "@/store/usePlanStore";
import { useRouter } from "next/navigation";
import type { DestinationRow } from "@/lib/queries";
import { DEMO_TRIP_ID } from "@/lib/constants";

const FALLBACK_DESTINATIONS = [
  { name: "Tokyo, Japan", emoji: "🗼", tag: "Food · Culture" },
  { name: "Bali, Indonesia", emoji: "🏖️", tag: "Relaxing · Beach" },
  { name: "Paris, France", emoji: "🗼", tag: "Design · Art" },
  { name: "Reykjavík, Iceland", emoji: "🏔️", tag: "Adventure · Leisure" },
  { name: "Lisbon, Portugal", emoji: "🌅", tag: "Food · Affordable" },
  { name: "Kyoto, Japan", emoji: "⛩️", tag: "Culture · History" },
];

export default function ExplorePage() {
  const router = useRouter();
  const setInputText = usePlanStore((s) => s.setInputText);
  const [query, setQuery] = React.useState("");
  const [destinations, setDestinations] = React.useState<DestinationRow[]>([]);

  React.useEffect(() => {
    fetch("/api/destinations")
      .then((res) => res.json())
      .then((data) =>
        setDestinations(
          Array.isArray(data?.destinations) ? (data.destinations as DestinationRow[]) : []
        )
      )
      .catch(() => setDestinations([]));
  }, []);

  const cards = destinations.length
    ? destinations.map((d) => ({
        name: `${d.name}, ${d.country}`,
        emoji: d.emoji,
        tag: d.category || d.tagline || "Destination",
      }))
    : FALLBACK_DESTINATIONS;

  const filtered = cards.filter((d) =>
    d.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-8">
        <Badge variant="ai-pill" icon={<Sparkles className="h-3.5 w-3.5" />}>
          Explore
        </Badge>
        <h1 className="mt-4 font-fraunces text-4xl font-semibold">
          Discover destinations
        </h1>
        <div className="mt-4 flex max-w-md items-center gap-2 rounded-input border border-border bg-bg-card px-3 py-2">
          <Search className="h-4 w-4 text-text-muted" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search destinations"
            className="border-0 bg-transparent px-0 focus-visible:ring-0"
          />
        </div>
      </div>

      <Card className="mb-8 flex flex-col items-start justify-between gap-4 border-purple/40 bg-grad-purple-soft p-6 sm:flex-row sm:items-center">
        <div className="flex items-center gap-4">
          <span className="text-3xl">🗼</span>
          <div>
            <Badge variant="ai-pill" icon={<Star className="h-3.5 w-3.5" />}>
              Sample trip
            </Badge>
            <h3 className="mt-2 font-fraunces text-lg font-semibold">
              Tokyo, Japan — 4 days of food & culture
            </h3>
            <p className="font-outfit text-sm text-text-muted">
              A fully built itinerary you can click through right now.
            </p>
          </div>
        </div>
        <Button
          size="sm"
          onClick={() => router.push(`/trip/${DEMO_TRIP_ID}`)}
        >
          View demo trip
        </Button>
      </Card>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((d) => (
          <Card
            key={d.name}
            className="cursor-pointer p-6 transition-all duration-200 hover:border-purple hover:shadow-purple-glow"
            onClick={() => {
              setInputText(`Plan a trip to ${d.name}.`);
              router.push("/plan/step-1");
            }}
          >
            <div className="flex items-center justify-between">
              <span className="text-3xl">{d.emoji}</span>
              <MapPin className="h-5 w-5 text-purple" />
            </div>
            <h3 className="mt-4 font-fraunces text-lg font-semibold">
              {d.name}
            </h3>
            <p className="mt-1 font-outfit text-sm text-text-muted">{d.tag}</p>
            <Button variant="secondary" size="sm" className="mt-4">
              Plan a trip
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
