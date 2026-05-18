import React, { useEffect, useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';
import logo from '@/assets/logo.png';

const NAV_ITEMS = ['Home', 'About', 'Kunjwal', 'Amenities', 'Register', 'Video'];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (mobileMenuOpen && !target.closest('.mobile-menu') && !target.closest('.hamburger-button')) {
        setMobileMenuOpen(false);
      }
    };
    if (mobileMenuOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mobileMenuOpen]);

  const handleNavClick = (id: string) => {
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#012d47]/96 backdrop-blur-xl border-b border-[#b38c2e]/25 shadow-[0_4px_30px_rgba(0,0,0,0.4)]'
          : 'bg-gradient-to-b from-[#012d47]/80 to-transparent'
      }`}
    >
      <div className="container mx-auto px-6 lg:px-10">
        <div className="flex items-center h-16 lg:h-18">

          {/* Logo */}
          <button
            onClick={() => handleNavClick('top')}
            className="flex items-center flex-shrink-0 group"
            aria-label="Kanjwal City — Home"
          >
            <img
              src={logo}
              alt="Kanjwal City"
              className="w-24 h-24 md:w-28 md:h-28 object-contain transition-opacity duration-300 group-hover:opacity-85"
            />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center ml-auto gap-x-10">
            {NAV_ITEMS.map((item) => (
              <button
                key={item}
                onClick={() => handleNavClick(item.toLowerCase())}
                className="relative text-[#f5f0e8]/80 hover:text-[#e4c152] font-body text-[11px] font-light tracking-[0.22em] uppercase transition-colors duration-300 group py-1"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-[#b38c2e] to-[#e4c152] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </button>
            ))}

            {/* CTA in nav */}
            <button
              onClick={() => handleNavClick('register')}
              className="luxury-btn-outline ml-4 !py-2 !px-6 !text-[10px]"
            >
              <span>Book Now</span>
            </button>
          </nav>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="hamburger-button lg:hidden text-[#f5f0e8] hover:text-[#e4c152] transition-colors duration-300 p-2 ml-auto"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <HiX size={22} /> : <HiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-[#012d47]/97 backdrop-blur-xl">
          {/* Close button */}
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-4 right-6 text-[#f5f0e8] hover:text-[#e4c152] transition-colors p-2"
          >
            <HiX size={24} />
          </button>

          <div className="mobile-menu flex flex-col items-center justify-center h-full gap-2">
            {/* Gold ornament */}
            <div className="mb-8 text-[#b38c2e] text-xs tracking-[0.3em] uppercase font-body">
              Kanjwal City
            </div>

            {NAV_ITEMS.map((item, idx) => (
              <button
                key={item}
                onClick={() => handleNavClick(item.toLowerCase())}
                className="text-[#f5f0e8]/70 hover:text-[#e4c152] font-display text-3xl font-light italic py-3 transition-all duration-300 hover:tracking-wider"
                style={{ animationDelay: `${idx * 60}ms` }}
              >
                {item}
              </button>
            ))}

            <div className="mt-10 gold-rule w-32" />

            <button
              onClick={() => handleNavClick('register')}
              className="luxury-btn-outline mt-8"
            >
              <span>Book Your Plot</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
