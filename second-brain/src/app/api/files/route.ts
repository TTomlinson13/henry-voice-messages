import { NextRequest, NextResponse } from "next/server";
import { listBrainFiles, type BrainKind } from "@/lib/brain";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || undefined;
  const kind = (searchParams.get("kind") as BrainKind | null) || undefined;

  const files = await listBrainFiles(q, kind);
  return NextResponse.json({ files });
}
