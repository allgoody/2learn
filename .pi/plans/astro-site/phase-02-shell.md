# Phase 2: Shell

## Objective

Build the site frame every page shares: URL and label helpers, the base layout with its `<head>`
(hreflang, canonical, fonts, the theme boot script), the header with a breakpoint-correct burger
drawer, the footer with the CTDev credit, the scroll-to-top control, and the analytics consent gate
together with the privacy page that explains it. After this phase the shell is complete and
accessible, and Phase 3 only has to drop the corpus into it.

## Prerequisites

- Phase 1 complete. `astro/` builds, `global.css` exists, fonts are configured, both collections load.
- `astro/src/lib/corpus.ts` exports `Locale`, `TOPICS`, `topicTitle(topic)`.
- `astro/src/styles/global.css` defines `--font-serif`, `--font-sans`, `--fg`, `--fg-muted`,
  `--bg`, `--border`, `--accent`, `--focus`.

## Shared Context

**Locale is always explicit.** This project does **not** enable Astro's `i18n` config. English is
unprefixed (`/02-frontend/`) and Russian is prefixed (`/ru/02-frontend/`). Every page and component
receives a `locale: Locale` prop from its route; nothing infers it from the URL, the browser or CSS.
That keeps static generation deterministic and avoids the redirect behaviour Astro's i18n middleware
adds.

**`trailingSlash: "always"`.** Every page URL ends in `/`. The only exceptions are endpoints with a
file extension — `/feed.xml`, `/robots.txt`, `/sitemap-index.xml` — which since Astro 6 are never
reachable with a trailing slash.

**The dictionary is key-symmetric.** `const ru: typeof en` means a label present in English but
missing in Russian is a type error, not a silent blank. When you add a key, add it to **both**
blocks in the same edit. This is the single most common way a bilingual site quietly breaks.

**Accessibility target is WCAG 2.2 Level AA.** Every interactive control in this phase needs a
visible focus indicator, an accessible number, and a name. The burger drawer is the most
accessibility-loaded component on the site: it needs a focus trap, Escape to close, `aria-expanded`,
`aria-controls` and the background made inert. All four come free from the native `<dialog>` element
with `showModal()` — do not hand-roll any of them.

---

## Work Packages

### WP-5: Locale-aware URLs and the label dictionary

**Context:**
Phase 1's `corpus.ts` gives shapes and ids but no addressing and no strings. Every later component
needs both, so they come first. The RU tree mirrors the EN tree path-for-path — the corpus keeps
English directory names in Russian (`/ru/02-frontend/03-html/`) precisely so that one path string
works for both locales, which makes hreflang a pure string operation.

**Task:**
Create `astro/src/lib/urls.ts` with the site's complete addressing, and
`astro/src/lib/dictionary.ts` with every label the site authors, in both locales.

**Files:**
- `astro/src/lib/urls.ts` — CREATE — path builders and hreflang alternates
- `astro/src/lib/dictionary.ts` — CREATE — `en` and `ru` label blocks

**Constraints:**
- DO: export from `urls.ts`: a `prefix(locale)` helper returning `""` or `"/ru"`, and the builders
  `homeUrl(locale)`, `topicUrl(locale, topic)`, `entryUrl(locale, entryId)`,
  `lessonUrl(locale, id)` (works for an entry id or a child id), `examplesUrl(locale, id)`,
  `entriesUrl(locale)`, `aboutUrl(locale)`, `privacyUrl(locale)`, `glossaryUrl()`,
  `searchUrl(locale)`, `feedUrl(locale)`
- DO: end every builder's result in `/`, except `feedUrl(locale)` which returns `/feed.xml` or
  `/ru/feed.xml`
- DO: export `alternatesFor(path: string)` returning exactly three entries —
  `{ hreflang: "en", href: path }`, `{ hreflang: "ru", href: "/ru" + path }` and
  `{ hreflang: "x-default", href: path }`. `path` is the EN path of the current page
- DO: export `switchLocale(path: string, from: Locale, to: Locale)` returning the same page in the
  other locale, or `homeUrl(to)` when `from === "ru"` and the path has no EN equivalent (`/ru/glossary/`)
