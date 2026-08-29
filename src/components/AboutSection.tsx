import { Reveal, RevealGroup } from "@/components/lux/Reveal";
import { Parallax } from "@/components/lux/Parallax";
import { Counter } from "@/components/lux/Counter";
import aboutImg from "@/assets/New/8.jpg";

const PARAGRAPHS = [
  "Kunjwal City, Gujrat is proudly developed by AYS Developers (Pvt.) Ltd. — a trusted name in Pakistani real estate. With an unwavering commitment to quality, integrity and long-term value, AYS Developers continue to set new standards in residential and commercial development.",
  "Backed by visionary leadership and a forward-looking approach to urban planning, the company focuses on customer satisfaction, modern infrastructure and community-driven development. Every project reflects excellence, transparency and reliability.",
  "With a proven track record of delivering sustainable, well-planned communities, AYS Developers position Kunjwal City not just as a place to live — but a place to thrive.",
];

const AboutSection = () => {
  return (
    <section
      id="about"
      className="grain bg-navy-radial relative scroll-mt-24 overflow-hidden py-24 text-ivory md:py-32"
    >
      <div className="lux-container">
        <Reveal>
          <p className="lux-eyebrow mb-6">The Developer</p>
        </Reveal>

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Text column */}
          <div className="lg:col-span-7">
            <Reveal delay={0.05}>
              <h2 className="font-display text-4xl font-medium leading-[1.05] tracking-tight text-ivory md:text-6xl">
                AYS Developers
                <span className="mt-2 block text-2xl italic text-gold-foil md:text-4xl">
                  Building trust, creating value.
                </span>
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="lux-rule mt-10 max-w-xs" />
            </Reveal>

            <RevealGroup className="mt-10 space-y-6" gap={0.14}>
              {PARAGRAPHS.map((p, i) => (
                <Reveal key={i}>
                  <p className="max-w-2xl text-base leading-relaxed text-ivory/75 md:text-lg">
                    {p}
                  </p>
                </Reveal>
              ))}
            </RevealGroup>
          </div>

          {/* Image column */}
          <div className="lg:col-span-5">
            <Reveal variant="scaleIn" delay={0.1}>
              <div className="relative overflow-hidden rounded-sm border border-gold/20">
                <Parallax speed={0.22} className="aspect-[3/4] w-full">
                  <img
                    src={aboutImg}
                    alt="AYS Developers — Kunjwal City residential render"
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full scale-105 object-cover"
                  />
                </Parallax>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/50 via-transparent to-transparent" />
              </div>
            </Reveal>
          </div>
        </div>

        {/* Stat row */}
        <Reveal delay={0.05}>
          <div className="lux-rule mt-16 md:mt-24" />
        </Reveal>
        <RevealGroup
          className="grid grid-cols-2 gap-x-8 gap-y-10 py-12 md:grid-cols-4 md:divide-x md:divide-gold/15"
          gap={0.12}
        >
          <Reveal className="md:px-8 md:first:pl-0">
            <div className="font-display text-4xl font-medium text-gold-200 md:text-5xl">
              <Counter value={200} suffix="+" />
            </div>
            <p className="mt-3 text-[0.7rem] uppercase tracking-[0.22em] text-ivory/55">
              Kanals
            </p>
          </Reveal>

          <Reveal className="md:px-8">
            <div className="font-display text-4xl font-medium text-gold-200 md:text-5xl">
              <Counter value={100} suffix="%" />
            </div>
            <p className="mt-3 text-[0.7rem] uppercase tracking-[0.22em] text-ivory/55">
              Transparent dealing
            </p>
          </Reveal>

          <Reveal className="md:px-8">
            <div className="font-display text-4xl font-medium text-gold-200 md:text-5xl">
              5·7·10
            </div>
            <p className="mt-3 text-[0.7rem] uppercase tracking-[0.22em] text-ivory/55">
              Marla plots
            </p>
          </Reveal>

          <Reveal className="md:px-8">
            <div className="font-display text-4xl font-medium text-gold-200 md:text-5xl">
              24/7
            </div>
            <p className="mt-3 text-[0.7rem] uppercase tracking-[0.22em] text-ivory/55">
              Gated security
            </p>
          </Reveal>
        </RevealGroup>
      </div>
    </section>
  );
};

export default AboutSection;
