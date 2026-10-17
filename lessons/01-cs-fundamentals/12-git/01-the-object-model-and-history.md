---
title: The object model and history
prereqs: []
---

## What it is

Git stores your project as four kinds of object. A blob holds file contents and carries no name. A tree holds names and points at blobs and other trees, so one tree stands for one directory. A commit points at one tree, at its parent commits, and at an author, a timestamp and a message. A tag gives one commit a memorable name. Every object is named by a SHA-1 hash of its content — 160 bits, printed as 40 hexadecimal characters — which is why a history can be verified and why repeated content is stored once.

## Why it matters

Almost every confusing git behaviour is obvious once the objects are in view. A commit is a snapshot, not a diff: checking out the commit abbreviated `9d8e7f` — 6 of the 40 hex characters of its name — restores all 1 000 files of the project, not a patch of the 4 lines that changed. A branch is a name, not a copy: `git switch -c fix` writes one 41-byte file and copies none of those 1 000 files. An old commit cannot be edited in place: its name is a hash of its content, so rewording a five-commit-old message produces a new 40-character name for it and a new name for each of the four commits after it. A "lost" commit is still an object: `git reflog` holds the previous values of a ref for 30 days by default once it becomes unreachable, and 90 days while it stays reachable. Learning this turns a set of memorised commands into a model you can reason from, which matters most in exactly the situations where the memorised command is wrong and destructive.

## Core ideas

### A hash of the content names the object

Git hashes each object with SHA-1, which turns any input into a 160-bit number. Those 160 bits are printed as 40 hexadecimal characters, because each hex character carries 4 bits and `40 * 4 = 160`; the binary hash is `160 / 8 = 20` bytes. The input is not quite the file bytes alone: git prefixes them with the object's type and byte length, so that a blob's hash can never equal a tree's hash of the same bytes.

```text
object = "hello\n", 6 bytes        the content git stores, one byte per character
hashed input = "blob 6\0" + "hello\n"
             = 7 header bytes + 6 content bytes = 13 bytes
SHA-1 of those 13 bytes -> 160 bits -> 40 hex characters, the object's name

a.txt  "hello\n"  -> blob 0d5c...    one blob of 6 bytes
b.txt  copies a.txt
b.txt  "hello\n"  -> blob 0d5c...    the same name, so no second copy exists

the same content stored under 200 names in one project:
  200 tree entries pointing at 1 blob
  content stored once, 6 bytes, instead of 200 * 6 = 1 200 bytes
```

Two files with identical bytes hash to identical names, which is what deduplicates the store; changing one byte produces a different name, which is what makes the store verifiable. The hash's 2-character directory prefix gives `16 * 16 = 256` possible object directories, since 2 hex characters carry 8 bits.

### A commit is a snapshot, not a diff

A commit object holds the hash of one tree — the complete directory listing of your project at that moment — plus the hashes of its parents, the author, a timestamp in seconds and the message. Checking out an old commit therefore restores the whole project, and a diff is something git computes for display afterwards by comparing two trees, not something it stored earlier.

```text
commit A, tree T1
  readme.md  -> blob R1
  src/app.ts -> blob P1
  src/util.ts -> blob U1

edit one line of src/app.ts and commit as B
  +1 blob    P2, the edited file, whose bytes differ from P1's in one line
  +2 trees   one for src/, now naming P2; one for the root, now naming that
  +1 commit  B, naming the new root tree and parent A
  4 new objects, and R1 and U1 are not re-stored: same bytes, same name

diff A..B reads T1 and T2 and reports the one line that differs
```

Efficiency comes from reuse, not from storing differences: an unchanged file contributes zero new objects, and only the directories leading down to a changed file get a new tree. The reader who expects a patch stored per commit will misread every later explanation of rebase and merge.

### History is a graph, and a branch is a pointer

A commit names its parents, so history is a directed graph whose edges point backwards in time. An ordinary commit names 1 parent, a merge commit names 2, and the first commit names 0. A branch is a mutable name pointing at one commit, held in a text file of 40 hex characters plus a newline, so creating a branch writes 41 bytes. Committing moves the branch name to the new commit, and `HEAD` names the branch you are on; a detached `HEAD` instead holds a commit hash directly.