- DO: build every path with `URL`-safe joins — no `//` and no trailing-space bugs
- DO: define the dictionary as `const en = { … } as const;` followed by `const ru: typeof en = { … };`
  so missing keys fail `astro check`
- DO: include at least these keys in **both** blocks: `siteName`, `siteTagline`, `skipToContent`,
  `navLabel`, `navHome`, `navTopics`, `navEntries`, `navSearch`, `navAbout`, `navPrivacy`, `menuOpen`,
  `menuClose`, `themeToggle`, `themeToLight`, `themeToDark`, `backToTop`, `tocTitle`, `prevLabel`,
  `nextLabel`, `prereqsTitle`, `relatedTitle`, `watchTitle`, `examplesTitle`, `examplesLink`,
  `onThisPage`, `entriesTitle`, `entriesIntro`, `filterTopic`, `filterTier`, `filterType`, `filterAll`,
  `aboutTitle`, `glossaryTitle`, `notFoundTitle`, `notFoundBody`, `notFoundHome`, `langSwitch`,
  `searchTitle`, `searchPlaceholder`, `searchBuiltOnly`, `consentTitle`, `consentBody`, `consentAccept`,
  `consentDecline`, `consentPrivacy`, `consentChange`, `footerTopics`, `footerRights`
- DO: write the Russian labels in Russian, in the corpus's own vocabulary — reuse the terms
  `lessons/ru/GLOSSARY.md` already fixes (`урок`, `запись`, `навык`, `трек`, `раздел`,
  `уровень`, `предварительные требования`). Read that file's `## Терминология` table before choosing
  a word
- DO: keep `en` and `ru` at the same key count. `grep -cE '^\s+[a-zA-Z]+:' astro/src/lib/dictionary.ts`
  counts both blocks together — check the two blocks separately by eye or with a temporary count
- DO: export `getDict(locale: Locale)` returning the block, and `export type { Dict }`
- DO NOT: put any HTML, markup or JSX in a label. Plain strings only
- DO NOT: translate a product name, language name or acronym — `React`, `Git`, `SQL`, `API`, `WCAG`
  stay Latin, exactly as the corpus does
- DO NOT: hardcode a heading string from the corpus (`What it is`, `Go deeper`, `Ключевые идеи`…)
  in a component or in a dictionary key that means "the corpus's heading". WP-13 reads those from the
  rendered content

**Success:**
- [ ] Both files exist: `test -f astro/src/lib/urls.ts && test -f astro/src/lib/dictionary.ts` → exit 0
- [ ] Eleven builders exported: `grep -cE 'export function (homeUrl|topicUrl|entryUrl|lessonUrl|examplesUrl|entriesUrl|aboutUrl|privacyUrl|glossaryUrl|searchUrl|feedUrl)' astro/src/lib/urls.ts` → 11
- [ ] hreflang is three-way: `grep -c 'x-default' astro/src/lib/urls.ts` → 1
- [ ] Feed path has no trailing slash: `grep -c '"/feed.xml"' astro/src/lib/urls.ts` → 1
- [ ] Symmetry is typed: `grep -c 'const ru: typeof en' astro/src/lib/dictionary.ts` → 1
- [ ] Both blocks present and non-trivial:
      `grep -c 'consentAccept' astro/src/lib/dictionary.ts` → 2 (one per block)
- [ ] No hardcoded corpus headings in the dictionary:
      `grep -c 'What it is\|Go deeper\|Core ideas\|Ключевые идеи' astro/src/lib/dictionary.ts` → 0
- [ ] Type check proves the symmetry: `cd astro && npm run check` → exit 0. Then deliberately delete
      one key from `ru` and confirm the check **fails** with a missing-property error; restore it.
      This proves the guard is real rather than assumed.
- [ ] No HTML in labels: `grep -cE '<[a-z/]' astro/src/lib/dictionary.ts` → 0

---

### WP-6: Base layout, `<head>`, fonts and the theme boot

