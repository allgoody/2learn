---
title: Users and permissions
prereqs: ["cloud-devops/linux-administration"]
---

## What it is

Linux decides what a process may do by looking at the user it runs as, the group it belongs to, and the permissions on the files it touches. Every file has an owner, a group and three sets of permissions for the owner, the group and everyone else. Root bypasses all of it. Almost every access question on a host reduces to those four facts.

## Why it matters

Most host-level security incidents are a permission mistake rather than an exotic exploit: a private key left readable by every user, a directory writable by a service that does not need it, a service running as root because making it work as anyone else seemed like a detour. Permissions are also the mechanism by which one service on a shared host can be prevented from touching another's data. Getting the model right the first time costs minutes; auditing it later costs a long afternoon.

## Core ideas

### Every access decision involves a user, a group and three permission triples

Read, write and execute, for owner, group and others. For a directory, execute means the right to traverse or search it, which is why a directory can be readable but unusable. This is the model a permission string encodes, and reading it left to right is most of the skill.

```text
-rw-r-----  owner: read, write   group: read   others: none
drwxr-x---  directory: owner may traverse and list, group may traverse, others may not
```

### Least privilege means the service does not run as root

A service that runs as root can rewrite anything on the host; one that runs as its own unprivileged user can be contained. Binding a low-numbered port is the traditional reason services run as root, and the capability model exists precisely to grant that single power without everything else. Making the service own its files and directories, and nothing more, is the ordinary configuration.

### Ownership matters as much as mode

A file readable only by its owner is safe only if the owner is the right user. A configuration file owned by the wrong account can be read by the wrong service, or cannot be read by the right one. Setting both owner and mode deliberately, rather than inheriting whatever the file was created with, is what makes the permission meaningful.

### Groups are the practical tool for sharing

Rather than making a file world-readable, add each user who needs it to a group and grant the group access. This keeps the set of readers explicit and reviewable. It is the same reason directories created for shared work are given a group and a set-group identifier so files created inside inherit it.

### Elevated access should be logged and narrow

The ability to become root is the most valuable permission on the host. Granting it per command through a configured policy, rather than sharing a root password, makes the grant narrow and the use auditable. Everyone knowing the root password makes every later investigation ambiguous, because nothing distinguishes their actions.

### Keys and passwords are files with permissions

A private key that others may read is a compromised key. The same is true of a file holding a credential for a service. Checking those modes is a routine audit, and it is the cheapest one available.

## Practice

### Create a contained service account

Create a user for a service, give it ownership of its own directory, and run a command as that user that can read its own files but not another user's.

Done when: the command succeeds in its own directory and is refused when it tries to read a file outside it.

### Audit key file permissions

Find every private key under a directory and list its mode and owner, then fix any that others can read.

Done when: every key is readable only by its owner and you can say who that owner is for each.

## Common mistakes

- **Running a network service as root out of convenience** — a compromise in the service owns the host; fix: run it as an unprivileged user and grant only the capabilities it needs.
- **Making a file world-readable to fix an access error** — the data is now exposed to every user; fix: grant the specific group instead.
- **Sharing the root password** — actions cannot be attributed and revocation is impossible; fix: grant elevated commands per user through a policy.
- **Ignoring directory permissions** — a correct file mode in a traversable-by-all directory is still reachable; fix: set the directory's mode as deliberately as the file's.
- **Leaving private keys readable by others** — the key is effectively public; fix: audit key modes and correct them.

## Go deeper

- **Linux Administration** (`cloud-devops/linux-administration`) — the host this permission model governs, so read it first.
- **Processes and services** (`cloud-devops/linux-administration/02-processes-and-services`) — which user those processes run as, and why that is the same question.
