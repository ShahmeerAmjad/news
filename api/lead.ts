/**
 * Owned lead endpoint for Kunjwal City (Vercel serverless function).
 *
 * Routes a lead to whichever destinations are configured via env vars — set any/all:
 *   LEAD_WEBHOOK_URL  → POSTs the lead JSON to your webhook (n8n / Zapier / Make / Google Apps Script / Sheet)
 *   LEAD_FORWARD_URL  → POSTs to another backend (e.g. the existing MongoDB API once its DB is restored)
 *   RESEND_API_KEY    → emails the lead to LEAD_EMAIL_TO (default info@kunjwalcity.pk) via Resend
 *
 * It NEVER hard-fails the visitor: as long as the payload is valid it returns { ok: true }.
 * The client also fires the Meta `Lead` pixel and offers a WhatsApp fallback, so a lead is
 * never lost even if no destination is configured yet.
 */

type Lead = {
  name?: string;
  phone?: string;
  email?: string;
  city?: string;
  country?: string;
  plotSize?: string;
  purpose?: string;
  timeline?: string;
  message?: string;
  source?: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const lead: Lead = typeof req.body === "string" ? safeParse(req.body) : req.body || {};

  if (!lead.name?.trim() || !lead.phone?.trim()) {
    return res.status(400).json({ ok: false, error: "Name and phone are required." });
  }

  const record = {
    name: lead.name.trim(),
    phone: lead.phone.trim(),
    email: lead.email?.trim() || "",
    city: lead.city?.trim() || "",
    country: lead.country?.trim() || "",
    plotSize: lead.plotSize?.trim() || "",
    purpose: lead.purpose?.trim() || "",
    timeline: lead.timeline?.trim() || "",
    message: lead.message?.trim() || "",
    source: lead.source?.trim() || "home",
    submittedAt: new Date().toISOString(),
    userAgent: req.headers?.["user-agent"] || "",
  };

  // Fan out to every configured destination; a single failure must not fail the lead.
  const tasks: Promise<unknown>[] = [];

  if (process.env.LEAD_WEBHOOK_URL) {
    tasks.push(postJson(process.env.LEAD_WEBHOOK_URL, record));
  }
  if (process.env.LEAD_FORWARD_URL) {
    tasks.push(postJson(process.env.LEAD_FORWARD_URL, record));
  }
  if (process.env.RESEND_API_KEY) {
    tasks.push(sendEmail(record));
  }

  const results = await Promise.allSettled(tasks);
  const delivered = results.some((r) => r.status === "fulfilled");

  // Always log so the lead survives in Vercel function logs even if nothing else is set.
  console.log("[lead]", JSON.stringify(record), "delivered:", delivered, "destinations:", tasks.length);

  return res.status(200).json({ ok: true, delivered, destinations: tasks.length });
}

function safeParse(s: string): Lead {
  try {
    return JSON.parse(s);
  } catch {
    return {};
  }
}

async function postJson(url: string, body: unknown) {
  const r = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!r.ok) throw new Error(`POST ${url} → ${r.status}`);
  return true;
}

async function sendEmail(record: Record<string, string>) {
  const to = process.env.LEAD_EMAIL_TO || "info@kunjwalcity.pk";
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
      subject: `New Kunjwal City lead — ${record.name} (${record.phone})`,
      html: `<h2 style="font-family:Georgia,serif;color:#014b76">New Plot Enquiry</h2><table style="font-family:Arial;font-size:14px">${rows}</table>`,
    }),
  });
  if (!r.ok) throw new Error(`Resend → ${r.status}`);
  return true;
}