**Context:**
Phase 1 configured the two font families in `astro.config.mjs` but nothing yet references them, so
Astro has not downloaded anything. `<Font cssVariable="--font-literata" />` from `astro:assets` is
what emits the `@font-face` rules and copies the files into the build output.

The theme must be resolved **before first paint** or a dark-mode reader sees a white flash. That is
the only reason this project uses `<script is:inline>`: an inlined script is not deferred, not
bundled and not moved, so it runs synchronously in `<head>`. Every other script in this plan uses a
normal `<script>` and lets Vite handle it.

`light-dark()` resolves against the element's used `color-scheme`. So the boot script only has to
write `data-theme` on `<html>`, and CSS does the rest — including the no-JavaScript case, where
`:root { color-scheme: light dark }` follows the operating system.

**Task:**
Create `astro/src/layouts/BaseLayout.astro`: the document skeleton, the full `<head>`, the font
components, the inline theme boot, a skip link, and the slots the shell components fill.

**Files:**
- `astro/src/layouts/BaseLayout.astro` — CREATE — document skeleton and head
- `astro/src/pages/index.astro` — MODIFY — wrap the placeholder in `BaseLayout` so the build exercises it

**Constraints:**
- DO: accept props `{ locale: Locale; title: string; description: string; path: string; noAlternates?: boolean }`.
  `path` is the locale-neutral EN path, e.g. `/02-frontend/06-javascript/`
- DO: import `../styles/global.css` in the frontmatter — this is what turns Tailwind on for the site
- DO: set `lang` on `<html>` from `locale` — `"en"` or `"ru"`. A wrong or missing `lang` breaks screen
  reader pronunciation on every page of the Russian tree
- DO: emit in `<head>`, in order: `charset`, `viewport`, `<title>`, `<meta name="description">`,
  `<link rel="canonical">`, the hreflang alternates from `alternatesFor(path)` unless `noAlternates`,
  `<meta name="theme-color">` twice (once for `prefers-color-scheme: light`, once for `dark`),
  `<Font cssVariable="--font-literata" />`, `<Font cssVariable="--font-golos" />`, then the inline
  theme script
- DO: build canonical and alternate URLs against `Astro.site` so they are absolute
- DO: make the theme boot exactly this shape, and keep it the only `is:inline` script in the project:

  ```js
  <script is:inline>
    (() => {
      try {
        const stored = localStorage.getItem("theme");
        const dark = stored ? stored === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
        document.documentElement.dataset.theme = dark ? "dark" : "light";
      } catch {
        document.documentElement.dataset.theme = "light";
      }
    })();
  </script>
  ```

- DO: render a skip link as the very first focusable element — `<a class="skip" href="#main">` with the
  label from `getDict(locale).skipToContent`, and give the page body `<main id="main" tabindex="-1">`
- DO: render `<slot name="header" />`, `<main id="main"><slot /></main>` and `<slot name="footer" />`
  so Phase 3's pages stay free of shell concerns
- DO: render the `<slot name="header" />` output at the top of `<body>` and the footer at the bottom
- DO NOT: add `preload` to either `<Font />`. Preloading is decided in WP-24 from an LCP measurement
- DO NOT: use a normal `<script>` for the theme boot, and `<script is:inline>` for anything else
- DO NOT: read the theme in any other file. One writer, one reader (`WP-7`'s toggle reads
  `document.documentElement.dataset.theme`)
- DO NOT: set `Astro.site` or a base path here — that is `astro.config.mjs`

**Success:**
- [ ] Layout exists: `test -f astro/src/layouts/BaseLayout.astro` → exit 0
- [ ] Fonts are referenced, which is what triggers the download:
      `grep -c '<Font cs' astro/src/layouts/BaseLayout.astro` → 2
- [ ] Fonts really land in the output — this is the assertion Phase 1 could not make:
      `find astro/dist -name '*.woff2' | wc -l` → at least 4
- [ ] Fonts are served from our own origin:
      `grep -rc 'fonts.gstatic.com\|fonts.googleapis.com' astro/dist/index.html` → 0
