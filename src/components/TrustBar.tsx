import { FiShield, FiClock, FiCreditCard, FiMapPin, FiAward } from "react-icons/fi";

const ITEMS = [
  { icon: FiAward, label: "By AYS Developers" },
  { icon: FiShield, label: "Approved Layout · NOC" },
  { icon: FiCreditCard, label: "3-Year Easy Installments" },
  { icon: FiMapPin, label: "200+ Kanals · Gated" },
  { icon: FiClock, label: "Possession in ~1.5 Years" },
];

/** Thin credibility strip that sits directly under the hero. */
const TrustBar = () => {
  return (
    <div className="relative z-20 border-y border-gold/15 bg-navy-900">
      <div className="lux-container">
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 py-4 md:justify-between">
          {ITEMS.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-2.5 text-ivory/75">
              <Icon className="text-gold-300" size={16} />
              <span className="text-[0.72rem] font-medium uppercase tracking-[0.14em]">{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TrustBar;
