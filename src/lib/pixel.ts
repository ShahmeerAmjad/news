/** Typed helpers around the Meta Pixel (fbq) loaded in index.html. */

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/** Fire a standard Meta event, e.g. track("Lead", {...}). No-op if pixel not loaded. */
export function track(event: string, params?: Record<string, unknown>) {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", event, params);
  }
}

/** The conversion event the ad campaign optimizes toward. */
export function trackLead(params?: Record<string, unknown>) {
  track("Lead", { content_name: "Kunjwal City", currency: "PKR", ...params });
}

export {};
