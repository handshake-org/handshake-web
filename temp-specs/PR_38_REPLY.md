# PR #38 Reply

Added the requested whitepaper/design notes update across the site.

## Changes included

- Footer now shows both:
  - Whitepaper / Design Notes (txt)
  - Whitepaper / Design Notes (pdf)
- In-page references were updated to use the dual format style:
  - Whitepaper / Design Notes (txt / pdf)

## Updated locations

- homepage resource links
- footer
- sitemap page
- how-it-works page
- grant-sponsors page

## Also verified

- the new PDF is available at `/files/handshake.pdf`
- the existing text version remains at `/files/handshake.txt`
- Astro build passes successfully

## Build cleanup

- Replaced external redirect config for `/discord` and `/telegram` with dedicated redirect pages
- Lazy-loaded the homepage Three.js background to improve bundle splitting

One non-blocking Vite warning remains because the Three.js chunk is still larger than the default warning threshold, but this does not affect functionality or deployment.
