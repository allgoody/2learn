---
title: The object model and history
prereqs: []
---

## What it is

Git stores four kinds of object. A blob holds file contents, without a name. A tree holds names and points at blobs and other trees, so it represents a directory. A commit points at one tree, at its parent commits, and at an author message and timestamp. A tag names a commit. Every object is addressed by the hash of its content, which is why the history can be verified and why identical content is stored once.

## Why it matters

Almost every confusing git behaviour is obvious once the model is in view. Why a commit is a snapshot rather than a diff. Why changing an old commit changes every hash after it. Why a branch is cheap and takes no space. Why you can recover a "lost" commit if you know its hash. This is knowledge that turns a set of memorised commands into a mental model you can reason from, which matters most in exactly the situations where the memorised command is wrong and destructive.

## Core ideas

### Everything is an object, addressed by its content

Each object's name is a hash of its contents, so two files with the same bytes share one object, and a change to any byte produces a different name. That is what makes the store durable and deduplicated: a commit cannot be silently altered without its name changing, and every clone can verify the whole history.

```text
blob    "hello\n"            -> one hash for that content
tree    [ "readme.md" -> blob ]
commit  [ tree, parent, author, message ]
```

### A commit is a snapshot, not a diff

A commit points at a complete tree of your project at that moment. Git stores it efficiently by reusing the objects that did not change, but conceptually you should read a commit as "the project looked like this". That is why checking out an old commit is safe and total, and why a diff is something git computes for display by comparing two snapshots.

```text
commit B: tree contains readme.md v2, src/app.ts v3
commit A: tree contains readme.md v1, src/app.ts v3
diff A..B -> only readme.md changed
```

### History is a graph; branches are just pointers

A commit names its parents, so the history is a directed graph, and a branch is a mutable name pointing at one commit. Creating a branch writes a forty-byte file; there is no copying. When you commit, the branch name moves to the new commit and `HEAD` follows the branch you are on. Detached `HEAD` is simply `HEAD` pointing at a commit rather than at a branch.

```text
A <- B <- C   (main)
          \
           D  (feature)
```

### The index is a real object, not a formality

Between your working tree and a commit sits the index or staging area: a proposed next tree. `git add` writes file contents into the object store and updates the index, while the working tree stays as it is. That is why you can stage part of a change and commit exactly that. The three-way relationship between `HEAD`, the index and the working tree is what `git status` is reporting.

```text
HEAD tree      index        working tree
  app.ts v1      app.ts v2    app.ts v2 + extra edit
                 ^ staged     ^ unstaged
```

### Refs are names, and reflog records where they have been

Branches, tags and `HEAD` are all refs: files under a small directory holding a hash. When a branch moves, git also records the previous value in a log, so a commit that appears to be lost after a reset is usually still reachable by name or by hash. That is the mechanism behind every "recovering lost work" procedure.

## Practice

### Read a repository as objects

In a small repository, list the objects and print one of each kind without using a high-level command.

Done when: you can identify a blob, a tree and a commit, and explain why the blob has no filename in it.

### Walk the graph by hand

Starting at the current commit, follow the parent links and write out the graph for the last five commits, including any branch or tag pointing at them.

Done when: your drawing matches the output of the log command with the graph option, including the shape of any merge.

## Common mistakes

- **Thinking a commit stores a diff** — the mental model then makes rebasing and merging look like magic and risky; fix: read commits as full snapshots that share unchanged objects.
- **Believing a branch is a copy of the files** — people avoid branching for fear of the cost; fix: remember that a branch is a pointer and creating one is instant.
- **Assuming history is linear** — a merge produces two parents and a diff against one of them is not the whole story; fix: draw the graph and check the parent count.
- **Deleting a branch to discard work and expecting the commits to vanish** — they stay reachable for a while through the reflog; fix: know the garbage collection rules before relying on deletion for anything.
- **Editing an old commit on a shared branch** — every commit after it is rewritten and every colleague's clone diverges; fix: treat published history as read-only and add a new commit instead.

## Go deeper

- **The daily workflow** (`cs-fundamentals/git/02-the-daily-workflow`) — applying this model to committing, branching, merging and undoing without fear.
- **GitHub** (`cs-fundamentals/github`) — how the object graph becomes a place a team shares work.
- **Database Internals** (`cs-fundamentals/database-internals`) — content-addressed storage, the same idea git uses, in a different setting.
