---
title: Dependency injection and RxJS
prereqs: ["02-frontend/30-angular/01-components-and-templates"]
---

## What it is

Dependency injection is a pattern where a class asks for what it needs rather than constructing it: a component declares a dependency on a service, and the framework supplies an instance. RxJS is a library for composing asynchronous streams of values with operators. Angular uses the first to wire applications together and the second to represent data that arrives over time — HTTP responses, form input, websocket messages.

## Why it matters

These two ideas account for most of what feels unfamiliar in an Angular codebase. Dependency injection makes services testable, because a test can supply a stub without the class knowing, and it makes sharing state across components a matter of providing one instance in the right place. RxJS makes the awkward parts of asynchronous work — cancellation, retry, debouncing, combining two sources — into composable operators rather than nested callbacks. Together they explain the shape of the code, which is otherwise hard to read from the outside looking in.

## Core ideas

### Services are just classes, provided somewhere

A service is an ordinary TypeScript class with an `@Injectable` decorator. Registering it with the root injector creates one shared instance for the whole application; registering it on a component creates a separate instance per component instance, which is how two tables keep independent state from the same class.

```ts
@Injectable({ providedIn: "root" })
export class OrdersService {
  constructor(private readonly http: HttpClient) {}

  list(): Observable<Order[]> {
    return this.http.get<Order[]>("/api/orders");
  }
}
```

### Ask for a dependency in the constructor

The constructor's parameter list is the declaration of what the class needs, and the injector resolves it by type. That makes the dependency graph visible at the top of the file and lets a test substitute a fake without changing the class.

### An observable is a stream, not a promise

A promise resolves once; an observable may emit zero, one or many values, and it does nothing until something subscribes. That difference is why an HTTP call is a cold observable: calling the service method sends no request until the template's `async` pipe or a manual subscription asks for the value.

```html
@if (orders$ | async; as orders) {
  <ul>
    @for (order of orders; track order.id) { <li>{{ order.id }}</li> }
  </ul>
}
```

### Operators describe the transformation

`map`, `filter`, `debounceTime`, `switchMap`, `catchError` and `retry` each describe one step. `switchMap` is the important one for search: it unsubscribes from the previous inner observable, which is exactly the cancellation a search field needs.

```ts
readonly results$ = this.query$.pipe(
  debounceTime(250),
  distinctUntilChanged(),
  switchMap((q) => this.http.get<Result[]>(`/api/search?q=${encodeURIComponent(q)}`)),
  catchError(() => of([]))
);
```

### Unsubscribe, or let the framework do it

A manual subscription in a component must be cancelled in `ngOnDestroy`, or the component stays alive as long as the stream does. The `async` pipe and `takeUntilDestroyed` do this for you, which is why they are preferred to a bare `subscribe`.

### Keep the state in the stream where you can

Deriving a view from observables — by combining them with `combineLatest` or mapping over a store's selector — avoids the duplicated state that appears when the same data is also copied into a component field. Where the state must be held, hold it in one service and expose an observable.

## Practice

### Build a search with cancellation

Create a search field whose value is an observable, debounce it, and `switchMap` into an HTTP call. Type quickly.

Done when: the network panel shows earlier requests cancelled, and the list never renders results for a query that is not the current one.

### Share state through a provided service

Put a counter and its increment method in a service provided at the root. Read it from two sibling components.

Done when: both components show the same value and both update immediately when either increments it, with no input or output between them.

## Common mistakes

- **Subscribing without unsubscribing** — the component leaks and keeps receiving events after it is gone; fix: use the `async` pipe, or cancel with `takeUntilDestroyed`.
- **Using `mergeMap` for a search** — every keystroke's request is kept and a slow early response can win; fix: use `switchMap` so a new query cancels the previous one.
- **Providing a service at the wrong level** — either every component gets its own copy or every component fights over one; fix: decide per service whether it is application-wide or per component, and register it there.
- **Copying observable data into a component field on every emission** — two sources of truth drift; fix: derive the view from the stream.
- **Treating an observable like a promise** — nothing happens without a subscription, and a cold observable re-runs its work per subscriber; fix: subscribe once at the edge, or share the stream.

## Go deeper

- **Components and templates** (`02-frontend/30-angular/01-components-and-templates`) — the components that consume these services and streams.
- **State Management** (`02-frontend/23-state-management`) — the framework-agnostic view of the same problem, including where a store beats a service.
- **Asynchronous JavaScript** (`02-frontend/06-javascript/03-asynchronous-javascript`) — promises and the event loop that observables are built on.
