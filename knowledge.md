# Project knowledge

## What this is
Static portfolio site for Saurav Sharma (Django developer) deployed at **sorv.dev** via GitHub Pages. Plain HTML, CSS, and vanilla JS — no build step, no framework, no package manager. Goal: attract recruiters and founders to hire Saurav as a Django developer.

## Quickstart
- **Setup:** None. No dependencies to install.
- **Dev:** Open `index.html` directly in a browser, or serve the folder locally, e.g.:
  - `python3 -m http.server 8000` then visit `http://localhost:8000`
- **Test / Lint / Build:** None configured. Manually verify in-browser (desktop + mobile widths, light + dark theme).
- **Deploy:** Pushing to `main` deploys to GitHub Pages (custom domain in `CNAME` → `sorv.dev`). `_config.yml` exists so Jekyll includes the `.well-known/` folder.

## Pages (project root)
- `index.html` — home page (hero, tech marquee, projects, experience, skills, blog, gallery preview, hire/contact).
- `gallery.html` — full photo gallery with inline lightbox + "Load More" script.
- `resume.html` — standalone resume page. `Resume.txt` holds plain-text source.
- `tweets.html` — curated tweets page.
- `CNAME` — custom domain for GitHub Pages.
- `site.webmanifest`, `_config.yml`, `.well-known/discord` — platform / manifest files.

## Asset layout (`assets/`)
- `css/`
  - `home.css`, `style.css`, `gallery-page.css` — page-level styles.
  - `base/` — `reset.css`, `variables.css` (theme tokens, colors, spacing).
  - `components/` — per-component stylesheets: `navbar.css`, `projects.css`, `gallery.css`, `gallery-preview.css`, `technologies.css`, `tweet-card.css`, `blog.css`, `profile.css`, `footer.css`.
- `js/`
  - `components/theme.js` — light/dark theme toggle (`data-theme` on `<html>`).
  - `components/navigation.js` — header nav behavior.
  - `scroll.js` — scroll progress bar + scroll interactions.
  - `lazy-media.js` — lazy-loads videos (`[data-lazy-video]` with `data-src` on `<source>`).
  - `blog.js` — fetches latest 6 Hashnode posts for user `selftaughtdev` via GraphQL (`https://gql.hashnode.com`) and injects them into `.blog-list`. Lazy-triggered via `IntersectionObserver` + `requestIdleCallback`.
- `images/` — portraits, project GIFs/MP4s, `gallery/` photo archive, `companies_logo/`.
- `favicon/` — favicons referenced from each HTML page.

## Conventions
- Static site: no build pipeline. Edit HTML/CSS/JS directly and refresh.
- Theme is set by `data-theme="dark"` (default) / `"light"` on `<html>`. Style tokens live in `assets/css/base/variables.css`.
- Scripts are loaded with `defer` from the bottom of each HTML file; each page independently includes the scripts it needs (no bundler).
- Icons come from Phosphor Icons via CDN (`@phosphor-icons/web`). Tech logos come from `cdn.jsdelivr.net/gh/devicons/devicon`. Fonts come from Google Fonts (IBM Plex Mono, etc.).
- Images: prefer `_compressed` variants under `assets/images/gallery/`; use `loading="lazy"` + `decoding="async"` for everything below-the-fold. Hero image uses `fetchpriority="high"`.
- Videos in project cards use `<video autoplay loop muted playsinline preload="none" data-lazy-video>` with `<source data-src="...">` — `lazy-media.js` swaps `data-src` → `src` when in view. Don't set `src` directly on these.
- Each HTML page duplicates its own `<head>` block and footer links — keep them in sync when adding nav items or social links.
- Analytics: PostHog init snippet is inlined at the bottom of each HTML page. The gallery page additionally loads Beam analytics. Keep these as-is unless asked.
- Contact form posts to Formspree (`https://formspree.io/f/mkgnbdeq`).

## Gotchas
- No package manager or lockfile — do **not** add `npm`, `node_modules`, bundlers, or frameworks without explicit request.
- GitHub Pages serves via Jekyll. Any top-level folder starting with `_` or `.` is excluded by default; `_config.yml` re-includes `.well-known/`. If adding new dotfolders that must be served, extend `include:` in `_config.yml`.
- Hashnode GraphQL endpoint and the username `selftaughtdev` are hardcoded in `blog.js`. Blog posts fail silently to a fallback link if the request breaks.
- Resume download link in `index.html` points to `./assets/saurav_sharma_django_dev_resume.pdf?v=<date>` — bump the `?v=` query string when replacing the PDF to bust caches.
- Gallery "Load More" logic shows 6 items at a time; new `.gallery-item` entries are automatically picked up but the order in the HTML is the display order.
- Internal nav on non-home pages uses absolute anchors like `/#projects` (not `#projects`) so they work from `gallery.html`, `tweets.html`, etc. Follow this pattern when adding new subpages.
- Per `.windsurfrules`: match existing patterns, don't delete unrelated comments/code, keep changes minimal and scoped.
