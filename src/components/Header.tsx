import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';
import logo from '@/assets/logo.png';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        mobileMenuOpen &&
        !target.closest('.mobile-menu') &&
        !target.closest('.hamburger-button')
      ) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (id: string) => {
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setMobileMenuOpen(false);
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#014b76]/95 backdrop-blur-md shadow-md'
          : 'bg-transparent bg-gradient-to-r from-[#014b76]/60 via-[#014b76]/80 to-[#014b76]/95'
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center h-20">
          {/* Logo */}
          {/* Logo */}
<button
  onClick={() => handleNavClick('top')}
  className="flex items-center"
>
  <img
    src={logo}
    alt="Kunjwal City Logo"
  className="w-32 h-32 md:w-32 md:h-32 object-contain"
  />
</button>


          {/* Navigation */}
          <div className="ml-auto flex items-center gap-x-8">
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {['Home', 'About', 'Kunjwal', 'Amenities', 'Register', 'Video'].map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleNavClick(item.toLowerCase())}
                  className="text-white hover:bg-gradient-to-r hover:from-[#b38c2e] hover:to-[#e4c152] hover:bg-clip-text hover:text-transparent transition-colors font-medium"
                >
                  {item}
                </button>
              ))}
            </nav>

            {/* Mobile Hamburger Button */}
            <button
              onClick={toggleMobileMenu}
              className="hamburger-button lg:hidden text-white hover:text-[#e4c152] transition-colors p-2"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-[#014b76]/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="mobile-menu fixed top-20 left-0 right-0 bg-[#014b76] border-t border-[#e4c152]/30 animate-in slide-in-from-top duration-300">
            <nav className="flex flex-col py-4">
              {['Home', 'About', 'Kunjwal', 'Amenities', 'Register', 'Video'].map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleNavClick(item.toLowerCase())}
                  className="text-white hover:text-[#e4c152] hover:bg-[#013e63] transition-colors font-medium px-6 py-4 text-left border-b border-[#e4c152]/10"
                >
                  {item}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
