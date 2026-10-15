## Example 1 — A whole library imported for one function

One string helper is needed, and the entry file imports the package's default export. The bundle grew by two orders of magnitude. Say how the bundler decided what to include, then import only what is used.

```js
// src/index.js
import _ from "lodash";

const slug = _.kebabCase(title);
```

```text
illustrative output
main.[contenthash].js   72 kB
```

### Solution

```js
// src/index.js
import kebabCase from "lodash/kebabCase";

const slug = kebabCase(title);
```

```text
illustrative output
main.[contenthash].js   3.1 kB
```

The bundler does not load the files you list — it discovers them, starting from the entry and following every import, so a default import of a package pulls in that package's entry point and everything it reaches. Importing the specific module keeps the rest of the graph out of the bundle, and where the package offers no small entry point at all, the honest answer is a smaller dependency or a few lines written by hand. Because the graph is discovered rather than declared, an accidental import anywhere changes the output, which is why inspecting the bundle after adding a dependency is part of the work rather than an optional audit.

## Example 2 — The development build shipped to production

The same configuration serves local work and the deployed site, and the output is one unhashed file with readable function names. Say what each missing setting costs, then separate the two builds.

```js
export default {
  entry: "./src/index.js",
  output: { filename: "bundle.js" },
};
```

### Solution

```js
export default {
  mode: "production",
  entry: "./src/index.js",
  output: { filename: "[name].[contenthash].js", clean: true },
};
```

`mode` switches the whole set of defaults, and without it the build stays in development shape: unminified, with no tree shaking and with debug-friendly code that costs bytes and parse time to every visitor. The content hash in the filename is the other half — it changes only when the file's content changes, which is what lets a browser cache the bundle indefinitely instead of re-downloading it on every deploy. `clean` removes stale artefacts from the output directory so an old hashed file cannot be served by accident. Development and production want opposite things — fast rebuilds and readable source versus small, hashed, tree-shaken output — and most configuration complexity comes from trying to serve both from one settings object.
