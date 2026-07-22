import React from "react";
import {
  Shield,
  Trees,
  Baby,
  Landmark,
  GraduationCap,
  Stethoscope,
  Users,
  Dumbbell,
  Store,
  Route,
  Cable,
  Fence,
  Leaf,
} from "lucide-react";
import { Reveal, RevealGroup } from "@/components/lux/Reveal";
import { Parallax } from "@/components/lux/Parallax";

import gated from "@/assets/IMG-20250920-WA0010.jpg";
import mosque from "@/assets/IMG-20250920-WA0012.jpg";
import play from "@/assets/IMG-20250920-WA0018.jpg";
import security from "@/assets/closed-circuit-security-cameras.jpg";
import park from "@/assets/images.jpg";

type PhotoCard = {
  title: string;
  desc: string;
  img: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
};

type IconCard = {
  title: string;
  desc: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
};

const PHOTO_CARDS: PhotoCard[] = [
  {
    title: "Grand Jamia Mosque",
    desc: "A 1.7-Kanal central mosque at the spiritual heart of the community.",
    img: mosque,
    icon: Landmark,
  },
  {
    title: "Gated Community",
    desc: "A single secured entrance across 200+ Kanals of private living.",
    img: gated,
    icon: Fence,
  },
  {
    title: "Kids Play Area",
    desc: "Safe, dedicated play spaces for the youngest residents.",
    img: play,
    icon: Baby,
  },
  {
    title: "24/7 Security & CCTV",
    desc: "Round-the-clock guards and surveillance on every avenue.",
    img: security,
    icon: Shield,
  },
  {
    title: "Landscaped Parks",
    desc: "Manicured greens and open lawns woven through the master plan.",
    img: park,
    icon: Trees,
  },
];

const ICON_CARDS: IconCard[] = [
  {
    title: "School",
    desc: "On-site education so learning stays close to home.",
    icon: GraduationCap,
  },
  {
    title: "Hospital",
    desc: "Quality healthcare within the gates for total peace of mind.",
    icon: Stethoscope,
  },
  {
    title: "Community Center",
    desc: "A dedicated 4-Kanal hub for gatherings and events.",
    icon: Users,
  },
  {
    title: "Sports Complex",
    desc: "Modern courts and facilities for an active lifestyle.",
    icon: Dumbbell,
  },
  {
    title: "Commercial Zone",
    desc: "Shopping and business districts a short walk away.",
    icon: Store,
  },
  {
    title: "80-ft Main Boulevard",
    desc: "A grand carpeted spine feeding 50-ft and 30-ft roads.",
    icon: Route,
  },
  {
    title: "Underground Utilities",
    desc: "Power, water and services routed cleanly below ground.",
    icon: Cable,
  },
  {
    title: "Central Park",
    desc: "An expansive 10.4-Kanal green at the core of the plan.",
    icon: Leaf,
  },
];

const AmenitiesSection = () => {
  return (
    <section
      id="amenities"
      className="grain scroll-mt-24 relative overflow-hidden bg-navy-900 py-24 md:py-32"
    >
      {/* Ambient depth */}
      <div className="pointer-events-none absolute inset-0 bg-navy-radial opacity-60" />
      <div className="pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-gold/10 blur-[120px]" />

      <div className="lux-container relative">
        {/* Header */}
        <div className="max-w-2xl">
          <Reveal>
            <p className="lux-eyebrow mb-6">Lifestyle &amp; Facilities</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display text-4xl font-medium leading-[1.05] tracking-tight text-ivory md:text-6xl">
              Everything,{" "}
              <span className="italic text-gold-foil">within the gates.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ivory/70 md:text-lg">
              From the Grand Jamia Mosque to a 10.4-Kanal central park, every
              facility in the master plan is designed around comfort, security
              and the way you want to live.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="lux-rule mt-12 mb-12" />
        </Reveal>

        {/* Photo cards */}
        <RevealGroup className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {PHOTO_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <Reveal key={card.title} className="h-full">
                <article className="group h-full overflow-hidden rounded-sm border border-gold/15 bg-navy-950/40 transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/40 hover:shadow-[0_30px_60px_-30px_rgba(1,34,58,0.9)]">
                  {/* Image — subtle scroll parallax within the frame for depth */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Parallax speed={0.14} className="h-full w-full">
                      <img
                        src={card.img}
                        alt={card.title}
                        loading="lazy"
                        className="h-full w-full scale-110 object-cover transition-transform duration-[900ms] ease-out group-hover:scale-125"
                      />
                    </Parallax>
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/10 to-transparent" />
                    <div className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-gold/30 bg-navy-950/50 backdrop-blur-sm">
                      <Icon className="h-4 w-4 text-gold-200" strokeWidth={1.5} />
                    </div>
                  </div>
                  {/* Body */}
                  <div className="p-5">
                    <h3 className="font-display text-xl text-ivory md:text-2xl">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ivory/60">
                      {card.desc}
                    </p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </RevealGroup>

        {/* Icon cards */}
        <RevealGroup className="mt-4 grid grid-cols-2 gap-4 md:mt-6 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {ICON_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <Reveal key={card.title} className="h-full">
                <article className="lux-glass group flex h-full flex-col justify-between rounded-sm p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/40">
                  <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-full border border-gold/25 bg-gradient-to-br from-gold/15 to-transparent transition-colors duration-500 group-hover:border-gold/50">
                    <Icon
                      className="h-6 w-6 text-gold-200 transition-transform duration-500 group-hover:scale-110"
                      strokeWidth={1.4}
                    />
                  </div>
                  <div>
                    <h3 className="font-display text-xl text-ivory md:text-2xl">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ivory/60">
                      {card.desc}
                    </p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
};

export default AmenitiesSection;
