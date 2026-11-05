# Portfolio agent instructions

## Mission
Evolve this repository into a professional, fast, accessible, visually distinctive personal website with high-quality 3D, motion, transitions and accurate personal information. Preferred stack: React, TypeScript, JavaScript, Vite, Three.js and Framer Motion.

## Non-negotiable rules
1. Do not modify, delete, overwrite or reorganize archive/portfolio-2026-11-04. It is the complete original website snapshot.
2. Keep src/content.ts as the central source for project data and truthful statuses. Never invent employment, credentials, results, testimonials, dates or client relationships.
3. Preserve keyboard navigation, contrast, reduced-motion fallback and non-WebGL fallback. Never block the UI behind a 3D scene.
4. Make the design responsive at mobile, tablet and desktop breakpoints. Measure real layout behavior, not just code correctness.
5. Run npm run build before considering a change done. Keep the GitHub Actions build green.
6. Do not merge or deploy changes that could break the current GitHub Pages site before its publishing source is switched to GitHub Actions.
7. Keep personal contact details provisional until confirmed. Do not add personal phone, birthdate or private data from the archived old site.
8. Record major completed features, QA results and open issues in docs/portfolio-roadmap.md.

## Visual identity mandate
The owner chose a unique, **white-first premium glassmorphism** art direction, **not** a colorless monochrome template. White, gray and black are the *base surfaces*. When accents appear they must be **saturated, clear, vivid colors**, as in precisely art-directed premium product websites. The primary interface accent is electric cobalt blue (#075BFF); distinct project artworks may use saturated violet, sky cyan, coral and lime. Avoid dull dusty pastels, muddy gradients, random rainbow decoration or generic portfolio components. Preserve negative space, contrast, immersive 3D and purposeful motion. Keep motion performant and respect prefers-reduced-motion.

## Active status as of 2026-11-04
- Legacy source archived on main, with original images preserved.
- Premium React/TypeScript v2 is developed on feature branch and reviewed through a draft pull request.
- CI TypeScript and Vite production build pass.
- Real cross-browser screenshots, Lighthouse scores, mobile-device checks, email/domain confirmation and publishing still need verification.

## CV public document
- A one-page professional, readable/ATS-friendly PDF is built from `src/resume.json` by the dependency-free `scripts/generate-cv.mjs`. Source of truth is the JSON; do not hand-edit the generated PDF.
- Keep the CV sober (real text, plain language, dates, actual employers and links; no invented metrics, decorative portrait manipulation, visual ratings or fake certifications).
- Every Vite production build MUST generate `public/cv/Samandar_Alimov_CV.pdf` automatically, and the website MUST offer direct view/download links.
- Test real PDF response bytes and mobile navigation. Existing archive remains immutable.

## Approved public portrait (2026-11-05)
The owner explicitly approved their 3:4 cut-out photo to appear on both the public website and the downloadable CV. The source is included as optimized `public/images/samandar-portrait.webp` (transparent for site) and `public/images/samandar-portrait-cv.jpg` (white composite for the PDF). Keep natural facial features, cap and straight posture. Do not use an old photo or a generic portrait. Retain CV as a real one-page searchable PDF with a restrained, small headshot; run CI before publishing.

## Current portfolio publishing constraint (2026-11-05)
- The owner explicitly removed the experimental programming-language project from the public portfolio, CV and preview. Do not reintroduce it into public-facing artifacts without a new explicit request.
- The fourth featured project is Proactive Marketing, sourced from the owner-linked `SamandarAlimov/proactiveagency` repository. Do not fabricate launch metrics, client outcomes or production status. The CV PDF is regenerated from `src/resume.json` with each build.

## Meaningful 3D content (2026-11-05)
The hero 3D element is **not decorative filler**. It conveys the owner's concrete process: IDEA (identify a real problem) -> ENGINEERING (build it in code) -> IMPACT (deliver useful products). Keep three clearly labeled stages visible at mobile widths and a no-WebGL/reduced-motion fallback communicating exactly the same meaning. Avoid abstract knot/sphere artwork that cannot be explained. Preserve clarity, legibility, performance, and verified project claims.
