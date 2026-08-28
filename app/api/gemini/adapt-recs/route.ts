import { NextResponse } from "next/server";
import { getModel } from "@/lib/gemini/client";
import { ADAPT_RECS_PROMPT } from "@/lib/gemini/prompts";
import { generateRecsSchema } from "@/lib/gemini/schemas";
import type { Recommendation, FeedbackPayload } from "@/types/trip";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { recommendations, feedback, mode } = body as {
      recommendations: Recommendation[];
      feedback: FeedbackPayload;
      mode?: "similar" | "different";
    };

    if (!recommendations || !feedback) {
      return NextResponse.json(
        { error: "Missing recommendations or feedback" },
        { status: 400 }
      );
    }

    const modeInstruction =
      mode === "different"
        ? "Find a DIFFERENT CATEGORY alternative (e.g. swap a restaurant for an activity or a museum) that still fits the trip."
        : "Find a SIMILAR alternative in the SAME category that better matches the user's feedback.";

    const kept = recommendations.filter(
      (r) => r.status === "kept" && r.id !== feedback.replacedId
    );
    const toReplace = feedback.replacedId
      ? recommendations.filter((r) => r.id === feedback.replacedId)
      : [];

    const model = getModel();
    const prompt = `${ADAPT_RECS_PROMPT}

REPLACE STRATEGY: ${modeInstruction}

CURRENT KEPT RECOMMENDATIONS (keep these):
${JSON.stringify(kept, null, 2)}

${
  toReplace.length > 0
    ? `REPLACE THIS PLACE:\n${JSON.stringify(toReplace, null, 2)}`
    : "NO SPECIFIC REPLACEMENT REQUESTED."
}

USER FEEDBACK CHIPS:
${JSON.stringify(feedback.chips, null, 2)}`;

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

    const validated = generateRecsSchema.parse(parsed);
    const newRecommendations = validated.recommendations.map((r, i) => ({
      ...r,
      id: `rec-${i}-${Date.now()}`,
      status: "pending" as const,
      sortOrder: i,
    }));

    return NextResponse.json({ recommendations: newRecommendations });
  } catch (error) {
    console.error("adapt-recs error:", error);
    return NextResponse.json(
      { error: "Failed to adapt recommendations" },
      { status: 500 }
    );
  }
}
