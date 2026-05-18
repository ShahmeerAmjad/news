import React, { useRef, useState, useEffect } from 'react';

import gated from "@/assets/IMG-20250920-WA0010.jpg";
import mosque from "@/assets/IMG-20250920-WA0012.jpg";
import play from "@/assets/IMG-20250920-WA0018.jpg";
import security from "@/assets/closed-circuit-security-cameras.jpg";
import park from "@/assets/images.jpg";

const amenities = [
  { title: 'Gated Community', img: gated, key: 'gated-community' },
  { title: 'Grand Mosque', img: mosque, key: 'grand-mosque' },
  { title: 'Kids Play Area', img: play, key: 'kids-play-area' },
  { title: '24/7 Security', img: security, key: 'security' },
  { title: 'Park & Gardens', img: park, key: 'park' },
];

const ITEMS_VISIBLE = 3;

const AmenitiesSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const maxIndex = amenities.length - ITEMS_VISIBLE;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.section-reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('revealed'), i * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handlePrev = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));
  const handleNext = () => setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));

  const romanNumeral = (n: number) => {
    const numerals = ['I', 'II', 'III', 'IV', 'V'];
    return numerals[n] || String(n + 1);
  };

  return (
    <section
      id="amenities"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-[#014b76] overflow-hidden scroll-mt-20"
    >
      {/* Top rule */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#b38c2e]/40 to-transparent" />

      <div className="container mx-auto px-6 lg:px-10">

        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-3">
          <div>
            <div className="section-reveal mb-3">
              <span className="section-label">What We Offer</span>
            </div>
            <div className="section-reveal">
              <h2
                className="font-display font-light italic text-[#f5f0e8] leading-none"
                style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)' }}
              >
                Amenities
              </h2>
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="section-reveal flex items-center gap-4 mt-6 md:mt-0">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`w-11 h-11 flex items-center justify-center border border-[#b38c2e]/50 text-[#e4c152] rounded-full transition-all duration-300 ${
                currentIndex === 0
                  ? 'opacity-30 cursor-not-allowed'
                  : 'hover:bg-[#b38c2e]/20 hover:border-[#e4c152]'
              }`}
              aria-label="Previous amenity"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <span className="font-display italic text-[#b38c2e]/60 text-sm">
              {String(currentIndex + 1).padStart(2, '0')} / {String(amenities.length).padStart(2, '0')}
            </span>
            <button
              onClick={handleNext}
              disabled={currentIndex === maxIndex}
              className={`w-11 h-11 flex items-center justify-center border border-[#b38c2e]/50 text-[#e4c152] rounded-full transition-all duration-300 ${
                currentIndex === maxIndex
                  ? 'opacity-30 cursor-not-allowed'
                  : 'hover:bg-[#b38c2e]/20 hover:border-[#e4c152]'
              }`}
              aria-label="Next amenity"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Gold rule */}
        <div className="section-reveal mb-10">
          <div className="gold-rule" />
        </div>

        {/* Cards Carousel */}
        <div className="relative overflow-hidden">
          <div
            className="flex gap-7 transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (320 + 28)}px)`,
              willChange: 'transform',
            }}
          >
            {amenities.map((amenity, idx) => (
              <div
                key={amenity.key}
                className="luxury-card min-w-[300px] max-w-[300px] flex-shrink-0 overflow-hidden"
              >
                {/* Roman numeral + divider */}
                <div className="px-6 pt-6 pb-4">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-display italic text-[#b38c2e] text-2xl leading-none">
                      {romanNumeral(idx)}
                    </span>
                    <div className="flex-1 h-px bg-[#b38c2e]/20" />
                  </div>
                  <h3 className="font-body font-light text-[#f5f0e8] text-sm tracking-[0.18em] uppercase mb-1">
                    {amenity.title}
                  </h3>
                </div>

                {/* Image */}
                <div className="w-full h-[220px] overflow-hidden">
                  <img
                    src={amenity.img}
                    alt={amenity.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>

                {/* Bottom accent */}
                <div className="h-px bg-gradient-to-r from-[#b38c2e]/60 to-transparent" />
              </div>
            ))}
          </div>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {amenities.slice(0, amenities.length - ITEMS_VISIBLE + 1).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`transition-all duration-300 ${
                i === currentIndex
                  ? 'text-[#e4c152] scale-125'
                  : 'text-[#b38c2e]/40 hover:text-[#b38c2e]'
              }`}
              style={{ fontSize: '8px', lineHeight: 1 }}
              aria-label={`Go to slide ${i + 1}`}
            >
              ◆
            </button>
          ))}
        </div>
      </div>

      {/* Bottom rule */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#b38c2e]/40 to-transparent" />
    </section>
  );
};

export default AmenitiesSection;
