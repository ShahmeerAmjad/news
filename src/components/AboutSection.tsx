import React, { useEffect, useRef } from "react";

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.section-reveal, .section-reveal-left, .section-reveal-right').forEach((el, i) => {
              setTimeout(() => el.classList.add('revealed'), i * 120);
            });
          }
        });
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-[#014b76] overflow-hidden scroll-mt-20"
    >
      {/* Large decorative roman numeral background */}
      <div
        className="absolute left-6 top-1/2 -translate-y-1/2 font-display font-light text-[#e4c152] select-none pointer-events-none"
        style={{ fontSize: 'clamp(160px, 20vw, 280px)', opacity: 0.04, lineHeight: 1 }}
        aria-hidden="true"
      >
        I
      </div>

      {/* Subtle top gold rule */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#b38c2e]/40 to-transparent" />

      <div className="container mx-auto px-6 lg:px-16 max-w-5xl relative z-10">

        {/* Section label */}
        <div className="section-reveal flex justify-center mb-6">
          <span className="section-label">Our Developer</span>
        </div>

        {/* Gold divider above heading */}
        <div className="section-reveal flex justify-center mb-8">
          <div className="gold-divider max-w-xs">
            <span className="text-[#b38c2e] text-[8px]">◆</span>
          </div>
        </div>

        {/* Main Heading */}
        <div className="section-reveal text-center mb-4">
          <h2
            className="font-display font-light italic gold-text leading-tight"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
          >
            AYS Developers
          </h2>
          <span className="block font-display font-light text-[#f5f0e8]/60 text-xl md:text-2xl mt-1 tracking-widest">
            (Pvt.) Ltd
          </span>
        </div>

        {/* Subheading */}
        <div className="section-reveal text-center mb-10">
          <h3 className="font-body font-light text-[#e4c152] text-sm tracking-[0.3em] uppercase">
            Building Trust · Creating Value
          </h3>
        </div>

        {/* Gold divider below heading */}
        <div className="section-reveal flex justify-center mb-14">
          <div className="gold-accent-line" />
        </div>

        {/* Body Text */}
        <div className="space-y-7 text-[#f5f0e8]/85 text-lg leading-8 font-body font-light max-w-3xl mx-auto">
          <p className="section-reveal">
            Kunjwal City, Gujrat is proudly developed by{" "}
            <span className="text-[#e4c152] font-medium">AYS Developers (Pvt.) Ltd.</span>{" "}
            — a trusted name in the Pakistani real estate sector. With an unwavering commitment
            to quality, integrity, and long-term value, AYS Developers continue to set new
            standards in residential and commercial development.
          </p>

          <p className="section-reveal">
            Backed by visionary leadership and a forward-looking approach to urban planning,
            the company focuses on customer satisfaction, modern infrastructure, and
            community-driven development. Every project reflects excellence, transparency,
            and reliability.
          </p>

          <p className="section-reveal">
            With a proven track record of delivering sustainable and well-planned communities,
            AYS Developers position Kunjwal City not just as a place to live —
            <em className="text-[#e4c152] not-italic"> but a place to thrive.</em>
          </p>
        </div>

        {/* Est. badge */}
        <div className="section-reveal flex justify-center mt-16">
          <div className="flex items-center gap-6">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-[#b38c2e]" />
            <span className="font-display italic text-[#b38c2e]/70 text-sm tracking-widest">
              Est. 2024 · Gujrat, Punjab
            </span>
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-[#b38c2e]" />
          </div>
        </div>
      </div>

      {/* Bottom gold rule */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#b38c2e]/40 to-transparent" />
    </section>
  );
};

export default AboutSection;
