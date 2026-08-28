export interface GeocodeResult {
  lat: number;
  lng: number;
}

export async function geocodePlace(
  query: string,
  signal?: AbortSignal
): Promise<GeocodeResult | null> {
  try {
    const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q=${encodeURIComponent(
      query
    )}`;
    const res = await fetch(url, {
      headers: {
        "User-Agent": "AI-Travel-Champion/1.0 (travel-app)",
        Accept: "application/json",
      },
      signal,
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon),
      };
    }
    return null;
  } catch {
    return null;
  }
}
