## Example 1 — A list keyed by its position

Rows in an editable list are keyed by index. Removing the second row leaves the third row's typed text in the wrong place. Say what the key is used for, then key on something that survives the change.

```jsx
function Tasks({ items, onRemove }) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>
          <input defaultValue={item.note} />
          <button onClick={() => onRemove(item.id)}>Remove</button>
        </li>
      ))}
    </ul>
  );
}
```

### Solution

```jsx
function Tasks({ items, onRemove }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <input defaultValue={item.note} />
          <button onClick={() => onRemove(item.id)}>Remove</button>
        </li>
      ))}
    </ul>
  );
}
```

After a render React compares the new element tree with the previous one and applies only the differences, and in a list it uses the key to decide whether an element moved or changed. An index says "whatever is in position two", so after a delete every subsequent row inherits the DOM node — and the uncommitted text — of the row before it. Keying on a stable id lets each element follow its data, and the rule applies to any list that can be inserted into, reordered or shortened, which in practice is every list a user can edit.

## Example 2 — A component name that starts with a lowercase letter

A component renders nothing at all, and no error appears. Explain how React decides whether a tag is a component or a DOM element, then fix the name.

```jsx
function badge({ label }) {
  return <span className="badge">{label}</span>;
}

export default function App() {
  return <badge label="Draft" />;
}
```

### Solution

```jsx
function Badge({ label }) {
  return <span className="badge">{label}</span>;
}

export default function App() {
  return <Badge label="Draft" />;
}
```

JSX compiles to function calls, and a name in angle brackets is a variable reference only when it is capitalised; a lowercase tag is passed through as a string and rendered as an unknown HTML element, so the browser produces an empty inline element and the component function is never called. Because nothing throws, the failure looks like styling rather than a name. The same reasoning explains the rest of the JSX surface: attributes follow JavaScript naming, so the class attribute becomes a prop named for the class list, and every element must be closed. A render must also stay pure — the same inputs must produce the same output — which is what lets React re-render the tree as often as it likes.
