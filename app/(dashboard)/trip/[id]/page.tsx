"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { MapPin, Calendar, Wallet, Sparkles, Pencil, ArrowLeft, Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { PlaceMap } from "@/components/ui/PlaceMap";
import type { TripRow } from "@/lib/queries";
import type { MapPlace } from "@/types/map";

export default function TripDetailPage() {
  const params = useParams();
  const router = useRouter();
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
    return <p className="p-12 font-outfit text-text-muted">Loading trip...</p>;
  }

  if (!trip) {
    return (
      <div className="p-12 text-center">
        <p className="font-outfit text-text-muted">Trip not found.</p>
        <Link href="/my-trips">
          <Button variant="secondary" className="mt-4">Back to My Trips</Button>
        </Link>
      </div>
    );
  }

  const details = trip.extracted_details;

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(trip, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${(details?.location || "trip").replace(/\s+/g, "-").toLowerCase()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    const shareUrl = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: details?.location || "My trip",
          url: shareUrl,
        });
        return;
      } catch {
        /* user cancelled — fall through to copy */
      }
    }
    await navigator.clipboard.writeText(shareUrl);
    toast.success("Trip link copied to clipboard!");
  };

  const mapPlaces: MapPlace[] = (trip.recommendations || []).map((r, i) => ({
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
        href="/my-trips"
        className="mb-6 inline-flex items-center gap-2 font-outfit text-sm text-text-muted hover:text-text-primary"
      >
        <ArrowLeft className="h-4 w-4" /> Back to My Trips
      </Link>

      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <Badge variant="ai-pill" icon={<Sparkles className="h-3.5 w-3.5" />}>
            {trip.is_demo ? "Demo Trip" : "Saved Trip"}
          </Badge>
          <h1 className="mt-4 font-fraunces text-4xl font-semibold">
            {details?.location || "Untitled Trip"}
          </h1>
          <div className="mt-3 flex flex-wrap gap-4 font-outfit text-sm text-text-muted">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-purple" /> {details?.dates}
            </span>
            <span className="flex items-center gap-1.5">
              <Wallet className="h-4 w-4 text-purple" />
              {details?.currency} {details?.budget?.toLocaleString()}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-purple" /> {details?.travelers}
            </span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" size="sm" onClick={handleShare}>
            <Share2 className="h-4 w-4" /> Share
          </Button>
          <Button variant="secondary" size="sm" onClick={handleExport}>
            <Download className="h-4 w-4" /> Export
          </Button>
          {!trip.is_demo && (
            <Link href={`/trip/${id}/edit`}>
              <Button variant="secondary" size="sm">
                <Pencil className="h-4 w-4" /> Edit
              </Button>
            </Link>
          )}
          <Link href={`/trip/${id}/itinerary`}>
            <Button size="sm">View itinerary</Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <h2 className="font-fraunces text-xl font-semibold">
            Saved places ({(trip.recommendations || []).length})
          </h2>
          {(trip.recommendations || []).map((r, i) => (
            <Card key={r.id || i} className="p-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{r.categoryIcon}</span>
               <div className="flex-1">
                   <h3 className="font-outfit text-sm font-semibold">{r.name}</h3>
                   <p className="font-outfit text-xs text-text-muted">{r.category}</p>
                   {r.note && (
                     <p className="mt-1.5 font-outfit text-xs text-text-primary">
                       {r.note}
                     </p>
                   )}
                 </div>
                <Badge variant="match">{r.matchScore}%</Badge>
              </div>
            </Card>
          ))}
        </div>
        <div className="lg:sticky lg:top-24 lg:h-[500px]">
          <PlaceMap places={mapPlaces} />
        </div>
      </div>
    </div>
  );
}
