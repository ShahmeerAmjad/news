/**
 * Lucky-draw entry endpoint for the Kunjwal City flyer campaign (Vercel function).
 *
 * A flyer QR sends villagers to /draw; this receives the entry. Destinations are
 * env-driven, same never-fail philosophy as api/lead.ts — if nothing is configured
 * the entry still lands in the Vercel function log, so no scan is ever wasted:
 *
 *   DRAW_WEBHOOK_URL  → POSTs the entry to the Google Apps Script bound to the
 *                       entries sheet (see docs/draw-sheet-setup.md). If that
 *                       script replies { duplicate: true } we relay it so the
 *                       page can greet a repeat scanner by their entry number.
 *   RESEND_API_KEY    → emails the entry to DRAW_EMAIL_TO as a backup trail.
 *
 * Entry numbers are derived from the phone number rather than a counter, so the
 * same person always sees the same number even before the sheet is wired up.
 */

type Entry = {
  name?: string;
  phone?: string;
  locality?: string;
  consent?: boolean;
  wantsPlot?: boolean;
  /** Distribution zone from the QR's ?a= param, when per-zone codes are printed. */
  area?: string;
  source?: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const entry: Entry = typeof req.body === "string" ? safeParse(req.body) : req.body || {};

  const name = entry.name?.trim() || "";
  const phone = normalizePhone(entry.phone || "");
  const locality = entry.locality?.trim() || "";

  if (name.length < 2) {
    return res.status(400).json({ ok: false, error: "Name is required." });
  }
  if (!phone) {
    return res.status(400).json({ ok: false, error: "A valid Pakistani mobile number is required." });
  }
  if (!locality) {
    return res.status(400).json({ ok: false, error: "Locality is required." });
  }
  // The whole point of the draw is a consented marketing list. No consent, no entry.
  if (entry.consent !== true) {
    return res.status(400).json({ ok: false, error: "Consent is required to enter the draw." });
  }

  const entryNo = entryNumber(phone);

  const record = {
    entryNo,
    name,
    phone,
    locality,
    area: entry.area?.trim() || "",
    wantsPlot: entry.wantsPlot === true ? "yes" : "no",
    consent: "yes",
    source: entry.source?.trim() || "flyer-qr",
    submittedAt: new Date().toISOString(),
    userAgent: req.headers?.["user-agent"] || "",
  };

  let duplicate = false;
  let delivered = false;
  const tasks: Promise<unknown>[] = [];

  // The sheet is the source of truth for duplicates, so this one is awaited
  // directly rather than fanned out — its answer changes what the visitor sees.
  if (process.env.DRAW_WEBHOOK_URL) {
    try {
      const reply = await postJson(process.env.DRAW_WEBHOOK_URL, record);
      delivered = true;
      duplicate = reply?.duplicate === true;
    } catch (err) {
      console.error("[draw] webhook failed:", (err as Error).message);
    }
  }

  if (!duplicate && process.env.RESEND_API_KEY) {
    tasks.push(sendEmail(record));
  }

  const results = await Promise.allSettled(tasks);
  delivered = delivered || results.some((r) => r.status === "fulfilled");

  console.log("[draw]", JSON.stringify(record), "duplicate:", duplicate, "delivered:", delivered);

  return res.status(200).json({ ok: true, entryNo, duplicate, delivered });
}

function safeParse(s: string): Entry {
  try {
    return JSON.parse(s);
  } catch {
    return {};
  }
}

/**
 * Normalise any way a Pakistani mobile gets typed — 03001234567, 0300-1234567,
 * +92 300 1234567, 923001234567 — to a single +923XXXXXXXXX form so the sheet
 * can dedupe on it. Returns "" when the number can't be a PK mobile.
 */
export function normalizePhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  let local = "";
  if (/^03\d{9}$/.test(digits)) local = digits.slice(1);
  else if (/^923\d{9}$/.test(digits)) local = digits.slice(2);
  else if (/^3\d{9}$/.test(digits)) local = digits;
  return local ? `+92${local}` : "";
}

/** Stable 5-digit entry number derived from the phone (FNV-1a). */
export function entryNumber(phone: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < phone.length; i++) {
    h ^= phone.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return `KC-${String(h % 100000).padStart(5, "0")}`;
}

async function postJson(url: string, body: unknown): Promise<{ duplicate?: boolean } | null> {
  const r = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    redirect: "follow", // Apps Script web apps answer with a 302 to script.googleusercontent.com
  });
  if (!r.ok) throw new Error(`POST ${url} → ${r.status}`);
  try {
    return (await r.json()) as { duplicate?: boolean };
  } catch {
    return null;
  }
}

async function sendEmail(record: Record<string, string>) {
  const to = process.env.DRAW_EMAIL_TO || process.env.LEAD_EMAIL_TO || "info@kunjwalcity.pk";
  const from = process.env.LEAD_EMAIL_FROM || "Kunjwal City <leads@kunjwalcity.pk>";
  const rows = Object.entries(record)
    .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#9a761f;font-weight:600">${k}</td><td>${v}</td></tr>`)
    .join("");
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      subject: `Lucky draw entry ${record.entryNo} — ${record.name} (${record.locality})`,
      html: `<h2 style="font-family:Georgia,serif;color:#014b76">New Lucky Draw Entry</h2><table style="font-family:Arial;font-size:14px">${rows}</table>`,
    }),
  });
  if (!r.ok) throw new Error(`Resend → ${r.status}`);
  return true;
}
