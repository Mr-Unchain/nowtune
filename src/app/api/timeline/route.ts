import { NextRequest, NextResponse } from "next/server";
import { getTimeline } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const typeParam = searchParams.get("type");
  const type = typeParam === "post" || typeParam === "listening" ? typeParam : "all";

  const items = getTimeline(type);
  return NextResponse.json({ items });
}
