## Example 1 — A card built from divs

The markup below looks right in the browser and is unusable from a keyboard. Say what each element communicates to the browser, then rewrite it with the elements the content describes.

```html
<section class="card">
  <div class="title">Quarterly report</div>
  <p>Published 14 February 2026.</p>
  <img src="chart.png" alt="" />
  <div class="btn" onclick="openReport()">Open report</div>
</section>
```

### Solution

```html
<article>
  <h2>Quarterly report</h2>
  <p>Published <time datetime="2026-02-14">14 February 2026</time>.</p>
  <img src="chart.png" alt="Revenue rising 12% quarter on quarter" />
  <button type="button" onclick="openReport()">Open report</button>
</article>
```

A `div` with a click handler is not a button: it is not reachable by tab, it does not respond to Enter or Space, and assistive technology announces nothing. `<button>` brings all three for free, and CSS can make it look exactly as before. The empty `alt` told the browser the chart was decorative, so its content was lost to anyone who cannot see it. The heading and `article` give the card a place in the document outline, which is how a screen reader user navigates a page. None of this changes the pixels.

## Example 2 — A form with no accessible names

A sign-up field is labelled by its placeholder, and the section heading is styled with a lower heading level to look smaller. Explain what is missing, then fix both without writing any CSS.

```html
<h1>Account</h1>
<h5>Contact details</h5>
<input type="text" placeholder="Email address" />
```

### Solution

```html
<h1>Account</h1>
<h2>Contact details</h2>
<label for="email">Email address</label>
<input id="email" name="email" type="email" required autocomplete="email" />
```

```text
heading level 1: "Account"
heading level 2: "Contact details"
textbox "Email address", required
```

A placeholder is not a name: it disappears as soon as the user types, and some screen readers skip it entirely, so the field is announced as an unlabelled textbox. A `label` linked by `for` and `id` names the control permanently and makes the whole label clickable. The heading level is structure, not size — `h5` under an `h1` invents three phantom sections in the outline, and the fix for a large font is a style rule, not a different element. `type="email"` then adds an email keyboard on mobile and native validation, free of charge.
