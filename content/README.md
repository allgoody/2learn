# Video references

YouTube references for corpus entries. The data lives **outside `lessons/` on purpose**: the corpus
forbids external URLs anywhere in its tree, and `tools/validate-content.mjs` enforces that on every
file. A `videos:` frontmatter key is therefore not an option, and a URL in the prose is an error.

Entries are keyed by corpus entry id — the same id `tools/inventory.json` uses.

## Shape

An object: entry id → array of videos. **Array order is display order.**

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

| Field | Rule |
| --- | --- |
| `videoId` | The bare id, `^[A-Za-z0-9_-]{11}$` — **not** a URL |
| `title` | 1–200 characters. Filled in by `--add` from oEmbed |
| `channel` | 1–200 characters. Filled in by `--add` from oEmbed |
| `description` | 1–300 characters. **Written by hand** — oEmbed does not return it, so `--add` leaves a placeholder |
| `added` | `YYYY-MM-DD`, the day it was added. Bookkeeping for the operator; the site does not show it |

Store the id, not the URL. The watch URL and the thumbnail path are derived from it, so there is one
canonical string per video. It also collapses the four shapes a YouTube link arrives in — `youtu.be/ID`,
`/watch?v=ID&t=90`, `/shorts/ID`, a playlist URL — into one, which kills duplicates for free.

## Commands

```bash
node tools/check-videos.mjs                     # structural check, offline; exit 1 on any problem
node tools/check-videos.mjs --online            # liveness report; always exits 0
node tools/check-videos.mjs --add <url>         # ingest one video
node tools/check-videos.mjs --file <path>       # any mode against another data file
node tools/check-videos.mjs --help
```

The tool is a manual command. It is **not** part of `npm run build`: videos get deleted and made
private, and a dead video must never cost a deploy. `--online` reports so the operator decides.

`--add` downloads the thumbnail into `astro/public/videos/<videoId>.jpg` and prints a JSON snippet to
paste in. It does not edit this file for you, and it does not fill in `description`.

Thumbnails are downloaded rather than hotlinked. Requesting `i.ytimg.com` at runtime would send every
visitor's IP to Google — on a site that shows a consent banner for exactly that reason — and would put
a third-party origin on the critical path.
