## Example 1 — A button that adds one instead of two

The handler calls the setter twice with the same expression, and the counter advances by one. Say which value each call read, then make both calls build on the pending value.

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  function addTwo() {
    setCount(count + 1);
    setCount(count + 1);   // observed result: 1
  }

  return <button onClick={addTwo}>{count}</button>;
}
```

### Solution

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  function addTwo() {
    setCount((c) => c + 1);
    setCount((c) => c + 1);
  }

  return <button onClick={addTwo}>{count}</button>;
}
```

State is a snapshot rather than a live variable: each render captures the values it was called with, and both calls in this handler close over the same `count` from the render that created them, so each computes the same number and the second write wins. The updater form receives the pending value instead of the render's copy, which is why it is the safe default whenever the next value depends on the previous one. This is also the reason reading the variable immediately after setting it returns the old value — React batches the updates from one event and renders once, rather than producing three inconsistent frames.

## Example 2 — A prop copied into state once

An amount field takes its starting value from a prop and stores it. When the parent loads a different order, the field keeps showing the first one. Say why the copy stopped updating, then stop copying.

```jsx
function PriceInput({ initialAmount }) {
  const [amount, setAmount] = useState(initialAmount);   // set once, never again
  return <input value={amount} onChange={(e) => setAmount(Number(e.target.value))} />;
}
```

### Solution

```jsx
function PriceInput({ amount, onAmountChange }) {
  return <input value={amount} onChange={(e) => onAmountChange(Number(e.target.value))} />;
}

// the parent owns the value now
<PriceInput amount={amount} onAmountChange={setAmount} />
```

Copying a prop into state freezes the first value the component ever saw, because the initialiser runs once and later prop changes are simply ignored — the bug looks like a rendering problem and is a data-ownership one. The fix is to read the prop directly and let the parent own the value, which also makes the field controlled and testable. Where a component genuinely needs its own draft — a form that is edited before it is saved — keying the component on the record's id remounts it when the record changes, which resets the draft deliberately instead of keeping a stale one. Never store what you can derive from props.
