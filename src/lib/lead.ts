import { trackLead } from "./pixel";

export type Lead = {
  name: string;
  phone: string;
  email?: string;
  city?: string;
  country?: string;
  message?: string;
  /** Qualifying answers — raise Meta lead quality. */
  plotSize?: string;
  purpose?: string;
  timeline?: string;
  /** Which page/campaign the lead came from (e.g. "home", "offer"). */
  source?: string;
};

const WHATSAPP_NUMBER = "923111786602";

/** Prefilled WhatsApp link so a lead reaches sales even if every backend is down. */
export function whatsappFallbackUrl(lead: Lead): string {
  const lines = [
    "Hello! I'd like to book a plot at Kunjwal City.",
    `Name: ${lead.name}`,
    `Phone: ${lead.phone}`,
    lead.city ? `City: ${lead.city}` : "",
    lead.country ? `Country: ${lead.country}` : "",
    lead.message ? `Message: ${lead.message}` : "",
  ].filter(Boolean);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
}

/**
 * Submit a lead. Fires the Meta `Lead` pixel event immediately (so ad optimization
 * always gets the signal), then POSTs to our own /api/lead endpoint. Returns whether
 * the server accepted it; the caller uses whatsappFallbackUrl() when it did not.
 */
export async function submitLead(lead: Lead): Promise<{ ok: boolean }> {
  // 1) Conversion signal — fire even if the network write later fails.
  trackLead({ source: lead.source ?? "home" });

  // 2) Persist via our owned endpoint.
  try {
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    });
    return { ok: res.ok };
  } catch {
    return { ok: false };
  }
}
