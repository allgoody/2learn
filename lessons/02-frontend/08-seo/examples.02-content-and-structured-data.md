## Example 1 — A title that describes the site, not the page

Every page on a repair site carries the site name as its title, the article has two `h1` elements, and its internal links say where to go only in the surrounding sentence. Say what a searcher and a crawler each lose, then rewrite the markup.

```html
<title>Home Repairs</title>
<h1>Home Repairs</h1>
<h1>Fixing a leaking radiator</h1>
<p>See the full guide. <a href="/guides/radiator">Read more</a></p>
```

### Solution

```html
<title>Fixing a leaking radiator — Home Repairs</title>
<meta name="description" content="Diagnose a leaking radiator, find the joint that is failing, and decide whether to reseal it yourself." />
<h1>Fixing a leaking radiator</h1>
<p>See <a href="/guides/radiator">how to reseal a radiator joint</a>.</p>
```

A searcher reads a list of results and the beginning of each title is what stays visible, so leading with the subject is what distinguishes this page from the other nine that share the site name. One `h1` per page tells the indexing system which part of the page is the subject, and it is the same rule the accessibility lesson applies. The anchor text is the third case of the same principle: a crawler and a screen-reader user both learn a link's destination from its words, and "Read more" tells neither. The description repeats nothing and answers what the page is for.

## Example 2 — Structured data that claims a rating the page does not show

An article's markup asserts an aggregate rating that appears nowhere on the page. Explain what makes that a risk rather than an optimisation, then mark up only what the page supports.

```html
<script type="application/ld+json">
{
  "@context": "<the vocabulary's own address>",
  "@type": "Article",
  "headline": "Fixing a leaking radiator",
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "312" }
}
</script>
```

### Solution

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

Search engines check the markup against the visible content, so a rating the page does not show is treated as a violation and can cost every rich result on the site, not just this one. Mark up only properties a visitor can see: the headline, the publication date and the author are all on the page, and removing one of them visibly would make the markup wrong rather than merely stale. The context value names the vocabulary the types come from and is written here as a placeholder because this corpus forbids external links; take the real value from that vocabulary's documentation.
