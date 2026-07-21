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
