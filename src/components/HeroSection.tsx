import { motion, useReducedMotion } from "framer-motion";
import { FiArrowDown, FiShield } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import heroImg from "@/assets/IMG-20250920-WA0010.jpg";
import { AmbientVideo } from "@/components/lux/AmbientVideo";
import { EASE, stagger, wordUp, fadeUp } from "@/lib/anim";
import { track } from "@/lib/pixel";

const HERO_WA = "https://wa.me/923111786602?text=" +
  encodeURIComponent("Hello! I'm interested in booking a plot at Kunjwal City. Please share the payment plan.");

/**
 * The hero loop. AmbientVideo decides whether to fetch it at all (see that
 * component); the poster render carries the hero everywhere it doesn't.
 *
 * Fresh filename on purpose: /media/* is cached `immutable`, so reusing a name
 * would serve the old clip from browser cache. Bump the name when the video changes.
 */
const HERO_VIDEO = "/media/hero-cinematic.mp4";

// Rendered as two lines: ivory first line, italic gold second line.
const HEADLINE = ["Humara", "Khaab,"];
const HEADLINE_ACCENT = "Aapka Ghar.";

const STATS = [
  { k: "200+", v: "Kanals gated" },
  { k: "5·7·10", v: "Marla plots" },
  { k: "24/7", v: "Security" },
  { k: "1", v: "Grand Mosque" },
];

const HeroSection = () => {
  const reduce = useReducedMotion();

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <section id="top" className="grain relative flex h-[100svh] min-h-[640px] w-full flex-col overflow-hidden bg-navy-950">
      {/* Media layer */}
      <div className="absolute inset-0 bg-navy-950">
        {/* Poster render always paints; the loop layers on top when it's worth fetching */}
        <AmbientVideo
          src={HERO_VIDEO}
          poster={heroImg}
          alt="Kunjwal City modern villas"
          kenBurns
          priority
        />
        {/* Cinematic grade */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/45 to-navy-950/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/85 via-navy-950/25 to-transparent" />
        <div className="absolute inset-0 [background:radial-gradient(120%_120%_at_50%_50%,transparent_55%,rgba(1,34,58,0.7)_100%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-1 items-center">
        <div className="lux-container w-full">
          <motion.div variants={stagger(0.14, 0.2)} initial="hidden" animate="show" className="max-w-3xl">
            <motion.p variants={fadeUp} className="lux-eyebrow mb-7">
              Kunjwal City · Gujrat
            </motion.p>

            <h1 className="font-hero text-[2.15rem] font-medium leading-[1.08] tracking-[0.02em] text-ivory sm:text-[3.4rem] lg:text-[4.8rem]">
              <span className="flex flex-wrap gap-x-4">
                {HEADLINE.map((w, i) => (
                  <span key={i} className="overflow-hidden py-1">
                    <motion.span variants={wordUp} className="inline-block">
                      {w}
                    </motion.span>
                  </span>
                ))}
              </span>
              <span className="block overflow-hidden py-1">
                <motion.span variants={wordUp} className="inline-block text-gold-foil">
                  {HEADLINE_ACCENT}
                </motion.span>
              </span>
            </h1>

            <motion.p variants={fadeUp} className="mt-8 max-w-xl text-base leading-relaxed text-ivory/75 md:text-lg">
              A premium gated community by AYS Developers — 5, 7 &amp; 10 Marla residential
              plots on 15 km Sargodha Road, Gujrat. Book on easy <strong className="font-semibold text-ivory">3-year installments.</strong>
            </motion.p>

            <motion.div variants={fadeUp} className="mt-6 inline-flex items-center gap-2 rounded-sm border border-gold/25 bg-white/[0.04] px-4 py-2 text-[0.72rem] font-medium uppercase tracking-[0.14em] text-gold-200">
              <FiShield size={14} /> Approved layout · Limited plots
            </motion.div>

            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-4">
              <button onClick={() => scrollTo("register")} className="btn-gold">
                Book Your Plot
              </button>
              <a
                href={HERO_WA}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("Contact", { method: "whatsapp", source: "hero" })}
                className="btn-ghost-gold"
              >
                <FaWhatsapp /> WhatsApp Us
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom bar: stats + scroll cue */}
      <div className="relative z-10 border-t border-gold/15 bg-navy-950/40 backdrop-blur-sm">
        <div className="lux-container">
          <div className="flex items-center justify-between gap-6 py-5">
            <motion.dl
              initial={reduce ? undefined : { opacity: 0, y: 20 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.9, ease: EASE }}
              className="grid flex-1 grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-4"
            >
              {STATS.map((s) => (
                <div key={s.v} className="flex flex-col">
                  <dt className="font-display text-2xl text-gold-200 md:text-3xl">{s.k}</dt>
                  <dd className="text-[0.68rem] uppercase tracking-[0.2em] text-ivory/55">{s.v}</dd>
                </div>
              ))}
            </motion.dl>

            <motion.button
              onClick={() => scrollTo("about")}
              aria-label="Scroll down"
              initial={reduce ? undefined : { opacity: 0 }}
              animate={reduce ? undefined : { opacity: 1 }}
              transition={{ delay: 1.4, duration: 1 }}
              className="hidden shrink-0 flex-col items-center gap-2 text-ivory/60 transition-colors hover:text-gold-200 md:flex"
            >
              <span className="text-[0.6rem] uppercase tracking-[0.3em]">Scroll</span>
              <span className="animate-float">
                <FiArrowDown />
              </span>
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
