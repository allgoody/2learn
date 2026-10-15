---
title: Webpack
type: skill
topic: 02-frontend
tier: small
status: drafted
aliases: []
prereqs: ["02-frontend/06-javascript", "02-frontend/04-package-management-npm"]
related: []
---

## What it is

Webpack is a module bundler. It starts from one or more entry files, follows every import, applies transformations to each file as it goes, and emits a small number of output files a browser can load. It was the tool that made npm dependencies usable in the browser and for a decade it was the default build tool for large front-end applications.

## Why it matters

Webpack's model is worth understanding even if you never configure it, because the vocabulary it introduced became the vocabulary of all front-end tooling: entry, output, loader, plugin, code splitting, chunk, hashing, tree shaking. It is also still running in a great many production projects, and its configuration is often the place where a build is slow or an output is unexpectedly large. Knowing what each part does turns a five-hundred-line config from an incantation into something you can fix.

## Core ideas

### The dependency graph is the whole idea

Webpack does not load files in the order you list them; it discovers them. The entry file imports others, they import others, and the graph determines the output. That is why adding an import anywhere changes the bundle, and why a stray import of a large library can double it.

```js
// webpack.config.js
export default {
  mode: "production",
  entry: "./src/index.js",
  output: { filename: "[name].[contenthash].js", clean: true },
};
```

The content hash in the filename changes only when the content changes, which is what lets a browser cache the bundle for a year.

### Loaders transform; plugins extend

A loader is a function applied to a file's contents before it enters the graph — compile TypeScript, convert a stylesheet, inline a small image. A plugin hooks into the build's lifecycle to do something broader: emit an HTML file, copy assets, analyse the bundle. If the change is per-file, it is a loader; if it is about the build, it is a plugin.

### Code splitting is configuration plus `import()`

A dynamic `import()` creates a separate chunk that is fetched when it runs. That is how a heavy editor or a rarely visited route is kept out of the initial download. The bundler can also split shared code between entry points automatically, which is where the runtime chunk comes from.

### Development and production are different builds

Development wants fast rebuilds and readable source; production wants small output, minification and tree shaking. `mode` switches the defaults, and much config complexity comes from projects that tried to serve both from one configuration.

### Configuration complexity is the known cost

Webpack's flexibility means almost any build can be expressed, and also that almost any mistake can be made. A large config with several entry points, several loaders chained per file type and plugins that patch each other is the reason many teams moved to tools with fewer decisions.

## Practice

### Trace one dependency into the bundle

Add an import of a small library to an entry file, build, and inspect the output for its code. Then import it dynamically in a branch that rarely runs and compare.

Done when: the first build includes the library in the main bundle and the second emits it as a separate chunk that is not fetched on load.

### Measure the cost of one loader

Take a working configuration and disable a loader that transforms a file type, then rebuild.

Done when: you can state what broke, and whether the loader was transforming contents or only changing the error message when it was missing.

## Common mistakes

- **Importing a whole library for one function** — the entire package enters the graph; fix: import the specific module, or choose a smaller package.
- **Serving a development build in production** — the output is unminified, unhashed and much larger; fix: build with `mode: "production"` and verify the artefacts.
- **Configuring the same loader twice for overlapping file types** — one silently wins and the transformation appears not to work; fix: keep one rule per extension and check the resolved config.
- **Ignoring the bundle report** — an accidental dependency doubles the download and nobody notices; fix: inspect the output after adding a dependency.
- **Carrying a complex configuration for a project that no longer needs it** — the build is slower to change than to use; fix: re-evaluate the tool when the requirements have narrowed.

## Go deeper

- **Javascript** (`02-frontend/06-javascript`) — the module syntax that defines the graph the bundler walks.
- **Package Management (npm)** (`02-frontend/04-package-management-npm`) — where the dependencies it bundles come from.
- **Vite** (`02-frontend/09-vite`) — the tool that replaced this in most new projects, and why.
