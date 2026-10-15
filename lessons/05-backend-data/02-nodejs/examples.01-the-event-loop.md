## Example 1 — A synchronous read in a request path

A service serves a health check and a report page. Under load the health check takes seconds whenever the report is requested, though the two handlers share nothing. The report handler below reads its data synchronously. Rewrite it so the loop stays free while the file is read.

```js
import { createServer } from 'node:http'
import { readFileSync } from 'node:fs'

createServer((req, res) => {
  if (req.url === '/report') {
    const config = readFileSync('./report.json', 'utf8')   // waits here
    res.end(render(config))
  } else {
    res.end('ok')
  }
}).listen(3000)
```

### Solution

```js
import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'

createServer(async (req, res) => {
  if (req.url !== '/report') return res.end('ok')
  try {
    const config = await readFile('./report.json', 'utf8')
    res.end(render(config))
  } catch (err) {
    res.writeHead(500).end('report unavailable')
  }
}).listen(3000)
```

The asynchronous call registers the read and returns, so the loop serves the health check while the bytes arrive, and the error path becomes an ordinary 500 instead of an unhandled error that ends the process. The usual mistake is to keep the synchronous form because the handler is short, and to meet its cost only when a second request is in flight.

## Example 2 — A computation that freezes every request

A scoring endpoint walks a large array with no await at all. While it runs every other connection waits, and more memory and replicas have changed nothing. Break the work so the loop can turn between chunks.

```js
function scoreAll(rows) {
  let total = 0
  for (const row of rows) {
    total += heavyScore(row)      // nothing else runs until this returns
  }
  return total
}
```

### Solution

```js
const yieldToLoop = () => new Promise((resolve) => setTimeout(resolve, 0))

async function scoreAll(rows) {
  let total = 0
  for (let i = 0; i < rows.length; i++) {
    total += heavyScore(rows[i])
    if (i % 1000 === 0) await yieldToLoop()
  }
  return total
}
```

Nothing pre-empts the loop, so the version above releases it every thousand rows and lets pending callbacks run; for genuinely heavy work the same shape is used with a worker thread or a separate process. Extra memory or processors cannot help a loop that never yields, and that is the mistake: the latency looks like a capacity problem when it is a turn of the loop that never ends.
