# 2learn — the reading site

A bilingual static site over the lesson corpus: English at `/`, Russian at `/ru/`. Built with Astro,
served as plain files, deployable to Cloudflare Pages. No UI framework, no runtime server.

## Commands

Run all of these from `astro/`.

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server with hot reload. **No search**: the Pagefind index only exists after a build |
| `npm run build` | `astro build` then `pagefind --site dist`, into `dist/` |
| `npm run preview` | Serves the built `dist/`. This is where search works |
| `npm run check` | `astro check` — types and templates. Run it before every build |
| `npm run deploy` | `npm run build` then `wrangler pages deploy dist --project-name 2learn` |

From the repository root:

```bash
node tools/check-videos.mjs            # validate the video references, offline
node tools/check-videos.mjs --online   # report which videos still exist; always exits 0
node tools/check-videos.mjs --add <url>  # ingest one video and its thumbnail
node tools/validate-content.mjs --strict --lang en|ru   # the corpus's own gate
```

## Node

`.nvmrc` pins **Node 22** because that is what Cloudflare Pages reads when this project's root
directory is set to `astro`. The local machine runs Node 24, which is fine — Astro 7 requires Node
≥ 22 either way. `package.json`'s `engines` field states the same floor.

## The corpus

The lesson content is read from `../lessons` and is **never written to**. The site only reads it, at
build time. `node tools/validate-content.mjs --strict --lang en` and `… --lang ru` are the corpus's own
gate and must report `0 error(s)`; they are the regression test for a frozen corpus, not part of the
site build.

Video references are the exception that proves the rule: `lessons/` forbids external URLs anywhere in
its tree, so they live at `../content/videos.json` instead. See `content/README.md`.

## Deploying

Two routes. Both need the domain below to be correct first.

**Git integration.** In the Cloudflare Pages project, set the **root directory** to `astro`, the build
command to `npm run build`, and the output directory to `dist`. Node 22 is picked up from `.nvmrc`.
Cloudflare then builds and deploys on every push.

**Direct upload.** From `astro/`:

```bash
npm run deploy
```

which runs the build and then `wrangler pages deploy dist --project-name 2learn`.

### The one value to set before deploying

`site` in `astro/astro.config.mjs` is a placeholder, `https://2learn.example.com`. It is the source of
every canonical URL, every `hreflang` alternate, the sitemap's absolute URLs, both feeds' links, and the
`Sitemap:` line in `robots.txt`. Set it to the real production domain before the first deploy.

## Verified

A clean build on Node 24.14.1, measured 2026-10-16.

**Pages.** 711 English and 712 Russian `index.html` files, plus `dist/404.html`, the only HTML file
that is not an `index.html`. Russian has exactly one more page — `/ru/glossary/` — because the
glossary maps English terms to Russian ones and has no English counterpart.

**The corpus is untouched.** `git status --porcelain lessons/ seed/` and
`git diff --stat HEAD -- lessons/ seed/` both print nothing. The build reads `../lessons` and never
writes it. The corpus's own gates, run over the built site:

```text
$ node tools/validate-content.mjs --strict --lang en
177 present, 0 pending, 297 examples, 0 examples pending, 0 error(s)   (exit 0)
$ node tools/validate-content.mjs --strict --lang ru
177 present, 0 pending, 297 examples, 0 examples pending, 0 error(s)   (exit 0)
$ node tools/check-ru-style.mjs --strict --topic 05-backend-data
91 files, 46969 words … blacklist hits 0 in 0 files                      (exit 0)
$ node tools/check-videos.mjs
0 videos across 0 entries, 0 problems                                    (exit 0)
```

**Lighthouse**, mobile, via `npx --yes @lhci/cli@latest autorun --config=lighthouserc.json` from the
repository root. Seven routes, one run each:

| Route | Perf | A11y | Best practices | SEO | LCP |
| --- | --- | --- | --- | --- | --- |
| `/` | 1.00 | 1.00 | 0.96 | 1.00 | 1.5 s |
| `/02-frontend/03-html/` | 0.98 | 1.00 | 1.00 | 1.00 | 1.8 s |
| `/02-frontend/06-javascript/` | 0.98 | 1.00 | 1.00 | 1.00 | 1.8 s |
| `/ru/02-frontend/03-html/` | 0.98 | 1.00 | 1.00 | 1.00 | 2.0 s |
| `/entries/` | 1.00 | 1.00 | 1.00 | 1.00 | 1.5 s |
| `/ru/glossary/` | 0.98 | 1.00 | 1.00 | 1.00 | 1.5 s |
| `/search/` | 0.99 | 1.00 | 1.00 | 1.00 | 1.7 s |

All seven score 1.00 on accessibility and 1.00 on SEO. The home route's 0.96 on best practices is
one console 404: the browser asks for `/favicon.ico` and there is no icon. Adding one would clear it.

**LCP and font preloading.** Mobile LCP came back 1.5–2.0 s on every route, including the lesson
routes this decision was about: 1.8 s for the English lesson and 2.0 s for its Russian twin, both
under the 2.5 s threshold. **No font preload was added**, and no subset is preloaded for either
locale. The measurement did not call for one, and preloading `cyrillic` on an English page would
download tens of kilobytes nobody reads. If a later change pushes LCP to 2.5 s or above, add
`preload={[{ subset: locale === "ru" ? "cyrillic" : "latin" }]}` to the Literata `<Font />` in
`BaseLayout.astro` — locale-specific, because the two trees need different subsets — and re-measure.
Golos Text is not the LCP element and should not be preloaded.

**On Windows, one workaround.** The command above can abort with
`EPERM, Permission denied: ... lighthouse.XXXX` while Lighthouse deletes its own temporary Chrome
profile — *after* the audit has finished, so the run is lost. That is a bug in `chrome-launcher`, not
in this site, and it reproduces in any temp directory. Attaching Lighthouse to a browser you start
yourself avoids that code path. Add `"port": 9333` to `ci.collect.settings` in a copy of
`lighthouserc.json`, start a browser, and run LHCI against the copy:

```bash
"/c/Program Files/Google/Chrome/Application/chrome.exe" --headless=new \
  --remote-debugging-port=9333 --user-data-dir=/tmp/lh-profile --no-first-run about:blank &
npx --yes @lhci/cli@latest autorun --config=<the copy>.json
```

Leave `lighthouserc.json` itself without a `port`: on a machine where the bug does not bite, the
plain command is the one to use.
