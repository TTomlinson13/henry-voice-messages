import { NextRequest, NextResponse } from "next/server";
import { createTask, listTasks, updateTask, type TaskStatus } from "@/lib/tasks";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || undefined;
  const tasks = await listTasks(q);
  return NextResponse.json({ tasks });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  if (!body?.title?.trim()) {
    return NextResponse.json({ error: "title is required" }, { status: 400 });
  }
  const task = await createTask({
    title: body.title,
    notes: body.notes,
    tags: body.tags || [],
    owner: body.owner,
    dueDate: body.dueDate,
    status: (body.status as TaskStatus) || "inbox",
    priority: body.priority || "medium",
  });
  return NextResponse.json({ task });
}

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  if (!body?.id) {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }

  const task = await updateTask(body.id, {
    status: body.status,
    priority: body.priority,
    owner: body.owner,
    dueDate: body.dueDate,
    notes: body.notes,
    title: body.title,
    tags: body.tags,
  });
  return NextResponse.json({ task });
}
