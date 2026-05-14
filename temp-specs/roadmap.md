# Astro Migration Roadmap for Handshake.org

This roadmap outlines the step-by-step plan to rebuild the Handshake.org website using the Astro framework and configure it for GitHub Pages deployment.

## Phase 1: Project Setup & Initialization
- [ ] Initialize a new Astro project within the repository.
- [ ] Configure `astro.config.mjs` for Static Site Generation (SSG) tailored for GitHub Pages.
- [ ] Identify the existing `CNAME` file (containing `handshake.org`) and ensure it is placed in the Astro `public/` directory so it persists across deployments.
- [ ] Clean up legacy build configurations (if any) to make way for Astro.

## Phase 2: Asset Migration
- [ ] Move existing static assets (images, fonts, standalone JS/CSS) into Astro's `public/` folder.
- [ ] Verify asset paths to ensure they resolve correctly in the new structure.

## Phase 3: Layout, Component Conversion & Modern Redesign
- [ ] Break down the structure into reusable Astro components (e.g., `<Header />`, `<Footer />`, `<BaseLayout />`).
- [ ] Redesign the site with a modern, clean aesthetic that positions Handshake as an "alternate root zone for the open internet" rather than a crypto/web3 project.
- [ ] Focus on trust, infrastructure, and open-web principles (clean typography, professional color palette, structured layouts).
- [ ] Convert all current HTML pages to `.astro` pages in the `src/pages/` directory while applying the new modern design.
- [ ] Ensure URLs remain clean and check for any needed redirects to prevent broken links from the old site structure.

## Phase 4: GitHub Actions CI/CD Setup
- [ ] Create a deployment workflow at `.github/workflows/deploy.yml`.
- [ ] Utilize the official `withastro/action` to automate building the static files.
- [ ] Configure the workflow to deploy the built Astro site to the `gh-pages` branch, maintaining compatibility with the existing GitHub Pages setup.

## Phase 5: Testing & Quality Assurance
- [ ] Run a local build (`npm run build` and `npm run preview`) to verify the site works exactly like the original.
- [ ] Test all internal links and asset loading.
- [ ] Verify that the `CNAME` file successfully ends up in the final `dist/` output.

## Phase 6: Documentation & PR Preparation
- [ ] Update the repository's `README.md` to document the new Astro-based build and development process.
- [ ] Remove redundant legacy HTML/CSS files that have been successfully ported.
- [ ] Prepare the final commit and ensure the repository is ready for a Pull Request back to `handshake-org/handshake-web`.
