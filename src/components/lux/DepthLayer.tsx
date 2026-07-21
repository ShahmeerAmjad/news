import React from "react";
import { motion, useTransform } from "framer-motion";
import { useScene } from "./ScrollScene";

/** A parallax plane inside a ScrollScene; children drift by `depth` as progress advances. */
export function DepthLayer({
  children,
  depth = 0.2,
  className,
}: {
  children: React.ReactNode;
  depth?: number;
  className?: string;
}) {
  const { progress, reduced } = useScene();
  const y = useTransform(
    progress,
    [0, 1],
    reduced ? ["0%", "0%"] : [`${-depth * 50}%`, `${depth * 50}%`]
  );

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} style={{ y, willChange: "transform" }}>
      {children}
    </motion.div>
  );
}
