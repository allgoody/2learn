---
title: Restful API
type: skill
topic: backend-data
tier: medium
status: drafted
aliases: ["REST"]
prereqs: []
related: []
---

## What it is

A RESTful API exposes data as resources with stable addresses, and lets clients act on them using the standard meanings of HTTP methods and status codes. A collection has an address, an individual item has a child address, and creating, reading, replacing and deleting map onto the methods the protocol already defines. The style is a set of constraints rather than a specification, and the parts worth following are the ones that make an API predictable to someone who has never read its documentation.

## Why it matters

Predictability is the whole return. When every API invents its own verbs and error format, every integration is a discovery exercise, and clients accumulate special cases. When the conventions are followed, a developer who knows one endpoint knows the shape of the others: how to list resources, how to fetch one, how to create one, and what a failure looks like. Caches and proxies also depend on the conventions being real — a retrieval that changes state or a creation that repeats with a different result breaks assumptions that intermediaries rely on.

## In this track

1. **Resources, verbs and status codes** (`backend-data/restful-api/01-resources-verbs-and-status-codes`) — the design rules and why each exists.
2. **Versioning, pagination and N+1 responses** (`backend-data/restful-api/02-versioning-pagination-and-n-plus-one`) — the failure modes that appear once an API has real clients and real data.

## Prerequisites

None.

## Go deeper

- **API Design (OpenAPI / Swagger)** (`backend-data/api-design-openapi-swagger`) — how these rules are written down and tested before implementation.
- **Authentication & Authorization (OAuth2 / JWT)** (`backend-data/authentication-authorization-oauth2-jwt`) — who may call these endpoints, and how they prove it.
- **WebSockets** (`backend-data/websockets`) — the case where request-and-response is the wrong shape entirely.