```text
.git/refs/heads/main
  "a1b2c3..." (40 hex characters) + "\n" = 41 bytes on disk

A <- B <- C  (main)          C names parent B, B names parent A, A names none
          \
           D <- M            M names two parents, C and D: a merge

a project with 5 000 files and 50 branches
  files named by trees        5 000 entries in the root tree and its subtrees
  branch names                50 ref files, 50 * 41 = 2 050 bytes of names
```

Creating the branch cost 41 bytes because it copied no file; the commit it names is already stored.

### The index is a real object, not a formality

Between your working tree and the next commit sits the index, also called the staging area: a binary file listing the path, mode and blob hash of every tracked file, and so a proposed next tree. `git add` writes the file's content into the object store as a blob and updates that file's entry in the index, leaving the working tree untouched. That split is what lets you stage part of a change and commit exactly that part.

```text
git add src/app.ts
  object store  +1 blob, P2
  index         src/app.ts now names P2
  working tree  unchanged by the add itself

git add again after editing 3 more lines of the same file
  +1 blob, P3; the index now names P3 for src/app.ts, and P2 stays in the store
  so the version you staged a minute ago is still an object, and is still recoverable
```

`git status` compares three things: `HEAD` against the index (what a commit would change) and the index against the working tree (edits you have not staged). Naming those three ends most confusion about what is "in" git.

### Refs are names, and the reflog records where they have been

Branches, tags and `HEAD` are all refs: files holding one hash each. Every time a ref moves, git appends the previous value to that ref's reflog, recording the old hash and the operation that moved it. The objects are not deleted when a name stops pointing at them, so a reset that appears to lose three commits has only moved the branch name; the three commits are still addressable by the hashes the reflog holds.

```text
HEAD@{0}  4c5d6e  reset: moving to HEAD~3      the branch now names 4c5d6e
HEAD@{1}  a1b2c3  commit: third commit        where the branch was before

the reset moved 1 ref, 41 bytes, and deleted 0 objects
a reflog entry lives 30 days by default once its commit is unreachable,
and 90 days while the commit is still reachable from another ref
```

That is the mechanism behind every "recovering lost work" procedure: find the old hash in the reflog and give a branch name to the commit again.

## Practice

### Read a repository as objects

In a small repository, list the objects and print one of each kind without using a high-level command. Use `git cat-file -t <hash>` to print the type and `git cat-file -p <hash>` to print the content, and `git hash-object` to hash a file you write yourself.

Done when: you can name the type and the 40-character hash of one blob, one tree and one commit, and show that editing one byte of that file gives the blob a different hash.

### Walk the graph by hand

Starting at the current commit, follow the parent links and write out the graph for the last five commits, including any branch or tag pointing at them.

Done when: your drawing matches `git log --graph --oneline -5`, and for every merge in it you can state the 2 parent hashes that the merge commit lists.

## Common mistakes

- **Thinking a commit stores a diff** — a history of 1 000 one-line edits then looks like a stack of 1 000 patches, and rebasing or merging looks like magic; fix: read each commit as one complete tree, with 0 new blobs for every file whose bytes did not change.
- **Believing a branch is a copy of the files** — a colleague avoids branching because they expect 1 000 files to be copied, when the branch is 41 bytes; fix: create one and compare the repository size with `du` before and after, which stays the same.
- **Assuming history is linear** — a merge commit names 2 parents, so a log read as a list hides one parent and the change it carried; fix: draw the graph and check the parent count of every commit.
- **Deleting a branch to discard work and expecting the commits to vanish** — the objects stay in the store and the reflog keeps the old tip for 30 days once it is unreachable, so the work can be revived after the deletion; fix: read the reflog expiry windows before relying on deletion for anything.
- **Editing an old commit on a shared branch** — the new commit has a new 40-character name because the name covers the parent and the message, and every commit after it, whose content names that parent, gets a new name too; fix: treat published history as read-only and add a new commit instead.

## Go deeper

- **The daily workflow** (`01-cs-fundamentals/12-git/02-the-daily-workflow`) — applying these four objects to committing, branching, merging and undoing without fear.
- **GitHub** (`01-cs-fundamentals/23-github`) — how the object graph becomes a place a team shares work.
- **Database Internals** (`01-cs-fundamentals/04-database-internals`) — content-addressed storage, the same scheme git uses for its 40-character names, in a different setting.
