"use client";

import { useEffect, useMemo, useState } from "react";

type BrainKind = "memory" | "task" | "document";
type TaskStatus = "inbox" | "next" | "waiting" | "done";

type BrainFile = {
  relPath: string;
  kind: BrainKind;
  size: number;
  updatedAt: string;
};

type BrainTask = {
  id: string;
  title: string;
  notes?: string;
  tags: string[];
  owner?: string;
  dueDate?: string;
  status: TaskStatus;
  priority: "low" | "medium" | "high";
  createdAt: string;
  updatedAt: string;
};

const kindOptions: Array<{ label: string; value: "all" | BrainKind }> = [
  { label: "All", value: "all" },
  { label: "Memory", value: "memory" },
  { label: "Tasks", value: "task" },
  { label: "Documents", value: "document" },
];

const taskColumns: TaskStatus[] = ["inbox", "next", "waiting", "done"];

export default function Home() {
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState<"all" | BrainKind>("all");
  const [files, setFiles] = useState<BrainFile[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [content, setContent] = useState("");

  const [tasks, setTasks] = useState<BrainTask[]>([]);
  const [taskQuery, setTaskQuery] = useState("");
  const [quickTask, setQuickTask] = useState("");

  const summary = useMemo(() => {
    return {
      total: files.length,
      memory: files.filter((f) => f.kind === "memory").length,
      tasks: files.filter((f) => f.kind === "task").length,
      docs: files.filter((f) => f.kind === "document").length,
    };
  }, [files]);

  const review = useMemo(() => {
    const now = new Date();
    const week = new Date();
    week.setDate(week.getDate() + 7);

    const open = tasks.filter((t) => t.status !== "done");
    const dueToday = open.filter((t) => t.dueDate && isSameDay(new Date(t.dueDate), now));
    const dueWeek = open.filter((t) => {
      if (!t.dueDate) return false;
      const d = new Date(t.dueDate);
      return d >= now && d <= week;
    });
    const overdue = open.filter((t) => t.dueDate && new Date(t.dueDate) < now);

    return { dueToday: dueToday.length, dueWeek: dueWeek.length, overdue: overdue.length, open: open.length };
  }, [tasks]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (kind !== "all") params.set("kind", kind);

    fetch(`/api/files?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        const incoming = (data.files || []) as BrainFile[];
        setFiles(incoming);
        if (!selected && incoming[0]?.relPath) setSelected(incoming[0].relPath);
      });
  }, [query, kind, selected]);

  useEffect(() => {
    if (!selected) return;
    fetch(`/api/content?file=${encodeURIComponent(selected)}`)
      .then((res) => res.json())
      .then((data) => setContent(data.content || ""));
  }, [selected]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (taskQuery.trim()) params.set("q", taskQuery.trim());

    fetch(`/api/tasks?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => setTasks(data.tasks || []));
  }, [taskQuery]);

  async function addQuickTask() {
    const title = quickTask.trim();
    if (!title) return;

    await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });

    setQuickTask("");
    const res = await fetch("/api/tasks");
    const data = await res.json();
    setTasks(data.tasks || []);
  }

  async function moveTask(task: BrainTask) {
    const idx = taskColumns.indexOf(task.status);
    const next = taskColumns[Math.min(idx + 1, taskColumns.length - 1)];

    await fetch("/api/tasks", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: task.id, status: next }),
    });

    const res = await fetch("/api/tasks");
    const data = await res.json();
    setTasks(data.tasks || []);
  }

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900 p-6">
      <div className="max-w-7xl mx-auto space-y-4">
        <header className="rounded-2xl bg-white border border-zinc-200 p-4">
          <h1 className="text-2xl font-semibold">Second Brain</h1>
          <p className="text-sm text-zinc-600">Review memories, docs, and tasks in one place.</p>
          <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
            <Stat label="Total Files" value={summary.total} />
            <Stat label="Memory" value={summary.memory} />
            <Stat label="Tasks Files" value={summary.tasks} />
            <Stat label="Docs" value={summary.docs} />
          </div>
        </header>

        <section className="rounded-2xl bg-white border border-zinc-200 p-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
          <Stat label="Open Tasks" value={review.open} />
          <Stat label="Due Today" value={review.dueToday} />
          <Stat label="Due This Week" value={review.dueWeek} />
          <Stat label="Overdue" value={review.overdue} />
        </section>

        <section className="rounded-2xl bg-white border border-zinc-200 p-4 flex flex-col sm:flex-row gap-3">
          <input
            className="flex-1 border border-zinc-300 rounded-xl px-3 py-2"
            placeholder="Quick capture task..."
            value={quickTask}
            onChange={(e) => setQuickTask(e.target.value)}
          />
          <button onClick={addQuickTask} className="rounded-xl px-4 py-2 bg-zinc-900 text-white">
            Add Task
          </button>
          <input
            className="sm:w-64 border border-zinc-300 rounded-xl px-3 py-2"
            placeholder="Search tasks"
            value={taskQuery}
            onChange={(e) => setTaskQuery(e.target.value)}
          />
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-4 gap-3">
          {taskColumns.map((col) => (
            <div key={col} className="rounded-2xl bg-white border border-zinc-200 p-3 min-h-48">
              <h3 className="font-semibold capitalize mb-2">{col}</h3>
              <div className="space-y-2">
                {tasks.filter((t) => t.status === col).map((t) => (
                  <div key={t.id} className="border border-zinc-200 rounded-lg p-2">
                    <div className="text-sm font-medium">{t.title}</div>
                    <div className="text-xs text-zinc-500">{t.priority}{t.dueDate ? ` · due ${new Date(t.dueDate).toLocaleDateString()}` : ""}</div>
                    {col !== "done" && (
                      <button onClick={() => moveTask(t)} className="mt-2 text-xs rounded px-2 py-1 bg-zinc-100 hover:bg-zinc-200">
                        Move →
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section className="rounded-2xl bg-white border border-zinc-200 p-4 flex flex-col sm:flex-row gap-3">
          <input
            className="flex-1 border border-zinc-300 rounded-xl px-3 py-2"
            placeholder="Search across files and content..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <select
            className="border border-zinc-300 rounded-xl px-3 py-2"
            value={kind}
            onChange={(e) => setKind(e.target.value as "all" | BrainKind)}
          >
            {kindOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <aside className="rounded-2xl bg-white border border-zinc-200 p-3 max-h-[70vh] overflow-auto">
            {files.length === 0 ? (
              <p className="text-sm text-zinc-500">No files found.</p>
            ) : (
              <ul className="space-y-1">
                {files.map((f) => (
                  <li key={f.relPath}>
                    <button
                      onClick={() => setSelected(f.relPath)}
                      className={`w-full text-left rounded-lg px-3 py-2 border ${
                        selected === f.relPath
                          ? "bg-zinc-900 text-white border-zinc-900"
                          : "bg-white border-zinc-200 hover:bg-zinc-50"
                      }`}
                    >
                      <div className="text-sm font-medium truncate">{f.relPath}</div>
                      <div className={`text-xs ${selected === f.relPath ? "text-zinc-200" : "text-zinc-500"}`}>
                        {f.kind} · {new Date(f.updatedAt).toLocaleString()}
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </aside>

          <article className="lg:col-span-2 rounded-2xl bg-white border border-zinc-200 p-4 max-h-[70vh] overflow-auto">
            {selected ? (
              <>
                <h2 className="font-semibold mb-2">{selected}</h2>
                <pre className="whitespace-pre-wrap text-sm leading-6">{content || "(empty)"}</pre>
              </>
            ) : (
              <p className="text-sm text-zinc-500">Select a file to preview.</p>
            )}
          </article>
        </section>
      </div>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-zinc-200 px-3 py-2 bg-zinc-50">
      <div className="text-xs text-zinc-500">{label}</div>
      <div className="text-lg font-semibold">{value}</div>
    </div>
  );
}

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
