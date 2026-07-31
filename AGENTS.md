# AGENTS.md

A romantic single-page gift website ("For Ananya"). See [README.md](README.md) for the project story, personalization steps, and GitHub Pages publishing.

## The essentials

- **Pure static site.** Vanilla HTML + CSS + JS only. **No build step, no bundler, no npm, no framework, no dependencies.** Do not add any.
- **Three files hold everything:** [index.html](index.html) (structure/content), [style.css](style.css) (all styling + animations), [script.js](script.js) (all interactivity). Keep this separation.
- **Run/preview:** just open [index.html](index.html) in a browser — no server or install needed. Photos/music only load once their files are added (see below), everything else works instantly.

## Conventions

- **JS structure:** each feature is a clearly-commented `// ---------- Feature ----------` block in [script.js](script.js). Add new features as their own block in the same style. IIFEs are used for isolated features (e.g. the login gate).
- **DOM access:** use the existing `el(id)` helper and `getElementById`; wire behavior via event listeners at the bottom of each block.
- **CSS:** use the color/shadow CSS variables in `:root` (`--pink`, `--rose`, `--cream`, `--ink`, `--gold`, `--shadow`, etc.) instead of hard-coded values. Fonts: Playfair Display / Dancing Script (headings), Poppins (body), loaded from Google Fonts.
- **Tone:** all user-facing copy is warm, playful, and romantic. Match it. Emoji are intentional and expected.
- **Accessibility & motion:** keep `aria-label`s on interactive controls, and respect `prefers-reduced-motion` (falling petals are gated on it) when adding animations.
- **Persistence:** the guestbook stores notes in **Firebase Firestore** (Google Cloud) when [firebase-config.js](firebase-config.js) is filled in — giving a live shared wall + a console Rohit can read. It **falls back to `localStorage`** (device-only) when Firebase isn't configured. The login gate uses `sessionStorage`. Firebase is loaded via CDN `<script>` tags in [index.html](index.html); there is still no build step.
- **Firebase integration contract:** load order in [index.html](index.html) is `firebase-config.js` → `script.js` → the inline `<script type="module">`. The module reads `window.FIREBASE_CONFIG`, and when the config is valid it publishes `window.AnanyaNotes` (with `add()` + `subscribe()`) and fires the `ananya-notes-ready` event. [script.js](script.js) listens for that event to switch from local to cloud storage. Preserve this global + event handshake — `script.js` must never `import` Firebase directly. The `FEATURED_NOTES` array in [script.js](script.js) is always rendered at the top of the wall regardless of storage backend.

## Guardrails

- **The login gate is decorative, not security.** Credentials live in client-side JS and the page source is public. Never store real secrets, tokens, or private data anywhere in these files.
- **Always escape user input** before inserting into the DOM — follow the existing `escapeHtml()` pattern (the guestbook uses it) to avoid XSS. Never build innerHTML from raw user text.
- **Don't host copyrighted media.** The song is referenced by an optional local `assets/our-song.mp3` (user-supplied) with a YouTube-search fallback; keep that pattern.

## Adding user media (no code changes needed)

- Photos go in `photos/` as `photo1.jpg`…`photo3.jpg` — see [photos/README.md](photos/README.md). Missing images degrade gracefully via the `onerror` placeholder.
- Optional song goes in `assets/our-song.mp3` — see [assets/README.md](assets/README.md).