- [ ] hreflang present: `grep -c 'hreflang="x-default"' astro/dist/index.html` → 1
- [ ] Canonical is absolute: `grep -c 'rel="canonical" href="https://' astro/dist/index.html` → 1
- [ ] Theme boot is inline and synchronous: `grep -c 'dataset.theme' astro/dist/index.html` → at least 1
      (the boot writes `document.documentElement.dataset.theme`; the literal string `data-theme`
      appears only in the external stylesheet, never in the HTML) and
      `grep -c 'is:inline' astro/src/layouts/BaseLayout.astro` → 1
- [ ] `lang` is set from the prop: `grep -o 'html lang="[^"]*"' astro/dist/index.html` → `html lang="en"`
- [ ] Skip link is first: `grep -o 'class="skip"' astro/dist/index.html` → 1 match
- [ ] Build green: `cd astro && npm run build` → exit 0
- [ ] Manual: open the built site, set the OS to dark, hard-reload. No white flash before the dark
      background appears.

---

### WP-7: Header, navigation drawer and theme toggle

**Context:**
The site has 8 topics plus Home, Entries, Search and About. From 1024px up, navigation is inline.
Below 1024px it collapses into a burger drawer. Note that 1024px is *exactly* iPad-landscape width,
so the burger breakpoint is `< 64rem` and the inline nav is `>= 64rem` — get this the wrong way round
and an iPad in landscape gets the wrong chrome.

The drawer is a native `<dialog>` opened with `showModal()`. That single choice supplies the focus
trap, Escape-to-close, and inerting of the background, all three of which are otherwise hand-written
code that is easy to get subtly wrong. At `>= 64rem`, CSS overrides the dialog's
`display: none` so the same markup renders as a static nav — which means the nav exists once, not twice.

**Task:**
Create `Header.astro` with the wordmark, inline topic nav and burger button; `NavDrawer.astro`
holding the `<dialog>` and its contents; and `ThemeToggle.astro` for the light/dark switch.

**Files:**
- `astro/src/components/Header.astro` — CREATE — header bar, burger button, breakpoint CSS
- `astro/src/components/NavDrawer.astro` — CREATE — the `<dialog>` nav and its client script
- `astro/src/components/ThemeToggle.astro` — CREATE — the toggle button and its client script

**Constraints:**
- DO: make the burger a real `<button>` with `aria-expanded`, `aria-controls="nav-drawer"` and an
  accessible name from the dictionary (`menuOpen` / `menuClose`), and give it a tap target of at
  least 44×44px
- DO: keep the drawer closed state honest — call `dialog.showModal()` on open and `dialog.close()` on
  close, and on the dialog's `close` event reset `aria-expanded` to `"false"`. A drawer that stays
  `aria-expanded="true"` after Escape is the classic bug here
- DO: add a `matchMedia("(min-width: 64rem)")` change listener that calls `dialog.close()` when it
  becomes true. Without it, opening the drawer on a phone and rotating to landscape leaves a modal
  stranded in the browser's top layer, where no CSS can reach it
- DO: style the inline nav inside `@media (min-width: 64rem)` with
  `dialog#nav-drawer { display: revert; position: static; border: 0; padding: 0; }` and hide the
  burger in the same block
- DO: give the drawer an explicit close button, and make the nav's links close the drawer on
  activation
- DO: make `ThemeToggle` a `<button>` that reads
  `document.documentElement.dataset.theme`, writes the opposite value to `localStorage.setItem("theme", …)`
  and to `dataset.theme`, and updates its own accessible name between `themeToLight` and `themeToDark`
- DO: add a `matchMedia("(prefers-color-scheme: dark)")` listener that follows the system **only**
  while `localStorage.getItem("theme")` is `null`
- DO: write a `shortcut:` comment in `ThemeToggle.astro` recording the known limit: the toggle is
  two-state, so once a reader has chosen a theme there is no way back to "follow the system" short of
  clearing site data. Upgrade to a three-state control if a reader asks for it.
- DO: mark the current page's nav item with `aria-current="page"`
- DO: label the nav with `aria-label={dict.navLabel}`, and give the language switch an accessible name
  from `dict.langSwitch` that names the target language, not the current one
