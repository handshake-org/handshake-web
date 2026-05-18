# Astro Migration Roadmap for Handshake.org

This roadmap outlines the step-by-step plan to rebuild the Handshake.org website using the Astro framework and configure it for GitHub Pages deployment.

## Phase 1: Project Setup & Initialization
- [x] Initialize a new Astro project within the repository.
- [x] Configure `astro.config.mjs` for Static Site Generation (SSG) tailored for GitHub Pages.
- [x] Identify the existing `CNAME` file (containing `handshake.org`) and ensure it is placed in the Astro `public/` directory so it persists across deployments.
- [x] Clean up legacy build configurations (if any) to make way for Astro.

## Phase 2: Asset Migration
- [x] Move existing static assets (images, fonts, standalone JS/CSS) into Astro's `public/` folder.
- [x] Verify asset paths to ensure they resolve correctly in the new structure.

## Phase 3: Layout, Component Conversion & Modern Redesign
- [x] Break down the structure into reusable Astro components (e.g., `<Header />`, `<Footer />`, `<BaseLayout />`).
- [x] Redesign the site with a modern, clean aesthetic that positions Handshake as an "alternate root zone for the open internet" rather than a crypto/web3 project.
- [x] Focus on trust, infrastructure, and open-web principles (clean typography, professional color palette, structured layouts).
- [x] Convert all current HTML pages to `.astro` pages in the `src/pages/` directory while applying the new modern design.
- [x] Ensure URLs remain clean and check for any needed redirects to prevent broken links from the old site structure.

## Phase 4: GitHub Actions CI/CD Setup
- [x] Create a deployment workflow at `.github/workflows/deploy.yml`.
- [x] Utilize the official `withastro/action` to automate building the static files.
- [x] Configure the workflow to deploy the built Astro site to the `gh-pages` branch, maintaining compatibility with the existing GitHub Pages setup.

## Phase 5: Testing & Quality Assurance
- [x] Run a local build (`npm run build` and `npm run preview`) to verify the site works exactly like the original.
- [x] Test all internal links and asset loading.
- [x] Verify that the `CNAME` file successfully ends up in the final `dist/` output.

## Phase 6: Documentation & PR Preparation
- [x] Update the repository's `README.md` to document the new Astro-based build and development process.
- [x] Remove redundant legacy HTML/CSS files that have been successfully ported.
- [x] Prepare the final commit and ensure the repository is ready for a Pull Request back to `handshake-org/handshake-web`.
