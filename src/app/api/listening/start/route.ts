import { NextRequest, NextResponse } from "next/server";
import { TrackInput, currentUserId, startListening } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const { track, track_id } = body as { track?: unknown; track_id?: unknown };
  const trackPayload = track && typeof track === "object" ? (track as Record<string, unknown>) : null;
  const trackInput: TrackInput | null =
    typeof track_id === "string"
      ? { track_id }
      : trackPayload
        ? ({ track: trackPayload } as TrackInput)
        : null;

  if (!trackInput) {
    return NextResponse.json({ error: "track or track_id is required" }, { status: 400 });
  }

  try {
    const result = startListening({ user_id: currentUserId, track: trackInput });
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}
