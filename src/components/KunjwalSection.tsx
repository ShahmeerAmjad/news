import React, { useEffect, useRef } from "react";
import kunjwalImage from "@/assets/New/6.jpg";

const features = [
  { stat: "200+", label: "Kanals", desc: "Master-planned across 200+ kanals" },
  { stat: "3–13", label: "Marla", desc: "Residential plots in multiple sizes" },
  { stat: "4–8", label: "Marla", desc: "Commercial plots for businesses" },
  { stat: "Gated", label: "Community", desc: "Secure, serene gated environment" },
];

const KunjwalSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.section-reveal, .section-reveal-left, .section-reveal-right').forEach((el, i) => {
              setTimeout(() => el.classList.add('revealed'), i * 100);
            });
          }
        });
      },
      { threshold: 0.12 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleBookClick = () => {
    const el = document.getElementById('register');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      id="kunjwal"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-[#012d47] overflow-hidden scroll-mt-20"
    >
      {/* Background decoration */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 font-display font-light text-[#e4c152] select-none pointer-events-none text-right"
        style={{ fontSize: 'clamp(120px, 16vw, 220px)', opacity: 0.04, lineHeight: 1 }}
        aria-hidden="true"
      >
        II
      </div>

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#b38c2e]/30 to-transparent" />

      <div className="container mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* Left — Text Content */}
          <div>
            <div className="section-reveal-left mb-2">
              <span className="section-label">The Project</span>
            </div>

            <div className="section-reveal-left mb-8">
              <h2
                className="font-display font-light italic text-[#f5f0e8] leading-tight"
                style={{ fontSize: 'clamp(2.8rem, 5.5vw, 5rem)' }}
              >
                Kunjwal City
                <span className="block text-[#e4c152]">Gujrat</span>
              </h2>
            </div>

            <div className="section-reveal-left mb-10">
              <div className="gold-rule" />
            </div>

            <p className="section-reveal-left text-[#f5f0e8]/75 text-lg leading-8 font-body font-light mb-10">
              A premium, master-planned residential community, strategically located at one of
              the most accessible and desirable locations in Gujrat, Punjab. Designed to offer
              a modern lifestyle in a secure and serene environment.
            </p>

            {/* Feature Blocks */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              {features.map((f, i) => (
                <div
                  key={i}
                  className="section-reveal-left feature-block"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div>
                    <div className="font-display font-light text-[#e4c152] text-2xl leading-none">
                      {f.stat}
                    </div>
                    <div className="font-body text-[10px] tracking-[0.2em] uppercase text-[#b38c2e] mt-0.5">
                      {f.label}
                    </div>
                    <div className="font-body text-[#f5f0e8]/50 text-xs mt-1 leading-snug">
                      {f.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="section-reveal-left">
              <button onClick={handleBookClick} className="luxury-btn-outline">
                <span>Reserve Your Plot</span>
              </button>
            </div>
          </div>

          {/* Right — Image */}
          <div className="section-reveal-right relative">
            {/* Gold frame effect */}
            <div
              className="relative"
              style={{
                padding: '12px',
                background: 'linear-gradient(135deg, rgba(179,140,46,0.3), rgba(228,193,82,0.1), rgba(179,140,46,0.3))',
              }}
            >
              <div className="absolute inset-0 border border-[#b38c2e]/30" />

              <div className="overflow-hidden group">
                <img
                  src={kunjwalImage}
                  alt="Kunjwal City Gujrat"
                  className="w-full h-[420px] lg:h-[520px] object-cover transform transition-transform duration-700 group-hover:scale-105"
                />
                {/* Gold overlay on hover */}
                <div className="absolute inset-[12px] bg-gradient-to-t from-[#012d47]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Corner ornaments */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#b38c2e]" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#b38c2e]" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#b38c2e]" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#b38c2e]" />
            </div>

            {/* Location badge */}
            <div className="absolute -bottom-5 -left-5 bg-[#014b76] border border-[#b38c2e]/40 px-5 py-3 shadow-card-lift">
              <div className="font-body text-[9px] tracking-[0.25em] uppercase text-[#b38c2e]">Location</div>
              <div className="font-display italic text-[#f5f0e8] text-lg mt-0.5">13-km, Sargodha Road</div>
            </div>
          </div>

        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#b38c2e]/30 to-transparent" />
    </section>
  );
};

export default KunjwalSection;
