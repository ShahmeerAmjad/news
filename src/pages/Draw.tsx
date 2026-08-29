import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  FiAward,
  FiCheck,
  FiChevronLeft,
  FiGift,
  FiPhone,
  FiShare2,
  FiUser,
  FiSmartphone,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import logo from "@/assets/logo.png";
import LocalityCombobox from "@/components/LocalityCombobox";
import { Reveal, RevealGroup } from "@/components/lux/Reveal";
import { EASE, stagger, wordUp } from "@/lib/anim";
import { track, trackLead } from "@/lib/pixel";

/**
 * /draw — the lucky-draw landing page behind the flyer QR code.
 *
 * One job: turn a scanned flyer into a consented contact. Everything above the
 * fold is prize + form; the rules live below it. Built deliberately light — the
 * audience is on village 3G, so there is no video, no parallax and no smooth
 * scroll here, unlike the main site.
 *
 * ── Everything the client tweaks lives in this block ──────────────────────────
 */

/** Draw date. Deliberately the flyer's last-booking day so both deadlines push together. */
const DRAW_DATE = new Date("2026-09-30T18:00:00+05:00");
const DRAW_DATE_UR = "30 ستمبر 2026";
const DRAW_DATE_EN = "30 September 2026";

const WHATSAPP_NUMBER = "923111786602";
const PHONE_DISPLAY = "03-111-786-602";

/** Guaranteed reward every entrant gets — the part that actually sells plots. */
const VOUCHER_PKR = "25,000";

type Prize = {
  /** Ordinal label, e.g. "پہلا انعام". */
  tierUr: string;
  tierEn: string;
  titleUr: string;
  titleEn: string;
  qty: number;
  /** Dropped into public/media/draw/. Falls back to a gold gradient if absent. */
  img: string;
  /** The one prize rendered large. */
  hero?: boolean;
};

const PRIZES: Prize[] = [
  {
    tierUr: "پہلا انعام",
    tierEn: "Grand Prize",
    titleUr: "1,00,000 روپے نقد",
    titleEn: "PKR 100,000 Cash",
    qty: 1,
    img: "/media/draw/prize-cash.png",
    hero: true,
  },
  {
    tierUr: "دوسرا انعام",
    tierEn: "2nd Prize",
    titleUr: "آٹومیٹک واشنگ مشین",
    titleEn: "Automatic Washing Machine",
    qty: 2,
    img: "/media/draw/prize-washing-machine.png",
  },
  {
    tierUr: "تیسرا انعام",
    tierEn: "3rd Prize",
    titleUr: "کچن سیٹ — بلینڈر، جوسر، استری",
    titleEn: "Kitchen Set — Blender, Juicer, Iron",
    qty: 5,
    img: "/media/draw/prize-kitchen-set.png",
  },
  {
    tierUr: "چوتھا انعام",
    tierEn: "4th Prize",
    titleUr: "الیکٹرک کیتلی / سینڈوچ میکر",
    titleEn: "Electric Kettle / Sandwich Maker",
    qty: 20,
    img: "/media/draw/prize-kettle.png",
  },
];

const RULES: { ur: string; en: string }[] = [
  { ur: "داخلہ بالکل مفت ہے — کوئی خریداری ضروری نہیں۔", en: "Entry is free. No purchase necessary." },
  { ur: "ایک موبائل نمبر پر صرف ایک انٹری قبول ہوگی۔", en: "One entry per mobile number." },
  { ur: "عمر 18 سال یا اس سے زیادہ ہونی چاہیے۔", en: "Entrants must be 18 or older." },
  {
    ur: `قرعہ اندازی ${DRAW_DATE_UR} کو کنجوال سٹی آفس میں ہوگی اور فیس بک پر لائیو دکھائی جائے گی۔`,
    en: `The draw takes place on ${DRAW_DATE_EN} at the Kunjwal City office, streamed live on Facebook.`,
  },
  {
    ur: "کامیاب افراد کو اسی نمبر پر کال کی جائے گی۔ انعام اصل شناختی کارڈ دکھا کر آفس سے وصول کریں۔",
    en: "Winners are called on the number they entered. Prizes are collected from the office with original CNIC.",
  },
  {
    ur: "کنجوال سٹی اور AYS ڈویلپرز کے ملازمین اور ان کے اہلِ خانہ شریک نہیں ہو سکتے۔",
    en: "Employees of Kunjwal City / AYS Developers and their families are not eligible.",
  },
  {
    ur: "فارم جمع کرانے سے آپ ہمیں کال، SMS اور واٹس ایپ پر رابطے کی اجازت دیتے ہیں۔",
    en: "By entering you consent to contact by call, SMS and WhatsApp.",
  },
  { ur: "انتظامیہ کا فیصلہ حتمی تصور کیا جائے گا۔", en: "The management's decision is final." },
];

