## Example 1 — Every message is treated as the reply

The client below sends a command and assumes the next message that arrives answers it. The server also pushes notifications, so commands and pushes are interleaved and the wrong callback runs. Give the client its own correlation scheme so a reply is matched to the command that caused it.

```js
socket.onmessage = (event) => {
  const message = JSON.parse(event.data);
  showReply(message);            // a push and a reply look identical here
};
```

### Solution

```js
const pending = new Map();

function send(type, payload) {
  const id = crypto.randomUUID();
  socket.send(JSON.stringify({ id, type, payload }));
  return new Promise((resolve) => pending.set(id, resolve));
}

socket.onmessage = (event) => {
  const message = JSON.parse(event.data);
  const resolve = pending.get(message.id);
  if (!resolve) return;         // unsolicited push, not a reply
  pending.delete(message.id);
  resolve(message.payload);
};
```

Without a request-response pairing a message cannot be matched to the request that caused it, so the client carries an identifier in the payload and the server echoes it — this is the price of the model. The socket was opened by an upgrade request on which the user authenticated, so authentication is settled once while correlation is handled on every message. The mistake is assuming order gives the pairing, which breaks the first time the server speaks on its own.

## Example 2 — The reconnect that hammers the server

The client below reconnects the moment the connection closes and resumes as if nothing had been missed. After a restart every client does this at the same instant. Rewrite the reconnect path so the retry is spread out and the client learns what it missed.

```js
function connect() {
  socket = openSocket();
  socket.onclose = connect;     // immediate, and no resynchronisation
}
```

### Solution

```js
let attempt = 0;
let lastSeen = 0;

function connect() {
  const socket = openSocket();
  socket.onmessage = (event) => {
    lastSeen = event.data.sequence;
    render(event.data);
  };
  socket.onopen = () => {
    attempt = 0;
    replay(lastSeen);           // from the durable store, not from the socket
  };
  socket.onclose = () => {
    const wait = Math.min(30000, 500 * 2 ** attempt) + Math.random() * 500;
    attempt += 1;
    setTimeout(connect, wait);
  };
}
```

Each open connection is held by one process, so a deployment or a crash drops it and anything sent meanwhile is gone; `replay` is what asks the durable store for the messages after `lastSeen`. Exponential backoff with jitter stops every client retrying in the same second, which a tight loop turns into a flood the clients inflict on themselves. The usual mistake is assuming a message sent while the client was offline will arrive later, so no catch-up path is built.
