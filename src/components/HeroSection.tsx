import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Background images (clean, no text)
import hero_slide1 from "../assets/hero_slide-1.png";
import hero_slide2 from "../assets/hero_slide-2.png";
import hero_slide3 from "../assets/hero_slide-3.png";

// Text overlay images
import text_slide1 from "../assets/text_slide_hero.png"; // Slide 1: "5, 7 & 10" text
import text_slide2 from "../assets/1.png"; // Slide 2: "Own Your Dream Home" text
import text_slide3 from "../assets/text_slide3.png"; // Slide 3: "Kids Play Areas" text




// Arrow components
interface ArrowProps {
  onClick?: () => void;
}

const NextArrow: React.FC<ArrowProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-30 bg-black/30 hover:bg-black/50 text-white p-2 md:p-3 rounded-full transition duration-300"
    aria-label="Next slide"
  >
    <FaChevronRight size={20} />
  </button>
);

const PrevArrow: React.FC<ArrowProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-30 bg-black/30 hover:bg-black/50 text-white p-2 md:p-3 rounded-full transition duration-300"
    aria-label="Previous slide"
  >
    <FaChevronLeft size={20} />
  </button>
);

// Text overlay component for each slide
interface SlideContentProps {
  slideIndex: number;
}

const SlideContent: React.FC<SlideContentProps> = ({ slideIndex }) => {
  const handleCTAClick = () => {
    // Scroll to registration form
    const registerSection = document.getElementById('register');
    if (registerSection) {
      registerSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Slide 1: "5, 7 & 10" Marla Plots
  if (slideIndex === 0) {
    return (
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-4xl flex flex-col items-center space-y-4 md:space-y-6">
          {/* Text overlay image */}
          <img 
            src={text_slide1} 
            alt="5, 7 & 10 Marla Plots"
            className="w-full max-w-2xl md:max-w-3xl h-auto object-contain"
          />
          
          {/* CTA Button */}
          <button
            onClick={handleCTAClick}
            className="bg-white text-[#014b76] hover:bg-[#e4c152] hover:text-white px-8 py-3 md:px-12 md:py-4 rounded-full text-lg md:text-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            BOOK YOUR PLOT NOW
          </button>
        </div>
      </div>
    );
  }

  // Slide 2: "Own Your Dream Home"
  if (slideIndex === 1) {
    return (
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-4xl flex flex-col items-center space-y-4 md:space-y-6">
          {/* Text overlay image */}
          <img 
            src={text_slide2} 
            alt="Own Your Dream Home - 5, 7 & 10 Marla Plots"
            className="w-full max-w-2xl md:max-w-3xl h-auto object-contain"
          />
          
          {/* CTA Button */}
          <button
            onClick={handleCTAClick}
            className="bg-white text-[#014b76] hover:bg-[#e4c152] hover:text-white px-8 py-3 md:px-12 md:py-4 rounded-full text-lg md:text-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            BOOK YOUR PLOT NOW
          </button>
        </div>
      </div>
    );
  }

  // Slide 3: "Kids Play Areas"
  if (slideIndex === 2) {
    return (
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-4xl flex flex-col items-center space-y-4 md:space-y-6">
          {/* Text overlay image */}
          <img 
            src={text_slide3} 
            alt="Kids Play Areas - Designed for a Safe & Happy Childhood"
            className="w-full max-w-2xl md:max-w-3xl h-auto object-contain"
          />
          
          {/* CTA Button */}
          <button
            onClick={handleCTAClick}
            className="bg-white text-[#014b76] hover:bg-[#e4c152] hover:text-white px-8 py-3 md:px-12 md:py-4 rounded-full text-lg md:text-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            BOOK YOUR PLOT NOW
          </button>
        </div>
      </div>
    );
  }

  return null;
};

const HeroSection: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (current: number, next: number) => setCurrentSlide(next),
    appendDots: (dots: React.ReactNode) => (
      <div className="absolute bottom-6 md:bottom-8 w-full z-30">
        <ul className="flex justify-center gap-2"> {dots} </ul>
      </div>
    ),
    customPaging: () => (
      <div className="w-3 h-3 bg-white/50 hover:bg-white rounded-full transition-all duration-300 cursor-pointer" />
    ),
  };

  const slides = [
    { 
      src: hero_slide1, 
      alt: "Residential Plots - 5, 7, 10 Marla - Kunjwal City"
    },
    { 
      src: hero_slide2, 
      alt: "Modern Dream Homes - 5, 7 & 10 Marla Plots"
    },
    { 
      src: hero_slide3, 
      alt: "Kids Play Areas - Safe & Happy Childhood"
    }
  ];

  // Get height based on screen size
  const getHeight = () => {
    if (typeof window === 'undefined') return '100vh';
    return window.innerWidth < 768 ? '60vh' : '100vh';
  };
  
  const getBackgroundPosition = (index: number) => {
    if (typeof window === 'undefined') return 'center center';
    if (window.innerWidth >= 768) return 'center center';
    
    // Mobile positioning - adjust these if images are cut off
    const positions = [
      'center 40%',   // Slide 1 - Buildings with golden monument
      'center 45%',   // Slide 2 - Modern house
      '10% center'    // Slide 3 - Family with playground (show more faces)
    ];
    
    return positions[index];
  };

  return (
    <section 
      className="relative overflow-hidden"
      style={{ 
        height: getHeight(),
        minHeight: getHeight(),
        maxHeight: getHeight(),
        margin: 0,
        padding: 0
      }}
    >
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative">
            {/* Background Image */}
            <div
              style={{ 
                width: '100%',
                height: getHeight(),
                minHeight: getHeight(),
                maxHeight: getHeight(),
                backgroundImage: `url(${slide.src})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: getBackgroundPosition(index)
              }}
              role="img"
              aria-label={slide.alt}
            />
            
            {/* Blue Overlay (50% opacity) - Kunjwal Navy Blue */}
            <div className="absolute inset-0 bg-[#014b76]/50 z-10" />
            
            {/* Text Content Overlay */}
            <SlideContent slideIndex={index} />
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default HeroSection;
