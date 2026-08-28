import { NextResponse } from "next/server";
import { getModel } from "@/lib/gemini/client";
import { GENERATE_RECS_PROMPT } from "@/lib/gemini/prompts";
import { generateRecsSchema } from "@/lib/gemini/schemas";
import type { ExtractedDetails } from "@/types/trip";

export async function POST(req: Request) {
  try {
    const details: ExtractedDetails = await req.json();
    if (!details || !details.location) {
      return NextResponse.json(
        { error: "Missing travel details" },
        { status: 400 }
      );
    }

    const model = getModel();
    const result = await model.generateContent(
      `${GENERATE_RECS_PROMPT}\n\nTRAVEL DETAILS:\n${JSON.stringify(details, null, 2)}`
    );
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

    const validated = generateRecsSchema.parse(parsed);
    const recommendations = validated.recommendations.map((r, i) => ({
      ...r,
      id: `rec-${i}-${Date.now()}`,
      status: "pending" as const,
      sortOrder: i,
    }));

    return NextResponse.json({ recommendations });
  } catch (error) {
    console.error("generate-recs error:", error);
    return NextResponse.json(
      { error: "Failed to generate recommendations" },
      { status: 500 }
    );
  }
}
