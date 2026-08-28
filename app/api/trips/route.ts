import { NextResponse } from "next/server";
import { auth } from "@/auth";
import {
  getTrips,
  createTrip,
  type CreateTripInput,
} from "@/lib/queries";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const trips = await getTrips(session.user.id);
    return NextResponse.json({ trips });
  } catch (error) {
    console.error("GET /api/trips error:", error);
    return NextResponse.json(
      { error: "Failed to fetch trips" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const input: CreateTripInput = {
      inputText: body.inputText,
      extractedDetails: body.extractedDetails ?? null,
      constraints: body.constraints ?? [],
      recommendations: body.recommendations ?? [],
      feedbackHistory: body.feedbackHistory ?? [],
      itinerary: body.itinerary ?? [],
      currentStep: body.currentStep ?? 1,
      status: body.status ?? "planning",
    };

    const trip = await createTrip(session.user.id, input);
    return NextResponse.json({ trip });
  } catch (error) {
    console.error("POST /api/trips error:", error);
    return NextResponse.json(
      { error: "Failed to create trip" },
      { status: 500 }
    );
  }
}
