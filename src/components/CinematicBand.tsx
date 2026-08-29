import { Reveal } from "@/components/lux/Reveal";
import { AmbientVideo } from "@/components/lux/AmbientVideo";
import mosquePoster from "@/assets/IMG-20250920-WA0012.jpg";

/**
 * Full-bleed auto-playing cinematic interstitial (Higgsfield b-roll).
 * A quiet emotional breather between content sections.
 */
const CinematicBand = () => {
  return (
    <section className="relative h-[70vh] min-h-[420px] w-full overflow-hidden bg-navy-950">
      <AmbientVideo
        src="/media/mosque-broll.mp4"
        poster={mosquePoster}
        alt="The grand Jamia Mosque at Kunjwal City"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-navy-950/60" />
      <div className="absolute inset-0 [background:radial-gradient(120%_120%_at_50%_50%,transparent_45%,rgba(1,34,58,0.7)_100%)]" />

      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="lux-container text-center">
          <Reveal>
            <p className="lux-eyebrow mb-6 justify-center">At the heart of the community</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mx-auto max-w-3xl font-display text-4xl font-medium leading-tight text-ivory md:text-6xl">
              A life of <span className="italic text-gold-foil">faith, comfort &amp; belonging.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-5 max-w-xl text-ivory/70">
              A grand Jamia Mosque, green open spaces and a gated, family-first
              neighbourhood — designed around the way you want to live.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default CinematicBand;
