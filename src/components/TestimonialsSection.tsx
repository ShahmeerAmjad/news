import { Star } from "lucide-react";
import { Reveal, RevealGroup } from "@/components/lux/Reveal";
import { Counter } from "@/components/lux/Counter";
import { Placeholder } from "@/components/lux/Placeholder";

type Testimonial = {
  quote: string;
  name: string;
  meta: string;
};

/**
 * Placeholder testimonials — the client will supply real buyer quotes, names
 * and photos. Bracketed copy marks every field that must be replaced.
 */
const TESTIMONIALS: Testimonial[] = [
  {
    quote: "[Testimonial quote — client to supply]",
    name: "[Buyer name]",
    meta: "[Plot size · Location]",
  },
  {
    quote: "[Testimonial quote — client to supply]",
    name: "[Buyer name]",
    meta: "[Plot size · Location]",
  },
  {
    quote: "[Testimonial quote — client to supply]",
    name: "[Buyer name]",
    meta: "[Plot size · Location]",
  },
];

const STATS = [
  { value: 0, suffix: "+", label: "Plots booked", placeholder: "[N]" },
  { value: 0, suffix: "+", label: "Happy families", placeholder: "[N]" },
  { value: 200, suffix: "+", label: "Kanals", placeholder: null },
];

const StarRow = () => (
  <div className="flex items-center gap-1" aria-label="5 out of 5 stars">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} className="h-4 w-4 fill-gold-400 text-gold-400" strokeWidth={1} />
    ))}
  </div>
);

const TestimonialsSection = () => {
  return (
    <section
      id="testimonials"
      className="scroll-mt-24 relative overflow-hidden bg-ivory py-24 md:py-32"
    >
      {/* Ambient warmth */}
      <div className="pointer-events-none absolute -right-24 top-1/4 h-72 w-72 rounded-full bg-gold/10 blur-[130px]" />

      <div className="lux-container relative">
        {/* Header */}
        <div className="max-w-2xl">
          <Reveal>
            <p className="lux-eyebrow mb-6">What Buyers Say</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display text-4xl font-medium leading-[1.05] tracking-tight text-navy-900 md:text-6xl">
              Trusted by{" "}
              <span className="italic text-gold-foil">families.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-navy-900/70 md:text-lg">
              Real words from the people who now call Kunjwal City home. Their
              stories reflect the trust, security and value at the heart of our
              community.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="lux-rule mt-12 mb-12" />
        </Reveal>

        {/* Testimonial cards */}
        <RevealGroup className="grid gap-5 md:grid-cols-3 md:gap-6">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={i} className="h-full">
              <article className="group flex h-full flex-col rounded-sm border border-gold-700/20 bg-porcelain p-7 shadow-[0_20px_50px_-30px_rgba(1,34,58,0.35)] transition-all duration-500 hover:-translate-y-1.5 hover:border-gold-700/40 hover:shadow-[0_30px_60px_-30px_rgba(1,34,58,0.45)]">
                <StarRow />

                <blockquote className="mt-5 flex-1 font-display text-xl italic leading-snug text-navy-900/85 md:text-2xl">
                  {t.quote}
                </blockquote>

                <div className="mt-7 flex items-center gap-4">
                  <Placeholder
                    ratio="1 / 1"
                    label="BUYER PHOTO"
                    dims="200×200"
                    onDark={false}
                    className="h-16 w-16 shrink-0 overflow-hidden rounded-full border border-gold-700/25"
                  />
                  <div>
                    <p className="font-display text-lg text-navy-900">{t.name}</p>
                    <p className="text-[0.78rem] uppercase tracking-[0.16em] text-gold-700">
                      {t.meta}
                    </p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </RevealGroup>

        {/* Social-proof stat strip */}
        <Reveal delay={0.1}>
          <div className="mt-14 rounded-sm border border-gold-700/20 bg-porcelain/70 px-6 py-8 md:px-10">
            <div className="grid gap-8 sm:grid-cols-3">
              {STATS.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="lux-num text-4xl font-semibold text-gold-700 md:text-5xl">
                    {s.placeholder ? (
                      <span>
                        {s.placeholder}
                        {s.suffix}
                      </span>
                    ) : (
                      <Counter value={s.value} suffix={s.suffix} />
                    )}
                  </div>
                  <p className="mt-2 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-navy-900/60">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <a
                href="[Zameen listing URL]"
                className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-navy-900/70 transition-colors hover:text-gold-700"
              >
                Also listed on Zameen
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  &rarr;
                </span>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default TestimonialsSection;
