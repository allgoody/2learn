import { getCollection, render, type CollectionEntry } from "astro:content";
import { type Locale, topicBlurb } from "./corpus";
import * as graph from "./graph";

/**
 * The only module besides `content.config.ts` that touches the content API.
 * Pages and components ask plain questions here and get plain answers, so the
 * collection API has exactly one home.
 */

export type LessonEntry = CollectionEntry<"en">;
export type Kind = "topic" | "lesson" | "examples";

/** `<entry>/examples` and `<entry>/examples.NN-slug` are both examples files. */
const EXAMPLES_SEGMENT = /^examples(\.|$)/;

const lastSegment = (id: string) => id.slice(id.lastIndexOf("/") + 1);

/** The lesson an examples file belongs to; the id itself for anything else. */
const lessonIdOf = (id: string) => {
  const at = id.lastIndexOf("/");
  const segment = id.slice(at + 1);
  if (segment === "examples") return id.slice(0, at);
  // Child examples sit beside their lesson, so the slug lives inside the last
  // segment: `…/examples.01-syntax` belongs to `…/01-syntax`, not to `…`.
  if (segment.startsWith("examples.")) {
    return `${id.slice(0, at)}/${segment.slice("examples.".length)}`;
  }
  return id;
};

const entries = new Map<Locale, Map<string, LessonEntry>>();

async function byId(locale: Locale) {
  let map = entries.get(locale);
  if (!map) {
    map = new Map();
    // Both collections share one schema, so a `ru` entry is an `en` entry.
    for (const entry of await getCollection(locale === "ru" ? "ru" : "en")) {
      map.set(entry.id, entry as LessonEntry);
    }
    entries.set(locale, map);
  }
  return map;
}

async function resolve(locale: Locale, ids: string[]): Promise<LessonEntry[]> {
  const map = await byId(locale);
  return ids.map((id) => map.get(id)).filter((entry): entry is LessonEntry => entry !== undefined);
}

/** Every index entry, sorted by corpus id. */
export async function allEntries(locale: Locale): Promise<LessonEntry[]> {
  const map = await byId(locale);
  return [...map.values()]
    .filter((entry) => entry.id.split("/").length === 2)
    .sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
}

/** Every entry that is not an examples file: the 177 entries and the 224 child lessons. */
export async function allLessons(locale: Locale): Promise<LessonEntry[]> {
  const map = await byId(locale);
  return [...map.values()].filter((entry) => !EXAMPLES_SEGMENT.test(lastSegment(entry.id)));
}

/** Every examples file, keyed by the lesson id it belongs to. */
export async function allExamples(locale: Locale): Promise<Map<string, LessonEntry>> {
  const map = await byId(locale);
  const examples = new Map<string, LessonEntry>();
  for (const entry of map.values()) {
    if (EXAMPLES_SEGMENT.test(lastSegment(entry.id))) {
      examples.set(lessonIdOf(entry.id), entry);
    }
  }
  return examples;
}

/** One entry by corpus id — an entry, a child lesson or an examples file. */
export async function entryById(locale: Locale, id: string): Promise<LessonEntry | undefined> {
  return (await byId(locale)).get(id);
}

/** The child lessons of an entry, in filename order. */
export async function childrenOf(locale: Locale, entryId: string): Promise<LessonEntry[]> {
  return resolve(locale, graph.childrenOf(entryId));
}

/** The entries of a topic, in directory order. */
export async function topicEntries(locale: Locale, topic: string): Promise<LessonEntry[]> {
  return resolve(locale, graph.entriesOfTopic(topic));
}

/** The examples file for a lesson, if it has one. */
export async function examplesFor(locale: Locale, lessonId: string): Promise<LessonEntry | undefined> {
  return (await allExamples(locale)).get(lessonId);
}

/**
 * What kind of corpus page an id is, and which lesson it belongs to. A topic id
 * is its own lesson id; an examples id belongs to its parent lesson.
 */
export function classify(_locale: Locale, id: string): { kind: Kind; lessonId: string } {
  if (!id.includes("/")) return { kind: "topic", lessonId: id };
  if (EXAMPLES_SEGMENT.test(lastSegment(id))) return { kind: "examples", lessonId: lessonIdOf(id) };
  return { kind: "lesson", lessonId: id };
}

const stripInline = (text: string) =>
  text
    .replace(/`([^`]*)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/_([^_]+)_/g, "$1");

/** The first paragraph after the body's first `## ` heading. */
function firstParagraph(body: string): string {
  const lines = body.split("\n");
  const headingAt = lines.findIndex((line) => line.startsWith("## "));
  if (headingAt === -1) return "";
  const paragraph: string[] = [];
  for (const line of lines.slice(headingAt + 1)) {
    if (line.trim() === "") {
      if (paragraph.length > 0) break;
      continue;
    }
    if (line.startsWith("#")) break;
    paragraph.push(line);
  }
  return stripInline(paragraph.join(" ")).replace(/\s+/g, " ").trim();
}

/** First sentence, then 155 characters at a word boundary. */
function shorten(text: string, max = 155): string {
  const end = text.search(/[.!?] /);
  const sentence = end === -1 ? text : text.slice(0, end + 1);
  if (sentence.length <= max) return sentence;
  const clipped = sentence.slice(0, max);
  const space = clipped.lastIndexOf(" ");
  return `${space > 0 ? clipped.slice(0, space) : clipped}…`;
}

/**
 * The one place a page description is derived: a topic blurb, an examples
 * file's parent lesson, or the lesson's own opening paragraph.
 */
export const describe = async (locale: Locale, id: string): Promise<string> => {
  const { kind, lessonId } = classify(locale, id);
  if (kind === "topic") return topicBlurb(id);
  const entry = await entryById(locale, lessonId);
  if (!entry) return "";
  return shorten(firstParagraph(entry.body ?? ""));
};

/** A thin wrapper, so nothing else has to import `render`. */
export function renderLesson(entry: LessonEntry) {
  return render(entry);
}
