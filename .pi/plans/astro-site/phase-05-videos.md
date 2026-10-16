# Phase 5: Video references

## Objective

Add YouTube references to entries: a thumbnail, a link, the video's title, its description and the
channel name, with no embedded player. The data lives entirely **outside** `lessons/`, because the
corpus forbids external URLs anywhere in its tree and `tools/validate-content.mjs` V6 enforces that
on all 1396 files. Videos are added over months, so this phase builds the machinery and the ingest
tool, and ships with zero videos in it.

## Prerequisites

- Phase 3 complete: the corpus router renders lesson pages, and `astro/src/lib/lessons.ts` can resolve
  an id to an entry.
- `astro/src/lib/urls.ts` and `dictionary.ts` are in place, with a `watchTitle` key in both blocks.
- `astro/public/` exists.

## Shared Context

**Why the data cannot live in a lesson file.** `lessons/` bans `http://` and `https://` anywhere, and
the frontmatter field set (`title, type, topic, tier, status, aliases, prereqs, related`) is fixed and
verified across 1396 files in two roots. So a `videos:` key is not an option and a URL in the prose is
an error. The data goes in `content/videos.json` at the repository root, keyed by corpus entry id —
the same pattern `tools/inventory.json` already uses for corpus metadata.

**Store the video id, not the URL.** `dQw4w9WgXcQ`, not `https://www.youtube.com/watch?v=dQw4w9WgXcQ`.
The watch URL and both candidate thumbnail URLs derive from the id, so there is exactly one canonical
string per video. It also collapses the four shapes a YouTube link arrives in — `youtu.be/ID`,
`/watch?v=ID&t=90`, `/shorts/ID`, a playlist URL — into one, which kills duplicates for free.

**Thumbnails are downloaded, never hotlinked.** Requesting `i.ytimg.com` at runtime would send every
visitor's IP to Google, on a site that shows a consent banner for exactly that reason, and it would
add a third-party origin to the critical path. `tools/check-videos.mjs --add` downloads the image
once, into `astro/public/videos/`, where it is served from our own origin like any other asset.

**Two URL shapes, one video.** YouTube serves `maxresdefault.jpg` (1280×720, clean 16:9) only for
videos uploaded or re-encoded at high resolution; for the rest it returns **HTTP 200** with a 120×90
grey placeholder — under about 1 KB. So HTTP status is not a liveness or availability signal here;
the file size is. `mqdefault.jpg` (320×180, clean 16:9) always exists.

**Liveness must warn, never fail the build.** Videos get deleted and made private. If a dead video
broke the deploy, then in a year a deleted video would cost a production outage. The liveness check
is a separate, on-demand command that always exits 0 and prints a report. Note also that the reliable
free liveness probe is `oEmbed`, not a `HEAD` request: a deleted or private video still returns
`200` on its watch page with a "Video unavailable" body.

---

## Work Packages

### WP-21: The video data file and its tool

**Context:**
Three things are needed before any video can be shown: a documented data shape, the data file
itself, and a zero-dependency command that validates it offline, checks liveness online, and ingests
a new video. The tool follows the convention of the two existing tools in `tools/`: plain Node ESM,
no dependencies, runnable on a clean checkout with nothing but Node ≥ 22, and `node --check` clean.

`tools/validate-content.mjs` must be left alone. Its job is the corpus; this tool's job is the video
data. Keeping them separate is what lets the corpus stay frozen.

**Task:**
Create `content/videos.json` (empty), `content/README.md` documenting the shape and the commands, and
`tools/check-videos.mjs` with structural validation, an online liveness mode, and an ingest mode.

**Files:**
- `content/videos.json` — CREATE — an empty object, `{}`
- `content/README.md` — CREATE — the schema, the rules, and the three commands, with a worked example
- `tools/check-videos.mjs` — CREATE — the tool

**Constraints:**
- DO: define the shape as an object keyed by corpus entry id, each value an array of objects:
  `{ "videoId": string, "title": string, "channel": string, "description": string, "added": "YYYY-MM-DD" }`.
  Array order is display order
- DO: write this exact worked example into `content/README.md`:

  ```json
  {
    "02-frontend/06-javascript": [
      {
        "videoId": "dQw4w9WgXcQ",
        "title": "Closures in JavaScript, explained slowly",
        "channel": "Some Channel",
        "description": "Twelve minutes on scope, closures, and why a loop variable is shared between callbacks.",
        "added": "2026-10-16"
      }
    ]
  }
  ```

