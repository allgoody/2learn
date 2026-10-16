import type { Locale } from "./corpus";

/** English is unprefixed; Russian lives under `/ru`. */
export function prefix(locale: Locale): string {
  return locale === "ru" ? "/ru" : "";
}

export function homeUrl(locale: Locale): string {
  return `${prefix(locale)}/`;
}

export function topicUrl(locale: Locale, topic: string): string {
  return `${prefix(locale)}/${topic}/`;
}

export function entryUrl(locale: Locale, entryId: string): string {
  return `${prefix(locale)}/${entryId}/`;
}

/** Works for an entry id and for a child id alike. */
export function lessonUrl(locale: Locale, id: string): string {
  return `${prefix(locale)}/${id}/`;
}

export function examplesUrl(locale: Locale, id: string): string {
  return `${prefix(locale)}/${id}/`;
}

export function entriesUrl(locale: Locale): string {
  return `${prefix(locale)}/entries/`;
}

export function aboutUrl(locale: Locale): string {
  return `${prefix(locale)}/about/`;
}

export function privacyUrl(locale: Locale): string {
  return `${prefix(locale)}/privacy/`;
}

/** Russian only: the glossary maps English terms onto Russian ones. */
export function glossaryUrl(): string {
  return "/ru/glossary/";
}

export function searchUrl(locale: Locale): string {
  return `${prefix(locale)}/search/`;
}

/** Endpoints carry a file extension, so they never take a trailing slash. */
export function feedUrl(locale: Locale): string {
  return prefix(locale) + "/feed.xml";
}

export interface Alternate {
  hreflang: string;
  href: string;
}

/**
 * `path` is the locale-neutral English path of the current page,
 * e.g. `/02-frontend/06-javascript/`.
 */
export function alternatesFor(path: string): Alternate[] {
  return [
    { hreflang: "en", href: path },
    { hreflang: "ru", href: "/ru" + path },
    { hreflang: "x-default", href: path },
  ];
}

/** The same page in the other locale. */
export function switchLocale(path: string, from: Locale, to: Locale): string {
  if (from === to) return path;
  if (to === "ru") return "/ru" + path;
  // `/ru/glossary/` has no English equivalent, so it falls back to the home page.
  if (path.startsWith("/ru/glossary")) return homeUrl(to);
  return path.replace(/^\/ru/, "") || "/";
}
