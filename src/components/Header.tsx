import { useEffect, useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { FiPhone } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import logo from "@/assets/logo-horizontal.png";

const NAV = [
  { label: "Overview", id: "overview" },
  { label: "Master Plan", id: "master-plan" },
  { label: "Payment Plan", id: "plans" },
  { label: "Amenities", id: "amenities" },
  { label: "Location", id: "location" },
];

const PHONE = "+92 311 1786602";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-navy-900/85 backdrop-blur-xl shadow-[0_10px_40px_-20px_rgba(0,0,0,0.8)] border-b border-gold/15"
          : "bg-gradient-to-b from-navy-950/70 to-transparent"
      }`}
    >
      <div className="lux-container">
        <div className={`flex items-center justify-between transition-all duration-500 ${scrolled ? "h-16" : "h-20 md:h-24"}`}>
          {/* Logo */}
          <button onClick={() => go("top")} className="flex items-center gap-3" aria-label="Kunjwal City home">
            <img
              src={logo}
              alt="Kunjwal City — Gujrat"
              className={`object-contain transition-all duration-500 ${scrolled ? "h-8" : "h-10 md:h-12"}`}
            />
          </button>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-10 lg:flex">
            {NAV.map((item) => (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                className="group relative text-[0.82rem] font-medium uppercase tracking-[0.2em] text-ivory/80 transition-colors hover:text-gold-200"
              >
                {item.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gradient-gold transition-all duration-500 group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* Right cluster */}
          <div className="flex items-center gap-5">
            <a
              href={`tel:${PHONE.replace(/\s/g, "")}`}
              className="hidden items-center gap-2 text-sm font-medium text-ivory/75 transition-colors hover:text-gold-200 xl:flex"
            >
              <FiPhone className="text-gold-300" />
              {PHONE}
            </a>
            <button onClick={() => go("register")} className="btn-gold hidden !px-6 !py-3 text-xs sm:inline-flex">
              Book a Plot
            </button>
            <button
              onClick={() => setOpen((v) => !v)}
              className="text-ivory transition-colors hover:text-gold-200 lg:hidden"
              aria-label="Toggle menu"
            >
              {open ? <HiX size={26} /> : <HiMenu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 top-16 z-40 bg-navy-950/97 backdrop-blur-xl lg:hidden"
          >
            <nav className="flex flex-col px-8 pt-8">
              {NAV.map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 * i + 0.1, duration: 0.5 }}
                  onClick={() => go(item.id)}
                  className="flex items-center gap-4 border-b border-gold/10 py-5 text-left font-display text-3xl text-ivory transition-colors hover:text-gold-200"
                >
                  <span className="text-xs font-sans tracking-[0.3em] text-gold-300">0{i + 1}</span>
                  {item.label}
                </motion.button>
              ))}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.5 }}
                onClick={() => go("register")}
                className="btn-gold mt-10 w-full"
              >
                Book a Plot
              </motion.button>
              <a href={`tel:${PHONE.replace(/\s/g, "")}`} className="mt-6 flex items-center justify-center gap-2 text-ivory/70">
                <FiPhone className="text-gold-300" /> {PHONE}
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
