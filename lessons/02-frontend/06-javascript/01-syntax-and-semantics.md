---
title: Syntax and semantics
prereqs: ["02-frontend/03-html"]
---

## What it is

This is the core of JavaScript as a language: the kinds of values it has, how names are bound to them, how functions capture their surroundings, and how objects behave. None of it is browser-specific. Everything later in the track — the DOM, promises, modules — is standard library and environment built on top of these rules.

## Why it matters

Most "JavaScript is weird" moments are actually "JavaScript follows rules I was not told". `0.1 + 0.2` is not the language being broken; `this` changing meaning is not a bug; a variable being `undefined` at the top of a function is hoisting. Knowing the rules turns a set of memes into a model you can reason from, and that model is what lets you read unfamiliar code, predict the result before running it, and explain to a colleague why their check passes when they expected it to fail.

## Core ideas

### Values have types, and coercion happens quietly

JavaScript has primitives (string, number, boolean, null, undefined, symbol, bigint) and objects. `==` coerces before comparing, which produces results like `[] == false`; `===` does not, and is the right default. A falsy set of six values — `false`, `0`, `""`, `null`, `undefined`, `NaN` — is the source of many implicit branches.

```js
console.log(1 == "1");   // true  — coerced
console.log(1 === "1");  // false — not coerced
console.log([] == false); // true — both sides coerced to 0
```

### `let` and `const` are block-scoped; `var` is not

`var` is hoisted to the enclosing function and can be reassigned from anywhere inside it. `const` prevents reassignment of the binding, not mutation of the object it points to. Prefer `const`, use `let` when reassignment is genuinely needed, and treat `var` as a sign you are reading older code.

```js
const user = { name: "Ada" };
user.name = "Grace";   // allowed — the object is mutated
// user = {};          // TypeError — the binding cannot be reassigned
```

### Functions are values, and closures capture variables

A function can be passed, returned and stored like any other value. A closure is a function that remembers the variables where it was defined, not where it is called — which is how a counter keeps its count between calls, and why a loop variable can appear to be "shared" by every callback built inside it.

```js
function counter() {
  let n = 0;
  return () => ++n;
}

const next = counter();
console.log(next(), next());  // 1 2
```

### `this` depends on how a function is called

For a normal function, `this` is set by the call site; for an arrow function, it is inherited from where the function was written. That is why passing a method as a callback loses its `this` and why arrow functions are preferred inside callbacks. `bind`, `call` and `apply` set it explicitly.

### Objects and prototypes

Every object has a prototype it delegates to when a property is missing. Classes are syntax for the same mechanism, and `class` methods live on the prototype rather than on each instance. Understanding this explains why `for...in` walks inherited properties while `Object.keys` does not.

## Practice

### Predict before you run

Write five expressions mixing `==`, `===`, `null`, `undefined`, `0` and `""`, predict each result, then check them in the console and explain every surprise in one sentence.

Done when: you have at least one wrong prediction and can now state the coercion rule that made it wrong.

### Build a closure you cannot break

Write a function that returns two functions sharing a private count, one incrementing and one reading it, with no global variable.

Done when: calling the reader from outside always reports the current count and nothing can reset it except the incrementer.

## Common mistakes

- **Using `==` for equality** — silent coercion makes unrelated values compare equal; fix: use `===` unless you are deliberately testing for `null` or `undefined` together.
- **Assuming `const` makes a value immutable** — the object's properties still change; fix: use `Object.freeze` where immutability matters, or stop mutating shared values.
- **Losing `this` by passing a method as a callback** — the method runs with the wrong receiver and throws; fix: use an arrow function or `bind` the method once.
- **Declaring variables with `var` inside a loop** — every callback closes over the same binding; fix: use `let`, which creates a new binding per iteration.
- **Testing for a property with `if (obj.value)`** — a legitimate `0` or `""` is treated as missing; fix: compare against `undefined` or use `Object.hasOwn`.

## Go deeper

- **Hypertext Markup Language (HTML)** (`02-frontend/03-html`) — the document these values will eventually manipulate.
- **The DOM and events** (`02-frontend/06-javascript/02-the-dom-and-events`) — applying the language to the page.
- **TypeScript** (`02-frontend/19-typescript`) — most of these surprises are the ones a type system catches before you run the code.
