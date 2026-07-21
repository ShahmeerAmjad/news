# Cinematic Scroll — MasterPlan Flagship Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build 4 reusable scroll-motion primitives and rebuild the MasterPlan section as a pinned, Fable-tier cinematic scroll act with real Higgsfield media, preserving all CTAs and pixel events.

**Architecture:** Add scroll-progress primitives to `src/components/lux/` built on framer-motion `useScroll`/`useTransform` (already a dependency) over the existing `lenis` smooth scroll. A `ScrollScene` pins a tall section and publishes normalized `0→1` scroll progress via React context; child primitives (`ScrubMedia`, `DepthLayer`, `SplitText`, facility markers) map that progress to `transform`/`opacity` only. MasterPlan consumes them.

**Tech Stack:** React 18, TypeScript, Vite, framer-motion ^11, lenis, TailwindCSS. Higgsfield CLI (`higgsfield-generate` skill) for media.

## Global Constraints

- **Branch:** `redesign/luxury-scroll` (already checked out).
- **No test framework exists** in this repo. Per-task verification gate = (a) `npm run build` succeeds, (b) `npm run lint` reports no new errors, (c) `npx tsc --noEmit -p tsconfig.app.json` introduces **no NEW** errors beyond the pre-existing baseline (baseline already errors in `AmenitiesSection.tsx` re: lucide `strokeWidth` — unrelated), (d) visual verification in the browser via the `run` skill.
- **Reduced motion:** every primitive MUST check `useReducedMotion()` and degrade to a static, readable render.
- **GPU-only:** scroll animations use `transform` and `opacity` only. No animating layout properties (width/height/top/left/margin).
- **Brand tokens:** navy `bg-navy-950` / `#012a44`, gold (`text-gold-foil`, `text-gold-200`, `bg-gradient-gold`), ivory (`text-ivory`), `font-display`, easing `EASE = [0.16, 1, 0.3, 1]` from `src/lib/anim.ts`. Reuse — do not invent new colors.
- **Preserve exactly:** `downloadMap()`, its `track("ViewContent", { content_name: "Master Plan PDF" })` call, the "View Location" maps link, and the `FACILITIES` content array in MasterPlan. No copy changes.
- **Commit** after each task with a `feat:`/`chore:` message.

## File Structure

- Create `src/components/lux/ScrollScene.tsx` — pin + scroll-progress context (`ScrollScene`, `useScene`).
- Create `src/components/lux/ScrubMedia.tsx` — media whose scale/opacity scrub with progress.
- Create `src/components/lux/DepthLayer.tsx` — parallax plane driven by scene progress.
- Create `src/components/lux/SplitText.tsx` — per-word scroll-driven headline reveal.
- Create `public/media/plates/masterplan-bg.jpg` — Higgsfield atmospheric background plate.
- Modify `src/components/MasterPlanSection.tsx` — rebuild as cinematic scroll act using the primitives.

---

### Task 1: `ScrollScene` primitive + scroll-progress context

**Files:**
- Create: `src/components/lux/ScrollScene.tsx`

**Interfaces:**
- Produces:
  - `useScene(): { progress: MotionValue<number>; reduced: boolean }` — hook for children to read normalized `0→1` scroll progress of the enclosing scene.
  - `ScrollScene(props: { children: React.ReactNode; height?: string; className?: string; pinClassName?: string }): JSX.Element` — wraps a tall scroll region; pins an inner full-viewport track and provides scene context. `height` (default `"250vh"`) is the total scroll distance; larger = slower scrub.

- [ ] **Step 1: Create the file with full implementation**

Create `src/components/lux/ScrollScene.tsx`:

