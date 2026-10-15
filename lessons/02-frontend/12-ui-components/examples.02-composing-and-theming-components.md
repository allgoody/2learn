## Example 1 — A theme that overrides the component from outside

A dark theme beats the button styles with a longer selector, and the selector has grown once already. Say what the override costs, then let the theme supply values instead.

```css
.button { background: navy; color: white; padding: 0.5rem 1rem; border-radius: 0.25rem; }

.theme-dark .panel .button {           /* beats the component by specificity */
  background: #111;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
}
```

### Solution

```css
.button {
  --control-pad: 0.5rem 1rem;
  --control-radius: 0.25rem;
  background: var(--button-bg, navy);
  color: var(--button-fg, white);
  padding: var(--control-pad);
  border-radius: var(--control-radius);
}

.theme-dark .panel { --button-bg: #111; --button-fg: #eee; }
```

```jsx
<div className="theme-dark">
  <div className="panel"><Button variant="primary">Save</Button></div>
</div>
```

An override wins by specificity, so every new theme needs a longer selector than the last and the component cannot be refactored without breaking them. Custom properties invert the direction: the component reads a value and the theme sets it on a wrapper, and because the properties are inherited, one wrapper themes everything inside with no selector per component. The fallback inside `var()` keeps the component safe when nobody sets it. Whatever a consumer may set is public API, so the property names are documented and renamed only as a versioned change.

## Example 2 — The component that was copied for one screen

A card with an actions row was copied twice, because the original had nowhere to put buttons. Say why the copy appeared, then extend the original with the slot that was missing.

```jsx
function Card({ title, body }) {
  return (
    <article className="card">
      <h2>{title}</h2>
      <p>{body}</p>
    </article>
  );
}

// elsewhere: CardWithActions, then CardWithActionsAndBadge, both copies
```

### Solution

```jsx
function Card({ title, body, actions }) {
  return (
    <article className="card">
      <h2>{title}</h2>
      <p>{body}</p>
      {actions ? <div className="card-actions">{actions}</div> : null}
    </article>
  );
}
```

```jsx
<Card
  title="Invoice #1042"
  body={summary}
  actions={<><Button variant="primary">Pay</Button><Button>Download</Button></>}
/>
```

Content passed as children or a slot can be composed in ways the component's author never anticipated, while a copy can only be extended by copying it again — which is how two copies became three. The variation was a missing slot rather than a new component, and adding one is cheaper than maintaining the forks, which will diverge again at the next design change. The slot also keeps the caller out of the component's internals: no internal class name is passed in, so the markup can be restructured later without touching any call site.