- DO NOT: hand-roll a focus trap, an Escape handler, or `inert` — `<dialog>` gives all three
- DO NOT: duplicate the nav markup for mobile and desktop
- DO NOT: use `onclick=` attributes. Attach listeners inside the component's `<script>`
- DO NOT: add `transition` on the drawer that ignores `prefers-reduced-motion`

**Success:**
- [ ] Files exist: `test -f astro/src/components/Header.astro && test -f astro/src/components/NavDrawer.astro && test -f astro/src/components/ThemeToggle.astro` → exit 0
- [ ] Real button, not a div: `grep -c '<button' astro/src/components/Header.astro` → at least 1
- [ ] Drawer state is wired: `grep -c 'aria-expanded' astro/src/components/Header.astro` → at least 2
      (the attribute and the reset)
- [ ] Native dialog used: `grep -c 'showModal' astro/src/components/NavDrawer.astro` → 1
- [ ] Resize guard present: `grep -c 'min-width: 64rem' astro/src/components/NavDrawer.astro` → at least 1
- [ ] No onclick attributes anywhere: `grep -rn 'onclick=' astro/src/components/` → prints nothing
- [ ] Breakpoint is 64rem, not a px value: `grep -c '64rem' astro/src/components/Header.astro` → at least 1
- [ ] Build green: `cd astro && npm run build` → exit 0
- [ ] Manual, keyboard only, with a viewport under 1024px: Tab to the burger, press Enter. Focus moves
      into the drawer. Tab cycles inside the drawer and never reaches the page behind it. Press Escape:
      the drawer closes and focus returns to the burger. Confirm the burger reports
      `aria-expanded="false"` in the inspector.
- [ ] Manual: open the drawer at 400px, then widen the window past 1024px. The drawer disappears and the
      inline nav appears, with no leftover overlay.
- [ ] Manual: toggle the theme, hard-reload, and confirm the choice survives. Clear site data, reload
      with the OS in dark mode, and confirm dark is used.

---

### WP-8: Footer and scroll-to-top

**Context:**
The footer carries the topic links, the language switch, and the CTDev credit. The credit has a
project-wide rule that has already been settled once: it must **not** use opacity to look muted. A
`opacity-60` credit measured 2.26:1 against the background, well under the 4.5:1 WCAG AA minimum; the
muted token on its own passes in both themes. Use `var(--fg-muted)` and nothing else.

Scroll-to-top is a real button that appears after roughly one viewport of scrolling. It must not be
reachable by keyboard while it is invisible, and it must not animate for a reader who has asked for
reduced motion.

**Task:**
Create `Footer.astro` with the topic list, language switch and credit, and `ScrollToTop.astro` with
the back-to-top control.

**Files:**
- `astro/src/components/Footer.astro` — CREATE — footer
- `astro/src/components/ScrollToTop.astro` — CREATE — back-to-top button and script

**Constraints:**
- DO: render the CTDev credit as
  `<a href="https://ctdev.dev/" target="_blank" rel="noopener noreferrer">`, font-size `0.65rem`,
  colour `var(--fg-muted)`, `text-decoration: underline` on `:hover` only
- DO: verify the credit's contrast in **both** themes against its actual background and record the two
  ratios. It must be ≥ 4.5:1. Never reduce it with `opacity`
- DO: keep the credit in the DOM as ordinary text, not an image, and not inside a landmark that is
  hidden at any breakpoint
- DO: include the language switch in the **footer**, not the header — one switch only, so the
  header stays a wordmark plus navigation and the two manual checks below have an unambiguous target
- DO: give `ScrollToTop` its accessible name from `dict.backToTop`, add it to the tab order only when
  visible by toggling the `hidden` attribute, and reveal it at `scrollY > 600` behind a passive
  scroll listener
- DO: scroll with `window.scrollTo({ top: 0, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" })`
- DO: give every footer link enough contrast and a visible focus ring
- DO NOT: use `opacity` on the credit, on any footer text, or on any interactive element
- DO NOT: use `position: fixed` for the footer — fixed footers obscure content at 200% zoom
- DO NOT: use a bare `<a href="#">`
- DO NOT: put a `transition` on the appearance of the back-to-top button without gating it behind
  `prefers-reduced-motion`

