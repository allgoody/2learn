---
title: WebSockets
type: skill
topic: backend-data
tier: small
status: drafted
aliases: []
prereqs: ["backend-data/restful-api"]
related: []
---

## What it is

WebSockets upgrade an HTTP connection into a persistent, two-way message channel. After the initial handshake the same socket carries messages in both directions for as long as either side keeps it open, with no request-response pairing. It is the right tool when the server has something to say that the client did not ask for, and the client has a stream of its own to send.

## Why it matters

The request-response model of HTTP is a poor fit for chat, collaborative editing, presence and live dashboards, where either side may produce a message at any moment. Polling approximates it and wastes requests; a long-lived connection sends only what changed. The cost is a stateful connection per user, which changes the operational picture entirely: the server must hold that state, proxies must be configured to allow it, and deployments must consider how connections are drained.

## Core ideas

### The upgrade is negotiated over an ordinary request

The client sends a request asking to upgrade, the server agrees, and the connection leaves the HTTP request-response model behind. That is why authentication usually happens on this first request, and why a proxy in front of the service must be configured to pass the upgrade rather than treating the connection as an ordinary request.

```text
GET /chat  Upgrade: websocket  ->  101 Switching Protocols
```

### Either side can send at any time, so there is no reply to correlate

Without a request-response pairing, a message cannot be matched to the request that caused it. Applications therefore need their own correlation scheme, an identifier in the payload and a matching mechanism on the other side. This is the price of the model and it is the thing most often left out.

### The connection is state, and state does not survive a restart

Each open connection is held by one server process. A deployment or a crash drops them, and the client must reconnect with backoff and resynchronise anything it missed. Any design that assumes a message sent while the client was disconnected will arrive later needs a durable store and an explicit catch-up path.

### Scale means either sticky routing or shared state

A user's connection lives on one instance, so a message for that user must reach that instance. The two options are to route consistently by user, or to have instances exchange messages through a shared broker. The first is simpler and constrains deployments; the second is more flexible and adds a dependency. Which one is acceptable follows from how often the service is deployed.

### Reconnection, heartbeats and backoff are part of the protocol, not extras

A connection can be dropped by a proxy, a load balancer or a sleeping laptop without either side being told. Heartbeats detect a dead peer, and exponential backoff with jitter prevents every client reconnecting in the same instant after an outage. A client that reconnects in a tight loop is a denial-of-service attack it performs on itself.

The token is presented during the handshake, and the connection may outlive it. A connection that is never re-authenticated remains valid after the credential has been revoked. Periodic re-authentication, or a maximum connection lifetime, is what bounds that window.

### It is often the wrong tool

For a feed where only the server speaks, server-sent events over an ordinary HTTP response do the same job with less machinery and automatic reconnection. For a client that polls every few seconds and can tolerate that delay, plain HTTP is simpler to operate and cache. WebSockets are worth their cost when the interaction is genuinely two-way and frequent; adopting them for a mostly-server-to-client feed adds state, proxy configuration and reconnect logic for no benefit.

## Practice

### Compare three transports for one requirement

Take a live scoreboard that updates every few seconds and is read only. Describe it with polling, with a server-sent event stream, and with a WebSocket.

Done when: you can name the operational cost each option adds and justify the one you would ship.

### Design the reconnect path

Describe what a client does when its connection drops mid-session: how it detects the drop, how long it waits before retrying, and how it learns what it missed.

Done when: the design names the backoff strategy, the resynchronisation source and what happens if the server is unavailable for an hour.

## Common mistakes

- **Using WebSockets for a server-to-client-only feed** — state, proxy configuration and reconnect logic are added for nothing; fix: use a one-way stream or polling.
- **Forgetting the proxy must pass the upgrade** — the connection never establishes in production though it works locally; fix: configure the proxy deliberately.
- **Reconnecting in a tight loop** — clients amplify an outage into a flood; fix: exponential backoff with jitter.
- **Assuming messages survive a disconnect** — anything sent while offline is lost; fix: persist and reconcile on reconnect.
- **Never re-authenticating a long-lived connection** — a revoked credential stays valid; fix: bound the connection's lifetime or re-authenticate periodically.

## Go deeper

- **Restful API** (`backend-data/restful-api`) — the request-response model this entry departs from, so read it first.
- **Nginx** (`cloud-devops/nginx`) — the reverse proxy that must be configured to permit the upgrade.
- **Message Queues (Kafka / RabbitMQ)** (`backend-data/message-queues-kafka-rabbitmq`) — the durable delivery that a dropped WebSocket connection cannot provide.
