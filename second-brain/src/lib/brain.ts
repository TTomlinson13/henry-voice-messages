import fs from "node:fs/promises";
import path from "node:path";

export type BrainKind = "memory" | "task" | "document";

export type BrainFile = {
  relPath: string;
  kind: BrainKind;
  size: number;
  updatedAt: string;
};

const ROOT = process.env.SECOND_BRAIN_ROOT || path.resolve(process.cwd(), "..");
const MAX_FILE_SIZE = 1_000_000;

const EXCLUDED_DIRS = new Set([
  "node_modules",
  ".git",
  ".next",
  "dist",
  "build",
  "coverage",
]);

function classify(relPath: string): BrainKind {
  const p = relPath.toLowerCase();
  if (p === "memory.md" || p.startsWith("memory/")) return "memory";
  if (p.includes("task") || p.includes("todo") || p.includes("project") || p.includes("mission_control")) return "task";
  return "document";
}

function isAllowedFile(relPath: string) {
  const p = relPath.toLowerCase();
  return [".md", ".txt", ".json", ".csv", ".log"].some((ext) => p.endsWith(ext));
}

export async function listBrainFiles(query?: string, kind?: BrainKind) {
  const files: BrainFile[] = [];

  async function walk(dirAbs: string, dirRel = ""): Promise<void> {
    const entries = await fs.readdir(dirAbs, { withFileTypes: true });
    for (const entry of entries) {
      const rel = dirRel ? path.posix.join(dirRel, entry.name) : entry.name;
      const abs = path.join(dirAbs, entry.name);

      if (entry.isDirectory()) {
        if (EXCLUDED_DIRS.has(entry.name)) continue;
        await walk(abs, rel);
        continue;
      }

      if (!isAllowedFile(rel)) continue;

      const stat = await fs.stat(abs);
      if (stat.size > MAX_FILE_SIZE) continue;

      const fileKind = classify(rel);
      if (kind && fileKind !== kind) continue;

      if (query && !rel.toLowerCase().includes(query.toLowerCase())) {
        const content = await fs.readFile(abs, "utf8").catch(() => "");
        if (!content.toLowerCase().includes(query.toLowerCase())) continue;
      }

      files.push({
        relPath: rel,
        kind: fileKind,
        size: stat.size,
        updatedAt: stat.mtime.toISOString(),
      });
    }
  }

  await walk(ROOT);

  return files.sort((a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt));
}

export async function readBrainFile(relPath: string) {
  const normalized = relPath.replace(/^\/+/, "");
  const abs = path.resolve(ROOT, normalized);

  if (!abs.startsWith(ROOT)) {
    throw new Error("Invalid path");
  }

  const content = await fs.readFile(abs, "utf8");
  return content;
}
