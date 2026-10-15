## Example 1 — Ordering the build so a source change stays cheap

A small service installs its dependencies and copies its source into a container image. Every edit to one source file currently reinstalls everything, and the build sends the whole working directory, including build output and local dependency folders. Reorder the instructions and add the ignore rule, then show what the rebuild reuses.

```dockerfile
FROM app-base
WORKDIR /app
COPY . .
RUN install dependencies
ENTRYPOINT ["start-service"]
```

### Solution

```dockerfile
FROM app-base
WORKDIR /app
COPY package.json package-lock.json ./
RUN install dependencies
COPY src ./src
ENTRYPOINT ["start-service"]
# substitute your own base image and start command for these placeholders
```

```bash
$ printf 'node_modules\ndist\n' >> .dockerignore
$ docker build -t myapp:1.0 .
# => CACHED [2/5] COPY package.json package-lock.json ./
# => CACHED [3/5] RUN install dependencies
# =>         [4/5] COPY src ./src
# build finished: 5 layers, 4 reused from cache
```

The dependency layer now sits above the source, so editing `src` reuses the install layer and rebuilds only the copy — one changed layer on a five-layer image instead of a full reinstall. The ignore file keeps build output out of the context and out of the layers. The mistake is `COPY . .` before the install, which invalidates the cache on every edit and quietly ships whatever happens to be in the directory.

## Example 2 — Keeping the toolchain out of the runtime image

An application is compiled and then run from the same image, so the shipped artifact carries a compiler and a package manager it never uses. Split the build into a toolchain stage and a minimal runtime stage, and confirm the final image still starts.

```dockerfile
FROM toolchain-image
COPY . .
RUN build application
ENTRYPOINT ["run-application"]
```

### Solution

```dockerfile
FROM toolchain-image AS build
COPY . .
RUN build application

FROM runtime-base
COPY --from=build /out/application /usr/local/bin/application
USER appuser
ENTRYPOINT ["application"]
# final image: no compiler, no package manager, one process
```

The second stage copies only the finished artifact into a minimal base, so the image is smaller and carries none of the build toolchain's vulnerabilities. The image runs one foreground process and starts as a non-root user. The mistake is copying the whole build directory into the runtime stage, which brings the toolchain back; note also that any secret used during the build must never be written into a layer, where it stays readable in the image history.
