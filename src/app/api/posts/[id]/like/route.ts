import { NextRequest, NextResponse } from "next/server";
import { currentUserId, toggleLike } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function POST(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const result = toggleLike(params.id, currentUserId);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 404 });
  }
}
