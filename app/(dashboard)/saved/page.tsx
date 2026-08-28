"use client";

import * as React from "react";
import { Bookmark, MapPin, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const SAVED = [
  { name: "Tsukiji Outer Market", cat: "Food Market", emoji: "🏛️", location: "Tokyo" },
  { name: "21_21 Design Sight", cat: "Design", emoji: "🎨", location: "Tokyo" },
  { name: "Shimokitazawa", cat: "Culture", emoji: "🛍️", location: "Tokyo" },
];

export default function SavedPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-8">
        <Badge variant="ai-pill" icon={<Sparkles className="h-3.5 w-3.5" />}>
          Saved
        </Badge>
        <h1 className="mt-4 font-fraunces text-4xl font-semibold">
          Saved places
        </h1>
      </div>

      {SAVED.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="font-outfit text-text-muted">
            No saved places yet.
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SAVED.map((p) => (
            <Card key={p.name} className="p-6">
              <div className="flex items-start gap-3">
                <span className="text-2xl">{p.emoji}</span>
                <div>
                  <h3 className="font-fraunces text-lg font-semibold">{p.name}</h3>
                  <p className="font-outfit text-sm text-text-muted">{p.cat}</p>
                  <p className="mt-1 flex items-center gap-1 font-outfit text-xs text-text-muted">
                    <MapPin className="h-3.5 w-3.5" /> {p.location}
                  </p>
                </div>
                <Bookmark className="ml-auto h-5 w-5 fill-teal text-teal" />
              </div>
              <Button variant="secondary" size="sm" className="mt-4 w-full">
                Add to trip
              </Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
