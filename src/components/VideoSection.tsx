import { useRef, useState } from "react";
import { FiPlay } from "react-icons/fi";
import poster from "@/assets/New/12.jpg";
import { Reveal } from "@/components/lux/Reveal";
import { Parallax } from "@/components/lux/Parallax";

/**
 * Click-to-play film reveal. Served statically from /media (not bundled), with
 * preload="none" so it only streams on play and never taxes the initial page load.
 * The /media path gets long-lived cache headers via vercel.json.
 */
const promoVideo = "/media/film.mp4";
const VideoSection = () => {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const play = () => {
    setPlaying(true);
    ref.current?.play();
  };

  return (
    <section id="film" className="scroll-mt-24 relative overflow-hidden bg-navy-950 py-24 md:py-32">
      <div className="lux-container">
        <Reveal>
          <p className="lux-eyebrow mb-6">The Film</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="max-w-3xl font-display text-4xl font-medium leading-tight text-ivory md:text-6xl">
            See the vision <span className="italic text-gold-foil">come to life.</span>
          </h2>
        </Reveal>

        <Reveal variant="scaleIn" delay={0.1}>
          <div className="group relative mt-12 aspect-video w-full overflow-hidden rounded-md border border-gold/20 shadow-soft">
            <video
              ref={ref}
              src={promoVideo}
              poster={poster}
              controls={playing}
              loop
              playsInline
              preload="none"
              className="h-full w-full object-cover"
            />
            {!playing && (
              <>
                <Parallax speed={0.12} className="pointer-events-none absolute inset-0">
                  <img src={poster} alt="Kunjwal City film" loading="lazy" decoding="async" className="h-full w-full object-cover" />
                </Parallax>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/20 to-navy-950/30" />
                <button
                  onClick={play}
                  aria-label="Play film"
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <span className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-gold text-navy-950 shadow-gold transition-transform duration-500 group-hover:scale-110 md:h-24 md:w-24">
                    <FiPlay className="ml-1" size={30} />
                  </span>
                </button>
                <div className="absolute bottom-6 left-6 flex items-center gap-3">
                  <span className="font-display text-xl text-ivory">Kunjwal City</span>
                  <span className="h-4 w-px bg-gold/40" />
                  <span className="text-[0.7rem] uppercase tracking-[0.25em] text-gold-200">Official Film</span>
                </div>
              </>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default VideoSection;
