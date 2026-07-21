import { motion, useTransform } from "framer-motion";
import { useScene } from "./ScrollScene";

function Word({ word, start, end }: { word: string; start: number; end: number }) {
  const { progress } = useScene();
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const y = useTransform(progress, [start, end], ["0.6em", "0em"]);
  return (
    <span className="inline-block overflow-hidden align-bottom">
      <motion.span className="inline-block" style={{ opacity, y, willChange: "transform, opacity" }}>
        {word}&nbsp;
      </motion.span>
    </span>
  );
}

/** Reveals a headline word-by-word as the enclosing scene scrubs. */
export function SplitText({
  text,
  range = [0, 0.4],
  className,
}: {
  text: string;
  range?: [number, number];
  className?: string;
  wordClassName?: string;
}) {
  const { reduced } = useScene();
  const words = text.split(" ");

  if (reduced) {
    return <span className={className}>{text}</span>;
  }

  const span = range[1] - range[0];
  return (
    <span className={className}>
      {words.map((w, i) => {
        const start = range[0] + (span * i) / words.length;
        const end = range[0] + (span * (i + 1)) / words.length;
        return <Word key={`${w}-${i}`} word={w} start={start} end={end} />;
      })}
    </span>
  );
}
