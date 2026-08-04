"use client";

import Link from "next/link";
import { JourneySnake } from "./JourneySnake";
import { SiteNav } from "./SiteNav";
import { useWorldPreferences } from "./world-preferences";

const surfaceRainDrops = Array.from({ length: 24 }, (_, index) => ({
  left: `${(index * 43 + 7) % 101}%`,
  height: `${9 + ((index * 5) % 15)}px`,
  opacity: 0.2 + (index % 5) * 0.05,
  animationDelay: `${-((index * 0.31) % 1.8)}s`,
  animationDuration: `${0.72 + (index % 6) * 0.1}s`,
}));

export function UndergroundScene() {
  const [{ season, weather }] = useWorldPreferences();

  const backgroundImage = `/learning-cave-${season}-v20.png`;

  return (
    <main
      className="world-portfolio"
      data-season={season}
      data-weather={weather}
    >
      <SiteNav underground />

      <section className="portfolio-cross-section" aria-label="地下作品集房间">
        <div
          className="portfolio-cross-section__art"
          style={{
            backgroundImage: `linear-gradient(rgba(8, 9, 9, .02), rgba(8, 6, 5, .12)), url("${backgroundImage}")`,
          }}
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
        <Link
          className="level-stairway"
          href="/deep"
          aria-label="穿过侧向通道前往更深层地下"
        >
          <span className="sr-only">穿过侧向通道前往更深层地下</span>
        </Link>
        <JourneySnake stage="level-one" previousHref="/" nextHref="/deep" />
      </section>

      <footer className="world-portfolio-footer">
        <span>LEVEL −01 · PROJECT ROOMS</span>
      </footer>
    </main>
  );
}
