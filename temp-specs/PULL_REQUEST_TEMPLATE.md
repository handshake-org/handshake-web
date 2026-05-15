# Astro Migration & Modernization (V2)

## Overview
This Pull Request represents a comprehensive migration of the Handshake website from raw HTML/CSS to a modern **Astro** (v4) architecture with **Tailwind CSS**. 

The goal of this migration is to significantly improve the developer experience, make the site easier for the community to maintain, enhance SEO, and modernize the visual aesthetic to reflect Handshake's role as serious, decentralized infrastructure (shifting away from the heavy "crypto/blockchain" purple aesthetics to a clean, professional monochromatic grey/black theme).

## 🔗 Live Preview
**(Please insert your Vercel or Netlify preview URL here before submitting!)**
Example: `https://handshake-web-preview.vercel.app`

## Key Architectural Changes
1. **Astro Framework**: Migrated all raw `.html` files into modular `.astro` pages and components (`Layout.astro`, `Header.astro`, `Footer.astro`). This prevents code duplication (like having to update the header 20 times).
2. **Tailwind CSS**: Replaced the fragmented custom CSS files with Tailwind utility classes for a highly responsive, modern, and easily maintainable styling system.
3. **Legacy Preservation**: The original `legacy/` directory is kept intact in the repository to ensure no historical data is lost.
4. **Content Migration**: Extracted all the historical content (Grant Sponsors, Claim instructions, FAQs, Notices) and wrapped them using `@tailwindcss/typography` to ensure they render beautifully in the new layout.
5. **Interactive Hero**: Added a custom `three.js` interactive "interconnected network" background to the homepage hero to visually represent the peer-to-peer network.

## Feature Additions & Fixes
* **SEO & Sitemap**: Installed `@astrojs/sitemap` to auto-generate `sitemap-index.xml`. Added custom meta descriptions to all primary pages.
* **AI Agent Context**: Created `/skill.md` and `/llms.txt` endpoints configured to return `text/plain` so AI agents can natively read Handshake rules and login instructions via headless SSO.
* **Historical Accuracy**: Updated the Grant Sponsors and Claim pages to clearly reflect that these events occurred in the past (2020) and are no longer active following the soft fork.
* **Native Redirects**: Converted legacy HTML redirects (`/discord`, `/telegram`) into native server-side redirects via `astro.config.mjs`.
* **Custom 404**: Replaced the default Astro 404 page with a custom, branded Handshake 404 error page.
* **Bob Wallet**: Updated all references from `.io` to `.org`.

## Testing Instructions for Reviewers
1. Clone this branch locally.
2. Run `npm install`
3. Run `npm run dev`
4. Verify the interactive hero background on `http://localhost:4321`.
5. Verify the routing to `/faq`, `/grant-sponsors`, `/community`, and `/notice`.

## Deployment
This project includes a `.github/workflows/deploy.yml` configured to use the official `withastro/action`. Upon merging to `master`, the Astro site will build and push statically to the GitHub Pages branch.