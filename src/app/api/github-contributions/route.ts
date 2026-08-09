import { NextResponse } from "next/server";
import { getContributions } from "@/lib/github";

export async function GET() {
  const contributions = await getContributions();

  if (contributions.length === 0) {
    return NextResponse.json(
      { error: "Failed to fetch contributions" },
      { status: 500 }
    );
  }

  return NextResponse.json({ contributions });
}