**Success:**
- [ ] Files exist: `test -f astro/src/components/Footer.astro && test -f astro/src/components/ScrollToTop.astro` → exit 0
- [ ] Credit is exactly as specified: `grep -c 'ctdev.dev' astro/src/components/Footer.astro` → 1
- [ ] Credit opens safely: `grep -c 'rel="noopener noreferrer"' astro/src/components/Footer.astro` → 1
- [ ] No opacity on the credit: `grep -nE 'ctdev|credit' astro/src/components/Footer.astro | grep -c 'opacity'` → 0
- [ ] Back-to-top respects motion:
      `grep -c 'prefers-reduced-motion' astro/src/components/ScrollToTop.astro` → at least 1
- [ ] Back-to-top is hidden from the tab order when invisible:
      `grep -c 'hidden' astro/src/components/ScrollToTop.astro` → at least 1
- [ ] Build green: `cd astro && npm run build` → exit 0
- [ ] Manual: Tab through the whole footer at 200% browser zoom. Nothing is clipped, every focus ring
      is visible, and the credit is readable.
- [ ] Manual: with the OS set to reduce motion, scroll down and click back-to-top — the jump is
      instant, with no smooth scroll.

---

### WP-9: Analytics consent gate and the privacy page

**Context:**
Analytics is a placeholder, but the consent machinery around it is real and is the reason the site
has a cookie banner at all. The rule that makes this coherent: **nothing loads until the reader says
yes.** A banner that appears while a third-party script has already run is worse than no banner.

Two traps are documented in this project's history and both must be avoided in the code you write:

1. `gtag.js` **silently ignores array-form `dataLayer` commands.** `dataLayer.push(['config', 'G-…'])`
   pushes an array that gtag never reads: no error, no hit. Only the canonical
   `function gtag(){dataLayer.push(arguments)}` form works.
2. Do not route gtag.js through Partytown. The automatic page view from `gtag('config')` never
   reaches the network inside the worker. This project does not use Partytown at all; the note is
   here so nobody adds it later.

This project already proved that "no error and no request" is a failure, not a success. The verify
recipe for a real measurement id is recorded below so that when the id is swapped in, proof is
expected rather than assumed.

**Task:**
Create `astro/src/lib/analytics.ts` holding the placeholder id, `ConsentBanner.astro` holding the
banner and the gated loader, and the two privacy pages that explain what is stored.

**Files:**
- `astro/src/lib/analytics.ts` — CREATE — the measurement id and the loader
- `astro/src/components/ConsentBanner.astro` — CREATE — banner and consent-gated GA loading
- `astro/src/pages/privacy.astro` — CREATE — English privacy page
- `astro/src/pages/ru/privacy.astro` — CREATE — Russian privacy page
- `astro/src/layouts/BaseLayout.astro` — MODIFY — import `ConsentBanner.astro` and render
  `<ConsentBanner />` as the last element of `<body>`. It is site chrome, so no page has to pass it —
  a `<slot name="consent" />` would work only if WP-6, WP-13 and WP-14 all remembered to fill it,
  and none of them would

**Constraints:**
- DO: keep the id in exactly one place —
  `export const GA_MEASUREMENT_ID = "G-XXXXXXXXXX";` — with a comment above it reading
  `// Inert placeholder. Replace with the real GA4 id, then prove a live hit: DevTools > Network, filter "collect", load a page, and confirm one `en=page_view` request. No error and no request is a FAIL, not a pass.`
- DO: store the reader's choice in `localStorage` under the key `consent`, with the values `"granted"`
  and `"denied"`. Do not use a cookie — there is nothing to send to the server
- DO: on load, read the stored value; load GA only when it is `"granted"`; render the banner only when
  it is absent; do nothing when it is `"denied"`
- DO: load GA by appending a `<script async src="https://www.googletagmanager.com/gtag/js?id=…">`
  element and then running the canonical `gtag()` snippet. Do not use array-form `dataLayer.push`
