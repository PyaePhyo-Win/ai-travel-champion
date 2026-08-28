import { NextResponse } from "next/server";
import { getDestinations } from "@/lib/queries";

export async function GET() {
  try {
    const destinations = await getDestinations();
    return NextResponse.json({ destinations });
  } catch (error) {
    console.error("GET /api/destinations error:", error);
    return NextResponse.json(
      { error: "Failed to fetch destinations" },
      { status: 500 }
    );
  }
}
