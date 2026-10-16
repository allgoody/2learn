// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { satteri } from "@astrojs/markdown-satteri";
import tailwindcss from "@tailwindcss/vite";
import rehypeContent from "./src/lib/rehype-content.mjs";
// TODO: replace with the real domain before deploy (WP-24)
export const SITE = "https://2learn.example.com";

export default defineConfig({
  site: SITE,
  // Astro 7 defaults to "jsx", which collapses markup onto single lines and
  // breaks the line-based grep checks every phase of this plan relies on.
  compressHTML: false,
  trailingSlash: "always",
  vite: {
    plugins: [tailwindcss()],
    build: { assetsInlineLimit: 0 },
  },
  integrations: [
    sitemap({
      i18n: { defaultLocale: "en", locales: { en: "en", ru: "ru" } },
      filter: (page) => !page.endsWith("/404/") && !page.includes("/search/"),
    }),
  ],
  markdown: {
    processor: satteri({ hastPlugins: [rehypeContent] }),
    shikiConfig: {
      themes: { light: "github-light", dark: "github-dark" },
      defaultColor: false,
    },
  },
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Literata",
      cssVariable: "--font-literata",
      weights: ["200 900"],
      styles: ["normal", "italic"],
      subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext"],
      display: "swap",
      fallbacks: ["Georgia", "serif"],
    },
    {
      provider: fontProviders.google(),
      name: "Golos Text",
      cssVariable: "--font-golos",
      weights: ["400 900"],
      styles: ["normal"],
      subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext"],
      display: "swap",
      fallbacks: ["system-ui", "sans-serif"],
    },
  ],
});
