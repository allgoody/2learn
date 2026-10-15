---
title: Components and templates
prereqs: ["02-frontend/19-typescript"]
---

## What it is

An Angular component is a TypeScript class marked with a decorator that also points at an HTML template and a stylesheet. The template uses Angular's own binding syntax to read data from the class and to report events back to it. Change detection is the framework's job of deciding when a template's bindings need to be recalculated.

## Why it matters

Every front-end framework has a component model; Angular's is distinguished by how much of it is explicit and typed. Templates are separately compiled, which means binding errors are caught at build time rather than at run time, and the compiler can tell you that a property you referenced no longer exists. That safety is the reason the framework is popular in regulated and long-lived projects. The change-detection model then explains the performance characteristics: without an understanding of when detection runs, an expensive template causes a slow page for reasons that are invisible in the component code.

## Core ideas

### A decorator declares the component's contract

The `@Component` decorator names the selector — the tag the component is used by — the template, the styles and how the component should be detected. This is the metadata the compiler and the dependency injector both work from, which is why it is written above the class rather than inside it.

```ts
import { Component, Input } from "@angular/core";

@Component({
  selector: "app-badge",
  template: `<span class="badge">{{ label }}</span>`,
  styles: [".badge { padding: 0.25rem 0.5rem; }"],
})
export class BadgeComponent {
  @Input({ required: true }) label!: string;
}
```

### Bindings read with brackets and listen with parentheses

`[property]="expression"` sets a DOM property or a component input; `(event)="handler()"` listens; `[(ngModel)]` combines the two for a form control. The punctuation is the syntax, and reading it out loud — "property from expression", "event to handler" — makes the direction of data flow obvious at a glance.

```html
<input [(ngModel)]="query" (keyup.enter)="search()" />
<p *ngIf="results.length === 0">No matches.</p>
<ul>
  <li *ngFor="let item of results; trackBy: trackById">{{ item.name }}</li>
</ul>
```

### Structural directives change the DOM

An asterisk marks a shorthand that wraps the element in a template: `*ngIf` adds and removes it, `*ngFor` repeats it. The newer `@if` and `@for` block syntax does the same with a clearer shape and better type narrowing inside the block.

```html
@for (item of results; track item.id) {
  <li>{{ item.name }}</li>
} @empty {
  <li>No matches.</li>
}
```

### Change detection looks for changes, and `OnPush` narrows the search

By default Angular checks a component's bindings whenever anything may have changed. Declaring `ChangeDetectionStrategy.OnPush` tells it to check only when an input reference changes or an event fires inside the component. That is a large performance win and a discipline: mutate an input object in place and the view stops updating.

### Lifecycle hooks are the seam for side effects

`ngOnInit` runs after the inputs are first set, `ngOnDestroy` runs before the component goes away. Work that must happen once — a fetch, a subscription — belongs in the first, and its cleanup belongs in the second.

## Practice

### Build a typed presentational component

Create a component that takes one typed input and emits one event, and use it from a parent, including the empty case.

Done when: the compiler rejects an unknown input name, the event's payload is typed at the parent, and the component holds no state of its own.

### Convert a component to `OnPush` and break it

Set `OnPush` on a component that mutates an input array in the parent rather than replacing it.

Done when: you have seen the view stop updating, and you can state the one-line change to the parent that fixes it.

## Common mistakes

- **Mutating an input object under `OnPush`** — the reference is unchanged so the view is never re-checked; fix: replace the object instead of editing it.
- **Calling a method in a binding that does heavy work** — it runs on every change-detection pass; fix: compute the value into a field or a pipe and bind to that.
- **Subscribing in the constructor** — the component is not initialised and inputs are not set; fix: subscribe in `ngOnInit` and unsubscribe in `ngOnDestroy`.
- **Omitting `trackBy` on a repeated list** — the framework re-creates every row on any change; fix: track by a stable id.
- **Using `any` to satisfy a template binding** — the compiler's main advantage is discarded; fix: type the field so the binding is checked.

## Go deeper

- **TypeScript** (`02-frontend/19-typescript`) — decorators, generics and narrowing are used constantly in Angular's APIs.
- **Dependency injection and RxJS** (`02-frontend/30-angular/02-dependency-injection-and-rxjs`) — how services reach components and how asynchronous data is composed.
- **State Management** (`02-frontend/23-state-management`) — where a component's state ends and a service or store begins.
