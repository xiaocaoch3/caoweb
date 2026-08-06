"use client";

import type { CSSProperties } from "react";
import { JourneySnake } from "./JourneySnake";
import { SiteNav } from "./SiteNav";
import { useWorldPreferences } from "./world-preferences";
import { ArchiveHotspots } from "./ArchiveHotspots";

const surfaceRainDrops = Array.from({ length: 24 }, (_, index) => ({
  left: `${(index * 43 + 7) % 101}%`,
  height: `${9 + ((index * 5) % 15)}px`,
  opacity: 0.2 + (index % 5) * 0.05,
  animationDelay: `${-((index * 0.31) % 1.8)}s`,
  animationDuration: `${0.72 + (index % 6) * 0.1}s`,
}));

const seasonBackgrounds = {
  spring: "/learning-cave-study-spring-v36.png",
  summer: "/learning-cave-study-summer-v36.png",
  autumn: "/learning-cave-study-autumn-v36.png",
  winter: "/learning-cave-study-winter-v36.png",
} as const;

export function UndergroundScene() {
  const [{ season, weather }] = useWorldPreferences();

  const backgroundImage = seasonBackgrounds[season];
  const wideBackgroundImage = seasonBackgrounds[season];

  return (
    <main
      className="world-portfolio"
      data-season={season}
      data-weather={weather}
    >
      <SiteNav underground />

      <section className="portfolio-cross-section" aria-label="地下作品集房间">
        <div
          className="portfolio-cross-section__backdrop"
          style={{
            backgroundImage: `linear-gradient(rgba(8, 7, 6, .12), rgba(8, 6, 5, .24)), url("${wideBackgroundImage}")`,
          }}
          aria-hidden="true"
        />
        <div className="portfolio-scene-canvas">
          <div className="cave-artboard cave-artboard--portfolio">
            <div
              className="portfolio-cross-section__art"
              style={{
                "--portfolio-scene-image": `url("${backgroundImage}")`,
                "--portfolio-wide-scene-image": `url("${wideBackgroundImage}")`,
              } as CSSProperties}
              aria-hidden="true"
            />
            {weather === "rain" && (
              <div
                className="rain-overlay portfolio-surface-rain"
                aria-hidden="true"
              >
                {surfaceRainDrops.map((drop, index) => (
                  <span key={index} style={drop} />
                ))}
              </div>
            )}
            <ArchiveHotspots />
            <JourneySnake stage="level-one" previousHref="/" nextHref="/deep" />
          </div>
        </div>
      </section>

    </main>
  );
}
