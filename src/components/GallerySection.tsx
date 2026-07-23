import React from "react";
import { Reveal, RevealGroup } from "@/components/lux/Reveal";
import { Parallax } from "@/components/lux/Parallax";
import { Placeholder } from "@/components/lux/Placeholder";

import g2 from "@/assets/New/2.jpg";
import g3 from "@/assets/New/3.jpg";
import g4 from "@/assets/New/4.jpg";
import g5 from "@/assets/New/14.jpg";
import g7 from "@/assets/New/7.jpg";
import g8 from "@/assets/New/8.jpg";
import g9 from "@/assets/New/17.jpg";
import g10 from "@/assets/New/16.jpg";
import g11 from "@/assets/New/11.jpg";
import g12 from "@/assets/New/12.jpg";

type RenderTile = {
  kind: "render";
  img: string;
  alt: string;
  /** Tailwind span classes for the editorial asymmetric layout */
  span: string;
  /** Parallax drift speed — varied per tile to layer the grid into depth planes.
   *  scale-[1.15] gives ±7.5% overflow, so keep this ≤ 0.15 to avoid edge gaps. */
  speed?: number;
};

type SlotTile = {
  kind: "slot";
  label: string;
  dims: string;
  media?: "image" | "video";
  span: string;
};

type Tile = RenderTile | SlotTile;

/** Real renders (in-repo) interleaved with designer slots for on-site photography. */
const TILES: Tile[] = [
  {
    kind: "render",
    img: g2,
    alt: "Kunjwal City aerial masterplan render",
    span: "col-span-2 row-span-2",
    speed: 0.14,
  },
  {
    kind: "render",
    img: g11,
    alt: "Aerial view of Kunjwal City parks, playground and villas",
    span: "col-span-2 row-span-1",
    speed: 0.12,
  },
  {
    kind: "render",
    img: g4,
    alt: "Landscaped boulevard render",
    span: "col-span-1 row-span-1",
    speed: 0.07,
  },
  {
    kind: "render",
    img: g5,
    alt: "Modern villa at dusk, Kunjwal City",
    span: "col-span-1 row-span-1",
    speed: 0.1,
  },
  {
    kind: "render",
    img: g3,
    alt: "Modern villa elevation at Kunjwal City",
    span: "col-span-1 row-span-2",
    speed: 0.13,
  },
  {
    kind: "render",
    img: g7,
    alt: "Community entrance gateway render",
    span: "col-span-1 row-span-1",
    speed: 0.08,
  },
  {
    kind: "render",
    img: g9,
    alt: "Grand Mosque at Kunjwal City",
    span: "col-span-2 row-span-1",
    speed: 0.12,
  },
  {
    kind: "render",
    img: g8,
    alt: "Kunjwal City site office — on-site view at dusk",
    span: "col-span-2 row-span-1",
    speed: 0.1,
  },
  {
    kind: "render",
    img: g10,
    alt: "Aerial view of the Kunjwal City masterplan",
    span: "col-span-1 row-span-1",
    speed: 0.07,
  },
  {
    kind: "render",
    img: g12,
    alt: "Parks and green corridor render",
    span: "col-span-1 row-span-1",
    speed: 0.09,
  },
];

const GallerySection = () => {
  return (
    <section
      id="gallery"
      className="scroll-mt-24 relative overflow-hidden bg-ivory py-24 md:py-32"
    >
      <div className="lux-container">
        {/* Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <Reveal>
              <p className="lux-eyebrow mb-6">Gallery</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-display text-4xl font-medium leading-[1.05] tracking-tight text-navy-900 md:text-6xl">
                A closer <span className="italic text-gold-foil">look.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-base leading-relaxed text-navy-900/70 md:text-right">
              Architectural renders of the streets, villas and shared spaces
              that shape everyday life at Kunjwal City.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="lux-rule mt-12 mb-10" />
        </Reveal>

        {/* Editorial masonry grid — renders + designer slots */}
        <RevealGroup className="grid auto-rows-[160px] grid-cols-2 gap-3 sm:auto-rows-[200px] md:grid-cols-4 md:gap-4 lg:auto-rows-[220px]">
          {TILES.map((tile, i) =>
            tile.kind === "render" ? (
              <Reveal
                key={i}
                variant="scaleIn"
                className={`group relative overflow-hidden rounded-sm border border-gold-700/15 ${tile.span}`}
              >
                <Parallax speed={tile.speed ?? 0.1} className="h-full w-full">
                  <img
                    src={tile.img}
                    alt={tile.alt}
                    loading="lazy"
                    className="h-full w-full scale-[1.15] object-cover transition-transform duration-[900ms] ease-out group-hover:scale-125"
                  />
                </Parallax>
                {/* Hover veil + hairline */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-gold-200/0 transition-all duration-500 group-hover:ring-gold-200/30" />
              </Reveal>
            ) : (
              <Reveal
                key={i}
                variant="scaleIn"
                className={tile.span}
              >
                <Placeholder
                  label={tile.label}
                  dims={tile.dims}
                  kind={tile.media}
                  onDark={false}
                  className="h-full w-full rounded-sm"
                />
              </Reveal>
            )
          )}
        </RevealGroup>

        {/* Caption */}
        <Reveal delay={0.1}>
          <p className="mt-8 text-sm italic leading-relaxed text-navy-900/55">
            Renders shown; on-site photography updated as development progresses.
          </p>
        </Reveal>
      </div>
    </section>
  );
};

export default GallerySection;
