import { NextResponse } from "next/server";
import { getContributions } from "@/lib/github";

export async function GET() {
  const contributions = await getContributions();

  return NextResponse.json({ contributions });
}
