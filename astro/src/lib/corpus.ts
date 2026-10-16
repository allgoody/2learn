/** The eight corpus topics, in learning order. Directory names are prefixed. */
export const TOPICS = [
  "01-cs-fundamentals",
  "02-frontend",
  "03-design-ux",
  "04-product-process",
  "05-backend-data",
  "06-cloud-devops",
  "07-security",
  "08-soft-skills",
] as const;

export type Topic = (typeof TOPICS)[number];

export type Locale = "en" | "ru";

/** The corpus has no topic display titles — these are site-authored labels. */
export const TOPIC_TITLES: Record<Topic, string> = {
  "01-cs-fundamentals": "CS Fundamentals",
  "02-frontend": "Frontend",
  "03-design-ux": "Design & UX",
  "04-product-process": "Product & Process",
  "05-backend-data": "Backend & Data",
  "06-cloud-devops": "Cloud & DevOps",
  "07-security": "Security",
  "08-soft-skills": "Soft Skills",
};

const TOPIC_BLURBS: Record<Topic, string> = {
  "01-cs-fundamentals":
    "Data structures, algorithms, OS and networks, code quality, testing, tooling",
  "02-frontend":
    "HTML, CSS, JavaScript, frameworks, build tooling, performance, browser platform",
  "03-design-ux":
    "Research, IA, interaction, visual design, design systems, evaluation, design tools",
  "04-product-process": "Agile, Scrum, product management, requirements",
  "05-backend-data": "Server languages, APIs, databases, caching, architecture",
  "06-cloud-devops": "Cloud providers, containers, CI/CD, operations",
  "07-security": "Web security, secrets, privacy, data ethics",
  "08-soft-skills": "Communication, collaboration, career",
};

export function topicTitle(topic: string): string {
  return TOPIC_TITLES[topic as Topic] ?? topic;
}

export function topicBlurb(topic: string): string {
  return TOPIC_BLURBS[topic as Topic] ?? "";
}

/** An entry id has two segments: `02-frontend/03-html`. */
export function isEntryId(id: string): boolean {
  return id.split("/").length === 2;
}

/**
 * A child id has three segments: `02-frontend/03-html/01-…`. Both examples
 * shapes (`<entry>/examples` and `<entry>/examples.NN-slug`) also have three,
 * and are told apart by their last segment, not by their depth.
 */
export function isChildId(id: string): boolean {
  return id.split("/").length === 3;
}

/** `<topic>/<entry>` or `<topic>/<entry>/<child>` → `<topic>/<entry>`. */
export function entryIdOf(id: string): string {
  return id.split("/").slice(0, 2).join("/");
}

export type Shape = "full" | "landing" | "area";

/**
 * Mirrors the corpus's own rule: tiers `small` and `area` have no children,
 * `medium` and `large` are landings. Anything that is itself a child file is a
 * full lesson whichever tier its entry carries.
 */
export function shape(
  frontmatter: { type?: string; tier?: string } | undefined,
  id: string,
): Shape {
  if (frontmatter?.type === "area") return "area";
  if (id.split("/").length === 3) return "full";
  if (frontmatter?.tier === "small") return "full";
  return "landing";
}
