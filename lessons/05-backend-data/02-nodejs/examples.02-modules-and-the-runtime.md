## Example 1 — One dependency, two module styles

A startup helper loads a configuration file. It was written with a function that loads by name, then imported from a newer file that uses explicit imports, and now its initialisation runs twice. Show both styles side by side and settle the project on one.

```cjs
// config.cjs
const fs = require('node:fs')

module.exports = {
  load: () => JSON.parse(fs.readFileSync('config.json', 'utf8'))
}
```

### Solution

```mjs
// config.mjs
import { readFile } from 'node:fs/promises'

export const load = async () => JSON.parse(await readFile('config.json', 'utf8'))
```

The explicit style is resolved before the program runs, so tooling can see the bindings and the module is evaluated once for every importer; a module loaded one way and required the other can instead be initialised twice. The dynamic form is still the right tool when loading must be conditional, which is what makes its target invisible to static analysis. Pick one style per dependency and stay consistent.

## Example 2 — Reading a file into memory to send it

An endpoint sends a large export file. Small files work and the process is killed on the production-sized one, because the whole body is held in memory before any of it is written. Change it to hand the data on in chunks.

```js
import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'

createServer(async (req, res) => {
  const body = await readFile('./export.csv')    // the whole file, at once
  res.writeHead(200, { 'content-type': 'text/csv' })
  res.end(body)
}).listen(3000)
```

### Solution

```js
import { createServer } from 'node:http'
import { createReadStream } from 'node:fs'

createServer((req, res) => {
  const source = createReadStream('./export.csv')
  source.on('error', (err) => res.destroy(err))
  res.on('error', (err) => source.destroy(err))
  res.writeHead(200, { 'content-type': 'text/csv; charset=utf-8' })
  source.pipe(res)
}).listen(3000)
```

Chunks arrive and are written as they are read, so memory stays flat however large the file grows, and each side of the pipe has an error path of its own. Ignoring those two handlers is the mistake that hurts: a failed stream stalls or leaks quietly instead of failing loudly. Name the encoding at the boundary as well, since a mismatch between the encoding read and the one written is what produces garbled text.