```tsx
import React, { createContext, useContext, useRef } from "react";
import { useScroll, useReducedMotion, type MotionValue } from "framer-motion";

type SceneCtx = { progress: MotionValue<number>; reduced: boolean };

const SceneContext = createContext<SceneCtx | null>(null);

/** Read the enclosing ScrollScene's normalized 0→1 scroll progress. */
export function useScene(): SceneCtx {
  const ctx = useContext(SceneContext);
  if (!ctx) {
    throw new Error("useScene() must be used inside a <ScrollScene>.");
  }
  return ctx;
}

/**
 * Pins a full-viewport track while the page scrolls through `height`, and
 * publishes 0→1 progress to descendants via useScene(). Under reduced-motion
 * it renders children in normal flow with no pin and progress frozen at 0.
 */
export function ScrollScene({
  children,
  height = "250vh",
  className,
  pinClassName,
}: {
  children: React.ReactNode;
  height?: string;
  className?: string;
  pinClassName?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  if (reduced) {
    return (
      <div ref={ref} className={className}>
        <SceneContext.Provider value={{ progress: scrollYProgress, reduced: true }}>
          {children}
        </SceneContext.Provider>
      </div>
    );
  }

  return (
    <div ref={ref} className={className} style={{ height }}>
      <div className={`sticky top-0 h-[100svh] overflow-hidden ${pinClassName ?? ""}`}>
        <SceneContext.Provider value={{ progress: scrollYProgress, reduced: false }}>
          {children}
        </SceneContext.Provider>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Typecheck introduces no new errors**

Run: `npx tsc --noEmit -p tsconfig.app.json 2>&1 | grep ScrollScene`
Expected: no output (no errors referencing ScrollScene.tsx).

- [ ] **Step 3: Build passes**

Run: `npm run build`
Expected: build completes, exit 0.

- [ ] **Step 4: Commit**

```bash
git add src/components/lux/ScrollScene.tsx
git commit -m "feat(lux): ScrollScene pin + scroll-progress context"
```

---

### Task 2: `ScrubMedia` primitive

**Files:**
- Create: `src/components/lux/ScrubMedia.tsx`

**Interfaces:**
- Consumes: `useScene` from `./ScrollScene`.
- Produces: `ScrubMedia(props)` where props =
  `{ src: string; alt: string; range?: [number, number]; scaleFrom?: number; scaleTo?: number; fadeIn?: boolean; className?: string; imgClassName?: string }`.
  Renders an image that scales from `scaleFrom`→`scaleTo` and (if `fadeIn`) fades 0→1 across the `range` slice of scene progress. `range` defaults `[0, 0.5]`, `scaleFrom` `1.06`, `scaleTo` `1`, `fadeIn` `true`.

- [ ] **Step 1: Create the file with full implementation**

Create `src/components/lux/ScrubMedia.tsx`:

```tsx
import { motion, useTransform } from "framer-motion";
import { useScene } from "./ScrollScene";

/** An image layer whose scale + opacity scrub with the enclosing scene's progress. */
export function ScrubMedia({
  src,
  alt,
  range = [0, 0.5],
  scaleFrom = 1.06,
  scaleTo = 1,
  fadeIn = true,
  className,
  imgClassName,
}: {
  src: string;
  alt: string;
  range?: [number, number];
  scaleFrom?: number;
  scaleTo?: number;
  fadeIn?: boolean;
  className?: string;
  imgClassName?: string;
}) {
  const { progress, reduced } = useScene();
  const fadeEnd = range[0] + (range[1] - range[0]) * 0.6;
  const scale = useTransform(progress, range, [scaleFrom, scaleTo]);
  const opacity = useTransform(progress, [range[0], fadeEnd], [fadeIn ? 0 : 1, 1]);

  if (reduced) {
    return (
      <div className={className}>
        <img src={src} alt={alt} loading="lazy" className={imgClassName} />
      </div>
    );
  }

  return (
    <motion.div className={className} style={{ scale, opacity, willChange: "transform, opacity" }}>
      <img src={src} alt={alt} loading="lazy" className={imgClassName} />
    </motion.div>
  );
}
```

- [ ] **Step 2: Typecheck introduces no new errors**

Run: `npx tsc --noEmit -p tsconfig.app.json 2>&1 | grep ScrubMedia`
Expected: no output.

- [ ] **Step 3: Build passes**

Run: `npm run build`
Expected: exit 0.

- [ ] **Step 4: Commit**

```bash
git add src/components/lux/ScrubMedia.tsx
git commit -m "feat(lux): ScrubMedia scroll-driven media layer"
```

---

### Task 3: `DepthLayer` primitive

**Files:**
- Create: `src/components/lux/DepthLayer.tsx`

**Interfaces:**
- Consumes: `useScene` from `./ScrollScene`.
- Produces: `DepthLayer(props)` where props =
  `{ children: React.ReactNode; depth?: number; className?: string }`.
  Translates children vertically as scene progress goes 0→1. `depth` (default `0.2`) is the fraction of travel; positive = moves down as you scroll (further/background feel). Renders a static wrapper under reduced-motion.

- [ ] **Step 1: Create the file with full implementation**

Create `src/components/lux/DepthLayer.tsx`:

```tsx
import React from "react";
import { motion, useTransform } from "framer-motion";
import { useScene } from "./ScrollScene";

