"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { BriefcaseBusiness, GraduationCap, Sparkles, UserRound } from "lucide-react";
import { JourneySnake } from "./JourneySnake";
import { SiteNav } from "./SiteNav";
import { useWorldPreferences } from "./world-preferences";
import { profileContent } from "../data/site-content";

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

      <section className="surface-profile" aria-label="个人简介">
        <div className="surface-profile__photo" role="img" aria-label={profileContent.photoAlt}>
          <UserRound aria-hidden="true" />
          <span>PHOTO</span>
          <small>后续替换为个人照片</small>
        </div>

        <div className="surface-profile__content">
          <header>
            <p>ABOUT ME</p>
            <h1>个人经历与能力</h1>
            <span>这里将用照片和简洁的履历，帮助浏览者快速认识你。</span>
          </header>

          <div className="surface-profile__sections">
            <article>
              <h2><GraduationCap /> 教育经历</h2>
              {profileContent.education.map((item) => (
                <div className="profile-entry" key={`${item.period}-${item.school}`}>
                  <time>{item.period}</time>
                  <strong>{item.school}</strong>
                  <p>{item.detail}</p>
                </div>
              ))}
            </article>

            <article>
              <h2><BriefcaseBusiness /> 实习与实践</h2>
              {profileContent.practice.map((item) => (
                <div className="profile-entry" key={`${item.period}-${item.organization}`}>
                  <time>{item.period}</time>
                  <strong>{item.organization} · {item.role}</strong>
                  <p>{item.detail}</p>
                </div>
              ))}
            </article>
          </div>

          <footer>
            <h2><Sparkles /> 技能简介</h2>
            <div>{profileContent.skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
          </footer>
        </div>
      </section>

      <JourneySnake stage="surface" nextHref="/portfolio" />
    </main>
  );
}