/* ─────────────────────────────────────────────────────────────────────────── */

type Status = "idle" | "sending" | "done" | "duplicate";

export default function Draw() {
  const reduce = useReducedMotion();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [locality, setLocality] = useState("");
  const [consent, setConsent] = useState(false);
  const [wantsPlot, setWantsPlot] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [entryNo, setEntryNo] = useState("");
  const [serverError, setServerError] = useState("");

  /** Distribution zone, when per-village QR batches are printed (/draw?a=kunjah). */
  const area = useMemo(() => new URLSearchParams(window.location.search).get("a") || "", []);

  useUrduFonts();

  useEffect(() => {
    document.title = "کنجوال سٹی قرعہ اندازی | Kunjwal City Lucky Draw";
    track("ViewContent", { content_name: "Lucky Draw", area });
    // Someone who already entered on this phone gets greeted instead of re-asked.
    try {
      const prior = localStorage.getItem("kc_draw_entry");
      if (prior) {
        setEntryNo(prior);
        setStatus("duplicate");
      }
    } catch {
      /* private browsing — fall through to the normal form */
    }
  }, [area]);

  const daysLeft = Math.max(0, Math.ceil((DRAW_DATE.getTime() - Date.now()) / 86_400_000));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError("");

    const next: Record<string, boolean> = {};
    if (name.trim().length < 2) next.name = true;
    if (!isPkMobile(phone)) next.phone = true;
    if (!locality.trim()) next.locality = true;
    if (!consent) next.consent = true;
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("sending");
    // Custom event, not `Lead` — draw entries must not pollute plot-lead optimisation.
    track("DrawEntry", { content_name: "Kunjwal City Lucky Draw", locality });
    if (wantsPlot) trackLead({ source: "draw" });

    try {
      const res = await fetch("/api/draw", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          locality: locality.trim(),
          consent,
          wantsPlot,
          area,
          source: "flyer-qr",
        }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setServerError(data?.error || "کچھ مسئلہ ہوا۔ دوبارہ کوشش کریں۔");
        setStatus("idle");
        return;
      }

      setEntryNo(data.entryNo || "");
      try {
        localStorage.setItem("kc_draw_entry", data.entryNo || "");
      } catch {
        /* ignore */
      }
      setStatus(data.duplicate ? "duplicate" : "done");
    } catch {
      setServerError("انٹرنیٹ کا مسئلہ لگتا ہے۔ دوبارہ کوشش کریں یا واٹس ایپ کریں۔");
      setStatus("idle");
    }
  }

  return (
    <main dir="rtl" className="min-h-screen bg-navy-950 text-ivory font-urdu">
      <GoldTopLine />

      <div className="mx-auto w-full max-w-2xl px-5 pb-24 pt-8">
        {/* ── Masthead ─────────────────────────────────────────────────── */}
        <header className="flex items-center justify-between">
          <img src={logo} alt="Kunjwal City" className="h-14 w-auto" />
          <a
            href={`tel:+${WHATSAPP_NUMBER}`}
            className="flex items-center gap-2 rounded-full border border-gold-400/30 px-4 py-2 text-sm text-gold-200"
          >
            <FiPhone className="h-3.5 w-3.5" />
            <span dir="ltr">{PHONE_DISPLAY}</span>
          </a>
        </header>

        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section className="pt-10 text-center">
          <motion.div
            variants={stagger(0.09)}
            initial={reduce ? undefined : "hidden"}
            animate={reduce ? undefined : "show"}
          >
            <motion.p
              variants={wordUp}
              className="text-[11px] uppercase tracking-luxe text-gold-400/80"
              dir="ltr"
            >
              Kunjwal City · Gujrat
            </motion.p>

            <motion.h1
              variants={wordUp}
              className="mt-4 font-nastaliq text-4xl leading-[1.7] text-ivory sm:text-5xl"
            >
              قرعہ اندازی میں <span className="text-gradient-gold">مفت</span> حصہ لیں
            </motion.h1>

            <motion.p variants={wordUp} className="mt-3 text-lg text-ivory/80">
              اپنا نام، موبائل نمبر اور علاقہ لکھیں — اور نقد انعام اور گھریلو الیکٹرانکس جیتنے کا موقع پائیں۔
            </motion.p>
            <motion.p variants={wordUp} className="mt-2 text-sm text-ivory/45" dir="ltr">
              Free entry. Win cash and home appliances.
            </motion.p>

            <motion.div
              variants={wordUp}
              className="mt-6 inline-flex items-center gap-3 rounded-full border border-gold-400/30 bg-gold-400/5 px-5 py-2.5"
            >
              <FiAward className="h-4 w-4 text-gold-300" />
              <span className="text-sm text-gold-100">
                قرعہ اندازی {DRAW_DATE_UR} —{" "}
                <strong className="text-gold-300">{daysLeft} دن باقی</strong>
              </span>
            </motion.div>
          </motion.div>
        </section>

        {/* ── Prizes ───────────────────────────────────────────────────── */}
        <section className="pt-14">
          <SectionTitle ur="انعامات" en="The prizes" />

          <RevealGroup className="mt-6 grid grid-cols-2 gap-3">
            {PRIZES.map((p) => (
              <Reveal key={p.tierEn} as="div" className={p.hero ? "col-span-2" : ""}>
                <PrizeCard prize={p} />
              </Reveal>
            ))}
          </RevealGroup>

          <Reveal>
            <div className="mt-3 flex items-center gap-3 rounded-2xl border border-gold-400/25 bg-gradient-to-l from-gold-400/10 to-transparent p-4">
              <FiGift className="h-5 w-5 shrink-0 text-gold-300" />
              <p className="text-sm leading-relaxed text-ivory/85">
                <strong className="text-gold-200">ہر شریک کے لیے یقینی انعام:</strong> پلاٹ بکنگ پر{" "}
                {VOUCHER_PKR} روپے کی رعایت کا واؤچر۔
                <span className="mt-1 block text-xs text-ivory/45" dir="ltr">
                  Guaranteed for everyone: PKR {VOUCHER_PKR} off your plot booking.
                </span>
              </p>
            </div>
          </Reveal>
        </section>

        {/* ── Entry form / success ─────────────────────────────────────── */}
        <section id="form" className="pt-14">
          {status === "done" || status === "duplicate" ? (
            <SuccessCard
              entryNo={entryNo}
              duplicate={status === "duplicate"}
              name={name}
            />
          ) : (
            <div className="rounded-3xl border border-gold-400/25 bg-navy-900/70 p-6 shadow-soft sm:p-8">
              <SectionTitle ur="انٹری فارم" en="Entry form" align="right" />

              <form onSubmit={handleSubmit} className="mt-6 space-y-5" noValidate>
                <Field
                  label="پورا نام"
                  english="Full name"
                  icon={<FiUser />}
                  invalid={errors.name}
                  error="نام لکھنا ضروری ہے"
                >
                  <input
                    type="text"
                    dir="auto"
                    autoComplete="name"
                    value={name}
                    placeholder="مثلاً محمد اسلم"
                    onChange={(e) => setName(e.target.value)}
                    className={inputClass(errors.name)}
                  />
                </Field>

                <Field
                  label="موبائل نمبر"
                  english="Mobile number"
                  icon={<FiSmartphone />}
                  invalid={errors.phone}
                  error="درست موبائل نمبر لکھیں — مثلاً 03001234567"
                >
                  <input
                    type="tel"
                    dir="ltr"
                    inputMode="numeric"
                    autoComplete="tel"
                    value={phone}
                    placeholder="03001234567"
                    onChange={(e) => setPhone(e.target.value)}
                    className={`${inputClass(errors.phone)} text-left`}
                  />
                </Field>

                <Field
                  label="آپ کا علاقہ / گاؤں"
                  english="Your village or locality"
                  invalid={errors.locality}
                  error="اپنا علاقہ منتخب کریں"
                >
                  <LocalityCombobox value={locality} onChange={setLocality} invalid={errors.locality} />
                </Field>

                <CheckRow checked={wantsPlot} onChange={setWantsPlot}>
                  مجھے کنجوال سٹی میں پلاٹ کی معلومات بھی چاہیئں
                  <span className="mt-0.5 block text-xs text-ivory/40" dir="ltr">
                    I'd also like plot information
                  </span>
                </CheckRow>

                <CheckRow checked={consent} onChange={setConsent} invalid={errors.consent} required>
                  میں اجازت دیتا/دیتی ہوں کہ کنجوال سٹی مجھے کال، SMS یا واٹس ایپ پر آفرز بھیجے۔
                  <span className="mt-0.5 block text-xs text-ivory/40" dir="ltr">
                    I consent to be contacted about offers by call, SMS or WhatsApp.
                  </span>
                </CheckRow>

                {errors.consent && (
                  <p className="text-sm text-red-300">قرعہ اندازی میں شامل ہونے کے لیے اجازت دینا ضروری ہے</p>
                )}
                {serverError && (
                  <p className="rounded-lg border border-red-400/30 bg-red-400/10 p-3 text-sm text-red-200">
                    {serverError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="group relative w-full overflow-hidden rounded-xl bg-gradient-gold py-4 text-lg font-semibold text-navy-950 shadow-gold transition active:scale-[0.99] disabled:opacity-60"
                >
                  {status === "sending" ? "بھیجا جا رہا ہے…" : "قرعہ اندازی میں شامل ہوں"}
                </button>

                <p className="text-center text-xs leading-relaxed text-ivory/40">
                  آپ کا نمبر کسی تیسرے فریق کو نہیں دیا جائے گا۔
                  <span className="block" dir="ltr">
                    Your number is never sold or shared with third parties.
                  </span>
                </p>
              </form>
            </div>
          )}
        </section>

        {/* ── Rules ────────────────────────────────────────────────────── */}
        <section className="pt-14">
          <SectionTitle ur="قواعد و ضوابط" en="Rules & regulations" />
          <ol className="mt-6 space-y-4">
            {RULES.map((r, i) => (
              <li key={r.en} className="flex gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-gold-400/30 text-xs text-gold-300">
                  {i + 1}
                </span>
                <div>
                  <p className="text-[15px] leading-relaxed text-ivory/85">{r.ur}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-ivory/40" dir="ltr">
                    {r.en}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ── Footer ───────────────────────────────────────────────────── */}
        <footer className="mt-16 border-t border-gold-400/15 pt-8 text-center">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
              "السلام علیکم! میں کنجوال سٹی کی قرعہ اندازی کے بارے میں پوچھنا چاہتا ہوں۔"
            )}`}
            target="_blank"
            rel="noreferrer"
            onClick={() => track("Contact", { method: "whatsapp", source: "draw" })}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-6 py-3 text-emerald-200"
          >
            <FaWhatsapp className="h-5 w-5" />
            واٹس ایپ پر رابطہ کریں
          </a>
          <p className="mt-6 text-xs leading-relaxed text-ivory/40" dir="ltr">
            Kunjwal City, 15 km Sargodha Road, Gujrat, Punjab · A project by AYS Developers
          </p>
          <a href="/" className="mt-3 inline-flex items-center gap-1 text-xs text-gold-300/70" dir="ltr">
            kunjwalcity.pk <FiChevronLeft className="h-3 w-3 rotate-180" />
          </a>
        </footer>
      </div>
    </main>
  );
}

/* ── Pieces ──────────────────────────────────────────────────────────────── */

function GoldTopLine() {
  return <div className="h-1 w-full bg-gradient-gold" />;
}

function SectionTitle({ ur, en, align = "center" }: { ur: string; en: string; align?: "center" | "right" }) {
  return (
    <div className={align === "center" ? "text-center" : "text-right"}>
      <h2 className="font-nastaliq text-2xl leading-[1.8] text-ivory">{ur}</h2>
      <p className="mt-1 text-[10px] uppercase tracking-luxe text-gold-400/60" dir="ltr">
        {en}
      </p>
    </div>
  );
}

function PrizeCard({ prize }: { prize: Prize }) {
  const [imgOk, setImgOk] = useState(true);
  return (
    <div className="h-full overflow-hidden rounded-2xl border border-gold-400/20 bg-navy-900/60">
      <div
        className={`relative flex items-center justify-center bg-gradient-to-b from-gold-400/10 to-transparent ${
          prize.hero ? "aspect-[16/9]" : "aspect-square"
        }`}
      >
        {imgOk ? (
          <img
            src={prize.img}
            alt={prize.titleEn}
            loading="lazy"
            onError={() => setImgOk(false)}
            className="h-full w-full object-cover"
          />
        ) : (
          <FiGift className="h-10 w-10 text-gold-400/40" />
        )}
        <span className="absolute right-3 top-3 rounded-full bg-navy-950/80 px-3 py-1 text-[11px] text-gold-300">
          {prize.qty} انعام
        </span>
      </div>
      <div className="p-4 text-right">
        <p className="text-[10px] uppercase tracking-luxe text-gold-400/70" dir="ltr">
          {prize.tierEn}
        </p>
        <p className={`mt-1 leading-snug text-ivory ${prize.hero ? "text-2xl" : "text-base"}`}>
          {prize.titleUr}
        </p>
        <p className="mt-1 text-xs text-ivory/40" dir="ltr">
          {prize.titleEn}
        </p>
      </div>
    </div>
  );
}

function Field({
  label,
  english,
  icon,
  invalid,
  error,
  children,
}: {
  label: string;
  english: string;
  icon?: React.ReactNode;
  invalid?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center justify-end gap-2 text-[15px] text-ivory/90">
        {label}
        {icon && <span className="text-gold-400/60">{icon}</span>}
      </span>
      {children}
      <span className="mt-1 flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-wider text-ivory/25" dir="ltr">
          {english}
        </span>
        {invalid && error && <span className="text-xs text-red-300">{error}</span>}
      </span>
    </label>
  );
}

function CheckRow({
  checked,
  onChange,
  children,
  invalid,
  required,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  children: React.ReactNode;
  invalid?: boolean;
  required?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`flex w-full items-start gap-3 rounded-xl border p-4 text-right transition ${
        invalid ? "border-red-400/60" : checked ? "border-gold-400/50 bg-gold-400/5" : "border-gold-400/20"
      }`}
    >
      <span
        aria-hidden
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border transition ${
          checked ? "border-gold-400 bg-gold-400 text-navy-950" : "border-gold-400/40"
        }`}
      >
        {checked && <FiCheck className="h-3.5 w-3.5" />}
      </span>
      <span className="text-[14px] leading-relaxed text-ivory/85">
        {children}
        {required && <span className="mr-1 text-gold-300">*</span>}
      </span>
      <input type="checkbox" checked={checked} readOnly className="sr-only" />
    </button>
  );
}

function SuccessCard({ entryNo, duplicate, name }: { entryNo: string; duplicate: boolean; name: string }) {
  const shareText = encodeURIComponent(
    `کنجوال سٹی گجرات کی مفت قرعہ اندازی میں حصہ لیں — نقد انعام اور گھریلو الیکٹرانکس جیتیں۔\nhttps://kunjwalcity.pk/draw`
  );
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE }}
      className="rounded-3xl border border-gold-400/30 bg-navy-900/70 p-8 text-center shadow-soft"
    >
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-gold">
        <FiCheck className="h-8 w-8 text-navy-950" />
      </div>

      <h2 className="mt-6 font-nastaliq text-3xl leading-[1.7] text-ivory">
        {duplicate ? "آپ پہلے ہی شامل ہیں" : "مبارک ہو! آپ شامل ہو گئے"}
      </h2>
      <p className="mt-2 text-sm text-ivory/60">
        {duplicate
          ? "اس موبائل نمبر پر ایک انٹری پہلے ہی موجود ہے۔"
          : `${name ? name + "، " : ""}آپ کی انٹری محفوظ ہو گئی ہے۔`}
      </p>

      {entryNo && (
        <div className="mt-6 rounded-2xl border border-gold-400/25 bg-navy-950/60 p-5">
          <p className="text-[10px] uppercase tracking-luxe text-gold-400/70" dir="ltr">
            Your entry number
          </p>
          <p className="mt-2 font-sans text-3xl font-bold tracking-widest text-gold-300" dir="ltr">
            {entryNo}
          </p>
          <p className="mt-2 text-xs text-ivory/45">یہ نمبر محفوظ رکھیں — قرعہ اندازی میں یہی استعمال ہوگا۔</p>
        </div>
      )}

      <div className="mt-6 rounded-2xl border border-gold-400/25 bg-gradient-to-l from-gold-400/10 to-transparent p-5 text-right">
        <p className="text-sm leading-relaxed text-ivory/85">
          <strong className="text-gold-200">آپ کا یقینی انعام:</strong> {VOUCHER_PKR} روپے کی بکنگ رعایت۔ 1 اکتوبر
          سے پہلے بکنگ کروائیں اور پرانا ریٹ بھی لاک کریں۔
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
            `السلام علیکم! میری قرعہ اندازی کی انٹری ${entryNo} ہے۔ مجھے پلاٹ کی معلومات چاہیئں۔`
          )}`}
          target="_blank"
          rel="noreferrer"
          onClick={() => trackLead({ source: "draw-success" })}
          className="flex items-center justify-center gap-2 rounded-xl bg-gradient-gold py-3.5 font-semibold text-navy-950"
        >
          <FaWhatsapp className="h-5 w-5" />
          واؤچر استعمال کریں — پلاٹ کی تفصیلات لیں
        </a>
        <a
          href={`https://wa.me/?text=${shareText}`}
          target="_blank"
          rel="noreferrer"
          onClick={() => track("Share", { source: "draw" })}
          className="flex items-center justify-center gap-2 rounded-xl border border-gold-400/30 py-3.5 text-gold-200"
        >
          <FiShare2 className="h-4 w-4" />
          دوستوں کو بھیجیں
        </a>
      </div>
    </motion.div>
  );
}

/* ── Helpers ─────────────────────────────────────────────────────────────── */

function inputClass(invalid?: boolean) {
  return `w-full rounded-xl border bg-navy-950/60 px-4 py-3.5 text-right text-ivory placeholder:text-ivory/30 outline-none transition focus:border-gold-400 focus:ring-1 focus:ring-gold-400/40 ${
    invalid ? "border-red-400/70" : "border-gold-400/25"
  }`;
}

/** Accepts 03XXXXXXXXX, +923XXXXXXXXX, 923XXXXXXXXX and any spacing/dashes. */
function isPkMobile(raw: string) {
  const d = raw.replace(/\D/g, "");
  return /^03\d{9}$/.test(d) || /^923\d{9}$/.test(d) || /^3\d{9}$/.test(d);
}

/**
 * Load the Urdu faces only on this page — the rest of the site is English and
 * shouldn't pay for a Nastaliq download.
 */
function useUrduFonts() {
  useEffect(() => {
    const id = "kc-urdu-fonts";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;700&family=Noto+Naskh+Arabic:wght@400;500;600;700&display=swap";
    document.head.appendChild(link);
  }, []);
}
