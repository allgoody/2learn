import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Two rules over the rendered markdown, both zero-dependency.
 *
 * ⚠ The filename says `rehype-`, but Astro 7's default Markdown pipeline is
 * Sätteri, which does not run rehype plugins. This is a **Sätteri HAST plugin**
 * (a plain object — `defineHastPlugin` from `satteri` is only a typed identity
 * helper, so importing it would add a dependency for nothing).
 *
 * 1. A backticked corpus id inside a list item becomes a link. The corpus always
 *    writes ids as `<code>02-frontend/05-css</code>` — measured in 177 of 177
 *    entry files in both roots, none writes a bare `(id)` — so there is no other
 *    form to handle.
 * 2. The `Done when:` paragraph becomes a callout, in both locales.
 */

const DONE_WHEN = ["Done when:", "Готово, когда:"];

/**
 * The repository root, found by walking up from the working directory: the
 * build bundles this module, so `import.meta.url` does not reliably point at
 * the source file.
 */
const REPO_ROOT = (() => {
  const candidates = [
    resolve(dirname(fileURLToPath(import.meta.url)), "..", "..", ".."),
    process.cwd(),
    resolve(process.cwd(), ".."),
  ];
  const found = candidates.find((dir) => existsSync(join(dir, "tools", "inventory.json")));
  if (!found) {
    throw new Error("content transform: could not locate tools/inventory.json");
  }
  return found;
})();

function readInventory(root) {
  try {
    return JSON.parse(readFileSync(join(root, "tools", "inventory.json"), "utf8"));
  } catch (cause) {
    throw new Error("content transform: tools/inventory.json is not readable JSON", { cause });
  }
}

let cachedIds;

/**
 * Every id `tools/validate-content.mjs` V12 would accept, built from the English
 * tree — which is authoritative. Memoised: the plugin factory runs once per
 * document, so building this per file would mean ~1400 × 200 disk reads.
 */
function validIds() {
  if (cachedIds) return cachedIds;
  const ids = new Set();
  for (const entry of readInventory(REPO_ROOT)) {
    ids.add(entry.id);
  }
  const lessons = join(REPO_ROOT, "lessons");
  for (const topic of readdirSync(lessons, { withFileTypes: true })) {
    if (!topic.isDirectory() || topic.name === "ru") continue;
    const topicPath = join(lessons, topic.name);
    for (const entry of readdirSync(topicPath, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      for (const name of readdirSync(join(topicPath, entry.name))) {
        if (/^\d{2}-.*\.md$/.test(name)) {
          ids.add(`${topic.name}/${entry.name}/${name.replace(/\.md$/, "")}`);
        }
      }
    }
  }
  cachedIds = ids;
  return ids;
}

/**
 * The plugin factory. Sätteri calls it once per document with the document's
 * `fileURL`, which is the only thing that tells an English page from a Russian
 * one. It is used for nothing else.
 */
export default function contentTransform(context) {
  const filePath = context?.fileURL ? fileURLToPath(context.fileURL) : "";
  // Normalise the separators: on Windows a path uses backslashes.
  const prefix = filePath.replace(/\\/g, "/").includes("/lessons/ru/") ? "/ru" : "";
  const ids = validIds();

  return {
    name: "2learn-content",
    element: [
      {
        // Only a `<code>` element. Requiring an `<li>` parent is what keeps
        // block code inside a `<pre>` byte-identical.
        filter: ["code"],
        visit(node, ctx) {
          const parent = ctx.parent(node);
          if (parent?.type !== "element" || parent.tagName !== "li") return;
          const id = ctx.textContent(node);
          if (!ids.has(id)) return;
          // Returning a node replaces the visited one.
          return {
            type: "element",
            tagName: "a",
            properties: { href: `${prefix}/${id}/` },
            children: [{ type: "text", value: id }],
          };
        },
      },
      {
        filter: ["p"],
        visit(node, ctx) {
          const text = ctx.textContent(node);
          if (!DONE_WHEN.some((marker) => text.startsWith(marker))) return;
          ctx.setProperty(node, "class", "done-when");
        },
      },
    ],
  };
}
