import { useEffect, useState } from "react";
import { FiPhone } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { track } from "@/lib/pixel";

const WA = "https://wa.me/923111786602?text=" +
  encodeURIComponent("Hello! I'm interested in booking a plot at Kunjwal City. Please share details.");

/** Persistent mobile action bar: Call · WhatsApp · Book. Appears after the hero. */
const StickyCTA = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const book = () => document.getElementById("register")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-gold/20 bg-navy-950/95 backdrop-blur-md transition-transform duration-500 lg:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="grid grid-cols-3">
        <a
          href="tel:+923111786602"
          onClick={() => track("Contact", { method: "call" })}
          className="flex items-center justify-center gap-2 border-r border-gold/15 py-3.5 text-xs font-semibold uppercase tracking-[0.12em] text-ivory/85"
        >
          <FiPhone className="text-gold-300" /> Call
        </a>
        <a
          href={WA}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("Contact", { method: "whatsapp" })}
          className="flex items-center justify-center gap-2 border-r border-gold/15 py-3.5 text-xs font-semibold uppercase tracking-[0.12em] text-ivory/85"
        >
          <FaWhatsapp className="text-[#25D366]" /> WhatsApp
        </a>
        <button
          onClick={book}
          className="flex items-center justify-center gap-2 bg-gradient-gold py-3.5 text-xs font-bold uppercase tracking-[0.12em] text-navy-950"
        >
          Book a Plot
        </button>
      </div>
    </div>
  );
};

export default StickyCTA;
