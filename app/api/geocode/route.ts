import { NextResponse } from "next/server";
import { geocodePlace } from "@/lib/map/geocode";

export async function POST(req: Request) {
  try {
    const { query } = await req.json();
    if (!query || typeof query !== "string") {
      return NextResponse.json(
        { error: "Missing 'query' field" },
        { status: 400 }
      );
    }

    const result = await geocodePlace(query);
    if (!result) {
      return NextResponse.json(
        { error: "Location not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("geocode error:", error);
    return NextResponse.json(
      { error: "Geocoding failed" },
      { status: 500 }
    );
  }
}