/** A parallax plane inside a ScrollScene; children drift by `depth` as progress advances. */
export function DepthLayer({
  children,
  depth = 0.2,
  className,
}: {
  children: React.ReactNode;
  depth?: number;
  className?: string;
}) {
  const { progress, reduced } = useScene();
  const y = useTransform(
    progress,
    [0, 1],
    reduced ? ["0%", "0%"] : [`${-depth * 50}%`, `${depth * 50}%`]
  );

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} style={{ y, willChange: "transform" }}>
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Typecheck introduces no new errors**

Run: `npx tsc --noEmit -p tsconfig.app.json 2>&1 | grep DepthLayer`
Expected: no output.

- [ ] **Step 3: Build passes**

Run: `npm run build`
Expected: exit 0.

- [ ] **Step 4: Commit**

```bash
git add src/components/lux/DepthLayer.tsx
git commit -m "feat(lux): DepthLayer scene-driven parallax plane"
```

---

### Task 4: `SplitText` primitive

**Files:**
- Create: `src/components/lux/SplitText.tsx`

**Interfaces:**
- Consumes: `useScene` from `./ScrollScene`.
- Produces: `SplitText(props)` where props =
  `{ text: string; range?: [number, number]; className?: string; wordClassName?: string }`.
  Splits `text` on spaces and reveals each word (opacity 0→1, y `0.6em`→`0`) across an even slice of `range` (default `[0, 0.4]`). Static text under reduced-motion.

- [ ] **Step 1: Create the file with full implementation**

Create `src/components/lux/SplitText.tsx`:

```tsx
import { motion, useTransform } from "framer-motion";
import { useScene } from "./ScrollScene";

function Word({ word, start, end }: { word: string; start: number; end: number }) {
  const { progress } = useScene();
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const y = useTransform(progress, [start, end], ["0.6em", "0em"]);
  return (
    <span className="inline-block overflow-hidden align-bottom">
      <motion.span className="inline-block" style={{ opacity, y, willChange: "transform, opacity" }}>
        {word}&nbsp;
      </motion.span>
    </span>
  );
}

/** Reveals a headline word-by-word as the enclosing scene scrubs. */
export function SplitText({
  text,
  range = [0, 0.4],
  className,
}: {
  text: string;
  range?: [number, number];
  className?: string;
  wordClassName?: string;
}) {
  const { reduced } = useScene();
  const words = text.split(" ");

  if (reduced) {
    return <span className={className}>{text}</span>;
  }

  const span = range[1] - range[0];
  return (
    <span className={className}>
      {words.map((w, i) => {
        const start = range[0] + (span * i) / words.length;
        const end = range[0] + (span * (i + 1)) / words.length;
        return <Word key={`${w}-${i}`} word={w} start={start} end={end} />;
      })}
    </span>
  );
}
```

- [ ] **Step 2: Typecheck introduces no new errors**

Run: `npx tsc --noEmit -p tsconfig.app.json 2>&1 | grep SplitText`
Expected: no output.

- [ ] **Step 3: Build passes**

Run: `npm run build`
Expected: exit 0.

- [ ] **Step 4: Commit**

```bash
git add src/components/lux/SplitText.tsx
git commit -m "feat(lux): SplitText scroll-driven word reveal"
```

---

### Task 5: Generate Higgsfield background plate

**Files:**
- Create: `public/media/plates/masterplan-bg.jpg`

**Interfaces:** none (asset only). Consumed by Task 6 at path `/media/plates/masterplan-bg.jpg`.

