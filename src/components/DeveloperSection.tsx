import { Reveal, RevealGroup } from "@/components/lux/Reveal";
import { Counter } from "@/components/lux/Counter";

type Stat = {
  value: number;
  suffix: string;
  label: string;
};

// Confirmed facts about the project — no unverifiable track-record claims.
const STATS: Stat[] = [
  { value: 200, suffix: "+", label: "Kanals gated" },
  { value: 36, suffix: "", label: "Month easy plan" },
  { value: 24, suffix: "/7", label: "Security" },
  { value: 1, suffix: "", label: "Grand Mosque" },
];

const DeveloperSection = () => {
  return (
    <section
      id="developer"
      className="grain bg-navy-radial relative scroll-mt-24 overflow-hidden py-24 text-ivory md:py-32"
    >
      {/* Ambient depth */}
      <div className="pointer-events-none absolute -right-24 top-1/4 h-72 w-72 rounded-full bg-gold/10 blur-[130px]" />

      <div className="lux-container relative">
        {/* Header — editorial split: title left, narrative right */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="lux-eyebrow mb-6">The Developer</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-display text-4xl font-medium leading-[1.05] tracking-tight text-ivory md:text-6xl">
                Built by{" "}
                <span className="italic text-gold-foil">AYS Developers.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="lux-rule mt-10 max-w-xs" />
            </Reveal>
          </div>

          <div className="lg:col-span-7 lg:pt-3">
            <RevealGroup className="space-y-6" gap={0.14}>
              <Reveal>
                <p className="text-base leading-relaxed text-ivory/75 md:text-lg">
                  Kunjwal City is proudly developed by{" "}
                  <span className="text-ivory">AYS Developers (Pvt.) Ltd.</span>{" "}
                  — a trusted name in Pakistani real estate, built on an unwavering
                  commitment to quality, integrity and long-term value.
                </p>
              </Reveal>
              <Reveal>
                <p className="text-base leading-relaxed text-ivory/75 md:text-lg">
                  With transparent dealing, modern infrastructure and a proven
                  discipline of delivering what is promised, AYS Developers stand
                  behind every plot, every avenue and every family who calls this
                  community home.
                </p>
              </Reveal>
            </RevealGroup>
          </div>
        </div>

        {/* Stat-counter strip */}
        <Reveal delay={0.05}>
          <div className="lux-rule mt-16 md:mt-24" />
        </Reveal>
        <RevealGroup
          className="grid grid-cols-2 gap-x-8 gap-y-10 pb-2 pt-12 md:grid-cols-4 md:divide-x md:divide-gold/15"
          gap={0.12}
        >
          {STATS.map((s) => (
            <Reveal key={s.label} className="md:px-8 md:first:pl-0">
              <div className="lux-num text-4xl font-semibold text-gold-200 md:text-5xl">
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <p className="mt-3 text-[0.7rem] uppercase tracking-[0.22em] text-ivory/55">
                {s.label}
              </p>
            </Reveal>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
};

export default DeveloperSection;
