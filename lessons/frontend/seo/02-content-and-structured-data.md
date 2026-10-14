---
title: Content and structured data
prereqs: ["frontend/seo/01-technical-seo"]
---

## What it is

Once a page can be crawled and indexed, this is the work of describing it so that it is understood and chosen: the title and description a searcher sees, the heading structure that tells a machine what the page is about, the internal links that establish its context, and the structured data that can make a result richer than a plain blue link.

## Why it matters

The title is the single most visible piece of writing on most sites — it is what a searcher reads while deciding whether to click — and it is routinely left as a by-product of the template. Descriptions and headings are read by the same systems that rank the page, and internal linking is the main way a crawler learns which pages matter. Structured data does not raise a ranking directly, but it changes what the result looks like, which affects whether it is clicked at all. All of this is cheap to write once and expensive to retrofit across a site that grew without it.

## Core ideas

### Write the title for the searcher, not for the template

A title should name the specific thing the page is about, then the site. Front-loading the distinguishing words matters because a searcher reads a list where the beginning is visible and the rest is truncated.

```html
<title>Fixing a leaking radiator — Home Repairs</title>
<meta name="description" content="Diagnose a leaking radiator, find the joint that is failing, and decide whether to reseal it yourself." />
```

The description does not affect ranking, but it is often what the searcher reads instead of the page, so it should describe the page honestly rather than repeat the title.

### One page, one idea, one `h1`

Heading structure is the outline the indexing systems use to understand which part of the page is the subject. Multiple `h1` elements or a heading chosen for its font size both blur that. The accessibility argument is identical, which is why fixing one fixes the other.

### Link with words that describe the destination

An internal link's anchor text tells the crawler what the target page is about, and it tells a screen-reader user where the link goes. "Read more" communicates neither. Descriptive anchors cost nothing and improve both.

### Structured data states facts in a form a machine can read

JSON-LD in a script block describes the page as a type — an article, a product, an event, a question with an accepted answer — with its properties. Search engines use it to build richer results, and they verify it against the visible content, so it must describe what the page actually says.

```html
<script type="application/ld+json">
{
  "@context": "<the vocabulary's own address>",
  "@type": "Article",
  "headline": "Fixing a leaking radiator",
  "datePublished": "2026-02-14",
  "author": { "@type": "Person", "name": "A. Author" }
}
</script>
```

The context value names the vocabulary the types come from. It is shown as a placeholder here because this corpus forbids external links anywhere in a lesson; take the real value from the vocabulary's documentation.

Only claim properties the page can support: a marked-up rating that is not visible on the page is a violation and can cost every rich result on the site.

### Match the intent behind the query

A page about a method ranks for the method; a page about buying a product competes with shops. Deciding which intent a page targets, and writing it wholly for that intent, is more effective than adding keywords to a page that answers a different question.

## Practice

### Rewrite the titles for one section

Take five pages from one section and rewrite their titles so each begins with the distinguishing words, and write a description for each that would help a searcher decide.

Done when: the titles are distinguishable from each other without the site name, and no description merely repeats its title.

### Add structured data and validate it

Mark up one article with JSON-LD, then check the markup against the visible content on the page.

Done when: every property you claimed is visible on the page, and removing a visible fact makes the markup wrong rather than merely stale.

## Common mistakes

- **Repeating the site name in every title** — the distinguishing words are pushed out of view; fix: put the subject first.
- **Writing a description that repeats the title** — the snippet wastes the only chance to describe the page; fix: summarise what the page answers.
- **Marking up data that is not on the page** — the search engine discounts it and can penalise the site; fix: mark up only what a visitor can see.
- **Using "click here" as anchor text** — neither the crawler nor a screen reader learns the destination; fix: describe the target in the link text.
- **Choosing heading levels for their font size** — the outline stops describing the content's structure; fix: keep the outline logical and restyle with CSS.

## Go deeper

- **Technical SEO** (`frontend/seo/01-technical-seo`) — the crawl and index prerequisites for anything written here to matter.
- **Hypertext Markup Language (HTML)** (`frontend/html`) — headings, links and metadata are all plain markup.
- **UX Writing & Microcopy** (`design-ux/ux-writing-microcopy`) — the same discipline of writing for a reader who is deciding what to do next.
