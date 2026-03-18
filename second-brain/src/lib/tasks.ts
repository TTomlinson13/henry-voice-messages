import fs from "node:fs/promises";
import path from "node:path";

export type TaskStatus = "inbox" | "next" | "waiting" | "done";
export type TaskPriority = "low" | "medium" | "high";

export type BrainTask = {
  id: string;
  title: string;
  notes?: string;
  tags: string[];
  owner?: string;
  dueDate?: string;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: string;
  updatedAt: string;
};

const ROOT = process.env.SECOND_BRAIN_ROOT || path.resolve(process.cwd(), "..");
const TASKS_FILE = path.join(ROOT, "memory", "tasks.json");

async function ensureFile() {
  await fs.mkdir(path.dirname(TASKS_FILE), { recursive: true });
  try {
    await fs.access(TASKS_FILE);
  } catch {
    await fs.writeFile(TASKS_FILE, "[]\n", "utf8");
  }
}

export async function listTasks(q?: string) {
  await ensureFile();
  const raw = await fs.readFile(TASKS_FILE, "utf8");
  const tasks = (JSON.parse(raw || "[]") as BrainTask[]).sort(
    (a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt),
  );

  if (!q?.trim()) return tasks;
  const needle = q.toLowerCase();

  return tasks
    .map((t) => {
      let score = 0;
      if (t.title.toLowerCase().includes(needle)) score += 3;
      if ((t.notes || "").toLowerCase().includes(needle)) score += 1;
      if (t.tags.some((tag) => tag.toLowerCase().includes(needle))) score += 2;
      return { t, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || +new Date(b.t.updatedAt) - +new Date(a.t.updatedAt))
    .map((x) => x.t);
}

export async function createTask(input: Partial<BrainTask> & { title: string }) {
  const tasks = await listTasks();
  const now = new Date().toISOString();

  const task: BrainTask = {
    id: `task_${Date.now().toString(36)}`,
    title: input.title.trim(),
    notes: input.notes?.trim() || "",
    tags: input.tags || [],
    owner: input.owner || "",
    dueDate: input.dueDate || "",
    status: input.status || "inbox",
    priority: input.priority || "medium",
    createdAt: now,
    updatedAt: now,
  };

  tasks.unshift(task);
  await fs.writeFile(TASKS_FILE, JSON.stringify(tasks, null, 2) + "\n", "utf8");
  return task;
}

export async function updateTask(id: string, patch: Partial<BrainTask>) {
  const tasks = await listTasks();
  const idx = tasks.findIndex((t) => t.id === id);
  if (idx < 0) throw new Error("Task not found");

  tasks[idx] = {
    ...tasks[idx],
    ...patch,
    updatedAt: new Date().toISOString(),
  };

  await fs.writeFile(TASKS_FILE, JSON.stringify(tasks, null, 2) + "\n", "utf8");
  return tasks[idx];
}
