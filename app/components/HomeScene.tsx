"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { JourneySnake } from "./JourneySnake";
import { SiteNav } from "./SiteNav";
import { useWorldPreferences } from "./world-preferences";

const rainDrops = Array.from({ length: 24 }, (_, index) => ({
  left: `${(index * 37 + 11) % 101}%`,
  height: `${8 + ((index * 7) % 17)}px`,
  opacity: 0.16 + (index % 5) * 0.045,
  animationDelay: `${-((index * 0.37) % 2.8)}s`,
  animationDuration: `${1.35 + (index % 7) * 0.16}s`,
}));

export function HomeScene() {
  const reduceMotion = useReducedMotion();
  const [{ season, weather }] = useWorldPreferences();

  const backgroundImage =
    weather === "rain"
      ? `/surface-${season}-rain-v1.png`
      : `/surface-${season}-v5.png`;

  return (
    <main className={`season-home season-home--${season}`} data-weather={weather}>
      <SiteNav />

      <AnimatePresence mode="sync">
        <motion.div
          key={`${season}-${weather}`}
          className="season-background"
          style={{ backgroundImage: `url("${backgroundImage}")` }}
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 0.45 } }}
          aria-hidden="true"
        />
      </AnimatePresence>

      {weather === "rain" && (
        <div className="rain-overlay" aria-hidden="true">
          {rainDrops.map((drop, index) => (
            <span key={index} style={drop} />
          ))}
        </div>
      )}

      <JourneySnake stage="surface" nextHref="/portfolio" />
    </main>
  );
}
