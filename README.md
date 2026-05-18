# Handshake Website

This is the repository for [handshake.org](https://handshake.org), the experimental peer-to-peer root naming system.

## Architecture

This site is built using [Astro](https://astro.build/) and styled with [Tailwind CSS](https://tailwindcss.com/). It has been migrated from a legacy static HTML architecture to a modern component-based static site generator (SSG) approach.

### Key Changes
- **Modern Redesign**: The site features a clean, non-crypto aesthetic focused on its identity as an "alternate root zone for the open internet".
- **Component Based**: Headers, footers, and layouts are abstracted into reusable Astro components.
- **GitHub Pages CI/CD**: Automatic deployments are handled via GitHub Actions upon pushing to the `main` or `master` branch.

## Development Setup

1. **Prerequisites**: Ensure you have Node.js 20+ installed.
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:4321` in your browser.

4. **Build for Production**:
   ```bash
   npm run build
   ```
   The built static files will be located in the `dist/` directory.

## Deployment

The site is automatically built and deployed to GitHub Pages using the `.github/workflows/deploy.yml` GitHub Action.
Ensure that the repository settings have GitHub Pages enabled and configured to build from GitHub Actions.

## Contributing

Pull requests are welcome! If adding a new page, please utilize the `src/layouts/Layout.astro` component to ensure design consistency.
