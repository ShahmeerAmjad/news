import { FiMapPin, FiClock, FiPhone, FiArrowUpRight, FiDownload, FiNavigation } from "react-icons/fi";
import { Reveal, RevealGroup } from "@/components/lux/Reveal";
import { Parallax } from "@/components/lux/Parallax";
import mapImg from "@/assets/New/1.jpg";
import mapPdf from "@/assets/map.pdf";

const MAPS_URL = "https://maps.app.goo.gl/f6oJER8r31X2gmcYA";

const CONNECTIVITY: string[] = [
  "Gujrat City Center",
  "GT Road",
  "Kunjah",
  "Sialkot Int'l Airport",
  "Motorway / GT Road Interchange",
  "Mangowal",
];

const downloadMap = () => {
  const a = document.createElement("a");
  a.href = mapPdf;
  a.download = "kunjwal-city-site-map.pdf";
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

const LocationSection = () => {
  return (
    <section
      id="location"
      className="grain relative scroll-mt-24 overflow-hidden bg-navy-radial py-24 text-ivory md:py-32"
    >
      <div className="lux-container relative z-10">
        <Reveal>
          <p className="lux-eyebrow mb-6">Location & Connectivity</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="max-w-3xl font-display text-4xl font-medium leading-[1.05] tracking-tight text-ivory md:text-6xl">
            Perfectly placed on{" "}
            <span className="italic text-gold-foil">Sargodha Road.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid items-start gap-12 lg:mt-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* Left — address, connectivity & hours */}
          <div>
            <RevealGroup className="space-y-8">
              <Reveal>
                <div className="flex items-start gap-4">
                  <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-gold/25 text-gold-200">
                    <FiMapPin className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-gold-200/80">
                      Main Gate
                    </p>
                    <p className="mt-2 font-display text-2xl leading-snug text-ivory md:text-3xl">
                      15 km Sargodha Road,
                      <br />
                      Gujrat, Punjab
                    </p>
                    <p className="mt-2 text-sm text-ivory/60">
                      Main Gate on Sargodha Road
                    </p>
                  </div>
                </div>
              </Reveal>

              {/* Connectivity — timed distances (client to confirm) */}
              <Reveal>
                <div className="rounded-sm border border-gold/15 bg-white/[0.03] p-6">
                  <div className="flex items-center gap-2.5">
                    <FiNavigation className="h-4 w-4 text-gold-300" />
                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-gold-200/80">
                      Connectivity
                    </p>
                  </div>
                  <ul className="mt-5 grid gap-x-6 gap-y-3.5 sm:grid-cols-2">
                    {CONNECTIVITY.map((place) => (
                      <li key={place} className="flex items-center gap-3">
                        <FiMapPin className="h-3.5 w-3.5 shrink-0 text-gold-300" />
                        <span className="leading-relaxed text-ivory/85">{place}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 text-xs leading-relaxed text-ivory/55">
                    Positioned on Sargodha Road with quick access to Gujrat city, GT Road and
                    the wider motorway network.
                  </p>
                </div>
              </Reveal>

              <Reveal>
                <div className="lux-rule my-2" />
              </Reveal>

              {/* Hours + phone */}
              <Reveal>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="flex items-start gap-4">
                    <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-gold/25 text-gold-200">
                      <FiClock className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-gold-200/80">
                        Office Hours
                      </p>
                      <p className="mt-2 text-lg text-ivory/85">
                        Mon–Sun · 9:00 AM – 6:00 PM
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-gold/25 text-gold-200">
                      <FiPhone className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-gold-200/80">
                        Call Us
                      </p>
                      <a
                        href="tel:+923111786602"
                        className="mt-2 block text-lg text-ivory/85 transition-colors hover:text-gold-200"
                      >
                        +92 311 1786602
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <button
                  type="button"
                  onClick={downloadMap}
                  className="btn-ghost-gold mt-2 inline-flex items-center gap-2"
                >
                  <FiDownload className="h-4 w-4" />
                  Download Site Map (PDF)
                </button>
              </Reveal>
            </RevealGroup>
          </div>

          {/* Right — map card */}
          <Reveal variant="scaleIn">
            <div className="group relative overflow-hidden rounded-sm border border-gold/15 shadow-soft">
              <Parallax speed={0.18} className="h-[340px] w-full sm:h-[440px] lg:h-[540px]">
                <img
                  src={mapImg}
                  alt="Kunjwal City — Main Gate on Sargodha Road, Gujrat"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full scale-105 object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                />
              </Parallax>

              {/* navy / gold gradient grade */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/25 to-transparent" />
              <div className="pointer-events-none absolute inset-0 [background:radial-gradient(120%_120%_at_50%_100%,rgba(179,140,46,0.22)_0%,transparent_55%)]" />

              {/* Google Maps pill */}
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-6 left-6 inline-flex items-center gap-2 rounded-full bg-gradient-gold px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-navy-950 shadow-gold transition-transform duration-300 hover:-translate-y-0.5"
              >
                <FiMapPin className="h-4 w-4" />
                View on Google Maps
                <FiArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
