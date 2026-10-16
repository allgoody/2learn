import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * The navigation graph. Deliberately free of any content-collection import so it
 * stays plain, unit-testable TypeScript; `lessons.ts` wraps it for pages.
 *
 * It answers for both locales at once: `lessons/ru` mirrors `lessons/`
 * path-for-path, and `tools/inventory.json` is keyed by the same ids, so the
 * child lists, topic order and (mirrored) `related` ids are locale-independent.
 * The build bundles pages into `dist/.prerender/`, so `import.meta.url` points
 * at the bundle rather than at this file. Resolve the repository root from the
 * working directory instead (`npm run build` runs in `astro/`).
 */
const REPO_ROOT = (() => {
  const candidates = [process.cwd(), join(process.cwd(), "..")];
  const found = candidates.find((dir) => existsSync(join(dir, "tools", "inventory.json")));
  if (!found) {
    throw new Error(`Could not find tools/inventory.json by walking up from ${process.cwd()}`);
  }
  return found;
})();
export const LESSONS_DIR = join(REPO_ROOT, "lessons");

export interface InventoryEntry {
  id: string;
  topic: string;
  slug: string;
  title: string;
  type: string;
  tier: string;
  prereqs: string[];
  aliases: string[];
}

let inventory: InventoryEntry[];
try {
  inventory = JSON.parse(readFileSync(join(REPO_ROOT, "tools", "inventory.json"), "utf8"));
} catch (cause) {
  throw new Error("tools/inventory.json could not be read as JSON", { cause });
}

const entryIds = inventory.map((entry) => entry.id);

const isExamplesFile = (name: string) =>
  name === "examples.md" || name.startsWith("examples.");

/** entry id → child lesson ids, in filename order. */
const childrenByEntry = new Map<string, string[]>();
for (const topicDir of readdirSync(LESSONS_DIR, { withFileTypes: true })) {
  if (!topicDir.isDirectory() || topicDir.name === "ru") continue;
  const topicPath = join(LESSONS_DIR, topicDir.name);
  for (const entryDir of readdirSync(topicPath, { withFileTypes: true })) {
    if (!entryDir.isDirectory()) continue;
    const entryPath = join(topicPath, entryDir.name);
    const entryId = `${topicDir.name}/${entryDir.name}`;
    const childIds = readdirSync(entryPath)
      .filter(
        (name) =>
          name.endsWith(".md") && name !== "index.md" && !isExamplesFile(name),
      )
      .map((name) => name.replace(/\.md$/, ""))
      .sort((a, b) => (a < b ? -1 : a > b ? 1 : 0))
      .map((slug) => `${entryId}/${slug}`);
    if (childIds.length > 0) childrenByEntry.set(entryId, childIds);
  }
}

/** entry id → `related` ids. Non-empty in exactly three entries per root. */
const relatedByEntry = new Map<string, string[]>();
for (const id of entryIds) {
  const source = readFileSync(join(LESSONS_DIR, id, "index.md"), "utf8");
  const match = source.match(/^related: *\[(.*)\]/m);
  if (!match) continue;
  const ids = match[1]
    .split(",")
    .map((value) => value.trim().replace(/^["']|["']$/g, ""))
    .filter(Boolean);
  if (ids.length > 0) relatedByEntry.set(id, ids);
}

export interface PrevNext {
  prev: string | undefined;
  next: string | undefined;
}

/** Child lessons of an entry, in filename order. */
export function childrenOf(entryId: string): string[] {
  return childrenByEntry.get(entryId) ?? [];
}

/** Prerequisite entry ids of an entry. */
export function prereqsOf(entryId: string): string[] {
  return inventory.find((entry) => entry.id === entryId)?.prereqs ?? [];
}

/** Related entry ids of an entry. */
export function relatedOf(entryId: string): string[] {
  return relatedByEntry.get(entryId) ?? [];
}

/**
 * Previous and next child lesson inside the same entry. `undefined` at the
 * ends, and for anything that is not a child lesson.
 */
export function prevNextInEntry(id: string): PrevNext {
  const entryId = id.split("/").slice(0, 2).join("/");
  const childIds = childrenByEntry.get(entryId) ?? [];
  const at = childIds.indexOf(id);
  if (at === -1) return { prev: undefined, next: undefined };
  return { prev: childIds[at - 1], next: childIds[at + 1] };
}

/** Previous and next **entry** inside the same topic, so a reader can page through a topic. */
export function prevNextInTopic(entryId: string): PrevNext {
  const topic = entryId.split("/")[0];
  const topicEntries = entriesOfTopic(topic);
  const at = topicEntries.indexOf(entryId);
  if (at === -1) return { prev: undefined, next: undefined };
  return { prev: topicEntries[at - 1], next: topicEntries[at + 1] };
}

/** Entry ids of a topic, in directory order (inventory order — zero-padded NN). */
export function entriesOfTopic(topic: string): string[] {
  return entryIds.filter((id) => id.split("/")[0] === topic);
}
