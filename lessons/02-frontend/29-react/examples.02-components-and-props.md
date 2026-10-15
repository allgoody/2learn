## Example 1 — A boolean that switches part of the markup on

A panel takes a `showFooter` flag and renders two extra elements when it is true. A second variant is now needed and a third is being discussed. Say what the flag is costing, then let the caller supply the markup.

```jsx
function Panel({ title, children, showFooter }) {
  return (
    <section className="panel">
      <h2>{title}</h2>
      {children}
      {showFooter ? <footer><button>Close</button></footer> : null}
    </section>
  );
}
```

### Solution

```jsx
function Panel({ title, children }) {
  return (
    <section className="panel">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

<Panel title="Invoices">
  <InvoiceTable rows={rows} />
  <footer><SaveButton onSave={save} saving={saving} /></footer>
</Panel>
```

A flag prop puts a feature inside a component that otherwise knows nothing about it, so each new variant either adds another flag or another branch, and the component accumulates knowledge of its callers. Composition inverts that: the panel renders whatever it is given and stays responsible for the frame only. The caller can then put anything in the footer — a different button, two buttons, a status line — without the panel changing at all, and the component's own prop list stops growing. Boundaries belong around data rather than around visual space, and a prop that exists only to switch a region on is the clearest sign one is in the wrong place.

## Example 2 — A prop threaded through three layers that ignore it

A value is passed down through a layout, a section and a card before anything reads it. Every middle component now takes a prop it never uses. Say what the threading costs, then bring the value closer to where it is needed.

```jsx
function Layout({ user, children }) { return <main>{children}</main>; }
function Section({ user, children }) { return <section>{children}</section>; }
function Card({ user }) { return <h3>{user.name}</h4>; }

<Layout user={user}><Section user={user}><Card user={user} /></Section></Layout>
```

### Solution

```jsx
function Layout({ children }) { return <main>{children}</main>; }
function Section({ title, children }) {
  return <section><h2>{title}</h2>{children}</section>;
}
function Card({ user }) { return <h3>{user.name}</h4>; }

<Layout>
  <Section title="Account"><Card user={user} /></Section>
</Layout>
```

A forwarded prop makes every intermediate component depend on a feature it does not use, so a rename or a new field has to be applied at each layer and each layer's prop list stops describing what it actually does. Passing the value from the component that owns it directly into the component that reads it removes the coupling entirely, and the layers keep only their own concerns. Where a layer must place children around unknown content, that is the case for composition: the layout renders what it is given and needs no knowledge of the data inside it. Three clear levels read better than eight thin ones.
