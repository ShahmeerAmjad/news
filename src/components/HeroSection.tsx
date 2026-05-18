import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import hero_slide1 from "../assets/hero_slide-1.png";
import hero_slide2 from "../assets/hero_slide-2.png";
import hero_slide3 from "../assets/hero_slide-3.png";

import text_slide1 from "../assets/text_slide_hero.png";
import text_slide2 from "../assets/1.png";
import text_slide3 from "../assets/text_slide3.png";

interface ArrowProps {
  onClick?: () => void;
}

const NextArrow: React.FC<ArrowProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-5 md:right-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center border border-[#b38c2e]/60 hover:border-[#e4c152] hover:bg-[#b38c2e]/20 text-[#e4c152] rounded-full transition-all duration-300 backdrop-blur-sm"
    aria-label="Next slide"
  >
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </button>
);

const PrevArrow: React.FC<ArrowProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-5 md:left-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center border border-[#b38c2e]/60 hover:border-[#e4c152] hover:bg-[#b38c2e]/20 text-[#e4c152] rounded-full transition-all duration-300 backdrop-blur-sm"
    aria-label="Previous slide"
  >
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </button>
);

interface SlideContentProps {
  slideIndex: number;
}

const SlideContent: React.FC<SlideContentProps> = ({ slideIndex }) => {
  const handleCTAClick = () => {
    const el = document.getElementById('register');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const textImages = [text_slide1, text_slide2, text_slide3];
  const alts = [
    "5, 7 & 10 Marla Plots — Kunjwal City",
    "Own Your Dream Home — Kunjwal City",
    "Kids Play Areas — Kunjwal City",
  ];

  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-4xl flex flex-col items-center gap-8 md:gap-10">
        <img
          src={textImages[slideIndex]}
          alt={alts[slideIndex]}
          className="w-full max-w-2xl md:max-w-3xl h-auto object-contain drop-shadow-2xl"
        />

        {/* Luxury CTA Button */}
        <button
          onClick={handleCTAClick}
          className="luxury-btn-outline"
        >
          <span>Book Your Plot Now</span>
        </button>

        {/* Bottom decorative line */}
        <div className="flex items-center gap-3 mt-2">
          <div className="w-12 h-px bg-[#b38c2e]/60" />
          <span className="text-[#e4c152]/70 text-[10px] tracking-[0.3em] uppercase font-body font-light">
            Kunjwal City · Gujrat, Punjab
          </span>
          <div className="w-12 h-px bg-[#b38c2e]/60" />
        </div>
      </div>
    </div>
  );
};

const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [heroHeight, setHeroHeight] = useState('100vh');

  useEffect(() => {
    const update = () => {
      setHeroHeight(window.innerWidth < 768 ? '70vh' : '100vh');
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const getMobilePos = (index: number) => {
    const positions = ['center 40%', 'center 45%', '10% center'];
    return window.innerWidth >= 768 ? 'center center' : positions[index];
  };

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5500,
    speed: 1100,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (_: number, next: number) => setCurrentSlide(next),
    appendDots: (dots: React.ReactNode) => (
      <div className="absolute bottom-8 md:bottom-10 w-full z-30">
        <ul className="flex justify-center gap-3">{dots}</ul>
      </div>
    ),
    customPaging: () => (
      <button className="w-5 h-5 flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity">
        <span className="text-[#b38c2e] text-[8px]">◆</span>
      </button>
    ),
  };

  const slides = [
    { src: hero_slide1, alt: "Residential Plots — Kunjwal City Gujrat" },
    { src: hero_slide2, alt: "Modern Dream Homes — Kunjwal City" },
    { src: hero_slide3, alt: "Kids Play Areas — Kunjwal City" },
  ];

  return (
    <section
      className="relative overflow-hidden"
      style={{ height: heroHeight, minHeight: heroHeight, maxHeight: heroHeight }}
    >
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative">
            {/* Background Image */}
            <div
              style={{
                width: '100%',
                height: heroHeight,
                minHeight: heroHeight,
                backgroundImage: `url(${slide.src})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: getMobilePos(index),
              }}
              role="img"
              aria-label={slide.alt}
            />

            {/* Deep navy gradient overlay */}
            <div
              className="absolute inset-0 z-10"
              style={{
                background: 'linear-gradient(to bottom, rgba(1,45,71,0.35) 0%, rgba(1,45,71,0.55) 50%, rgba(1,45,71,0.75) 100%)'
              }}
            />

            {/* Slide Content */}
            <SlideContent slideIndex={currentSlide === index ? index : index} />
          </div>
        ))}
      </Slider>

      {/* Bottom gold gradient bar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1 z-30"
        style={{ background: 'linear-gradient(90deg, transparent, #b38c2e 30%, #e4c152 70%, transparent)' }}
      />
    </section>
  );
};

export default HeroSection;
