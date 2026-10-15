## Example 1 — Two components keeping the same fact in step

A search field and a result count each hold their own copy of the query, synchronised with an effect. A fast double-keystroke leaves them showing different values. Say what the effect is hiding, then give the value one owner.

```jsx
function SearchField() {
  const [query, setQuery] = useState("");
  return <input value={query} onChange={(e) => setQuery(e.target.value)} />;
}

function ResultCount({ results }) {
  const [query, setQuery] = useState("");
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(results.filter((r) => r.name.includes(query)).length);
  }, [results, query]);
  return <span>{count} shown</span>;
}
```

### Solution

```jsx
function Page({ results }) {
  const [query, setQuery] = useState("");
  const count = results.filter((r) => r.name.includes(query)).length;

  return (
    <>
      <SearchField value={query} onChange={setQuery} />
      <ResultCount count={count} />
    </>
  );
}
```

Two copies of one fact drift, and the effect that keeps them in step runs after a render rather than during it, so an interaction that changes both in the same tick can leave them disagreeing — which is why the bug looks like a rendering problem. Lifting is moving the owner, not adding a synchroniser: the value goes to the nearest common ancestor, which passes the value down and a setter back up, and the local copies are deleted. The count is then derived during render rather than stored, so it cannot be stale at all.

## Example 2 — A store entry only one screen reads

A store holds the selected row of a single table, with an effect that resets it whenever the screen unmounts. Nothing else reads the value. Say what the store is costing, then move it back where it is used.

```js
// store.js
export const useAppStore = create((set) => ({
  selectedRow: null,
  setSelectedRow: (id) => set({ selectedRow: id }),
  resetSelection: () => set({ selectedRow: null }),
}));

// OrdersTable.jsx
useEffect(() => () => resetSelection(), []);   // cleanup for a local value
```

### Solution

```jsx
function OrdersTable() {
  const [selectedRow, setSelectedRow] = useState(null);
  // nothing to reset: unmounting takes the value with it
  return <table>{/* rows call setSelectedRow(row.id) */}</table>;
}
```

A global store outlives the screen, so a value that belongs to one screen has to be cleaned up by hand — and the cleanup is the tell that the value was never shared. Keeping it local means there is nothing to reset, nothing to serialise, and no entry that the next screen can accidentally read; the component's lifetime is the value's lifetime. The direction of travel is from local outward: promote a value only when a second, distant reader exists or when it must survive navigation. A store earns its place by being cross-cutting, not by being important.
