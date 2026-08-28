import { prisma } from "@/lib/db";
import type {
  ExtractedDetails,
  Recommendation,
  ItineraryDay,
  FeedbackLog,
} from "@/types/trip";

export interface TripRow {
  id: string;
  user_id: string | null;
  is_demo: boolean;
  status: string;
  input_text: string;
  extracted_details: ExtractedDetails | null;
  constraints: string[];
  recommendations: Recommendation[];
  feedback_history: FeedbackLog[];
  itinerary: ItineraryDay[];
  current_step: number;
  created_at: string;
  updated_at: string;
}

export interface DestinationRow {
  id: string;
  name: string;
  country: string;
  emoji: string;
  tagline: string | null;
  category: string | null;
  lat: number | null;
  lng: number | null;
}

export interface CreateTripInput {
  inputText?: string;
  extractedDetails?: ExtractedDetails | null;
  constraints?: unknown[];
  recommendations?: unknown[];
  feedbackHistory?: unknown[];
  itinerary?: unknown[];
  currentStep?: number;
  status?: string;
}

function toTripRow(t: {
  id: string;
  userId: string | null;
  isDemo: boolean;
  status: string;
  inputText: string;
  extractedDetails: unknown;
  constraints: unknown;
  recommendations: unknown;
  feedbackHistory: unknown;
  itinerary: unknown;
  currentStep: number;
  createdAt: Date;
  updatedAt: Date;
}): TripRow {
  return {
    id: t.id,
    user_id: t.userId,
    is_demo: t.isDemo,
    status: t.status,
    input_text: t.inputText,
    extracted_details: (t.extractedDetails as ExtractedDetails) ?? null,
    constraints: (t.constraints as string[]) ?? [],
    recommendations: (t.recommendations as Recommendation[]) ?? [],
    feedback_history: (t.feedbackHistory as FeedbackLog[]) ?? [],
    itinerary: (t.itinerary as ItineraryDay[]) ?? [],
    current_step: t.currentStep,
    created_at: t.createdAt.toISOString(),
    updated_at: t.updatedAt.toISOString(),
  };
}

export async function getTrips(userId: string): Promise<TripRow[]> {
  const trips = await prisma.trip.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
  return trips.map(toTripRow);
}

export async function getTrip(
  id: string,
  userId: string
): Promise<TripRow | null> {
  const trip = await prisma.trip.findUnique({ where: { id } });
  if (!trip) return null;
  if (trip.userId !== userId && !trip.isDemo) return null;
  return toTripRow(trip);
}

export async function createTrip(
  userId: string,
  data: CreateTripInput
): Promise<TripRow> {
  const trip = await prisma.trip.create({
    data: {
      userId,
      status: data.status ?? "planning",
      inputText: data.inputText ?? "",
      extractedDetails: (data.extractedDetails ?? undefined) as object,
      constraints: (data.constraints ?? []) as object,
      recommendations: (data.recommendations ?? []) as object,
      feedbackHistory: (data.feedbackHistory ?? []) as object,
      itinerary: (data.itinerary ?? []) as object,
      currentStep: data.currentStep ?? 1,
    },
  });
  return toTripRow(trip);
}

export async function updateTrip(
  id: string,
  userId: string,
  data: Partial<CreateTripInput>
): Promise<TripRow | null> {
  const trip = await prisma.trip.findUnique({ where: { id } });
  if (!trip || trip.userId !== userId || trip.isDemo) return null;

  const updated = await prisma.trip.update({
    where: { id },
    data: {
      status: data.status,
      inputText: data.inputText,
      extractedDetails: data.extractedDetails as object | undefined,
      constraints: data.constraints as object | undefined,
      recommendations: data.recommendations as object | undefined,
      feedbackHistory: data.feedbackHistory as object | undefined,
      itinerary: data.itinerary as object | undefined,
      currentStep: data.currentStep,
    },
  });
  return toTripRow(updated);
}

export async function deleteTrip(id: string, userId: string): Promise<boolean> {
  const trip = await prisma.trip.findUnique({ where: { id } });
  if (!trip || trip.userId !== userId) return false;
  await prisma.trip.delete({ where: { id } });
  return true;
}

export async function getDestinations(): Promise<DestinationRow[]> {
  const rows = await prisma.destination.findMany({
    orderBy: { name: "asc" },
  });
  return rows.map((d) => ({
    id: d.id,
    name: d.name,
    country: d.country,
    emoji: d.emoji,
    tagline: d.tagline,
    category: d.category,
    lat: d.lat,
    lng: d.lng,
  }));
}
