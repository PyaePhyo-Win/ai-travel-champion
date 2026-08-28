import { GoogleGenerativeAI, type GenerationConfig } from "@google/generative-ai";

let client: GoogleGenerativeAI | null = null;

export function getGeminiClient(): GoogleGenerativeAI {
  if (!client) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not configured");
    }
    client = new GoogleGenerativeAI(apiKey);
  }
  return client;
}

export function getModel() {
  const client = getGeminiClient();
  const modelName = process.env.GEMINI_MODEL || "gemini-2.0-flash-exp";
  return client.getGenerativeModel({
    model: modelName,
    generationConfig: {
      responseMimeType: "application/json",
      temperature: 0.7,
    } as GenerationConfig,
  });
}
