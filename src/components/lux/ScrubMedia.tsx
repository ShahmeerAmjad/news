import { motion, useTransform } from "framer-motion";
import { useScene } from "./ScrollScene";

/** An image layer whose scale + opacity scrub with the enclosing scene's progress. */
export function ScrubMedia({
  src,
  alt,
  range = [0, 0.5],
  scaleFrom = 1.06,
  scaleTo = 1,
  fadeIn = true,
  className,
  imgClassName,
}: {
  src: string;
  alt: string;
  range?: [number, number];
  scaleFrom?: number;
  scaleTo?: number;
  fadeIn?: boolean;
  className?: string;
  imgClassName?: string;
}) {
  const { progress, reduced } = useScene();
  const fadeEnd = range[0] + (range[1] - range[0]) * 0.6;
  const scale = useTransform(progress, range, [scaleFrom, scaleTo]);
  const opacity = useTransform(progress, [range[0], fadeEnd], [fadeIn ? 0 : 1, 1]);

  if (reduced) {
    return (
      <div className={className}>
        <img src={src} alt={alt} loading="lazy" className={imgClassName} />
      </div>
    );
  }

  return (
    <motion.div className={className} style={{ scale, opacity, willChange: "transform, opacity" }}>
      <img src={src} alt={alt} loading="lazy" className={imgClassName} />
    </motion.div>
  );
}
