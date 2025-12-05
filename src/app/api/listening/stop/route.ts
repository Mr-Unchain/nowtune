import { NextResponse } from "next/server";
import { currentUserId, stopListening } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function POST() {
  const result = stopListening(currentUserId);
  if (!result) {
    return NextResponse.json({ message: "No active listening" });
  }
  return NextResponse.json({ activity: result });
}
