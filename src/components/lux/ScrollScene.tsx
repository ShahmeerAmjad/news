import React, { createContext, useContext, useRef } from "react";
import { useScroll, useReducedMotion, type MotionValue } from "framer-motion";

type SceneCtx = { progress: MotionValue<number>; reduced: boolean };

const SceneContext = createContext<SceneCtx | null>(null);

/** Read the enclosing ScrollScene's normalized 0→1 scroll progress. */
export function useScene(): SceneCtx {
  const ctx = useContext(SceneContext);
  if (!ctx) {
    throw new Error("useScene() must be used inside a <ScrollScene>.");
  }
  return ctx;
}

/**
 * Pins a full-viewport track while the page scrolls through `height`, and
 * publishes 0→1 progress to descendants via useScene(). Under reduced-motion
 * it renders children in normal flow with no pin; children ignore progress via
 * their own `reduced` guard, so they stay static.
 */
export function ScrollScene({
  children,
  height = "250vh",
  className,
  pinClassName,
}: {
  children: React.ReactNode;
  height?: string;
  className?: string;
  pinClassName?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  if (reduced) {
    return (
      <div ref={ref} className={className}>
        <SceneContext.Provider value={{ progress: scrollYProgress, reduced: true }}>
          {children}
        </SceneContext.Provider>
      </div>
    );
  }

  return (
    <div ref={ref} className={className} style={{ height }}>
      <div className={`sticky top-0 h-[100svh] overflow-hidden ${pinClassName ?? ""}`}>
        <SceneContext.Provider value={{ progress: scrollYProgress, reduced: false }}>
          {children}
        </SceneContext.Provider>
      </div>
    </div>
  );
}