- [ ] **Step 1: Create the plates directory**

Run: `mkdir -p public/media/plates`

- [ ] **Step 2: Generate the plate via the higgsfield-generate skill**

Invoke the `higgsfield-generate` skill with an image request. Prompt (brand-graded, architectural, per user's Higgsfield notes — use Kling/architecture-appropriate image model):

> "Cinematic aerial establishing shot of a modern gated master-planned residential community at golden hour — wide tree-lined 80-ft boulevard, central green park, low-rise villas, warm dusk light, soft atmospheric haze and depth, deep navy-blue sky graded toward #012a44, subtle gold rim light. Editorial architectural photography, ultra-wide, shallow foreground blur for parallax depth. No text, no logos, no people."

Aspect ratio: landscape (16:9 or wider). Save/download the result to `public/media/plates/masterplan-bg.jpg`.

- [ ] **Step 3: Optimize the plate**

Ensure the file is a reasonable web size (target ≤ 400 KB, max width ~2000px). If the download is larger, compress (e.g. `sips -Z 2000 public/media/plates/masterplan-bg.jpg` on macOS, or an equivalent) and re-check with `ls -lh public/media/plates/masterplan-bg.jpg`.

- [ ] **Step 4: Verify it loads**

Run: `ls -lh public/media/plates/masterplan-bg.jpg`
Expected: file exists, non-zero, ≤ ~400 KB.

- [ ] **Step 5: Commit**

```bash
git add public/media/plates/masterplan-bg.jpg
git commit -m "chore(media): Higgsfield MasterPlan atmospheric background plate"
```

---

### Task 6: Rebuild MasterPlanSection as a cinematic scroll act

**Files:**
- Modify: `src/components/MasterPlanSection.tsx` (full rewrite of the returned JSX; keep `downloadMap`, `track`, `FACILITIES`, imports for `mapPdf`).

**Interfaces:**
- Consumes: `ScrollScene`, `useScene` (`./lux/ScrollScene`), `ScrubMedia` (`./lux/ScrubMedia`), `DepthLayer` (`./lux/DepthLayer`), `SplitText` (`./lux/SplitText`).
- Produces: default-exported `MasterPlanSection` (unchanged export contract; still rendered by `src/pages/Index.tsx`).

**Design of the scroll act (progress 0→1):**
- `0.00–0.40` headline assembles (`SplitText`), background plate parallax visible (`DepthLayer` + plate).
- `0.10–0.55` master-plan render draws in (`ScrubMedia`, scale 1.06→1, fade in).
- `0.30–0.66` nine facility markers ignite one-by-one over the plan.
- CTAs + facility legend remain visible throughout (lead capture never hidden).

- [ ] **Step 1: Rewrite the component**

Replace the entire contents of `src/components/MasterPlanSection.tsx` with:

```tsx
import { FiDownload, FiMapPin } from "react-icons/fi";
import { motion, useTransform } from "framer-motion";
import mapPdf from "@/assets/map.pdf";
import { track } from "@/lib/pixel";
import { ScrollScene, useScene } from "@/components/lux/ScrollScene";
import { ScrubMedia } from "@/components/lux/ScrubMedia";
import { DepthLayer } from "@/components/lux/DepthLayer";
import { SplitText } from "@/components/lux/SplitText";

// label + position (% of plan image) + progress threshold at which the marker ignites.
// x/y are visual starting values tuned against /media/master-plan.png in Step 4.
const MARKERS: { label: string; x: number; y: number; at: number }[] = [
  { label: "Grand Jamia Mosque", x: 50, y: 30, at: 0.30 },
  { label: "80-ft Main Boulevard", x: 50, y: 52, at: 0.34 },
  { label: "Central Park — 10.4 Kanal", x: 42, y: 46, at: 0.38 },
  { label: "Community Center", x: 60, y: 44, at: 0.42 },
  { label: "School & Hospital", x: 34, y: 62, at: 0.46 },
  { label: "Sports Complex", x: 66, y: 62, at: 0.50 },
  { label: "Commercial Zone", x: 50, y: 74, at: 0.54 },
  { label: "Kids Play Area", x: 40, y: 36, at: 0.58 },
  { label: "24/7 Security & CCTV", x: 62, y: 30, at: 0.62 },
];

const FACILITIES = MARKERS.map((m) => m.label);

const downloadMap = () => {
  track("ViewContent", { content_name: "Master Plan PDF" });
  const a = document.createElement("a");
  a.href = mapPdf;
  a.download = "Kunjwal-City-Master-Plan.pdf";
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

function Marker({ label, x, y, at }: { label: string; x: number; y: number; at: number }) {
  const { progress, reduced } = useScene();
  const opacity = useTransform(progress, [at, at + 0.03], [0, 1]);
  const scale = useTransform(progress, [at, at + 0.03], [0.4, 1]);
  return (
    <motion.div
      className="absolute z-20 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2"
      style={{ left: `${x}%`, top: `${y}%`, opacity: reduced ? 1 : opacity, scale: reduced ? 1 : scale }}
    >
      <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-gradient-gold shadow-[0_0_12px_2px_rgba(228,193,82,0.6)]" />
      <span className="whitespace-nowrap rounded-sm bg-navy-950/70 px-2 py-1 text-[0.6rem] font-medium uppercase tracking-[0.15em] text-gold-200 backdrop-blur-sm">
        {label}
      </span>
    </motion.div>
  );
}

const MasterPlanSection = () => {
  return (
    <section id="master-plan" className="scroll-mt-24 relative bg-navy-950">
      <ScrollScene height="300vh" pinClassName="grain">
        {/* Atmospheric background plate (parallax depth) */}
        <DepthLayer depth={0.25} className="absolute inset-0">
          <img
            src="/media/plates/masterplan-bg.jpg"
            alt=""
            aria-hidden="true"
            className="h-[120%] w-full object-cover opacity-40"
          />
        </DepthLayer>
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/70 via-navy-950/50 to-navy-950" />
        <div className="absolute inset-0 [background:radial-gradient(120%_120%_at_50%_50%,transparent_50%,rgba(1,34,58,0.75)_100%)]" />

        {/* Content */}
        <div className="relative z-10 flex h-full items-center">
          <div className="lux-container grid w-full items-center gap-10 lg:grid-cols-[1fr_0.9fr]">
            {/* Copy + legend + CTAs */}
            <div>
              <p className="lux-eyebrow mb-6">Master Plan</p>
              <h2 className="font-display text-4xl font-medium leading-tight text-ivory md:text-6xl">
                <SplitText text="A community, thoughtfully planned." range={[0, 0.35]} />
              </h2>
              <p className="mt-6 max-w-lg text-ivory/70">
                Two master-planned blocks laid along an 80-ft boulevard, wrapped around a
                10.4-Kanal central park — with a grand mosque, schooling, healthcare and
                commercial all inside the gates. Residential plots from 3 to 10 Marla, plus
                prime 4-Marla commercial.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
                {FACILITIES.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm text-ivory/75">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-gold" />
                    {f}
                  </div>
                ))}
              </div>

              <div className="mt-9 flex flex-wrap gap-4">
                <button onClick={downloadMap} className="btn-gold">
                  <FiDownload /> Download Master Plan
                </button>
                <a
                  href="https://maps.app.goo.gl/f6oJER8r31X2gmcYA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost-gold"
                >
                  <FiMapPin /> View Location
                </a>
              </div>
            </div>

            {/* Master plan render + igniting markers */}
            <div className="relative">
              <button
                onClick={downloadMap}
                className="group relative block w-full overflow-hidden rounded-md border border-gold/20 bg-navy-900 shadow-soft"
                aria-label="Open full master plan"
              >
                <ScrubMedia
                  src="/media/master-plan.png"
                  alt="Kunjwal City master plan"
                  range={[0.1, 0.55]}
                  className="mx-auto max-h-[68vh] w-auto"
                  imgClassName="mx-auto max-h-[68vh] w-auto object-contain transition-transform duration-700 group-hover:scale-[1.03]"
                />
                {MARKERS.map((m) => (
                  <Marker key={m.label} {...m} />
                ))}
                <span className="block bg-navy-950/60 py-3 text-center text-[0.65rem] uppercase tracking-[0.25em] text-gold-200">
                  Tap to open full plan (PDF)
                </span>
              </button>
            </div>
          </div>
        </div>
      </ScrollScene>
    </section>
  );
};

export default MasterPlanSection;
```

- [ ] **Step 2: Typecheck introduces no new errors**

Run: `npx tsc --noEmit -p tsconfig.app.json 2>&1 | grep MasterPlan`
Expected: no output.

- [ ] **Step 3: Build passes**

Run: `npm run build`
Expected: exit 0.

- [ ] **Step 4: Visual verification + marker tuning (browser)**

Use the `run` skill to start the dev server (`npm run dev`) and open the page; scroll to `#master-plan`. Confirm:
- Section pins; headline assembles word-by-word.
- Plan render scales/fades in.
- All 9 markers ignite in sequence.
- Markers sit sensibly over the plan — if any marker overlaps badly, adjust its `x`/`y` in the `MARKERS` array and reload. (These are the only values expected to need visual tuning.)
- CTAs work: "Download Master Plan" triggers the PDF download; "View Location" opens maps.
- Test reduced-motion (OS "Reduce Motion" on): section renders static, readable, CTAs intact.

- [ ] **Step 5: Lint**

Run: `npm run lint`
Expected: no new errors in `MasterPlanSection.tsx` or the `lux/` files.

- [ ] **Step 6: Commit**

```bash
git add src/components/MasterPlanSection.tsx
git commit -m "feat(masterplan): cinematic pinned scroll act with igniting facility markers"
```

---

### Task 7: Performance + regression verification pass

**Files:** none created; verification + targeted fixes only.

- [ ] **Step 1: Production build + preview**

Run: `npm run build && npm run preview`
Open the preview URL via the `run` skill.

- [ ] **Step 2: Verify no layout jank**

Scroll through the whole page (Hero → Footer). Confirm the pinned MasterPlan does not cause scroll jumps, the surrounding sections (PlansSection above, AmenitiesSection below) still flow correctly, and there is no horizontal overflow on mobile widths (test at 390px via browser devtools).

- [ ] **Step 3: Verify lead-path integrity**

Confirm the registration form, WhatsApp CTAs, and StickyCTA still work, and that MasterPlan's `track()` pixel event fires (check console/network for the pixel call on "Download Master Plan").

- [ ] **Step 4: Verify reduced-motion end-to-end**

With OS Reduce Motion enabled, reload: MasterPlan is a static two-column-ish layout, all content readable, no pin.

- [ ] **Step 5: Commit any fixes**

If Steps 2–4 required adjustments (e.g. `height` tuning on `ScrollScene`, overflow fix), commit them:

```bash
git add -A
git commit -m "fix(masterplan): performance + mobile scroll polish"
```

---

## Self-Review

**Spec coverage:**
- ✅ 4 reusable primitives (`ScrollScene` T1, `ScrubMedia` T2, `DepthLayer` T3, `SplitText` T4).
- ✅ MasterPlan pinned cinematic act with igniting markers (T6).
- ✅ Higgsfield net-new plate generated + wired (T5, consumed T6).
- ✅ Reduced-motion safety (every primitive + T6 Marker + T4/T6 verification).
- ✅ Performance discipline / no regression / lead-path intact (T7).
- ✅ CTAs, `downloadMap`, `track`, `FACILITIES` preserved (T6 Step 1 code).
- ✅ Full-experience-optimized mobile (plate ≤400KB T5; overflow + 390px checks T7).

**Placeholder scan:** No TBD/TODO. All code blocks complete. `MARKERS` x/y are concrete starting values with an explicit visual-tune step (T6 Step 4) — not placeholders.

**Type consistency:** `useScene()` returns `{ progress, reduced }` (T1) and is consumed with those exact names in T2/T3/T4/T6. `ScrollScene`/`ScrubMedia`/`DepthLayer`/`SplitText` prop shapes in the Interfaces blocks match their implementations and their usage in T6.

## Out of scope (do not implement here)
- Hero section changes.
- Rollout to Amenities/Gallery/Location (separate follow-on plans, same primitives).
- Any test-framework installation.
