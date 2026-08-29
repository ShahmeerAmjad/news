import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

type Props = {
  src: string;
  poster: string;
  /** Alt text for the poster image — the video itself is decorative. */
  alt: string;
  className?: string;
  /** Ken-burns the poster while no video is playing. */
  kenBurns?: boolean;
  /** Start fetching this far before the section enters the viewport. */
  rootMargin?: string;
  /** Above-the-fold: the poster is the LCP element, so fetch it first. */
  priority?: boolean;
};

/**
 * Full-bleed decorative background loop with a poster fallback.
 *
 * These clips are 3–6 MB each, so the video is only ever fetched when it earns
 * its weight. It is skipped entirely for reduced-motion users, Save-Data /
 * 2G–3G connections and phones, and otherwise mounted only once the section is
 * near the viewport. The poster render is always painted underneath, so the
 * section looks finished in every one of those cases.
 */
export const AmbientVideo = ({
  src,
  poster,
  alt,
  className = "",
  kenBurns = false,
  rootMargin = "300px",
  priority = false,
}: Props) => {
  const reduce = useReducedMotion();
  const hostRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (reduce) return;

    const conn = (navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }).connection;
    if (conn?.saveData) return;
    if (conn?.effectiveType && /(^|-)[23]g$/.test(conn.effectiveType)) return;
    if (window.matchMedia("(max-width: 767px)").matches) return;

    // Above the fold: nothing to wait for.
    if (priority) {
      setMounted(true);
      return;
    }

    const host = hostRef.current;
    if (!host) return;

    // No IntersectionObserver (very old browsers) — just mount it.
    if (typeof IntersectionObserver === "undefined") {
      setMounted(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true);
          io.disconnect();
        }
      },
      { rootMargin },
    );
    io.observe(host);
    return () => io.disconnect();
  }, [reduce, rootMargin, priority]);

  // Declarative autoPlay can be skipped on hydration or power-save, and
  // browsers pause background tabs — resume when the tab is visible again.
  useEffect(() => {
    if (!mounted) return;
    const v = videoRef.current;
    if (!v) return;
    const play = () => v.play().catch(() => {});
    play();
    const onVisible = () => {
      if (document.visibilityState === "visible") play();
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, [mounted]);

  return (
    <div ref={hostRef} className={`absolute inset-0 bg-navy-950 ${className}`}>
      <img
        src={poster}
        alt={alt}
        fetchPriority={priority ? "high" : "auto"}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        className={`absolute inset-0 h-full w-full object-cover ${
          kenBurns && !reduce ? "animate-ken-burns" : ""
        }`}
      />
      {mounted && (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={poster}
          aria-hidden="true"
          onError={(e) => (e.currentTarget.style.display = "none")}
        >
          <source src={src} type="video/mp4" />
        </video>
      )}
    </div>
  );
};

export default AmbientVideo;
