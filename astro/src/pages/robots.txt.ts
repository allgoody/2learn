import type { APIRoute } from "astro";

/** Every page on this site is meant to be indexed, so nothing is disallowed. */
export const GET: APIRoute = ({ site }) => {
  // The plan wrote `Astro.site`, which is a namespace in a plain `.ts` file, not a
  // value. The endpoint context carries the same URL.
  if (!site) {
    throw new Error("robots.txt needs `site` to be set in astro.config.mjs");
  }
  return new Response(
    "User-agent: *\nAllow: /\nSitemap: " + new URL("sitemap-index.xml", site).href + "\n",
    { headers: { "Content-Type": "text/plain" } },
  );
};
