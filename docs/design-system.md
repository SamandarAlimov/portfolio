# OBJECT / COLOR — Portfolio visual system

## Intent
Not another portfolio template. The site should feel like a digital design exhibition built by a software engineer: restrained, tactile, spatial, confident and personal.

## Core palette
- Gallery paper: #f4f4f1
- White display: #fafaf8 / #fdfdfb
- Gray section: #eeeeec / #e7e8e5
- Graphite: #17191b / #1e2123
- Body gray: #62656a
- Hardware silver: #c4c8cd
- Frosted glass: white / 65–79% alpha, blur 23px
- Core site surfaces stay white, gray and black; these are the canvas, **not a ban on color**.
- Interface accent: electric cobalt **#075BFF** for the hero accent, active controls and primary actions.
- Project accent pigments: vivid violet **#692CFF**, luminous cyan **#00B8FB**, hot coral **#FF4E20**, electric lime **#BDFF18**. Use deliberately as individually art-directed project panels.
- Saturation is intentionally high whenever color is present. No dusty washed-out pastels, dirty desaturated fades or all-gray graphics. Preserve clear contrast and restraint around the saturated areas.

## Typography
- Manrope: engineered, precise main display type, condensed by tight tracking.
- Instrument Serif Italic: editorial punctuation to give the oversized headlines tension.
- DM Sans: functional copy and controls.
- Use dramatic negative space, but never sacrifice legibility on mobile.

## Signature composition
1. Fixed floating translucent nav capsule.
2. Oversized editorial hero beside a frosted, interactive *real-project dossier* — the work is the visual meaning.
3. Selected work showcase: real portfolio summaries from `src/content.ts`, actual URLs and code links, accurate release status, and selection by buttons, arrows or horizontal swipe. No arbitrary symbolic sculpture or fictional UI screenshot.
4. White floating cards around distinctly vivid project artwork: violet / cyan / coral / lime, variable bento spans and gallery/index interaction.
5. Toolset as accordion; timeline as technical record; contact as an inverted charcoal slab.
6. Subtle scroll reveals, pointer-driven material accents, and a crisp electric-blue progress line. The hero has no WebGL dependency.

## Color hierarchy
Neutral backgrounds occupy the majority of the screen. Use electric blue sparingly for global action, highlights and the selected project dossier. Use saturated complementary hues only as deliberate visual identities inside the work gallery. Saturation should be bold, but geometry, typography and layout remain refined; never add arbitrary colored sections simply to make the site louder.

## Interaction & performance
- Use Framer Motion and CSS easing for modest movement, never animation for animation's sake.
- The hero uses no 3D runtime. Respect prefers-reduced-motion; make the project switch keyboard and touch accessible.
- Ensure 320px–wide screens work, no accidental horizontal overflow, keyboard access and visible focus rings.
- No generic metric counters, fabricated client testimonials or stock imagery presented as projects.

## Notes
Project artworks are abstract branded studies, not actual screenshots. Replace with verified project visuals during future content review. Old website lives untouched under archive/portfolio-2026-11-04/. Publishing remains gated on passing build and real viewport QA.