- DO: support three modes in `tools/check-videos.mjs`:
  - **default — structural, offline.** Validate that every key is a real corpus entry id (two or
    three segments, resolved against `tools/inventory.json` plus a walk of `lessons/`), that every
    `videoId` matches `^[A-Za-z0-9_-]{11}$`, that `title` and `channel` are non-empty and at most 200
    characters, that `description` is non-empty and at most 300 characters, and that `added` is
    `YYYY-MM-DD`. Print one line per problem and exit **1** if any exists, otherwise print
    `N videos across M entries, 0 problems` and exit **0**
  - **`--online`** — for each distinct `videoId`, `GET https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=<id>&format=json`
    with a 300 ms delay between requests, and report each as live or not-found. **Always exit 0**,
    whatever it finds
  - **`--add <url>`** — extract the id from any of the four URL shapes, resolve it with `oEmbed` to
    obtain `title` and `author_name`, download the thumbnail, write it to
    `astro/public/videos/<videoId>.jpg`, and print a ready-to-paste JSON snippet with `videoId`,
    `title`, `channel` and `added` filled in and a placeholder `description` for the author to
    replace. Do not edit `content/videos.json` itself
- DO: accept `--file <path>` to point at an alternative data file, defaulting to
  `content/videos.json`, so the tool can be tested against a fixture
- DO: accept `--help` and print the three modes
- DO: for the thumbnail, fetch `https://i.ytimg.com/vi/<id>/maxresdefault.jpg`, and if the response
  body is smaller than 5120 bytes discard it and fetch `.../mqdefault.jpg` instead. Report which one
  was used
- DO: write a one-line comment at the top of the thumbnail logic recording the trap:
  `// maxresdefault.jpg is absent for many videos: ytimg returns HTTP 200 with a ~1KB 120x90 grey placeholder, so file size, not status, is the test.`
- DO: resolve every path from `import.meta.url`, never from the current working directory
- DO: use only `node:fs`, `node:path`, `node:url` and the global `fetch`. Add a dependency and the
  repo's no-dependency rule for `tools/` is broken
- DO: stay `node --check` clean
- DO NOT: wire this tool into `npm run build`. It is a manual command. A dead video must never fail a
  deploy
- DO NOT: make `--online` exit non-zero. It reports; the operator decides
- DO NOT: modify `lessons/`, `tools/validate-content.mjs`, `tools/inventory.json`, or
  `tools/renumber-map.json`
- DO NOT: put the URL in the JSON. Derive it: `https://www.youtube.com/watch?v=<videoId>` and
  `/videos/<videoId>.jpg`

**Success:**
- [ ] Files exist: `test -f content/videos.json && test -f content/README.md && test -f tools/check-videos.mjs` → exit 0
- [ ] Shipped data file is empty and valid: `cat content/videos.json` → `{}`, and `node tools/check-videos.mjs` → exit 0
- [ ] Syntax clean: `node --check tools/check-videos.mjs` → exit 0
- [ ] Help works: `node tools/check-videos.mjs --help` → exit 0
- [ ] No dependencies: `grep -oE 'from "[^"]+"' tools/check-videos.mjs | sort -u` → only `node:fs`, `node:path` and `node:url`
- [ ] **The validator actually fails on bad data.** Write `.tmp/videos-bad.json` containing one entry
      keyed `"99-nope/01-not-an-entry"` with `"videoId": "short"`, then:
      `node tools/check-videos.mjs --file .tmp/videos-bad.json; echo "exit=$?"` → prints at least two
      problems and `exit=1`
- [ ] **The validator passes good data.** Write `.tmp/videos-good.json` copying the worked example from
      `content/README.md`, then: `node tools/check-videos.mjs --file .tmp/videos-good.json` → exit 0
- [ ] `--online` is honest about a dead id: with a synthetic id of eleven characters that cannot
      exist, `node tools/check-videos.mjs --file .tmp/videos-good.json --online; echo "exit=$?"` →
      reports it as not-found and prints `exit=0`
- [ ] Manual, with network: run
      `node tools/check-videos.mjs --add "https://www.youtube.com/watch?v=dQw4w9WgXcQ"` and confirm it
      prints a JSON snippet with a real title and channel, and that `astro/public/videos/dQw4w9WgXcQ.jpg`
      exists and is larger than 5 KB
- [ ] The corpus is untouched: `git status --porcelain lessons/` → prints nothing
- [ ] The corpus validator is untouched: `git status --porcelain tools/validate-content.mjs tools/inventory.json tools/renumber-map.json` → prints nothing

---

### WP-22: The video card and its integration

**Context:**
The card shows a thumbnail, the video's title, the channel name and the description, and links out
to YouTube in a new tab. Nothing is embedded: no `<iframe>`, no player, no YouTube script. The
thumbnail is a local file, so the card makes no third-party request.

The section goes **after** the lesson body, as its own `<section>` with an `<h2>`. That keeps it out
of the reading flow — a reader who wants to watch a video finds it at the end, and one who wants to
read is not interrupted. Moving it later is a one-line change if the operator prefers it above the
body.

The description comes from the operator, who types it when adding the video. `oEmbed` returns the
title and the channel, but **not** the description, which is why `--add` leaves that field as a
placeholder.

**Task:**
Create `astro/src/lib/videos.ts` and `astro/src/components/VideoList.astro`, and render the list on
lesson pages in both locales.

**Files:**
- `astro/src/lib/videos.ts` — CREATE — typed access to the data file
- `astro/src/components/VideoList.astro` — CREATE — the section and its cards
- `astro/src/pages/[...path].astro` — MODIFY — render `<VideoList />` below the lesson body
- `astro/src/pages/ru/[...path].astro` — MODIFY — the same

