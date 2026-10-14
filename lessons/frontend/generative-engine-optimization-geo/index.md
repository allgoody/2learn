---
title: Generative Engine Optimization (GEO)
type: skill
topic: frontend
tier: small
status: drafted
aliases: ["GEO"]
prereqs: ["frontend/seo"]
related: []
---

## What it is

Generative engine optimisation is the practice of making a page likely to be quoted, summarised or cited by an answer engine — a system that reads the web and produces a written answer rather than a list of links. The mechanics are partly the same as search: the page must be crawlable, readable and about something specific. The difference is the output: a citation inside an answer rather than a position in a list.

## Why it matters

A growing share of questions are answered in place, and a page that is never cited is invisible in those answers even if it ranks well. The techniques that make a page quotable are not secret and are mostly things worth doing anyway — state the fact plainly, attribute it, structure it, keep it current. What is genuinely uncertain is how much of the citation behaviour can be steered, and this lesson should be read with that caveat: treat it as good writing practice that happens to be legible to summarisation, not as a lever with a known coefficient.

## Core ideas

### Be quotable: one clear claim, stated early

A summariser lifts sentences that stand on their own. A paragraph that defines its subject, states the claim and gives the number or the condition will survive being extracted; a paragraph that builds to its point through three qualifying clauses will not.

```text
A 24 by 24 internal grid keeps an icon set optically consistent across sizes.
Larger grids make detailed shapes blur when the icon is rendered at 16 pixels.
```

### Structure is how a machine finds the answer

Headings that name the question, a short direct answer beneath, and the detail after it match the shape an answer engine is looking for. Tables, definition lists and numbered steps are extracted more reliably than the same information inside flowing prose.

### Attribution and primary sources earn citations

A page that cites its own sources, names dates and distinguishes measurement from opinion is more useful to quote than an unsourced summary. It is also more defensible: a citation is a claim about where the information came from, and pages that look like an original source are preferred to ones that look like a paraphrase of one.

### Keep the facts consistent everywhere

Answer engines compare a page against other descriptions of the same subject. The same figures, names and dates across your own pages, structured data and profiles reduce the chance of being treated as an unreliable description and dropped.

### The classic signals still gate everything

Crawlability, indexability, page speed and a canonical address remain the prerequisites. Being cited requires being read first. A page that fails the technical checks is not a candidate for a citation, whatever its prose.

### Be honest about the limits

How answer engines choose their citations is not published, changes frequently, and varies by product. Anyone claiming a precise technique is guessing. Spend effort where the return is certain — clarity, structure, primary sourcing, technical hygiene — and treat the rest as experiment.

## Practice

### Rewrite one page so a single paragraph answers the question

Take a page that answers a question buried in prose. Add a heading that names the question and a two-sentence answer directly beneath it, then keep the detail below.

Done when: reading only the heading and the two sentences still answers the question correctly, and the rest of the page elaborates rather than repeats.

### Audit your facts for consistency

Compare the key figures on one page against the same figures in your structured data, related pages and any off-site profile.

Done when: every figure agrees, or you have corrected the one that did not and noted why it drifted.

## Common mistakes

- **Chasing a technique with no published mechanism** — effort is spent on guesses while the crawl problems remain; fix: fix the technical gates first and treat citation tactics as experiments.
- **Writing prose that never states a claim** — there is nothing for a summariser to quote; fix: state the point early in a self-contained sentence.
- **Hiding the answer below three introductory paragraphs** — the extractor takes the heading and the first useful sentence; fix: answer directly under the heading and explain after.
- **Claiming facts without a source** — the page is indistinguishable from a paraphrase and easier to discount; fix: cite primary sources and dates.
- **Letting figures drift between pages** — the inconsistency reads as unreliability; fix: keep one source of truth and check it periodically.

## Go deeper

- **SEO** (`frontend/seo`) — the crawl, index and content work that comes first.
- **Content Strategy** (`design-ux/content-strategy`) — deciding what deserves to be written at all.
- **Technical Writing** (`product-process/technical-writing`) — clarity that survives extraction is the same clarity that helps a human reader.
