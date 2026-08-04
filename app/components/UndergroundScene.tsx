"use client";

import Link from "next/link";
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

export function UndergroundScene() {
  const [{ season, weather }] = useWorldPreferences();

  const backgroundImage = "/learning-cave-summer-v20.png";
  const wideBackgroundImage = "/learning-cave-summer-ultrawide-v21.png";
  const surfaceImage =
    weather === "rain"
      ? `/surface-${season}-rain-v1.png`
      : `/surface-${season}-v5.png`;

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
        <header className="scene-chapter scene-chapter--portfolio">
          <span>LEVEL −01 · ARCHIVE</span>
          <strong>学习洞穴</strong>
          <p>沿着暖光找到项目档案，点击书架里的文件查看完整记录。</p>
        </header>
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
            <div
              key={`${season}-${weather}`}
              className="portfolio-surface-world"
              style={{ backgroundImage: `url("${surfaceImage}")` }}
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
            <ArchiveHotspots />
            <JourneySnake stage="level-one" previousHref="/" nextHref="/deep" />
          </div>
        </div>
      </section>

      <footer className="world-portfolio-footer">
        <span>向下滚动继续深入 · 点击小柯基带路</span>
      </footer>
    </main>
  );
}
