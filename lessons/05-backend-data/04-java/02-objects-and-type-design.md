---
title: Objects and type design
prereqs: ["05-backend-data/04-java/01-the-language-and-the-jvm"]
---

## What it is

Java's type system is built from classes, interfaces, generics and a distinction between what a type promises and how it is implemented. A class defines state and behaviour; an interface defines a contract with no implementation; generics let a container or an algorithm be written once and used with many types while keeping the compiler's checks. Designing with these tools means deciding what each type promises and where variation is allowed.

## Why it matters

The type system is the main tool for making a large codebase safe to change. A well-chosen interface lets a dependency be replaced, including in a test; a final class or an immutable value tells a reader that this thing does not vary; a generic type moves a runtime cast error into a compile error. Used carelessly, the same tools produce deep hierarchies that are hard to change and abstractions that exist for no reason. The skill is deciding which promises are worth encoding.

## Core ideas

### A class is a promise about state and behaviour

A class bundles fields with the methods that operate on them, and its visibility decides who may see each part. Keeping fields private and exposing intent-revealing methods is what stops a class's internals from becoming everybody's business. An immutable class — one whose state cannot change after construction — is safe to share and to use as a key, and removes a whole class of concurrency problem.

### An interface is a contract, and the implementation is a detail

An interface says what callers may rely on and nothing about how it is done. Depending on an interface rather than a concrete class is what allows a second implementation, whether that is a test double or a different storage backend. An interface with one implementation and no prospect of another is usually indirection for its own sake.

```text
interface PaymentGateway { Receipt charge(Money amount); }
class StripeGateway implements PaymentGateway { ... }
class FakeGateway  implements PaymentGateway { ... }   // used in tests
```

### Generics move type errors to compile time

A generic collection states what it holds, so retrieving an element does not require a cast and putting the wrong type in does not compile. Type parameters can be bounded, which lets an algorithm require that its argument is comparable or a subtype. The erased nature of generics at runtime is why some checks cannot be expressed and why certain constructs produce warnings worth understanding.

### Inheritance is a strong coupling, composition is usually weaker

Extending a class couples the subclass to its parent's implementation, so a change in the parent can break the child. Implementing an interface, or holding another object as a field, encodes the same variation without that coupling. The rule of thumb — prefer composition to inheritance — exists because inheritance is easy to reach for and hard to undo.

### Nullability is a design decision the type system can now express

A reference may be absent, and for most of the language's history that possibility was undocumented. Annotations and modern language features let the absence be part of the type, so the compiler can require a check. Where it is available, using it turns a runtime failure into a compile error at the boundary.

### Exceptions are part of the contract, and checked ones say so

A method's checked exceptions are declared and enforced by the compiler, so a caller cannot ignore a failure mode the author considered recoverable. Unchecked exceptions are for programming errors. The design decision is which failures belong in the signature: too many make every caller noisy, too few hides a failure the caller should handle.

## Practice

### Replace a concrete dependency with an interface

Take a class that constructs its collaborator directly and change it to accept an interface, then supply a fake in a test.

Done when: the test runs without the real collaborator and the production path still uses it.

### Make a value class immutable

Take a class whose fields can be changed after construction and make it immutable, so sharing it between threads is safe.

Done when: no method changes state after construction and a second caller cannot observe another's changes.

## Common mistakes

- **Extending a class to reuse code** — the subclass is coupled to the parent's implementation; fix: hold the other object as a field instead.
- **Introducing an interface with one implementation** — the indirection has no benefit yet; fix: extract it when a second implementation exists or a test needs it.
- **Using raw generic types** — casts and runtime errors return; fix: supply the type parameter.
- **Leaving fields public** — internals become the interface; fix: keep state private and expose intent.
- **Declaring checked exceptions everywhere** — callers are forced into noise and catch nothing meaningfully; fix: reserve them for failures the caller can act on.

## Go deeper

- **The language and the JVM** (`05-backend-data/04-java/01-the-language-and-the-jvm`) — how these types are compiled and checked.
- **Java** (`05-backend-data/04-java`) — the language this type system belongs to.
- **Builds and dependencies** (`05-backend-data/04-java/03-builds-and-dependencies`) — how the code built from these types is compiled and packaged.
