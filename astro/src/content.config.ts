import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// The corpus id is `<topic>/<entry>` or `<topic>/<entry>/<NN-child>`, with no
// `/index` segment. The default generator would produce `…/index`, which breaks
// every id in the corpus, so the id is generated explicitly here.
const generateId = ({ entry }: { entry: string }) =>
  entry.replace(/\.md$/, "").replace(/\/index$/, "");

// Deliberately permissive: every field is optional. The 297 examples files per
// root have no frontmatter at all, so a required field would fail the build for
// 594 entries. Field order and presence are the corpus validator's business,
// not the site's.
const lessonSchema = z.object({
  title: z.string().optional(),
  type: z.string().optional(),
  topic: z.string().optional(),
  tier: z.string().optional(),
  status: z.string().optional(),
  aliases: z.array(z.string()).optional(),
  prereqs: z.array(z.string()).default([]),
  related: z.array(z.string()).optional(),
});

const en = defineCollection({
  loader: glob({
    pattern: ["**/*.md", "!ru/**", "!INDEX.md", "!AUTHORING.md"],
    base: "../lessons",
    generateId,
  }),
  schema: lessonSchema,
});

const ru = defineCollection({
  loader: glob({
    pattern: ["**/*.md", "!INDEX.md", "!GLOSSARY.md"],
    base: "../lessons/ru",
    generateId,
  }),
  schema: lessonSchema,
});

export const collections = { en, ru };
