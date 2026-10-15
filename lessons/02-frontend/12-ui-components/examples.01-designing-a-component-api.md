## Example 1 — Two booleans that combine into nonsense

A button component takes `primary`, `secondary` and `danger` flags, and one call site passes two at once. Say what the API allows that it should not, then replace the flags with one enumerated value.

```jsx
function Button({ primary, secondary, danger, children }) {
  const cls = primary ? "primary" : secondary ? "secondary" : danger ? "danger" : "";
  return <button type="button" className={cls}>{children}</button>;
}

<Button primary>Save</Button>
<Button primary danger>Delete</Button>   {/* both true: nonsense, and it compiles */}
```

### Solution

```jsx
function Button({ variant = "secondary", children }) {
  return <button type="button" className={"btn-" + variant}>{children}</button>;
}

<Button>Cancel</Button>
<Button variant="primary">Save</Button>
<Button variant="danger">Delete</Button>
```

Three booleans describe eight states, several of which are meaningless, and the component's branches have to decide what a contradictory pair means. One enumerated prop documents itself, can be validated, and makes the invalid combination unrepresentable, which removes a branch rather than adding one. The default is the other half of the design: `Cancel` passes nothing because the most common usage should need no props, and that also means a change to the default is one edit instead of a sweep through every call site. This is the same question a function signature gets, multiplied by every place the component is used.

## Example 2 — A component that sometimes honours the value it was given

A tabs component accepts a value and also keeps its own copy, so it follows the parent until the user clicks, and then stops. Say why the behaviour reads as a bug, then pick one ownership model and show the call site.

```jsx
function Tabs({ items, value, initialTab = 0 }) {
  const [internal, setInternal] = useState(value ?? initialTab);
  // follows `value` until the first click, then ignores it
  return items.map((item, i) => (
    <button key={item} onClick={() => setInternal(i)}>{item}</button>
  ));
}
```

### Solution

```jsx
function Tabs({ items, value, onChange }) {
  return items.map((item, i) => (
    <button key={i} type="button" onClick={() => onChange(i)}>{item}</button>
  ));
}
```

```jsx
const [tab, setTab] = useState(0);
<Tabs items={tabs} value={tab} onChange={setTab} />
```

A component that is sometimes controlled and sometimes not is the worst of both: the parent's updates are honoured until the first interaction, after which the component silently disagrees with the value it was passed, and that reads as a bug with no visible cause. Taking the value and an `onChange` and holding no state is more verbose at the call site, but the application is then the single source of truth and can drive, reset or persist the selection. The decision belongs in the documentation, one model per component, so the next caller knows whether to pass a value or a starting point.
