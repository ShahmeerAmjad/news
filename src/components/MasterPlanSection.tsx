import { FiDownload, FiMapPin } from "react-icons/fi";
import { motion, useTransform } from "framer-motion";
import mapPdf from "@/assets/map.pdf";
import { track } from "@/lib/pixel";
import { ScrollScene, useScene } from "@/components/lux/ScrollScene";
import { ScrubMedia } from "@/components/lux/ScrubMedia";
import { DepthLayer } from "@/components/lux/DepthLayer";
import { SplitText } from "@/components/lux/SplitText";
import { Reveal } from "@/components/lux/Reveal";

// Facility label + the scroll progress at which its legend chip ignites (dim → gold),
// in sequence, synced with the plan drawing in on the right (desktop scene only).
const FACILITIES: { label: string; at: number }[] = [
  { label: "Grand Jamia Mosque", at: 0.30 },
  { label: "80-ft Main Boulevard", at: 0.34 },
  { label: "Central Park — 10.4 Kanal", at: 0.38 },
  { label: "Community Center", at: 0.42 },
  { label: "School & Hospital", at: 0.46 },
  { label: "Sports Complex", at: 0.50 },
  { label: "Commercial Zone", at: 0.54 },
  { label: "Kids Play Area", at: 0.58 },
  { label: "24/7 Security & CCTV", at: 0.62 },
];

const PLAN_COPY =
  "Two master-planned blocks laid along an 80-ft boulevard, wrapped around a " +
  "10.4-Kanal central park — with a grand mosque, schooling, healthcare and " +
  "commercial all inside the gates. Residential plots from 3 to 10 Marla, plus " +
  "prime 4-Marla commercial.";

const MAPS_URL = "https://maps.app.goo.gl/f6oJER8r31X2gmcYA";

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

/** The two CTAs — shared by the desktop scene and the mobile layout. */
function PlanCtas() {
  return (
    <div className="mt-9 flex flex-wrap gap-4">
      <button onClick={downloadMap} className="btn-gold">
        <FiDownload /> Download Master Plan
      </button>
      <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="btn-ghost-gold">
        <FiMapPin /> View Location
      </a>
    </div>
  );
}

/** A facility legend row that illuminates (dim → full, dot glows) as the scene scrubs past `at`. */
function FacilityChip({ label, at }: { label: string; at: number }) {
  const { progress, reduced } = useScene();
  const opacity = useTransform(progress, [at - 0.03, at + 0.03], [0.28, 1]);
  const dotScale = useTransform(progress, [at - 0.03, at + 0.03], [0.5, 1]);
  return (
    <motion.div
      className="flex items-center gap-2 text-sm text-ivory"
      style={{ opacity: reduced ? 1 : opacity }}
    >
      <motion.span
        className="h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-gold shadow-[0_0_10px_1px_rgba(228,193,82,0.55)]"
        style={{ scale: reduced ? 1 : dotScale }}
      />
      {label}
    </motion.div>
  );
}

const MasterPlanSection = () => {
  return (
    <section id="master-plan" className="scroll-mt-24 relative bg-navy-950">
      {/* ── Desktop (lg+): pinned cinematic scroll act ─────────────────────── */}
      <div className="hidden lg:block">
        <ScrollScene height="300vh" pinClassName="grain">
          {/* Atmospheric background plate (parallax depth) */}
          <DepthLayer depth={0.25} className="absolute inset-0">
            <img
              src="/media/plates/masterplan-bg.jpg"
              alt=""
              aria-hidden="true"
              className="h-[140%] w-full object-cover opacity-40"
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
                <p className="mt-6 max-w-lg text-ivory/70">{PLAN_COPY}</p>

                <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
                  {FACILITIES.map((f) => (
                    <FacilityChip key={f.label} label={f.label} at={f.at} />
                  ))}
                </div>

                <PlanCtas />
              </div>

              {/* Master plan render — draws in as the scene scrubs */}
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
                  <span className="block bg-navy-950/60 py-3 text-center text-[0.65rem] uppercase tracking-[0.25em] text-gold-200">
                    Tap to open full plan (PDF)
                  </span>
                </button>
              </div>
            </div>
          </div>
        </ScrollScene>
      </div>

      {/* ── Mobile (< lg): normal-flow, animated on view (no pin, no clipping) ─ */}
      <div className="relative overflow-hidden py-24 grain lg:hidden">
        <img
          src="/media/plates/masterplan-bg.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/85 via-navy-950/65 to-navy-950" />

        <div className="lux-container relative z-10">
          <Reveal>
            <p className="lux-eyebrow mb-6">Master Plan</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display text-4xl font-medium leading-tight text-ivory">
              A community, <span className="italic text-gold-foil">thoughtfully planned.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-lg text-ivory/70">{PLAN_COPY}</p>
          </Reveal>

          <Reveal variant="scaleIn" delay={0.1}>
            <button
              onClick={downloadMap}
              className="group relative mt-8 block w-full overflow-hidden rounded-md border border-gold/20 bg-navy-900 shadow-soft"
              aria-label="Open full master plan"
            >
              <img
                src="/media/master-plan.png"
                alt="Kunjwal City master plan"
                loading="lazy"
                className="mx-auto max-h-[70vh] w-auto object-contain"
              />
              <span className="block bg-navy-950/60 py-3 text-center text-[0.65rem] uppercase tracking-[0.25em] text-gold-200">
                Tap to open full plan (PDF)
              </span>
            </button>
          </Reveal>

          {/* Per-chip delay gives a real sequential ignite (RevealGroup's stagger
              doesn't propagate because each Reveal owns its whileInView trigger). */}
          <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3">
            {FACILITIES.map((f, i) => (
              <Reveal key={f.label} variant="fadeIn" delay={i * 0.08}>
                <div className="flex items-center gap-2 text-sm text-ivory">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-gold shadow-[0_0_10px_1px_rgba(228,193,82,0.55)]" />
                  {f.label}
                </div>
              </Reveal>
            ))}
          </div>

          <PlanCtas />
        </div>
      </div>
    </section>
  );
};

export default MasterPlanSection;
