"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Plus, MapPin, Calendar, Wallet, Trash2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { usePlanStore } from "@/store/usePlanStore";
import type { TripRow } from "@/lib/queries";

export default function MyTripsPage() {
  const router = useRouter();
  const { setStep, reset } = usePlanStore();
  const [trips, setTrips] = React.useState<TripRow[]>([]);
  const [loading, setLoading] = React.useState(true);

  const load = React.useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/trips");
      if (!res.ok) throw new Error();
      const data = await res.json();
      setTrips(data.trips as TripRow[]);
    } catch {
      toast.error("Failed to load trips.");
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    load();
  }, [load]);

  const deleteTrip = async (id: string) => {
    const res = await fetch(`/api/trips/${id}`, { method: "DELETE" });
    if (!res.ok) {
      toast.error("Failed to delete trip.");
      return;
    }
    toast.success("Trip deleted");
    load();
  };

  const startNew = () => {
    reset();
    setStep(1);
    router.push("/plan/step-1");
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <Badge variant="ai-pill" icon={<Sparkles className="h-3.5 w-3.5" />}>
            My Trips
          </Badge>
          <h1 className="mt-4 font-fraunces text-4xl font-semibold">
            Your trips
          </h1>
        </div>
        <Button onClick={startNew} className="gap-2">
          <Plus className="h-4 w-4" /> New trip
        </Button>
      </div>

      {loading ? (
        <p className="font-outfit text-text-muted">Loading...</p>
      ) : trips.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="font-outfit text-text-muted">
            No trips yet. Start planning your first adventure!
          </p>
          <Button onClick={startNew} className="mt-4">
            Plan a trip
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {trips.map((trip) => (
            <Card key={trip.id} className="flex flex-col p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-fraunces text-lg font-semibold">
                    {trip.extracted_details?.location || "Untitled trip"}
                  </h3>
                  <p className="font-outfit text-sm text-text-muted">
                    {trip.extracted_details?.dates || "No dates"}
                  </p>
                </div>
                {!trip.is_demo && (
                  <button
                    onClick={() => deleteTrip(trip.id)}
                    className="text-text-muted transition-colors hover:text-red-400"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
              <div className="mt-4 flex flex-wrap gap-2 font-mono text-xs text-text-muted">
                <span className="flex items-center gap-1">
                  <Wallet className="h-3.5 w-3.5" />
                  {trip.extracted_details?.currency}{" "}
                  {trip.extracted_details?.budget?.toLocaleString()}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {trip.recommendations?.length || 0} picks
                </span>
              </div>
              <Link
                href={`/trip/${trip.id}`}
                className="mt-4 inline-flex"
              >
                <Button variant="secondary" size="sm" className="w-full">
                  View trip
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
