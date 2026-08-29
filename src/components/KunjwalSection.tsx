import { Reveal, RevealGroup } from "@/components/lux/Reveal";
import { Parallax } from "@/components/lux/Parallax";
import kunjwalImage from "@/assets/New/6.jpg";

const PLOT_TYPES = [
  {
    title: "Residential Plots",
    size: "3 to 13 Marla",
    note: "5, 7 & 10 Marla most popular",
  },
  {
    title: "Commercial Plots",
    size: "4 to 8 Marla",
    note: "Prime frontage locations",
  },
];

const KunjwalSection = () => {
  const requestPaymentPlan = () =>
    document.getElementById("register")?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <section
      id="overview"
      className="bg-ivory relative scroll-mt-24 py-24 text-navy-900 md:py-32"
    >
      <div className="lux-container">
        <Reveal>
          <p className="lux-eyebrow mb-6">The Community</p>
        </Reveal>

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left column */}
          <div>
            <Reveal delay={0.05}>
              <h2 className="font-display text-4xl font-medium leading-[1.05] tracking-tight text-navy-900 md:text-6xl">
                Kunjwal City,{" "}
                <span className="italic text-gold-foil">Gujrat.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-8 max-w-xl text-base leading-relaxed text-navy-900/70 md:text-lg">
                Spread across 200+ Kanals, Kunjwal City is a fully gated,
                master-planned community on Sargodha Road — designed around
                modern infrastructure, wide carpeted roads and green open
                spaces, where families can put down roots with confidence.
              </p>
            </Reveal>

            <RevealGroup
              className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2"
              gap={0.12}
            >
              {PLOT_TYPES.map((plot) => (
                <Reveal key={plot.title}>
                  <div className="h-full rounded-sm border border-gold-700/25 bg-porcelain p-6 transition-colors duration-500 hover:border-gold-700/60">
                    <h3 className="font-display text-2xl font-medium text-navy-900">
                      {plot.title}
                    </h3>
                    <p className="mt-1 text-xl font-medium text-gold-700">
                      {plot.size}
                    </p>
                    <div className="lux-rule my-4 opacity-40" />
                    <p className="text-sm uppercase tracking-[0.14em] text-navy-900/55">
                      {plot.note}
                    </p>
                  </div>
                </Reveal>
              ))}
            </RevealGroup>

            <Reveal delay={0.1}>
              <button
                onClick={requestPaymentPlan}
                className="btn-gold mt-10"
              >
                Request Payment Plan
              </button>
            </Reveal>
          </div>

          {/* Right image */}
          <Reveal variant="scaleIn" delay={0.1}>
            <div className="relative overflow-hidden rounded-sm border border-gold-700/25">
              <Parallax speed={0.2} className="aspect-[4/5] w-full lg:aspect-[3/4]">
                <img
                  src={kunjwalImage}
                  alt="Kunjwal City master-planned community render"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full scale-105 object-cover"
                />
              </Parallax>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default KunjwalSection;
