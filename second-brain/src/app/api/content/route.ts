import { NextRequest, NextResponse } from "next/server";
import { readBrainFile } from "@/lib/brain";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const file = searchParams.get("file");

  if (!file) {
    return NextResponse.json({ error: "Missing file" }, { status: 400 });
  }

  try {
    const content = await readBrainFile(file);
    return NextResponse.json({ file, content });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to read file" },
      { status: 400 },
    );
  }
}
