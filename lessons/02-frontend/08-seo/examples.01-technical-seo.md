## Example 1 — A noindex directive shipped to production

A template added a robots directive while the site was being built, and a canonical link that points every page at the home page. The site is live and receives no search traffic. Diagnose each tag, then fix both.

```html
<head>
  <meta name="robots" content="noindex" />
  <link rel="canonical" href="/" />
</head>
```

### Solution

```html
<head>
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="<this article's one address>" />
</head>
```

The directive is an indexing gate, and `noindex` removes a page from search without producing an error anywhere — which is why it survives in production so often. Make it environment-dependent and check the live site after each deploy rather than trusting the build. The canonical link has the opposite fault: pointing every page at the home page tells the crawler they are all duplicates of it, so the individual pages are dropped instead of indexed. A page with more than one address — host variants, trailing slash, tracking parameters — should redirect the variants where possible and canonicalise to its own preferred address where it cannot.

## Example 2 — Content that only exists after a script runs

A product listing is fetched and rendered on the client, and a missing product returns the same success status as a real page. The listing is indexed late and inconsistently, and the dead URLs stay in the index. Explain the two gates being failed, then fix both.

```html
<ul id="products"></ul>
<script>
  fetch("/api/products").then((r) => r.json()).then(render);
</script>
```

### Solution

```html
<ul id="products">
  <li><a href="/products/desk-lamp">Desk lamp</a></li>
  <li><a href="/products/oak-stool">Oak stool</a></li>
</ul>
<!-- a missing product now returns a not-found status, not a success -->
```

The crawler can render scripts, but rendering is a second pass with its own budget, so content that appears only after a fetch may be indexed late, partially, or not at all; server-rendering the text that must be indexed removes the dependency on that pass. The second fault is a soft 404: returning a success status for a missing page leaves a dead URL in the index indefinitely, where a real not-found status removes it. Fetch the page with scripting disabled and read what is actually served — that is the state the crawler sees first.
