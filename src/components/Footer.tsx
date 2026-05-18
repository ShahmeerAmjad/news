import React from 'react';
import { Facebook, Instagram, ChevronUp, MapPin, Clock, Mail, Phone } from 'lucide-react';
import paymentPdf from "@/assets/payment.pdf";
import mapPdf from "@/assets/map.pdf";
import mapThumb from "@/assets/New/1.jpg";
import logo from "@/assets/logo.png";

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const downloadFile = (href: string, filename: string) => {
    const a = document.createElement('a');
    a.href = href;
    a.download = filename;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <>
      <footer className="relative bg-[#010f1e] text-[#f5f0e8]">
        {/* Top gold rule */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#b38c2e] to-transparent" />

        <div className="container mx-auto px-6 lg:px-10 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-14 lg:gap-10">

            {/* Column 1 — Brand */}
            <div className="space-y-6">
              <button onClick={scrollToTop} className="block">
                <img
                  src={logo}
                  alt="Kunjwal City"
                  className="h-20 md:h-24 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
                />
              </button>

              <p className="font-display italic text-[#b38c2e]/80 text-base tracking-wide">
                Where Vision Meets Legacy
              </p>

              <p className="font-body font-light text-[#9bb8c4] text-sm leading-7 max-w-xs">
                Kunjwal City offers premium residential plots in Gujrat with modern amenities
                and transparent dealing by AYS Developers.
              </p>

              {/* Document buttons */}
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => downloadFile(paymentPdf, 'kunjwal-city-payment-plan.pdf')}
                  className="luxury-btn-outline !py-2.5 !px-5 !text-[10px]"
                >
                  <span>Payment Plan</span>
                </button>
                <button
                  onClick={() => downloadFile(mapPdf, 'kunjwal-city-map.pdf')}
                  className="luxury-btn-outline !py-2.5 !px-5 !text-[10px]"
                >
                  <span>Site Map</span>
                </button>
              </div>
            </div>

            {/* Column 2 — Location */}
            <div className="space-y-6">
              <h3 className="font-display italic text-[#e4c152] text-2xl font-light">
                Our Location
              </h3>
              <div className="h-px bg-gradient-to-r from-[#b38c2e]/40 to-transparent" />

              <div className="space-y-5">
                <div className="flex gap-4">
                  <MapPin className="w-4 h-4 text-[#b38c2e] flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-body text-[9px] tracking-[0.22em] uppercase text-[#b38c2e] mb-1">Head Office</div>
                    <p className="font-body font-light text-[#9bb8c4] text-sm leading-6">
                      13-km, Sargodha Road<br />Gujrat, Punjab
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Clock className="w-4 h-4 text-[#b38c2e] flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-body text-[9px] tracking-[0.22em] uppercase text-[#b38c2e] mb-1">Office Hours</div>
                    <p className="font-body font-light text-[#9bb8c4] text-sm">Mon – Sun: 9:00 AM – 6:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 3 — Contact */}
            <div className="space-y-6">
              <h3 className="font-display italic text-[#e4c152] text-2xl font-light">
                Get In Touch
              </h3>
              <div className="h-px bg-gradient-to-r from-[#b38c2e]/40 to-transparent" />

              <div className="space-y-5">
                <div className="flex gap-4">
                  <Mail className="w-4 h-4 text-[#b38c2e] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-body text-[9px] tracking-[0.22em] uppercase text-[#b38c2e] mb-1">Email</div>
                    <a
                      href="mailto:info@kunjwalcity.pk"
                      className="font-body font-light text-[#9bb8c4] text-sm hover:text-[#e4c152] transition-colors"
                    >
                      info@kunjwalcity.pk
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Phone className="w-4 h-4 text-[#b38c2e] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-body text-[9px] tracking-[0.22em] uppercase text-[#b38c2e] mb-1">Phone</div>
                    <a
                      href="tel:+923111786602"
                      className="font-body font-light text-[#9bb8c4] text-sm hover:text-[#e4c152] transition-colors"
                    >
                      +92 311 1786602
                    </a>
                  </div>
                </div>
              </div>

              {/* Map thumbnail */}
              <div className="space-y-3">
                <div className="relative group w-44 h-28 overflow-hidden border border-[#b38c2e]/20 hover:border-[#b38c2e]/50 transition-colors">
                  <a
                    href="https://maps.app.goo.gl/f6oJER8r31X2gmcYA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full h-full"
                    title="View on Google Maps"
                  >
                    <img
                      src={mapThumb}
                      alt="Kunjwal City Location"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-[#012d47]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <MapPin className="text-[#e4c152] w-7 h-7" />
                    </div>
                  </a>
                </div>
                <a
                  href="https://maps.app.goo.gl/f6oJER8r31X2gmcYA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-[9px] tracking-[0.2em] uppercase text-[#b38c2e] hover:text-[#e4c152] transition-colors"
                >
                  View on Maps →
                </a>
              </div>

              {/* Social */}
              <div className="flex gap-3 pt-1">
                <a
                  href="https://www.facebook.com/profile.php?id=61579390076883"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center border border-[#b38c2e]/40 text-[#b38c2e] hover:bg-[#b38c2e] hover:text-white hover:border-[#b38c2e] transition-all duration-300"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://www.instagram.com/kunjwalcity.gujrat?igsh=MW02NzUxMWxqMHlkMw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center border border-[#b38c2e]/40 text-[#b38c2e] hover:bg-gradient-to-br hover:from-[#b38c2e] hover:to-[#e4c152] hover:text-white hover:border-transparent transition-all duration-300"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#b38c2e]/15">
          <div className="container mx-auto px-6 lg:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-body text-[9px] tracking-[0.2em] uppercase text-[#9bb8c4]/50">
              © {new Date().getFullYear()} Kunjwal City · AYS Developers (Pvt.) Ltd. · All Rights Reserved
            </p>
            <p className="font-body text-[9px] tracking-[0.15em] uppercase text-[#9bb8c4]/35">
              Gujrat · Punjab · Pakistan
            </p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top — positioned above WhatsApp */}
      <button
        onClick={scrollToTop}
        className="scroll-top-btn w-11 h-11 border border-[#b38c2e]/60 hover:border-[#e4c152] hover:bg-[#b38c2e]/20 text-[#e4c152] flex items-center justify-center transition-all duration-300"
        aria-label="Scroll to top"
      >
        <ChevronUp className="w-5 h-5" />
      </button>
    </>
  );
};

export default Footer;
