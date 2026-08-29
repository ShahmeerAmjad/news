# Kunjwal City — Content & Asset Handoff

Everything below is a **placeholder** in the live site that your team should replace with real content.
Two kinds:
- **Image/Video slots** — currently show a dashed "drop asset here" frame with the recommended size. Drop the file in `public/media/` and set its `src` on the matching `<Placeholder>` (grep the label to find it).
- **Text placeholders** — shown in `[square brackets]` in the code; search and replace with the real value.

---

## 1. Approval / NOC (highest priority — top trust signal)
Files: `src/components/DeveloperSection.tsx`, `src/components/FaqSection.tsx`, `src/components/TrustBar.tsx`
- `[Approving Authority — to be provided]` → e.g. "Tehsil Municipal Administration, Gujrat" / "Gujrat Development Authority"
- `NOC No. [to be provided]` → the actual NOC / approval number + date
- TrustBar currently says "Approved Layout · NOC" — confirm wording once the authority is known.

## 2. Developer track record — `src/components/DeveloperSection.tsx`
- 3× **DELIVERED PROJECT PHOTO** slots — **800 × 600 (4:3)** each
- `[Project name]`, `[City · Year delivered]` for each
- Stat counters: `[10]+ Projects delivered`, `[5,000]+ Happy families`, `[10]+ Years` (confirm real numbers; "200+ Kanals" is real)

## 3. Testimonials — `src/components/TestimonialsSection.tsx`
- 3× **BUYER PHOTO** slots — **200 × 200 (1:1)**, shown at ~64px round
- `[Testimonial quote — client to supply]`, `[Buyer name]`, `[Plot size · Location]` ×3
- Social-proof counters `[N]+ Plots booked`, `[N]+ Happy families`
- `[Zameen listing URL]` for the "Also listed on Zameen →" link

## 4. Real photography — `src/components/GallerySection.tsx`
- **DRONE AERIAL — actual site** — 1920 × 1080 (16:9)
- **DEVELOPMENT PROGRESS PHOTO** — 1600 × 1200 (4:3)
- **ENTRANCE — real photo** — 1600 × 1000
(These sit among the existing 3D renders to prove real, on-ground development.)

## 5. Location drive-times — `src/components/LocationSection.tsx`
Confirm the `[approx. XX min]` values for: Gujrat City Center, GT Road, Kunjah, Sialkot Int'l Airport, Motorway/GT Road interchange, Mangowal.

## 6. Hero video (optional, high impact) — `src/components/HeroSection.tsx`
Drop a cinematic loop at `public/media/hero.mp4` (1920×1080, silent, ~8–15s, <8 MB) and it auto-plays over the poster. (Can be generated with Higgsfield.)

## 7. Film section — `src/components/VideoSection.tsx`
The current `video.mp4` (46 MB) is bundled and click-to-play. Recommended: host it on Vercel Blob/CDN and point `promoVideo` at the URL to keep the build light. Replace `poster` (`New/12.jpg`) with a real film still if available.

---

### How to swap an image placeholder (example)
```tsx
// before
<Placeholder ratio="4 / 3" label="DELIVERED PROJECT PHOTO" dims="800×600" />
// after — put the file at public/media/project-alpha.jpg
<Placeholder src="/media/project-alpha.jpg" alt="Project Alpha, Gujrat" ratio="4 / 3" label="DELIVERED PROJECT PHOTO" />
```

### Verified REAL data already on the site (no change needed)
Payment plan (5/7/10 Marla figures), master plan image + facilities, plot sizes, 15 km Sargodha Road address, phone 03-111-786-602, WhatsApp, socials, Google Maps link, payment.pdf & map.pdf downloads.
