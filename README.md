# Samandar Alimov — Portfolio

A React + TypeScript portfolio with a responsive editorial interface, scroll motion and a lazily loaded interactive Three.js scene.

## Original site preserved

The **complete original static website**, including HTML, CSS, JavaScript and binary image assets, is preserved without modification at:

**archive/portfolio-2026-11-04/**

It was copied from the original Git tree of commit **37d3833466fb8dfca303f949ca396b09fb1e25ff**. Original Git history is preserved too. The archive is excluded from the Vite build.

## Stack

React 19, TypeScript, JavaScript, Vite, Three.js, React Three Fiber, Drei, Framer Motion, Lucide icons and vanilla CSS.

## Run locally

Node.js 20.19+ (Node.js 22 recommended). Run npm install, npm run dev, npm run check, npm run build, and npm run preview.

## Publishing

The GitHub Actions workflow builds on pull requests and deploys dist/ when changes land on main. In Settings → Pages, select Source: GitHub Actions. The GitHub Pages build uses the /portfolio/ base path. For Vercel or a custom root domain, omit GITHUB_PAGES to use the default / base.

## Accessibility and motion

The WebGL hero is lazy-loaded and has a CSS fallback. Users who prefer reduced motion get static content. Navigation and links support keyboards and focus styling. Contact uses real email and profile links, without a pretend form submission.

## Accuracy

Project statuses distinguish live websites, products in development and experiments. Project details are in src/content.ts. Personal links and copy are in src/App.tsx. No fabricated testimonials or experience statistics.

## Follow-up review

Verify the preferred email and domain, add project screenshots and case studies, test on actual mobile devices, run a Lighthouse audit, and only enable optional analytics with consent.
