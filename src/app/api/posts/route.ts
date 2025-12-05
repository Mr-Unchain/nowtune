import { NextRequest, NextResponse } from "next/server";
import { TrackInput, createPost, currentUserId } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const { track, track_id, comment_text } = body as {
    track?: unknown;
    track_id?: unknown;
    comment_text?: unknown;
  };

  if (typeof comment_text !== "string" || !comment_text.trim()) {
    return NextResponse.json({ error: "comment_text is required" }, { status: 400 });
  }

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
    const result = createPost({
      user_id: currentUserId,
      track: trackInput,
      comment_text,
    });
    return NextResponse.json({
      post: result.post,
      track: result.track,
      user: result.user,
      likes: result.likes,
      liked: result.liked,
    });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}
