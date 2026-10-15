## Example 1 — A timer that keeps running after the component is gone

A clock starts an interval when it mounts and never stops it. After the panel is closed the console keeps logging, and the app slowly accumulates timers. Show the cleanup, and say what breaks without it.

```jsx
function Clock() {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
  }, []);

  return <time>{new Date(now).toLocaleTimeString()}</time>;
}
```

### Solution

```jsx
function Clock() {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  return <time>{new Date(now).toLocaleTimeString()}</time>;
}
```

The function an effect returns runs before the next run and again when the component unmounts, which is what stops whatever the effect started. Without it the interval outlives the component and keeps calling a setter that belongs to a render no longer on screen: at worst a timer, socket or subscription is created on every mount and never released, so a panel opened and closed all day leaves a growing pile of them behind. This is also why React runs effects twice in development: a duplicated subscription is surfacing a missing cleanup, not a framework bug.

## Example 2 — A search where the slower response wins

Typing starts a request per keystroke, and the results sometimes belong to an earlier query. Show the cleanup that fixes it, with the loader passed in so the snippet stays self-contained.

```jsx
function Results({ query, load }) {
  const [state, setState] = useState({ status: "idle" });

  useEffect(() => {
    setState({ status: "loading" });
    load(query).then((data) => setState({ status: "ready", data }));
  }, [query, load]);
}
```

### Solution

```jsx
function Results({ query, load }) {
  const [state, setState] = useState({ status: "idle" });

  useEffect(() => {
    let ignore = false;
    setState({ status: "loading" });

    load(query)
      .then((data) => { if (!ignore) setState({ status: "ready", data }); })
      .catch(() => { if (!ignore) setState({ status: "error" }); });

    return () => { ignore = true; };
  }, [query, load]);
}
```

Requests started in quick succession can resolve out of order, so without the guard the older response arrives last and overwrites the newer one — the list then shows results for a query the user has already replaced. The cleanup runs before the next effect, so flagging `ignore` there makes every superseded response a no-op; cancelling the request itself is the better fix where the loader supports it, since it frees the connection as well as the state. Leaving the dependency array off would re-run the effect after every render and start a new request each time.
