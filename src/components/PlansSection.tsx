import { FaWhatsapp } from "react-icons/fa";
import { FiCheck, FiArrowRight } from "react-icons/fi";
import { Reveal, RevealGroup } from "@/components/lux/Reveal";
import { trackLead } from "@/lib/pixel";

type Plan = {
  size: string;
  label: string;
  blurb: string;
  popular?: boolean;
};

// Sizes only — pricing is shared on enquiry (drives qualified leads).
const PLANS: Plan[] = [
  { size: "5 Marla", label: "Residential", blurb: "The efficient starter home — ideal for young families and first investments." },
  { size: "7 Marla", label: "Residential", blurb: "Our most-requested size — the sweet spot of space, comfort and value.", popular: true },
  { size: "10 Marla", label: "Residential", blurb: "Room to build the home you've pictured, with generous frontage and light." },
];

const STRUCTURE = [
  "Small down payment to book",
  "36 easy monthly installments",
  "Balance at possession",
];

const waFor = (size: string) =>
  `https://wa.me/923111786602?text=${encodeURIComponent(
    `Hello! I'm interested in a ${size} plot at Kunjwal City. Please share the current pricing, payment plan and availability.`
  )}`;

const scrollToRegister = () =>
  document.getElementById("register")?.scrollIntoView({ behavior: "smooth", block: "start" });

const PlansSection = () => {
  return (
    <section id="plans" className="scroll-mt-24 relative overflow-hidden bg-ivory py-24 md:py-32">
      <div className="lux-container">
        <Reveal>
          <p className="lux-eyebrow mb-6" style={{ color: "#9a761f" }}>Plots &amp; Payment Plan</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="max-w-3xl font-display text-4xl font-medium leading-tight text-navy-900 md:text-6xl">
            Own it on <span className="italic text-gold-foil">easy 3-year installments.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-xl text-navy-900/65">
            Book your 5, 7 or 10 Marla plot with a small down payment and spread the balance
            over 36 comfortable months — development charges included. Request the current
            plan for live pricing and availability.
          </p>
        </Reveal>

        <RevealGroup className="mt-14 grid gap-6 lg:grid-cols-3" gap={0.1}>
          {PLANS.map((p) => (
            <Reveal key={p.size} variant="fadeUp">
              <div
                className={`group relative flex h-full flex-col rounded-md border p-8 transition-all duration-500 ${
                  p.popular
                    ? "border-gold-700/50 bg-navy-900 text-ivory shadow-gold"
                    : "border-navy-900/12 bg-porcelain text-navy-900 hover:-translate-y-1 hover:border-gold-700/40 hover:shadow-soft"
                }`}
              >
                {p.popular && (
                  <span className="absolute -top-3 left-8 rounded-sm bg-gradient-gold px-3 py-1 text-[0.6rem] font-bold uppercase tracking-[0.2em] text-navy-950">
                    Most Popular
                  </span>
                )}

                <p className={`text-[0.62rem] font-semibold uppercase tracking-[0.24em] ${p.popular ? "text-gold-200" : "text-gold-700"}`}>
                  {p.label}
                </p>
                <h3 className="mt-2 font-display text-5xl leading-none">{p.size}</h3>
                <p className={`mt-4 text-sm leading-relaxed ${p.popular ? "text-ivory/70" : "text-navy-900/60"}`}>
                  {p.blurb}
                </p>

                <ul className={`mt-6 space-y-2.5 border-t pt-6 text-sm ${p.popular ? "border-gold/20" : "border-navy-900/10"}`}>
                  {STRUCTURE.map((s) => (
                    <li key={s} className="flex items-center gap-3">
                      <FiCheck className={`shrink-0 ${p.popular ? "text-gold-200" : "text-gold-700"}`} />
                      <span className={p.popular ? "text-ivory/80" : "text-navy-900/70"}>{s}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={waFor(p.size)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackLead({ content_name: `Plot Enquiry ${p.size}`, source: "plans" })}
                  className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-sm px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] transition-all duration-500 ${
                    p.popular
                      ? "bg-gradient-gold text-navy-950 hover:-translate-y-0.5"
                      : "border border-gold-700/40 text-gold-700 hover:bg-gold-700/8"
                  }`}
                >
                  <FaWhatsapp /> Request Pricing
                </a>
              </div>
            </Reveal>
          ))}
        </RevealGroup>

        {/* Notes + lead capture */}
        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-col items-start justify-between gap-6 rounded-md border border-navy-900/12 bg-porcelain p-7 md:flex-row md:items-center">
            <ul className="grid gap-2.5 text-sm text-navy-900/70 sm:grid-cols-2">
              {[
                "Possession targeted within ~1.5 years (upon 70% payment)",
                "Development charges included — no hidden costs",
                "Boulevard, park-facing & corner plots available",
                "Limited plots at the current phase",
              ].map((n) => (
                <li key={n} className="flex items-start gap-2">
                  <FiCheck className="mt-0.5 shrink-0 text-gold-700" />
                  {n}
                </li>
              ))}
            </ul>
            <button onClick={scrollToRegister} className="btn-gold shrink-0 whitespace-nowrap">
              Get the Payment Plan <FiArrowRight />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default PlansSection;
