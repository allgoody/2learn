## Example 1 — Seeing where a dependency actually came from

A project fails at runtime on a class nobody declares in the build definition, and the team argues about which change brought it in. The build definition below declares one library. Show the resolved tree and name the path by which the class arrives.

```text
# the build definition, in the build tool's own syntax
dependencies {
    implementation("com.example.reports:report-core:<version>")
}
```

### Solution

```text
+--- com.example.reports:report-core:<version>
|    +--- com.example.json:json-core:<version>
|    \--- com.example.logging:log-api:<old version> -> <new version>
\--- com.example.runtime:scheduling:<version>

# illustrative tree: the arrow shows the version the resolver picked
```

The resolver downloads the library, then resolves its own requirements transitively, and when two libraries ask for different versions of a third it picks one — the scheduling library on the last line is the source nobody declared. Which version wins depends on the resolution strategy, so the answer affects behaviour rather than only compilation. Substituting your own coordinates keeps this a worked pattern; the mistake is to treat the resolved tree as read-only and never exclude or pin a version deliberately.

## Example 2 — A build that changes with no source change

Two builds of the same revision produce different behaviour, and the only difference is the day they ran. The declaration accepts any matching version. Make the build reproducible.

```text
dependencies {
    implementation("com.example.reports:report-core:1.+")
}
```

### Solution

```text
dependencies {
    implementation("com.example.reports:report-core:1.4.0")
}

# a lock file records the resolved transitive set beside it,
# and the wrapper pins the build tool's own version
```

Pinning the direct dependency, locking the transitive set and pinning the toolchain means the same revision resolves to the same artifact tomorrow, and every upgrade becomes a deliberate act with a diff to review. Relying on the version installed on one developer's machine is the same class of defect, which is why the tool's own version belongs in the repository too. The mistake is to resolve dynamically and call the result a build system.
