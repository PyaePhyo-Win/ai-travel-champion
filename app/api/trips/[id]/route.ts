import { NextResponse } from "next/server";
import { auth } from "@/auth";
import {
  getTrip,
  updateTrip,
  deleteTrip,
  type CreateTripInput,
} from "@/lib/queries";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const trip = await getTrip(id, session.user.id);
    if (!trip) {
      return NextResponse.json({ error: "Trip not found" }, { status: 404 });
    }
    return NextResponse.json({ trip });
  } catch (error) {
    console.error("GET /api/trips/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to fetch trip" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const input: Partial<CreateTripInput> = {
      status: body.status,
      inputText: body.inputText,
      extractedDetails: body.extractedDetails,
      constraints: body.constraints,
      recommendations: body.recommendations,
      feedbackHistory: body.feedbackHistory,
      itinerary: body.itinerary,
      currentStep: body.currentStep,
    };

    const trip = await updateTrip(id, session.user.id, input);
    if (!trip) {
      return NextResponse.json({ error: "Trip not found" }, { status: 404 });
    }
    return NextResponse.json({ trip });
  } catch (error) {
    console.error("PATCH /api/trips/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to update trip" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const ok = await deleteTrip(id, session.user.id);
    if (!ok) {
      return NextResponse.json({ error: "Trip not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/trips/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to delete trip" },
      { status: 500 }
    );
  }
}
