## Example 1 — A search that keeps every keystroke's request

A search field maps its input into a request, and results sometimes belong to an earlier query. Say which operator is keeping the old requests alive, then cancel them instead.

```ts
readonly results$ = this.query$.pipe(
  debounceTime(250),
  mergeMap((q) => this.http.get<Result[]>(`/api/search?q=${encodeURIComponent(q)}`)),
);
```

### Solution

```ts
readonly results$ = this.query$.pipe(
  debounceTime(250),
  distinctUntilChanged(),
  switchMap((q) => this.http.get<Result[]>(`/api/search?q=${encodeURIComponent(q)}`)),
  catchError(() => of([])),
);
```

An observable is a stream rather than a promise, and operators describe how one stream becomes another — `mergeMap` keeps every inner observable running, so a slow early request stays alive and can emit after a faster later one. `switchMap` unsubscribes from the previous inner observable when a new value arrives, which is exactly the cancellation a search field needs, and it is the reason the results always belong to the current query. `debounceTime` reduces how many requests are started at all, and `distinctUntilChanged` stops a repeated value from restarting the same work. Reading the operator chain from left to right as the path the value takes is what makes these pipelines legible.

## Example 2 — A subscription that outlives its component

A component subscribes to a service in its constructor and never stops. Returning to the screen and leaving it again accumulates listeners. Say what keeps the component alive, then let the framework manage the subscription.

```ts
export class OrdersComponent implements OnInit {
  orders: Order[] = [];

  constructor(private readonly ordersService: OrdersService) {
    this.ordersService.list().subscribe((orders) => (this.orders = orders));
  }
}
```

### Solution

```ts
export class OrdersComponent {
  readonly orders$ = inject(OrdersService).list();
}
```

```html
@if (orders$ | async; as orders) {
  @for (order of orders; track order.id) { <li>{{ order.id }}</li> }
}
```

A manual subscription holds a reference to the component for as long as the stream lives, so every visit to the screen adds another listener and the component cannot be released — the symptom is stale data arriving after the user has moved on. The `async` pipe subscribes when the template renders and unsubscribes when it is destroyed, which removes the `ngOnDestroy` bookkeeping entirely, and where a subscription must be manual, `takeUntilDestroyed` does the same job. Subscribing in the constructor is the second fault to notice: it runs before the component is initialised and before any input is set, which is why work that must happen once belongs in `ngOnInit` and its cleanup in `ngOnDestroy`.
