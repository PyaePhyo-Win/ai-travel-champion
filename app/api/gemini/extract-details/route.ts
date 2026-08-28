import { NextResponse } from "next/server";
import { getModel } from "@/lib/gemini/client";
import { EXTRACT_DETAILS_PROMPT } from "@/lib/gemini/prompts";
import { extractedDetailsSchema } from "@/lib/gemini/schemas";

export async function POST(req: Request) {
  try {
    const { text } = await req.json();
    if (!text || typeof text !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid 'text' field" },
        { status: 400 }
      );
    }

    const model = getModel();
    const result = await model.generateContent(
      `${EXTRACT_DETAILS_PROMPT}\n\nUSER REQUEST:\n${text}`
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

    const validated = extractedDetailsSchema.parse(parsed);
    return NextResponse.json(validated);
  } catch (error) {
    console.error("extract-details error:", error);
    return NextResponse.json(
      { error: "Failed to extract details" },
      { status: 500 }
    );
  }
}
