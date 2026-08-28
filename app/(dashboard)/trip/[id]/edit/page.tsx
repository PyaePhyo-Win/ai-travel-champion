"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { ArrowLeft, Save } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import type { TripRow } from "@/lib/queries";
import type { ExtractedDetails } from "@/types/trip";

export default function EditTripPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [trip, setTrip] = React.useState<TripRow | null>(null);
  const [details, setDetails] = React.useState<ExtractedDetails | null>(null);
  const [saving, setSaving] = React.useState(false);

  React.useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`/api/trips/${id}`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        setTrip(data.trip as TripRow);
        setDetails((data.trip?.extracted_details as ExtractedDetails) || null);
      } catch {
        setTrip(null);
      }
    };
    load();
  }, [id]);

  const updateField = (field: keyof ExtractedDetails, value: string | string[]) => {
    if (!details) return;
    setDetails({ ...details, [field]: value });
  };

  const save = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/trips/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ extractedDetails: details }),
      });
      if (!res.ok) throw new Error();
      toast.success("Trip updated!");
      router.push(`/trip/${id}`);
    } catch {
      toast.error("Failed to save.");
    } finally {
      setSaving(false);
    }
  };

  if (!details) {
    return <p className="p-12 font-outfit text-text-muted">Loading...</p>;
  }

  const fields: { key: keyof ExtractedDetails; label: string }[] = [
    { key: "location", label: "Location" },
    { key: "dates", label: "Dates" },
    { key: "budget", label: "Budget (number)" },
    { key: "travelStyle", label: "Travel Style" },
    { key: "travelers", label: "Travelers" },
    { key: "interests", label: "Interests (comma-separated)" },
  ];

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <Link
        href={`/trip/${id}`}
        className="mb-6 inline-flex items-center gap-2 font-outfit text-sm text-text-muted hover:text-text-primary"
      >
        <ArrowLeft className="h-4 w-4" /> Back to trip
      </Link>

      <Badge variant="ai-pill">Editing Trip Details</Badge>
      <h1 className="mt-4 font-fraunces text-3xl font-semibold">
        Edit your trip
      </h1>

      <Card className="mt-8 space-y-4 p-6">
        {fields.map((f) => (
          <div key={f.key}>
            <label className="mb-1.5 block font-outfit text-sm text-text-muted">
              {f.label}
            </label>
            <Input
              value={
                Array.isArray(details[f.key])
                  ? (details[f.key] as string[]).join(", ")
                  : String(details[f.key] ?? "")
              }
              onChange={(e) => {
                const val = e.target.value;
                if (f.key === "interests") {
                  updateField(f.key, val.split(",").map((s) => s.trim()));
                } else if (f.key === "budget") {
                  updateField(f.key, val);
                } else {
                  updateField(f.key, val);
                }
              }}
            />
          </div>
        ))}
      </Card>

      <div className="mt-6 flex justify-end">
        <Button onClick={save} disabled={saving} className="gap-2">
          <Save className="h-4 w-4" />
          {saving ? "Saving..." : "Save changes"}
        </Button>
      </div>
    </div>
  );
}
