# Cinematic Scroll — MasterPlan Flagship + Reusable Motion System

**Date:** 2026-07-21
**Branch:** `redesign/luxury-scroll`
**Status:** Approved design, ready for implementation plan

## Goal

Take the Kunjwal City site "to another level" with Fable-tier cinematic
scroll-scrub animation — content that transforms as a function of scroll
position, not just fading in on view. Build a **reusable motion system**, prove
it end-to-end on a **flagship section (MasterPlan)** with real Higgsfield media,
then roll the proven primitives across the rest of the site.

The Hero section is explicitly **out of scope** — the user is happy with it as-is.

## Decisions (locked)

| Decision | Choice |
|----------|--------|
| Ambition | Cinematic scroll-scrub (Fable-tier), not just elevated reveals |
| Media role | Higgsfield section plates + existing cinematic video slots |
| Mobile | Full experience, optimized (compressed assets, lazy-load, GPU-only transforms) |
| Build order | Flagship slice first (MasterPlan), then roll out |
| Flagship | **MasterPlan** — currently a plain text list, biggest untapped upside |
| Media timing | Generate net-new plates now via Higgsfield |
| Build tooling | Claude Fable 5 model via `frontend-design` skill for motion components; Higgsfield for media |

## Architecture: reusable motion primitives (`src/components/lux/`)

All primitives respect `useReducedMotion` and reuse the existing `EASE`
(`[0.16, 1, 0.3, 1]`) curve. Built on framer-motion `useScroll`/`useTransform`
+ existing `lenis` smooth scroll — **no new heavy dependencies**.

1. **`ScrollScene`** — pins a section (sticky inner track) while its children
   scrub against a normalized `0→1` scroll progress. Exposes progress via context
   or render-prop so children map their own transforms. This is the core Fable move.

2. **`ScrubMedia`** — a media layer (img/video) whose `scale`, `opacity`, and
   clip/mask are driven by scroll progress. Used for the plan plate drawing in.

3. **`DepthLayer`** — extends the existing `Parallax` into multi-plane depth:
   background / mid / foreground move at different rates for parallax depth.

4. **`SplitText`** — extends the existing `wordUp` variant into per-word/line
   reveals tied to scroll progress (assemble-as-you-scroll headlines).

Each primitive: single clear purpose, typed props, independently testable,
degrades to a static render under reduced-motion.

## Flagship: MasterPlan cinematic reveal

Current state (`src/components/MasterPlanSection.tsx`): two-column grid — copy +
facility text list on the left, a static `/media/master-plan.png` render on the
right that links to the PDF.

Target state — a pinned scroll act:

1. Section pins via `ScrollScene`.
2. As progress advances, the **master-plan plate draws in** (`ScrubMedia`:
   scale from ~1.06→1.0, opacity/clip reveal) over an atmospheric background
   `DepthLayer`.
3. The **9 facility markers ignite one-by-one** in sequence, mapped to progress
   thresholds — each a gold pin + label over the plan, using the existing
   `FACILITIES` array (no content change).
4. Headline assembles via `SplitText`.
5. CTAs (Download Master Plan, View Location) and the `track()` /
   `downloadMap()` behavior are **preserved exactly** — no regression to the
   PDF download or Meta pixel event.

Mobile: same choreography with a shorter pin distance and lighter background
plate; if reduced-motion, renders the current static two-column layout.

## Higgsfield media

Existing media is already present and will be **reused, not regenerated**:
`master-plan.png`, `mosque-broll.mp4`, `hero-cinematic.mp4`, etc.

Net-new generation for this slice (via `higgsfield-generate` skill, brand grade
= navy `#012a44` / gold foil / ivory, cinematic):

- **MasterPlan atmospheric background plate** → `/media/plates/masterplan-bg.jpg`
  — soft aerial/golden-hour depth layer sitting behind the plan render for the
  `DepthLayer` parallax. Kling/architecture per user's Higgsfield notes.

Poster/first-frame extracted where a plate backs any future video. Delivered
optimized (sized, compressed, `webp`/`jpg`).

## Performance discipline (non-negotiable — this is a lead-gen site)

- Scroll animation uses **`transform` + `opacity` only** (GPU); `will-change`
  scoped and removed after settle; no layout-thrashing reads in scroll handlers.
- Plate media lazy-loads; poster paints first.
- Pin math uses a single `useScroll` per scene, memoized transforms.
- **Acceptance:** no regression to LCP/CLS vs. current page; verified on a
  throttled mobile profile before the slice is considered done. Lead form,
  WhatsApp CTAs, and pixel/`track()` events all continue to fire.

## Rollout after flagship approval

Same three primitives applied as small, independently reviewable passes, in
priority order:

1. Amenities → `DepthLayer` grid
2. Gallery → layered depth-scroll
3. Location, Developer, Video → depth/scrub polish

No re-architecting — each later section is assembled from the proven primitives.

## Out of scope

- Hero section (kept as-is)
- Scroll-scrub frame-by-frame image sequences (deferred; not needed for MasterPlan)
- Any change to copy, lead form, webhook, or pixel events
- Unrelated refactoring

## Success criteria

- MasterPlan renders as a pinned cinematic scroll act on desktop and mobile.
- Four reusable `lux/` primitives exist, typed, reduced-motion safe.
- Higgsfield background plate generated and wired in.
- No LCP/CLS regression; all CTAs + pixel events intact.
- Pattern is documented well enough to roll to the next section without redesign.
