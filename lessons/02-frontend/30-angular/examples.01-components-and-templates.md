## Example 1 — An array mutated in place under `OnPush`

A list component declares `OnPush` and the parent edits the array rather than replacing it. New rows never appear. Say what the strategy is comparing, then fix the parent.

```ts
@Component({
  selector: "app-orders",
  template: `<li *ngFor="let order of orders">{{ order.id }}</li>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersComponent {
  @Input() orders: Order[] = [];
}
```

```ts
// parent
addOrder(order: Order) {
  this.orders.push(order);   // same array reference; the view never updates
}
```

### Solution

```ts
// parent
addOrder(order: Order) {
  this.orders = [...this.orders, order];   // a new reference; inputs changed
}
```

`OnPush` tells the framework to check a component's bindings only when an input reference changes or an event fires inside it, which is a large performance win and a discipline rather than a free setting. Pushing into the existing array leaves the reference identical, so the check is skipped and the template keeps its previous output — the bug reads as "the data is wrong" when the data is fine and the comparison is what missed it. Replacing the array satisfies the reference comparison, and it also makes the change visible to anything else comparing the same input. The lesson is the same wherever a framework compares references: mutate state you intend to replace, and the view stops following the data.

## Example 2 — A heavy calculation inside a binding

The template calls a method that sorts and formats the whole list. Every change-detection pass runs it, including passes caused by typing in an unrelated field. Say why the method is called so often, then move the work out of the binding.

```html
<ul>
  <li *ngFor="let order of sortedOrders(); trackBy: trackById">
    {{ formatTotal(order) }}
  </li>
</ul>
```

### Solution

```ts
readonly sorted = [...this.orders].sort((a, b) => b.placedAt - a.placedAt);
readonly totals = new Map(this.orders.map((o) => [o.id, formatTotal(o)]));

trackById(_: number, order: Order) { return order.id; }
```

```html
<ul>
  <li *ngFor="let order of sorted; trackBy: trackById">
    {{ totals.get(order.id) }}
  </li>
</ul>
```

A method call in a binding is evaluated on every change-detection pass, and a default-strategy component is checked whenever anything in the application may have changed — so a sort inside the template runs many times per interaction and its cost is invisible in the component code. Computing the value once into a field, or moving it into a pure pipe, reduces that to a single calculation, and reading from a map makes the per-row lookup constant. `trackBy` is the other half of a repeated list: without it the framework re-creates every row on any change, which discards DOM nodes and their state instead of reusing them by identity.
