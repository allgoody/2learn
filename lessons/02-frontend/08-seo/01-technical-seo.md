---
title: Technical SEO
prereqs: ["02-frontend/03-html"]
---

## What it is

Technical SEO is the set of conditions a page must satisfy to be crawled, indexed and served to a searcher at all: the crawler must be able to reach it, must be allowed to keep it, must find exactly one address for it, and must be able to read its content without running a script.

## Why it matters

Content quality is irrelevant to a page the index has never seen. The failures are quiet ones — a staging `noindex` left in place, a canonical tag pointing at the wrong host, a listing page whose content only renders after a client-side fetch, two URLs serving the same article — and each of them removes a page from search without producing an error anywhere. Because the crawler reads markup, this work overlaps almost entirely with writing correct HTML and making pages fast, which is why it belongs in the front-end rather than in a separate specialism.

## Core ideas

### Crawling, then indexing, then ranking

Three separate gates. `robots.txt` controls crawling, a `noindex` directive controls indexing, and ranking happens only after both. A page can be crawled but excluded from the index, or indexable but never discovered. Diagnosing a missing page means checking the gates in order rather than assuming the ranking is the problem.

```html
<meta name="robots" content="noindex" />
<link rel="canonical" href="<the one canonical address of this article>" />
```

### One canonical address per document

A page reachable at several URLs — with and without a trailing slash, with tracking parameters, over both host variants — splits its signals across duplicates. Redirect the variants where you can, and declare the preferred address with a canonical link where you cannot.

### The content must be present in the HTML

A crawler can render scripts, but rendering is a second pass with a budget. Content that exists only after a fetch may be indexed late, inconsistently, or not at all. Server-rendering the text that matters is the reliable answer; anything that is genuinely only available to a signed-in user is not indexable anyway.

### Redirect rather than 404 when a URL moves, and use the right status

A permanent move uses a permanent redirect so the signals follow it; a temporary one uses a temporary redirect. Returning a 200 status for a missing page — a soft 404 — leaves a dead page in the index indefinitely. Deleting content should return a real status code.

### Tell the crawler what exists

A sitemap lists the canonical URLs and is the fastest way to get a new set of pages discovered. It also serves as a check on yourself: pages present in the site but missing from the sitemap, or the reverse, usually reveal a routing or canonical mistake.

### Check it as a crawler would

Fetch the page with scripting disabled and read what is there. Then check the status code, the canonical, the robots directive and the rendered content separately, because a page that looks right in a browser can fail any one of them.

## Practice

### Audit one page against the three gates

Take a live page. Record its status code, whether it is blocked in `robots.txt`, whether it carries a `noindex` directive, what its canonical points at, and whether its main content is present without JavaScript.

Done when: you can state for each gate whether the page passes, and you have found at least one thing worth fixing.

### Make a JavaScript-rendered page indexable

Find a page whose content is fetched after load and server-render the part that should be indexed, or add a static fallback.

Done when: the main content is visible with scripting disabled and the sitemap still lists the same canonical URL.

## Common mistakes

- **Leaving a staging `noindex` in production** — the whole site disappears from search and nothing reports an error; fix: make the directive environment-dependent and check production after each deploy.
- **Canonicalising every page to the home page** — the individual pages are dropped as duplicates; fix: each page canonicalises to itself.
- **Serving a 200 for a missing page** — a soft 404 keeps dead URLs indexed; fix: return the correct status code.
- **Rendering all content with a script** — the crawler's rendering pass may be delayed or partial; fix: server-render the content that must be indexed.
- **Ignoring the sitemap after launch** — new pages take far longer to be discovered; fix: generate the sitemap from the routes and submit it.

## Go deeper

- **Hypertext Markup Language (HTML)** (`02-frontend/03-html`) — the semantics the crawler reads, exactly as the browser and a screen reader do.
- **Content and structured data** (`02-frontend/08-seo/02-content-and-structured-data`) — what to put in the page once it can be found.
- **Browser DevTools** (`02-frontend/27-browser-devtools`) — disabling scripting and reading the served response is the fastest crawl simulation available.

