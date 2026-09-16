import { NextResponse } from "next/server";
import { getContributions } from "@/lib/github";

export const revalidate = 3600;

export async function GET() {
  try {
    const contributions = await getContributions();

    if (!contributions || contributions.length === 0) {
      return NextResponse.json({ error: "Failed to fetch contributions" }, { status: 500 });
    }

    return NextResponse.json({ contributions });
  } catch {
    return NextResponse.json({ error: "Failed to fetch contributions" }, { status: 500 });
  }
}
