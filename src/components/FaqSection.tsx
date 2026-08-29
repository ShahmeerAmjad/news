import { FaWhatsapp } from "react-icons/fa";
import { Reveal } from "@/components/lux/Reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Faq = {
  q: string;
  a: React.ReactNode;
};

const FAQS: Faq[] = [
  {
    q: "What plot sizes are available?",
    a: "The master plan offers residential plots of 3, 5, 6, 7, 8 and 9 Marla, plus a dedicated 4-Marla Commercial plot (30×30). Our featured, actively marketed options are the 5, 7 and 10 Marla residential plots.",
  },
  {
    q: "What is the payment plan?",
    a: 'A "3-Year Easy Installment Plan": a small down payment at booking, the balance spread over 36 comfortable monthly installments, then the remainder at possession. Prices include development charges. Request the current payment plan for exact figures and live availability.',
  },
  {
    q: "When is possession?",
    a: "Possession is targeted within approximately 1.5 years, upon completion of 70% of the plot price. Limited plots are available at current pricing.",
  },
  {
    q: "Is the society approved? What about the NOC?",
    a: "Yes — Kunjwal City has an approved layout, and official approval and NOC documents are available on request. Our team will gladly share them and walk you through the paperwork before you book.",
  },
  {
    q: "Who is the developer?",
    a: "Kunjwal City is developed by AYS Developers (Pvt.) Ltd., a gated community spanning 200+ Kanals on Sargodha Road, Gujrat.",
  },
  {
    q: "How do I book a plot?",
    a: "Reach out by phone or WhatsApp to confirm availability, then visit our office on 15 km Sargodha Road, Gujrat. Booking is completed with the 30% booking amount along with your CNIC, after which you receive an official receipt.",
  },
  {
    q: "Are premium plots priced differently?",
    a: "Yes. Premium locations carry a surcharge over the base price: Main Boulevard +10%, Park-Facing +15%, and Corner +20%.",
  },
];

const FaqSection = () => {
  return (
    <section
      id="faq"
      className="grain scroll-mt-24 relative overflow-hidden bg-navy-radial py-24 md:py-32"
    >
      {/* Ambient depth */}
      <div className="pointer-events-none absolute -right-24 top-1/4 h-72 w-72 rounded-full bg-gold/10 blur-[120px]" />

      <div className="lux-container relative">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Left — header + CTA */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <p className="lux-eyebrow mb-6">Good to Know</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-display text-4xl font-medium leading-[1.05] tracking-tight text-ivory md:text-6xl">
                Questions,{" "}
                <span className="italic text-gold-foil">answered.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md text-base leading-relaxed text-ivory/70 md:text-lg">
                The essentials on plots, pricing, possession and approvals — clear
                and upfront. Still have a question?
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8">
                <a
                  href="https://wa.me/923111786602"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold"
                >
                  <FaWhatsapp /> Talk to an advisor on WhatsApp
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right — accordion */}
          <Reveal variant="fadeUp" delay={0.1}>
            <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
              {FAQS.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="border-b border-gold/15"
                >
                  <AccordionTrigger className="gap-6 py-6 text-left font-display text-xl text-ivory no-underline hover:no-underline hover:text-gold-200 [&[data-state=open]]:text-gold-200 md:text-2xl [&>svg]:h-5 [&>svg]:w-5 [&>svg]:text-gold-300">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 pr-8 text-base leading-relaxed text-ivory/70">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
