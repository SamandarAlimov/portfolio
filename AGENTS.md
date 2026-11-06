# Portfolio agent instructions

## Mission
Evolve this repository into a professional, fast, accessible, visually distinctive personal website that proves practical engineering through real work, with meaningful interactions and accurate personal information. Preferred stack: React, TypeScript, JavaScript, Vite and Framer Motion.

## Non-negotiable rules
1. Do not modify, delete, overwrite or reorganize archive/portfolio-2026-11-04. It is the complete original website snapshot.
2. Keep src/content.ts as the central source for project data and truthful statuses. Never invent employment, credentials, results, testimonials, dates or client relationships.
3. Preserve keyboard navigation, contrast and reduced-motion behavior. Avoid WebGL in the hero unless the owner specifically requests it again.
4. Make the design responsive at mobile, tablet and desktop breakpoints. Measure real layout behavior, not just code correctness.
5. Run npm run build before considering a change done. Keep the GitHub Actions build green.
6. Do not merge or deploy changes that could break the current GitHub Pages site before its publishing source is switched to GitHub Actions.
7. Keep personal contact details provisional until confirmed. Do not add personal phone, birthdate or private data from the archived old site.
8. Record major completed features, QA results and open issues in docs/portfolio-roadmap.md.

## Visual identity mandate
The owner chose a unique, **white-first premium glassmorphism** art direction, **not** a colorless monochrome template. White, gray and black are the *base surfaces*. When accents appear they must be **saturated, clear, vivid colors**, as in precisely art-directed premium product websites. The primary interface accent is electric cobalt blue (#075BFF); distinct project artworks may use saturated violet, sky cyan, coral and lime. Avoid dull dusty pastels, muddy gradients, random rainbow decoration or generic portfolio components. Preserve negative space, contrast, readable product case previews and purposeful motion. Keep motion performant and respect prefers-reduced-motion.

## Current state as of 2026-11-06
- Legacy website archived and untouched.
- Premium React/TypeScript site deployed on main; CV includes two A4 pages and is generated at build.
- Hero is a genuine project showcase, not a simulated 3D explanation.
- GitHub Actions verifies production build and browser smoke tests. Real-device QA and Lighthouse audits remain useful.

## CV public document
- A two-page professional, readable/ATS-friendly PDF is built from `src/resume.json` by the dependency-free `scripts/generate-cv.mjs`. Source of truth is the JSON; do not hand-edit the generated PDF.
- Keep the CV sober (real text, plain language, dates, actual employers and links; no invented metrics, decorative portrait manipulation, visual ratings or fake certifications).
- Every Vite production build MUST generate `public/cv/Samandar_Alimov_CV.pdf` automatically, and the website MUST offer direct view/download links.
- Test real PDF response bytes and mobile navigation. Existing archive remains immutable.

## Approved public portrait (2026-11-05)
The owner explicitly approved their 3:4 cut-out photo to appear on both the public website and the downloadable CV. The source is included as optimized `public/images/samandar-portrait.webp` (transparent for site) and `public/images/samandar-portrait-cv.jpg` (white composite for the PDF). Keep natural facial features, cap and straight posture. Do not use an old photo or a generic portrait. Retain CV as a real two-page searchable PDF with a restrained, small headshot; run CI before publishing.

## Current portfolio publishing constraint (2026-11-05)
- The owner explicitly removed the experimental programming-language project from the public portfolio, CV and preview. Do not reintroduce it into public-facing artifacts without a new explicit request.
- The fourth featured project is Proactive Marketing, sourced from the owner-linked `SamandarAlimov/proactiveagency` repository. Do not fabricate launch metrics, client outcomes or production status. The CV PDF is regenerated from `src/resume.json` with each build.

## Featured project proof, not decorative 3D (2026-11-06)
The owner rejected both the arbitrary torus knot and symbolic IDEA/ENGINEERING/IMPACT 3D objects. The home hero must communicate concrete developer work: an accessible, interactive project showcase built from the genuine `src/content.ts` records. Show clearly whether each project is live or in development, link to real public work or source, never pretend case-study artwork is a screenshot and never invent KPIs. Do NOT reintroduce speculative 3D/metaphors without explicit approval. On mobile, selection buttons and swipe work; respect reduced-motion and keyboard access. Keep the rest of the site, public CV, Proactive and collaborative cases unchanged.

## 2026-11-06 — Team project attribution
- Ten historical projects/engagements from a former teammate's resume are now presented as **collaborative work**, not the founder's sole-authored achievements or employment at those companies.
- Source is the owner's statement of working together, plus the teammate's supplied 2-page CV. Precise owner role, timeframe, team stack, production status and numerical improvements have NOT been independently verified.
- Do not transfer the teammate's private contact information, employment dates, KPI percentages, individual achievements or skills to the owner's public identity.
- The English-learning company mentioned in the friend's resume must be EXCLUDED from portfolio, CV and public index by owner request.
- A two-page A4 searchable PDF (page 1 career and core projects, page 2 ten collaborative works) is generated at build. Keep this readable; do not compress all ten cases into a one-page wall of text.
