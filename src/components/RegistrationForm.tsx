import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { FiPhone, FiCheck } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { Reveal } from "@/components/lux/Reveal";
import { submitLead, whatsappFallbackUrl, type Lead } from "@/lib/lead";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name"),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number")
    .regex(/^[+\d][\d\s()-]{6,}$/, "Please enter a valid phone number"),
  email: z.string().trim().email("Enter a valid email").optional().or(z.literal("")),
  country: z.string().trim().optional(),
  city: z.string().trim().optional(),
  plotSize: z.string().trim().optional(),
  purpose: z.string().trim().optional(),
  timeline: z.string().trim().optional(),
  message: z.string().trim().optional(),
});

const PLOT_SIZES = ["5 Marla", "7 Marla", "10 Marla", "Commercial", "Not sure yet"];
const PURPOSES = ["To build my home", "Investment", "Both"];
const TIMELINES = ["Ready to book", "Within 1–3 months", "Just exploring"];

type FormValues = z.infer<typeof schema>;

const TRUST = [
  "Callback within 24 hours",
  "No obligation, no pressure",
  "Transparent pricing & payment plans",
];

const RegistrationForm = ({ source = "home" }: { source?: string }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    const lead: Lead = { ...values, source };
    const { ok } = await submitLead(lead);

    if (ok) {
      toast.success("Thank you! Our team will contact you within 24 hours.");
      reset();
    } else {
      // Never lose the lead — hand off to WhatsApp with details prefilled.
      toast("Connecting you to our team on WhatsApp…", {
        description: "Tap to send your details directly.",
        action: {
          label: "Open WhatsApp",
          onClick: () => window.open(whatsappFallbackUrl(lead), "_blank"),
        },
      });
      window.open(whatsappFallbackUrl(lead), "_blank");
    }
  };

  const field =
    "w-full rounded-sm border border-gold/25 bg-white/5 px-4 py-3 text-ivory placeholder:text-ivory/35 outline-none transition-colors focus:border-gold-300 focus:bg-white/10";
  const label = "mb-2 block text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-gold-200";

  return (
    <section id="register" className="scroll-mt-24 relative overflow-hidden bg-navy-radial grain py-24 md:py-32">
      <div className="lux-container">
        <div className="grid items-start gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Left — pitch */}
          <div>
            <Reveal>
              <p className="lux-eyebrow mb-6">Reserve Now</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-display text-4xl font-medium leading-tight text-ivory md:text-6xl">
                Book your plot <span className="italic text-gold-foil">today.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md text-ivory/70">
                Share your details and a Kunjwal City advisor will reach out with plot
                availability, pricing and the current payment plan.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <ul className="mt-8 space-y-3">
                {TRUST.map((t) => (
                  <li key={t} className="flex items-center gap-3 text-ivory/80">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-gold text-navy-950">
                      <FiCheck size={13} />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-10 flex flex-wrap gap-4">
                <a href="tel:+923111786602" className="btn-ghost-gold !px-6 !py-3 text-xs">
                  <FiPhone /> +92 311 1786602
                </a>
                <a
                  href="https://wa.me/923111786602"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost-gold !px-6 !py-3 text-xs"
                >
                  <FaWhatsapp /> WhatsApp
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right — form card */}
          <Reveal variant="fadeUp" delay={0.1}>
            <form onSubmit={handleSubmit(onSubmit)} className="lux-glass rounded-md p-6 md:p-9" noValidate>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className={label} htmlFor="name">Full name *</label>
                  <input id="name" className={field} placeholder="Enter your full name" {...register("name")} />
                  {errors.name && <p className="mt-1 text-sm text-red-300">{errors.name.message}</p>}
                </div>
                <div>
                  <label className={label} htmlFor="phone">Phone number *</label>
                  <input id="phone" type="tel" className={field} placeholder="+92 300 1234567" {...register("phone")} />
                  {errors.phone && <p className="mt-1 text-sm text-red-300">{errors.phone.message}</p>}
                </div>
              </div>

              <div className="mt-5">
                <label className={label} htmlFor="email">Email <span className="text-ivory/30">(optional)</span></label>
                <input id="email" type="email" className={field} placeholder="you@example.com" {...register("email")} />
                {errors.email && <p className="mt-1 text-sm text-red-300">{errors.email.message}</p>}
              </div>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <div>
                  <label className={label} htmlFor="country">Country <span className="text-ivory/30">(optional)</span></label>
                  <input id="country" className={field} placeholder="Pakistan, UAE, UK…" {...register("country")} />
                </div>
                <div>
                  <label className={label} htmlFor="city">City <span className="text-ivory/30">(optional)</span></label>
                  <input id="city" className={field} placeholder="Lahore, Dubai, London…" {...register("city")} />
                </div>
              </div>

              <div className="mt-5 grid gap-5 sm:grid-cols-3">
                <div>
                  <label className={label} htmlFor="plotSize">Plot of interest</label>
                  <select id="plotSize" className={`${field} appearance-none`} defaultValue="" {...register("plotSize")}>
                    <option value="" disabled className="bg-navy-900">Select…</option>
                    {PLOT_SIZES.map((o) => <option key={o} value={o} className="bg-navy-900">{o}</option>)}
                  </select>
                </div>
                <div>
                  <label className={label} htmlFor="purpose">Purpose</label>
                  <select id="purpose" className={`${field} appearance-none`} defaultValue="" {...register("purpose")}>
                    <option value="" disabled className="bg-navy-900">Select…</option>
                    {PURPOSES.map((o) => <option key={o} value={o} className="bg-navy-900">{o}</option>)}
                  </select>
                </div>
                <div>
                  <label className={label} htmlFor="timeline">Timeline</label>
                  <select id="timeline" className={`${field} appearance-none`} defaultValue="" {...register("timeline")}>
                    <option value="" disabled className="bg-navy-900">Select…</option>
                    {TIMELINES.map((o) => <option key={o} value={o} className="bg-navy-900">{o}</option>)}
                  </select>
                </div>
              </div>

              <div className="mt-5">
                <label className={label} htmlFor="message">Message <span className="text-ivory/30">(optional)</span></label>
                <textarea id="message" rows={3} className={`${field} resize-none`} placeholder="Preferred plot size or any questions…" {...register("message")} />
              </div>

              <button type="submit" disabled={isSubmitting} className="btn-gold mt-7 w-full disabled:opacity-60">
                {isSubmitting ? "Submitting…" : "Request a Callback"}
              </button>
              <p className="mt-4 text-center text-xs text-ivory/45">
                Your information is safe with us. We respect your privacy.
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default RegistrationForm;
