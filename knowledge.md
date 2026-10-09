# Project knowledge

## What this is
Static portfolio site for Saurav Sharma (backend engineer and indie hacker) deployed at **sorv.dev** via GitHub Pages. Plain HTML, CSS, and vanilla JS: no build step, no framework, no package manager. Goal: show his own products (ox first, then LazyPlanner) and let recruiters and founders hire him for Python, Django and backend work.

## ox (Saurav's main product)
ox is Saurav's own deployment platform: https://deploywithox.com. It is the first, featured project on the home page.
- You connect a GitHub repo and ox deploys it to your own Ubuntu server (a VPS you rent) using systemd and Caddy, no Docker.
- It reads the repo, so most stacks need no config. An optional `ox.toml` covers the rest, and an AI agent can write it with the bundled skill.
- It checks a plan before every deploy, switches releases with no downtime (blue/green), keeps the live release running when an update fails, and has one-click rollback.
- Daily backups of services, preview environments per branch with promote, logs with a query bar and an error-focused explorer.
- A console plus a CLI with `--json` for every command, and an `/llms.txt` for AI agents: https://deploywithox.com/llms.txt
- Built in Go with HTMX. Runs as a hosted plane with a small agent on each customer server.
- In beta and free during the beta.
- Has plans for many stacks: Python, JavaScript/TypeScript, Ruby on Rails, PHP, Go, Rust, Java and .NET, Elixir, and static sites. Do not claim every stack is tested.
- 45 example projects on GitHub (repos named `oxzoo-*` under https://github.com/saurav-codes) and a live zoo of 24 apps across 4 servers.
- Lazy Planner (https://lazyplanner.app) runs on ox.
- Docs: https://deploywithox.com/docs. Story: https://deploywithox.com/story.
- Blog posts on https://blog.sorv.dev: "Why I Stopped Paying for Vercel on My Side Projects", "Self-Hosted Deploy Tools Felt Too Busy, So I Built ox", "Deploy FastAPI to Your Own VPS with One Config File".

## Quickstart
- **Setup:** None. No dependencies to install.
- **Dev:** Open `index.html` directly in a browser, or serve the folder locally, e.g.:
  - `python3 -m http.server 8000` then visit `http://localhost:8000`
- **Test / Lint / Build:** None configured. Manually verify in-browser (desktop + mobile widths, light + dark theme).
- **Deploy:** Pushing to `main` deploys to GitHub Pages (custom domain in `CNAME`: `sorv.dev`). `_config.yml` exists so Jekyll includes the `.well-known/` folder.

## Pages (project root)
- `index.html`: home page (hero, story, projects with ox featured, blog picks, photos preview).
- `gallery.html`: full photo gallery with an inline lightbox and a "Load more" script.
- `resume.html`: standalone resume page with a print stylesheet. `Resume.txt` mirrors it in plain text.
- `tweets.html`: curated tweets page.
- `llms.txt`: summary of Saurav and his projects for AI readers.
- `CNAME`: custom domain for GitHub Pages.
- `site.webmanifest`, `_config.yml`, `.well-known/discord`: platform and manifest files.

## Asset layout (`assets/`)
- `css/site.css`: the one shared stylesheet (theme tokens, base type, header, footer, shared components). Page-specific rules live in an inline `<style>` in each page's `<head>`.
- `js/`
  - `theme-toggle.js`: light/dark theme toggle (`data-theme` on `<html>`).
  - `proximity.js`: scales Phosphor icons near the cursor (skipped with reduced motion).
  - `scroll-progress.js`: scroll progress bar.
- `images/`: portraits, project media, `gallery/` photo archive, `companies_logo/`.
- `favicon/`: favicons referenced from each HTML page.
- `saurav_sharma_resume.pdf`: resume PDF printed from `resume.html` (the "Download PDF" link). `saurav_sharma_django_dev_resume.pdf` is an identical copy kept for old links.

## Conventions
- Static site: no build pipeline. Edit HTML/CSS/JS directly and refresh.
- Theme is set by `data-theme="light"` / `"dark"` on `<html>` by an inline head script (stored choice, else the OS preference). Style tokens live at the top of `assets/css/site.css`.
- Scripts are loaded with `defer` from the bottom of each HTML file; each page includes the scripts it needs (no bundler).
- Icons come from Phosphor Icons via unpkg (`@phosphor-icons/web`). The font is Atkinson Hyperlegible from Google Fonts.
- Each page has a strict Content-Security-Policy `<meta>`; a new external host (script, style, font, fetch) must be added there or it is blocked.
- Images: prefer `_compressed` variants under `assets/images/gallery/`; use `loading="lazy"` + `decoding="async"` below the fold. The hero image uses `fetchpriority="high"`.
- Each HTML page duplicates its own `<head>` block, nav and footer links: keep them in sync when adding nav items or social links.
- Analytics: Beam analytics (`beamanalytics.b-cdn.net`) is loaded at the bottom of each page. Keep it as-is unless asked.
- Contact is a `mailto:` link (Say Hello, footer Email); there is no contact form.

## Gotchas
- No package manager or lockfile: do **not** add `npm`, `node_modules`, bundlers, or frameworks without explicit request.
- GitHub Pages serves via Jekyll. Any top-level folder starting with `_` or `.` is excluded by default; `_config.yml` re-includes `.well-known/`. If adding new dotfolders that must be served, extend `include:` in `_config.yml`.
- When the resume changes, update `resume.html`, `Resume.txt` and both PDFs together. Print the PDF from `resume.html` in headless Chrome (`Page.printToPDF` with `preferCSSPageSize`, Letter, 2 pages).
- The Blog section's post count ("All writing, N posts") is hardcoded in `index.html`: count post URLs in https://blog.sorv.dev/sitemap.xml (skip the home, `/archive` and `/recommendations`).
- Gallery "Load more" shows 6 items at a time; new `.gallery-item` entries are picked up automatically and the order in the HTML is the display order.
- Internal nav on non-home pages uses absolute anchors like `/#projects` (not `#projects`) so they work from `gallery.html`, `tweets.html`, etc. Follow this pattern when adding new subpages.
