import { Facebook, Instagram, ChevronUp, Mail, Phone, MapPin, FileDown, ArrowUpRight } from "lucide-react";
import { Reveal, RevealGroup } from "@/components/lux/Reveal";
import mapPdf from "@/assets/map.pdf";
import mapThumb from "@/assets/New/1.jpg";
import logo from "@/assets/logo.png";

const MAPS_URL = "https://maps.app.goo.gl/f6oJER8r31X2gmcYA";
const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=61579390076883";
const INSTAGRAM_URL = "https://www.instagram.com/kunjwalcity.gujrat?igsh=MW02NzUxMWxqMHlkMw==";

const downloadFile = (href: string, name: string) => {
  const a = document.createElement("a");
  a.href = href;
  a.download = name;
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="grain relative overflow-hidden bg-navy-950 text-ivory">
      {/* thin gold top rule */}
      <div className="lux-rule" />

      <div className="lux-container relative z-10 py-20 md:py-24">
        <RevealGroup className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Brand */}
          <Reveal className="lg:col-span-5">
            <div className="space-y-6">
              <img src={logo} alt="Kunjwal City" className="h-16 w-auto md:h-20" />
              <p className="max-w-sm leading-relaxed text-ivory/70">
                Kunjwal City offers premium residential plots in Gujrat with modern
                amenities, transparent dealing and a secure, master-planned gated
                community by AYS Developers.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => document.getElementById("register")?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  className="inline-flex items-center gap-2 rounded-sm border border-gold/30 px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-gold-200 transition-all duration-500 hover:border-gold-300 hover:bg-gold-300/10"
                >
                  <FileDown className="h-4 w-4" />
                  Payment Plan
                </button>
                <button
                  type="button"
                  onClick={() => downloadFile(mapPdf, "kunjwal-city-site-map.pdf")}
                  className="inline-flex items-center gap-2 rounded-sm border border-gold/30 px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-gold-200 transition-all duration-500 hover:border-gold-300 hover:bg-gold-300/10"
                >
                  <FileDown className="h-4 w-4" />
                  Site Map
                </button>
              </div>
            </div>
          </Reveal>

          {/* Location */}
          <Reveal className="lg:col-span-3">
            <h3 className="font-display text-2xl text-gold-200">Our Location</h3>
            <div className="mt-6 space-y-6 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" />
                <div>
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-ivory/50">
                    Head Office
                  </p>
                  <p className="mt-1 leading-relaxed text-ivory/80">
                    15 km, Sargodha Road
                    <br />
                    Gujrat, Punjab
                  </p>
                </div>
              </div>
              <div>
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-ivory/50">
                  Office Hours
                </p>
                <p className="mt-1 text-ivory/80">Mon–Sun · 9:00 AM – 6:00 PM</p>
              </div>
            </div>
          </Reveal>

          {/* Contact */}
          <Reveal className="lg:col-span-4">
            <h3 className="font-display text-2xl text-gold-200">Get In Touch</h3>
            <div className="mt-6 space-y-4 text-sm">
              <a
                href="mailto:info@kunjwalcity.pk"
                className="flex items-center gap-3 text-ivory/80 transition-colors hover:text-gold-200"
              >
                <Mail className="h-4 w-4 shrink-0 text-gold-300" />
                info@kunjwalcity.pk
              </a>
              <a
                href="tel:+923111786602"
                className="flex items-center gap-3 text-ivory/80 transition-colors hover:text-gold-200"
              >
                <Phone className="h-4 w-4 shrink-0 text-gold-300" />
                +92 311 1786602
              </a>
            </div>

            {/* Map thumbnail */}
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              title="Open in Google Maps"
              className="group mt-6 block h-32 w-full max-w-[16rem] overflow-hidden rounded-sm border border-gold/15"
            >
              <div className="relative h-full w-full">
                <img
                  src={mapThumb}
                  alt="Kunjwal City location map"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-navy-950/55 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-gold-200">
                    View on Maps <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </a>

            {/* Socials */}
            <div className="mt-6 flex items-center gap-3">
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Kunjwal City on Facebook"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/25 text-gold-200 transition-all duration-300 hover:border-gold-300 hover:bg-gold-300/10 hover:text-gold-300"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Kunjwal City on Instagram"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/25 text-gold-200 transition-all duration-300 hover:border-gold-300 hover:bg-gold-300/10 hover:text-gold-300"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </Reveal>
        </RevealGroup>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gold/12">
        <div className="lux-container flex flex-col items-center justify-between gap-3 py-6 text-center text-xs text-ivory/55 md:flex-row md:text-left">
          <p>© {new Date().getFullYear()} Kunjwal City · AYS Developers (Pvt.) Ltd. All rights reserved.</p>
          <p className="tracking-[0.12em] uppercase text-ivory/40">
            Premium residential plots · Gujrat, Punjab
          </p>
        </div>
      </div>

      {/* Scroll to top */}
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="fixed bottom-8 right-8 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-gold text-navy-950 shadow-gold transition-transform duration-300 hover:-translate-y-1"
      >
        <ChevronUp className="h-6 w-6" />
      </button>
    </footer>
  );
};

export default Footer;
