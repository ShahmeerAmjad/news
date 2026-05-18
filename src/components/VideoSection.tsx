import React, { useEffect, useRef } from 'react';
import promoVideo from '@/assets/video.mp4';

const VideoSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.section-reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('revealed'), i * 120);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="video"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-[#012d47] overflow-hidden scroll-mt-20"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#b38c2e]/30 to-transparent" />

      <div className="container mx-auto px-6 lg:px-10">

        {/* Heading */}
        <div className="text-center mb-14">
          <div className="section-reveal mb-3">
            <span className="section-label">See It Live</span>
          </div>
          <div className="section-reveal">
            <h2
              className="font-display font-light italic text-[#f5f0e8] leading-tight"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
            >
              Experience Kunjwal City
            </h2>
          </div>
          <div className="section-reveal flex justify-center mt-5">
            <div className="gold-accent-line" />
          </div>
          <div className="section-reveal mt-4">
            <p className="font-body font-light text-[#f5f0e8]/55 text-sm tracking-[0.12em]">
              A masterplanned community in the heart of Gujrat, Punjab
            </p>
          </div>
        </div>

        {/* Video Frame */}
        <div className="section-reveal max-w-5xl mx-auto relative">
          {/* Outer gold frame */}
          <div className="relative p-3"
            style={{
              background: 'linear-gradient(135deg, rgba(179,140,46,0.25), rgba(228,193,82,0.08), rgba(179,140,46,0.25))',
            }}
          >
            {/* Corner ornaments */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#b38c2e]" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#b38c2e]" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#b38c2e]" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#b38c2e]" />

            {/* Video */}
            <div className="relative aspect-video overflow-hidden bg-[#012d47]">
              <video
                src={promoVideo}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
              {/* Subtle vignette */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at center, transparent 60%, rgba(1,45,71,0.4) 100%)'
                }}
              />
            </div>
          </div>

          {/* Bottom label */}
          <div className="flex items-center justify-between mt-5 px-1">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#e4c152] animate-pulse" />
              <span className="font-body text-[10px] tracking-[0.25em] uppercase text-[#b38c2e]">
                Live Preview
              </span>
            </div>
            <span className="font-display italic text-[#f5f0e8]/40 text-sm">
              Kunjwal City · Gujrat 2025
            </span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#b38c2e]/30 to-transparent" />
    </section>
  );
};

export default VideoSection;
