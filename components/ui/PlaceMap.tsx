"use client";

import * as React from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { MAP_CONFIG } from "@/lib/map/config";
import type { MapPlace } from "@/types/map";
import { cn } from "@/lib/utils";

interface PlaceMapProps {
  places: MapPlace[];
  selectedId?: string | null;
  onPlaceClick?: (id: string) => void;
  className?: string;
  showRoute?: boolean;
}

export function PlaceMap({
  places,
  selectedId,
  onPlaceClick,
  className,
  showRoute = false,
}: PlaceMapProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const mapRef = React.useRef<maplibregl.Map | null>(null);
  const markersRef = React.useRef<Record<string, maplibregl.Marker>>({});
  const [loaded, setLoaded] = React.useState(false);

  // Initialize map once
  React.useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: MAP_CONFIG.style,
      center: MAP_CONFIG.center,
      zoom: MAP_CONFIG.zoom,
      attributionControl: false,
    });

    map.addControl(
      new maplibregl.NavigationControl({ showCompass: false }),
      "top-right"
    );
    map.addControl(
      new maplibregl.AttributionControl({ compact: true }),
      "bottom-right"
    );

    map.on("load", () => setLoaded(true));
    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Add/update markers when places change
  React.useEffect(() => {
    const map = mapRef.current;
    if (!map || !loaded) return;

    // Clear existing
    Object.values(markersRef.current).forEach((m) => m.remove());
    markersRef.current = {};

    if (places.length === 0) return;

    const bounds = new maplibregl.LngLatBounds();
    places.forEach((place) => {
      const el = document.createElement("div");
      el.className = cn(
        "place-marker flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 text-sm transition-all",
        place.id === selectedId
          ? "border-teal bg-teal/30 scale-125 z-10"
          : "border-purple bg-purple/20 hover:scale-110"
      );
      el.textContent = place.categoryIcon;

      const popup = new maplibregl.Popup({ offset: 16, closeButton: false }).setHTML(
        `<div class="text-sm"><strong>${place.name}</strong><br/><span style="color:#A78BFA">${place.matchScore}% match</span></div>`
      );

      const marker = new maplibregl.Marker({ element: el })
        .setLngLat([place.lng, place.lat])
        .setPopup(popup)
        .addTo(map);

      el.addEventListener("click", (e) => {
        e.stopPropagation();
        onPlaceClick?.(place.id);
      });

      markersRef.current[place.id] = marker;
      bounds.extend([place.lng, place.lat]);
    });

    if (places.length > 0) {
      map.fitBounds(bounds, { padding: 80, duration: 800, maxZoom: 14 });
    }
  }, [places, loaded, selectedId, onPlaceClick]);

  return (
    <div
      ref={containerRef}
      className={cn("h-[400px] w-full overflow-hidden rounded-card", className)}
    />
  );
}
