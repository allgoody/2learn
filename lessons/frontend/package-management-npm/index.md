---
title: Package Management (npm)
type: skill
topic: frontend
tier: medium
status: drafted
aliases: ["npm"]
prereqs: []
related: []
---

## What it is

npm is the package manager that comes with Node, and the registry most JavaScript libraries are published to. It resolves the dependencies a project declares, downloads them, records exactly which versions were installed, and gives you commands to add, update and run things. A `package.json` file describes the project; a lockfile records the resolved tree.

## Why it matters

Modern front-end work depends on code nobody on the team wrote. That is a genuine productivity gain and a genuine risk: the dependency tree decides what is available, what the build does, and what vulnerabilities arrive uninvited. Teams that treat installation as a magic step spend their time deleting `node_modules` and reinstalling, and they discover a broken upgrade the day they have to ship. Understanding version ranges, the lockfile and the difference between the two dependency sections removes most of that noise, and it is the prerequisite for any conversation about supply-chain security.

## In this track

1. **Packages and versions** (`frontend/package-management-npm/01-packages-and-versions`) — what a version range means and why the lockfile is the thing that makes a build reproducible.
2. **Scripts and workspaces** (`frontend/package-management-npm/02-scripts-and-workspaces`) — using the manifest as the project's entry point, and managing several packages in one repository.

## Prerequisites

None.

## Go deeper

- **Vite** (`frontend/vite`) — the dev server and bundler most new projects install first.
- **Dependency Scanning (SCA)** (`security/dependency-scanning-sca`) — auditing the tree you have just built.
- **CI/CD** (`cloud-devops/ci-cd`) — where a reproducible install stops being a convenience and becomes a requirement.