**Constraints:**
- DO: in `astro/src/lib/videos.ts`, import the data with
  `import raw from "../../../content/videos.json"` — three levels up from `astro/src/lib/` to the
  repository root, then into `content/`
- DO: define and export a `Video` interface matching the schema, and export
  `videosFor(entryId: string): Video[]` returning `[]` for an unknown key — an empty section must
  never break a page
- DO: export `watchUrl(videoId)`, returning `https://www.youtube.com/watch?v=<videoId>`, and
  `thumbUrl(videoId)`, returning `/videos/<videoId>.jpg`. No other module may build these strings
- DO: render a `<section>` with an `<h2>` from `dict.watchTitle`, and render **nothing at all** —
  no section, no empty heading — when `videosFor` returns `[]`
- DO: render each card as `<a href={watchUrl(...)} target="_blank" rel="noopener noreferrer">` whose
  content is the thumbnail `<img>` and the title, with the channel and description as text beneath
- DO: give the thumbnail `alt=""` — the title is adjacent text, so a non-empty `alt` would make a
  screen reader announce the same thing twice — plus `loading="lazy"` and `decoding="async"`
- DO: reserve the image's space in CSS with `aspect-ratio: 16 / 9; width: 100%; height: auto;` so the
  downloaded image's real dimensions are not needed and there is no layout shift. Do **not** fetch
  or store width and height
- DO: announce that a link leaves the site. Add visually hidden text or an `aria-label` that includes
  the video title, so the link is not announced as a bare URL
- DO: place the section after the lesson body and before the examples link, only when
  `kind === "lesson"`
- DO: constrain the thumbnail's display width so a 1280×720 and a 320×180 image look the same
  size on the page
- DO NOT: render an `<iframe>`, a YouTube embed, `youtube-nocookie.com`, or any script from a
  third-party origin
- DO NOT: reference `i.ytimg.com` or `ytimg.com` anywhere in `astro/src` — the thumbnail is a local
  file
- DO NOT: render the list on a topic page or an examples page
- DO NOT: parse a video id back out of a stored URL. The id is the stored value
- DO NOT: show the `added` date. It is bookkeeping for the operator, not information for the reader

**Success:**
- [ ] Files exist: `test -f astro/src/lib/videos.ts && test -f astro/src/components/VideoList.astro` → exit 0
- [ ] Empty data is safe: `cd astro && npm run build && cd ..` → exit 0, then
      `grep -c 'data-videos' astro/dist/02-frontend/03-html/index.html` → 0
- [ ] No embeds anywhere: `grep -rn 'iframe\|youtube-nocookie' astro/src` → prints nothing
- [ ] No hotlinked thumbnails: `grep -rn 'ytimg' astro/src` → prints nothing
- [ ] No third-party request in the built output: `grep -rc 'ytimg\|youtube.com/embed' astro/dist/index.html` → 0
- [ ] URLs are built in one place only: `grep -rl 'youtube.com/watch' astro/src` → lists
      `astro/src/lib/videos.ts` and no other file
- [ ] The list is wired into both locales: `grep -c 'VideoList' astro/src/pages/[...path].astro` → at
      least 2, and `grep -c 'VideoList' astro/src/pages/ru/[...path].astro` → at least 2
- [ ] Integration works end to end with real data. Add the worked example from `content/README.md` to
      `content/videos.json` under the key `02-frontend/06-javascript`, drop a real thumbnail into
      `astro/public/videos/`, run `cd astro && npm run build && cd ..`, then:
      `grep -c 'href="https://www.youtube.com/watch?v=' astro/dist/02-frontend/06-javascript/index.html` → 1
      and `grep -c '/videos/' astro/dist/02-frontend/06-javascript/index.html` → 1
- [ ] The link opens safely: `grep -c 'rel="noopener noreferrer"' astro/dist/02-frontend/06-javascript/index.html` → at least 1
- [ ] After checking, revert the test data: `content/videos.json` must ship as `{}` again, and the test
      thumbnail must be removed. Confirm with `cat content/videos.json` → `{}`
- [ ] Build green after the revert: `cd astro && npm run build` → exit 0
- [ ] Corpus untouched: `git status --porcelain lessons/` → prints nothing

## Phase Verification

After both work packages are complete, run:

```bash
cd astro && npm run check && npm run build && cd ..
node tools/check-videos.mjs
node tools/validate-content.mjs --strict --lang en
node tools/validate-content.mjs --strict --lang ru
git status --porcelain lessons/
```

- [ ] `npm run check` and `npm run build` exit 0
- [ ] `node tools/check-videos.mjs` exits 0
- [ ] Both content gates report `0 error(s)` and exit 0
- [ ] `git status --porcelain lessons/` prints nothing
- [ ] `content/videos.json` ships empty: `cat content/videos.json` → `{}`
- [ ] No new entry appeared in the sitemap from this phase: the sitemap's `<loc>` count is unchanged
      from the end of Phase 4
