import { NextResponse } from "next/server";
import { getModel } from "@/lib/gemini/client";
import { BUILD_ITINERARY_PROMPT } from "@/lib/gemini/prompts";
import { buildItinerarySchema } from "@/lib/gemini/schemas";
import type { Recommendation, ExtractedDetails } from "@/types/trip";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { recommendations, tripDetails } = body as {
      recommendations: Recommendation[];
      tripDetails: ExtractedDetails;
    };

    if (!recommendations || recommendations.length === 0) {
      return NextResponse.json(
        { error: "No recommendations provided" },
        { status: 400 }
      );
    }

    const kept = recommendations.filter((r) => r.status === "kept");
    const source = kept.length > 0 ? kept : recommendations;

    const model = getModel();
    const prompt = `${BUILD_ITINERARY_PROMPT}

KEPT PLACES:
${JSON.stringify(
  source.map((r) => ({
    name: r.name,
    category: r.category,
    priceRange: r.priceRange,
  })),
  null,
  2
)}

TRIP DETAILS:
${JSON.stringify(tripDetails, null, 2)}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const raw = response.text();

    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch {
      const match = raw.match(/\{[\s\S]*\}/);
      if (!match) throw new Error("Invalid JSON from model");
      parsed = JSON.parse(match[0]);
    }

    const validated = buildItinerarySchema.parse(parsed);
    return NextResponse.json({ itinerary: validated.itinerary });
  } catch (error) {
    console.error("build-itinerary error:", error);
    return NextResponse.json(
      { error: "Failed to build itinerary" },
      { status: 500 }
    );
  }
}
