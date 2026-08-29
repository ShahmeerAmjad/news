import { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  FiArrowDown,
  FiArrowRight,
  FiShield,
  FiCheck,
  FiClock,
  FiMapPin,
  FiTrendingUp,
  FiPhone,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import heroImg from "@/assets/IMG-20250920-WA0010.jpg";
import logo from "@/assets/logo-horizontal.png";
import { Reveal, RevealGroup } from "@/components/lux/Reveal";
import { Counter } from "@/components/lux/Counter";
import RegistrationForm from "@/components/RegistrationForm";
import { EASE, stagger, wordUp, fadeUp } from "@/lib/anim";
import { track, trackLead } from "@/lib/pixel";

/**
 * /offer — dedicated Meta-ads landing page.
 * Message-matched to the paid campaign: single offer, minimal escape routes,
 * one job — get a qualified callback lead. Reuses the site design system.
 */

const OFFER_WA =
  "https://wa.me/923111786602?text=" +
  encodeURIComponent(
    "Hello! I saw the Kunjwal City offer online. Please share plot availability and the 3-year payment plan."
  );

const HEADLINE = ["Own", "your", "plot"];

const STATS = [
  { n: 5, suffix: "·7·10", label: "Marla plots" },
  { n: 3, suffix: "-yr", label: "Easy installments" },
  { n: 200, prefix: "", suffix: "+", label: "Kanals gated" },
  { n: 24, suffix: "/7", label: "Gated security" },
];

const VALUE_PROPS = [
  {
    icon: FiClock,
    title: "3-year easy installments",
    body: "Book with just 30% down, then 36 comfortable monthly instalments. Development charges included.",
  },
  {
    icon: FiShield,
    title: "Approved & secure",
    body: "A gated community by AYS Developers with 24/7 security, boundary wall and controlled access.",
  },
  {
    icon: FiMapPin,
    title: "Prime location",
    body: "On 15 km Sargodha Road, Gujrat — minutes from the city, GT Road and key connections.",
  },
  {
    icon: FiTrendingUp,
    title: "Strong upside",
    body: "Limited plots at the current phase — book early, before the next release, and grow your investment.",
  },
];

type Plan = {
  size: string;
  label: string;
  blurb: string;
  popular?: boolean;
};

// Sizes only — pricing shared on enquiry to drive qualified leads.
const PLANS: Plan[] = [
  { size: "5 Marla", label: "Residential", blurb: "The efficient starter home — ideal for first homes and investments." },
  { size: "7 Marla", label: "Residential", blurb: "Our most-requested size — the sweet spot of space and value.", popular: true },
  { size: "10 Marla", label: "Residential", blurb: "Room to build the home you've pictured, with generous frontage." },
];

const STRUCTURE = [
  "Small down payment to book",
  "36 easy monthly installments",
  "Balance at possession",
];

const waForSize = (size: string) =>
  `https://wa.me/923111786602?text=${encodeURIComponent(
    `Hello! I'm interested in a ${size} plot at Kunjwal City on the 3-year plan. Please share current pricing and availability.`
  )}`;

const scrollToForm = () =>
  document.getElementById("register")?.scrollIntoView({ behavior: "smooth", block: "start" });

const Offer = () => {
  const reduce = useReducedMotion();

  // Message-match the paid campaign in the tab/share preview.
  useEffect(() => {
    const prevTitle = document.title;
    document.title =
      "Book a Plot at Kunjwal City, Gujrat — 5·7·10 Marla on 3-Year Installments";
    return () => {
      document.title = prevTitle;
    };
  }, []);

  return (
    <div className="min-h-screen bg-navy-950 text-ivory">
      {/* ── Slim conversion bar (no nav — keep users on-page) ── */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-gold/15 bg-navy-950/80 backdrop-blur-md">
        <div className="lux-container flex h-16 items-center justify-between">
          <a href="#top" className="flex items-center gap-3">
            <img src={logo} alt="Kunjwal City — Gujrat" className="h-9 w-auto" />
            <span className="hidden font-display text-lg tracking-wide text-ivory sm:block">
              Kunjwal City
            </span>
          </a>
          <div className="flex items-center gap-3">
            <a
              href="tel:+923111786602"
              onClick={() => track("Contact", { method: "call", source: "offer-nav" })}
              className="hidden items-center gap-2 text-sm font-medium text-ivory/80 transition-colors hover:text-gold-200 sm:flex"
            >
              <FiPhone size={15} /> +92 311 1786602
            </a>
            <button onClick={scrollToForm} className="btn-gold !px-5 !py-2.5 text-xs">
              Book a Plot
            </button>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section
        id="top"
        className="grain relative flex min-h-[100svh] flex-col overflow-hidden bg-navy-950 pt-16"
      >
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Kunjwal City — luxury gated community, Gujrat"
            className={`h-full w-full object-cover ${reduce ? "" : "animate-ken-burns"}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/50 to-navy-950/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950/85 via-navy-950/30 to-transparent" />
          <div className="absolute inset-0 [background:radial-gradient(120%_120%_at_50%_50%,transparent_55%,rgba(1,34,58,0.7)_100%)]" />
        </div>

        <div className="relative z-10 flex flex-1 items-center">
          <div className="lux-container w-full">
            <motion.div
              variants={stagger(0.14, 0.15)}
              initial="hidden"
              animate="show"
              className="max-w-3xl"
            >
              <motion.div
                variants={fadeUp}
                className="mb-7 inline-flex items-center gap-2 rounded-sm border border-gold/30 bg-gold/[0.07] px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-gold-200"
              >
                <FiShield size={14} /> Limited plots · Phase pricing
              </motion.div>

              <h1 className="font-display text-[3.2rem] font-medium leading-[0.95] tracking-tight text-ivory sm:text-7xl lg:text-[5.8rem]">
                <span className="flex flex-wrap gap-x-5">
                  {HEADLINE.map((w, i) => (
                    <span key={i} className="overflow-hidden py-1">
                      <motion.span variants={wordUp} className="inline-block">
                        {w}
                      </motion.span>
                    </span>
                  ))}
                </span>
                <span className="block overflow-hidden py-1">
                  <motion.span variants={wordUp} className="inline-block italic text-gold-foil">
                    on 3-year installments.
                  </motion.span>
                </span>
              </h1>

              <motion.p
                variants={fadeUp}
                className="mt-8 max-w-xl text-base leading-relaxed text-ivory/80 md:text-lg"
              >
                Secure a 5, 7 or 10 Marla plot at{" "}
                <strong className="font-semibold text-ivory">Kunjwal City, Gujrat</strong> — a
                premium gated community by AYS Developers. Book with just{" "}
                <strong className="font-semibold text-ivory">30% down</strong>, pay the rest over 36
                easy months.
              </motion.p>

              <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center gap-4">
                <button onClick={scrollToForm} className="btn-gold">
                  Get Plot Details &amp; Pricing
                </button>
                <a
                  href={OFFER_WA}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track("Contact", { method: "whatsapp", source: "offer-hero" })}
                  className="btn-ghost-gold"
                >
                  <FaWhatsapp /> WhatsApp Now
                </a>
              </motion.div>

              <motion.p variants={fadeUp} className="mt-5 flex items-center gap-2 text-sm text-ivory/55">
                <FiCheck className="text-gold-300" /> Callback within 24 hours · No obligation
              </motion.p>
            </motion.div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="relative z-10 border-t border-gold/15 bg-navy-950/45 backdrop-blur-sm">
          <div className="lux-container">
            <motion.dl
              initial={reduce ? undefined : { opacity: 0, y: 20 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.9, ease: EASE }}
              className="grid grid-cols-2 gap-x-8 gap-y-3 py-5 sm:grid-cols-4"
            >
              {STATS.map((s) => (
                <div key={s.label} className="flex flex-col">
                  <dt className="lux-num text-2xl font-semibold text-gold-200 md:text-3xl">
                    <Counter value={s.n} prefix={s.prefix} suffix={s.suffix} />
                  </dt>
                  <dd className="text-[0.66rem] uppercase tracking-[0.2em] text-ivory/55">
                    {s.label}
                  </dd>
                </div>
              ))}
            </motion.dl>
          </div>
        </div>
      </section>

      {/* ── Why book now ── */}
      <section className="relative overflow-hidden bg-navy-radial grain py-24 md:py-28">
        <div className="lux-container">
          <Reveal>
            <p className="lux-eyebrow mb-6">Why Kunjwal City</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="max-w-3xl font-display text-4xl font-medium leading-tight text-ivory md:text-5xl">
              A home address that also grows your{" "}
              <span className="italic text-gold-foil">wealth.</span>
            </h2>
          </Reveal>

          <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" gap={0.1}>
            {VALUE_PROPS.map((v) => (
              <Reveal key={v.title} variant="fadeUp">
                <div className="lux-glass flex h-full flex-col rounded-md p-7">
                  <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-sm bg-gradient-gold text-navy-950">
                    <v.icon size={20} />
                  </span>
                  <h3 className="font-display text-2xl text-ivory">{v.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ivory/65">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ── Payment plans ── */}
      <section id="plans" className="relative overflow-hidden bg-ivory py-24 md:py-28">
        <div className="lux-container">
          <Reveal>
            <p className="lux-eyebrow mb-6" style={{ color: "#9a761f" }}>
              Plots &amp; Payment Plan
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="max-w-3xl font-display text-4xl font-medium leading-tight text-navy-900 md:text-5xl">
              Pick your plot on{" "}
              <span className="italic text-gold-foil">easy installments.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-xl text-navy-900/65">
              Book with a small down payment and spread the balance over 36 comfortable
              months — development charges included. Request the current plan for live
              pricing and availability.
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
                  <h3 className="mt-2 whitespace-nowrap lux-num text-4xl font-semibold leading-none">{p.size}</h3>
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
                    href={waForSize(p.size)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackLead({ content_name: `Plot Enquiry ${p.size}`, source: "offer" })
                    }
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
              <button onClick={scrollToForm} className="btn-gold shrink-0 whitespace-nowrap">
                Get the Payment Plan <FiArrowRight />
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Lead form (reused, source=offer) ── */}
      <RegistrationForm source="offer" />

      {/* ── Minimal footer ── */}
      <footer className="border-t border-gold/15 bg-navy-950 py-10">
        <div className="lux-container flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Kunjwal City — Gujrat" className="h-9 w-auto" />
            <div>
              <p className="font-display text-lg text-ivory">Kunjwal City</p>
              <p className="text-xs text-ivory/50">By AYS Developers Pvt. Ltd. · Gujrat</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="tel:+923111786602" className="btn-ghost-gold !px-5 !py-2.5 text-xs">
              <FiPhone /> +92 311 1786602
            </a>
            <a
              href={OFFER_WA}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("Contact", { method: "whatsapp", source: "offer-footer" })}
              className="btn-ghost-gold !px-5 !py-2.5 text-xs"
            >
              <FaWhatsapp /> WhatsApp
            </a>
          </div>
        </div>
        <p className="mt-8 text-center text-xs text-ivory/40">
          © {new Date().getFullYear()} Kunjwal City. 15 km Sargodha Road, Gujrat, Punjab, Pakistan.
        </p>
      </footer>

      {/* ── Mobile sticky CTA ── */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gold/20 bg-navy-950/90 p-3 backdrop-blur-md md:hidden">
        <div className="flex items-center gap-3">
          <a
            href={OFFER_WA}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("Contact", { method: "whatsapp", source: "offer-sticky" })}
            className="flex flex-1 items-center justify-center gap-2 rounded-sm border border-gold/40 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-gold-200"
          >
            <FaWhatsapp size={16} /> WhatsApp
          </a>
          <button
            onClick={scrollToForm}
            className="flex flex-1 items-center justify-center gap-2 rounded-sm bg-gradient-gold py-3 text-xs font-semibold uppercase tracking-[0.14em] text-navy-950"
          >
            <FiArrowDown size={16} /> Book a Plot
          </button>
        </div>
      </div>
    </div>
  );
};

export default Offer;
