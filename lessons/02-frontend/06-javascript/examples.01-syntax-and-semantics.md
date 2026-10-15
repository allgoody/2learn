## Example 1 — A zero treated as missing

A settings object holds a retry count. The code below prints the same message whether the count is zero or absent. Say which rule is being relied on, then make the intent explicit.

```js
const settings = { retries: 0, label: "" };

if (settings.retries) {
  console.log("will retry");
} else {
  console.log("no retries");   // runs even when retries is a real 0
}

console.log(settings.label == false);   // true — both sides coerced
console.log([] == false);               // true — [] coerces to 0
```

### Solution

```js
if (settings.retries > 0) {
  console.log("will retry");
}

if (Object.hasOwn(settings, "retries")) {
  console.log("the setting was provided");
}

console.log(settings.label === "");     // false-free equality
console.log([] === false);              // false
```

There are six falsy values — `false`, `0`, `""`, `null`, `undefined` and `NaN` — so a truthiness check answers "is this value falsy", not "is it missing", and a legitimate `0` is indistinguishable from an absent key. `==` then coerces before comparing, which is why an empty array equals `false`. Using `>` states the numeric intent, `Object.hasOwn` states the presence intent, and `===` stops the coercion. The rules were always there; the original code just never said which question it was asking.

## Example 2 — A loop whose callbacks all see the last value

Three functions are collected in a loop and each is expected to log its own index. They all log the same number. Explain which binding they captured, then fix the loop without changing what it does.

```js
const handlers = [];

for (var i = 0; i < 3; i++) {
  handlers.push(() => console.log(i));
}

handlers.forEach((handler) => handler());   // 3 3 3
```

### Solution

```js
const handlers = [];

for (let i = 0; i < 3; i++) {
  handlers.push(() => console.log(i));      // 0 1 2
}

handlers.forEach((handler) => handler());
```

A closure captures the variable, not a copy of its value, and `var` is hoisted to the enclosing function — so all three arrow functions close over the same `i`, which reaches 3 before any of them runs. `let` is block-scoped and creates a fresh binding for each iteration, so each callback gets its own. The same rule explains why a counter built from a closure keeps its private state between calls: what a function remembers is where it was written, not where it is called.
