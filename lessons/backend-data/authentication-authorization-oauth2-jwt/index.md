---
title: Authentication & Authorization (OAuth2 / JWT)
type: skill
topic: backend-data
tier: medium
status: drafted
aliases: ["OAuth2", "JWT"]
prereqs: ["backend-data/restful-api"]
related: []
---

## What it is

Authentication is proving who the caller is; authorization is deciding what that caller may do. They are separate problems with separate failure modes, and confusing them is the origin of most access-control bugs. OAuth2 is a framework for delegating authorization to a third party — a client obtains a token that represents a limited grant — and JWT is a token format whose contents can be verified without consulting the issuer. Together they cover how an API learns who is calling and what they are permitted.

## Why it matters

Access control is where the consequences are worst. A service that authenticates correctly and authorizes carelessly lets any signed-in user read any other user's data, which is a breach rather than a bug. The protocols involved are also easy to use in a way that looks correct and is not: tokens that never expire, signatures that are not verified, scopes that are ignored. Understanding the flows and the verification steps is what separates a token check that works from one that can be bypassed.

## In this track

1. **Authentication and OAuth2 flows** (`backend-data/authentication-authorization-oauth2-jwt/01-authentication-and-oauth2-flows`) — who issues the credential, and which flow suits which kind of client.
2. **JWT verification and authorization** (`backend-data/authentication-authorization-oauth2-jwt/02-jwt-verification-and-authorization`) — verifying a token and turning its claims into a decision.

## Prerequisites

- **Restful API** (`backend-data/restful-api`)

## Go deeper

- **Restful API** (`backend-data/restful-api`) — the endpoints this protection is applied to, so read it first.
- **Cloud Security & IAM** (`cloud-devops/cloud-security-iam`) — the same two questions at the level of cloud infrastructure rather than users.
- **Web Security (OWASP Top 10)** (`security/web-security-owasp-top-10`) — broken access control and the other ways an API is attacked.
