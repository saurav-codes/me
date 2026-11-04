# Agent Rules for sorv.dev

Static portfolio site in a **public** repo, served by GitHub Pages behind Cloudflare. Everything committed here is public forever, history included.

## Security

* Strip metadata from every image or video before committing: `exiftool -all= -tagsfromfile @ -Orientation -ICC_Profile <file>`. Phone photos carry GPS, device model and timestamps.
* Before each commit, check that no tracked image has personal tags. This must print nothing:
  `git ls-files -z | grep -ziE '\.(jpe?g|png|webp|gif|tiff?|heic)$' | xargs -0 exiftool -q -if '$GPSLatitude or $Make or $Model or $SerialNumber or $DateTimeOriginal' -p '$Directory/$FileName'`
* Never commit secrets, `.env` files, private keys, personal docs, or photos that show a home address, documents or license plates. The only token on the site is the Beam analytics site token, which is public by design.
* If something private ever gets pushed, a new commit is not enough. Tell the owner: the history must be rewritten or the repo recreated, and the key or credential rotated.
* Keep the Content-Security-Policy meta tag in every HTML page. When adding a new third-party script, style or font host, add it to the CSP on each page and pin its version.
* External links that open a new tab use `rel="noopener noreferrer"`.
* `CNAME` must stay `sorv.dev`. Do not remove it, or the domain stops working.
