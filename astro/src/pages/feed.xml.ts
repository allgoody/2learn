import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { topicTitle, type Locale } from "../lib/corpus";
import { getDict } from "../lib/dictionary";
import { allEntries, describe } from "../lib/lessons";
import { lessonUrl } from "../lib/urls";

export const GET: APIRoute = async ({ site }) => {
  // A feed's links must be absolute, so `site` is required rather than optional.
  if (!site) {
    throw new Error("feed.xml needs `site` to be set in astro.config.mjs");
  }
  const locale: Locale = "en";
  const dict = getDict(locale);
  const entries = await allEntries(locale);

  return rss({
    title: dict.siteName,
    description: dict.siteTagline,
    site,
    xmlns: { atom: "http://www.w3.org/2005/Atom" },
    customData: `<atom:link href="${new URL("feed.xml", site).href}" rel="self" type="application/rss+xml" />`,
    items: await Promise.all(
      entries.map(async (entry) => ({
        title: entry.data.title ?? entry.id,
        link: lessonUrl(locale, entry.id),
        description: await describe(locale, entry.id),
        categories: [topicTitle(entry.id.split("/")[0])],
        // Dates are deliberately absent: the corpus records no dates, and a fabricated one is worse.
      })),
    ),
  });
};