- DO: give the two choices equal visual weight. No pre-ticked box, no greyed-out decline, no tiny
  decline link — the decline control must be as easy to hit as the accept control
- DO: render the banner as a labelled region (`aria-label` from `dict.consentTitle`), place it so it
  never covers the page's primary content, and let Escape dismiss it by recording `"denied"`
- DO: render the banner **server-side and visible by default** (so it works with JavaScript off) and
  let the component's script add the `hidden` attribute when a choice is already stored. Put
  `data-consent` on the banner's root element as the verification hook
- DO: link the banner to the privacy page with `privacyUrl(locale)`, and provide a way to change the
  choice afterwards from that page
- DO: write the privacy pages to state, in plain language and in each locale: the theme preference and
  the consent choice are stored in the browser's local storage and are never sent anywhere; analytics
  cookies are set only after consent; how to change or withdraw the choice; and that no other
  third-party service is used. Keep it short and factual
- DO: mark both privacy pages `noAlternates` is **not** needed — they exist in both locales, so pass
  the real `path`
- DO NOT: use Partytown, `@astrojs/partytown`, or any worker-based script offloading
- DO NOT: load gtag before consent, not even with consent-mode signals. With a placeholder id the
  request is pointless and it breaks the promise the banner makes
- DO NOT: invent legal claims, jurisdiction language, or a company name in the privacy pages. If a
  required detail is unknown, write the sentence with a clearly visible `TODO: confirm` and report it
- DO NOT: add a second banner, a "manage preferences" panel, or per-category toggles. There is exactly
  one category

**Success:**
- [ ] Files exist: `test -f astro/src/lib/analytics.ts && test -f astro/src/components/ConsentBanner.astro && test -f astro/src/pages/privacy.astro && test -f astro/src/pages/ru/privacy.astro` → exit 0
- [ ] One id, one place: `grep -rc 'G-XXXXXXXXXX' astro/src` → exactly 1 file matches
- [ ] Consent gate is real: `grep -c 'googletagmanager' astro/src/components/ConsentBanner.astro` → 1
      and `grep -c 'consent' astro/src/components/ConsentBanner.astro` → at least 3
- [ ] No array-form dataLayer: `grep -rn "dataLayer.push(\[" astro/src` → prints nothing
- [ ] No Partytown: `grep -rn 'partytown' astro/package.json astro/astro.config.mjs` → prints nothing
- [ ] Build green: `cd astro && npm run build` → exit 0
- [ ] **The banner is mounted and shipped in the HTML:** `grep -c 'data-consent' astro/dist/index.html` → 1
- [ ] **GA is not in the static HTML** — the strongest check in this WP:
      `grep -c 'googletagmanager' astro/dist/index.html` → 0
- [ ] The loader is in the bundle, so it exists but is not preloaded:
      `grep -rl 'googletagmanager' astro/dist/_astro/*.js | wc -l` → at least 1
- [ ] Banner text is localised: `grep -c 'consentAccept' astro/src/lib/dictionary.ts` → 2
- [ ] Manual, in a fresh browser profile: load the site. The banner appears and DevTools' Network tab
      shows **no** request to `googletagmanager.com`. Click Accept, then reload: a request appears and
      the banner does not. Clear site data, reload, click Decline, reload: no request, no banner.
- [ ] Manual: change the choice from the privacy page and confirm the banner's state follows

## Phase Verification

After all five work packages are complete, run:

```bash
cd astro && npm run check && npm run build && cd ..
node tools/validate-content.mjs --strict --lang en
node tools/validate-content.mjs --strict --lang ru
git status --porcelain lessons/
```

- [ ] `npm run check` exits 0
- [ ] `npm run build` exits 0
- [ ] Both content gates report `0 error(s)` and exit 0
- [ ] `git status --porcelain lessons/` prints nothing
- [ ] No third-party runtime request on the home page: `grep -cE 'fonts\.gstatic|googletagmanager|ytimg' astro/dist/index.html` → 0
- [ ] Manual, keyboard only: reach and operate the burger, the theme toggle and the back-to-top
      control. Every one shows a visible focus ring; the skip link works.
