import React from "react";
import { FiImage, FiVideo } from "react-icons/fi";

/**
 * A designer-swappable media slot. While `src` is empty it renders a labeled,
 * dashed frame at the target aspect ratio showing the recommended dimensions,
 * so a designer can drop in the real asset later without touching layout.
 * Set `src` (a /media/... path) to show the real image; keep `label`/`dims` for docs.
 */
export function Placeholder({
  src,
  alt,
  ratio = "16 / 9",
  label = "Image",
  dims,
  kind = "image",
  className = "",
  imgClassName = "",
  onDark = true,
}: {
  src?: string;
  alt?: string;
  ratio?: string;
  label?: string;
  dims?: string;
  kind?: "image" | "video";
  className?: string;
  imgClassName?: string;
  onDark?: boolean;
}) {
  if (src) {
    return (
      <div className={`overflow-hidden ${className}`} style={{ aspectRatio: ratio }}>
        <img src={src} alt={alt || label} loading="lazy" className={`h-full w-full object-cover ${imgClassName}`} />
      </div>
    );
  }

  const Icon = kind === "video" ? FiVideo : FiImage;
  return (
    <div
      className={`relative flex flex-col items-center justify-center gap-2 border border-dashed text-center ${
        onDark ? "border-gold/30 bg-white/[0.03] text-ivory/50" : "border-navy-900/20 bg-navy-900/[0.03] text-navy-900/45"
      } ${className}`}
      style={{ aspectRatio: ratio }}
      data-placeholder={label}
    >
      <Icon className={onDark ? "text-gold-300/70" : "text-gold-700/70"} size={26} />
      <span className="px-4 text-[0.7rem] font-semibold uppercase tracking-[0.2em]">{label}</span>
      {dims && <span className="text-[0.62rem] tracking-wide opacity-70">{dims}</span>}
    </div>
  );
}
