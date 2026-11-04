# Samandar Otabek — Portfolio

A custom-designed monochrome editorial portfolio with layered white/gray/black glassmorphism, sculptural chrome-and-graphite 3D, asymmetrical project art direction, motion and a React + TypeScript foundation.

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

## Design direction

This is intentionally **not** a generic portfolio template. Visual language: off-white gallery paper, graphite typography, smoky translucent glass, overprinted giant typography, the Instrument Serif editorial accent, asymmetrical project specimens, and a dark inverted contact monolith. Work switches between bento gallery and compact index, while skills use an interactive accordion. Do not reintroduce colored gradient cards or a standard sidebar portfolio template. See docs/design-system.md.

## Accessibility and motion

The WebGL hero is lazy-loaded and has a CSS fallback. Users who prefer reduced motion get static content. Navigation and links support keyboards and focus styling. Contact uses real email and profile links, without a pretend form submission.

## Accuracy

Project statuses distinguish live websites, products in development and experiments. Project details are in src/content.ts. Personal links and copy are in src/App.tsx. No fabricated testimonials or experience statistics.

## Follow-up review

Verify the preferred email and domain, add project screenshots and case studies, test on actual mobile devices, run a Lighthouse audit, and only enable optional analytics with consent.

## Public professional CV

- A purpose-built professional, one-page, ATS-readable English CV is generated from `src/resume.json`.
- Run `npm run build:cv` to generate `public/cv/Samandar_Alimov_CV.pdf` (also runs automatically during `npm run dev` and `npm run build`).
- The public page has a dedicated `#resume` section, a real View PDF link, and an explicit Download CV link (header, hero, footer).
- The file is served as a real PDF, not a screenshot or a JS-generated click-time blob.
- Check content accuracy in the resume JSON before changing dates, outcomes, experience or contact details.
- No duplicate CV blobs are committed; the PDF is rebuilt from versioned source on deployment.
