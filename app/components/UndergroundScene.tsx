"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Cpu, Lightbulb, Search, UserRound } from "lucide-react";
import { categoryLabels, projects } from "../data/projects";
import { SiteNav } from "./SiteNav";

const iconMap = {
  product: Lightbulb,
  hardware: Cpu,
  research: Search,
};

export function UndergroundScene() {
  const reduceMotion = useReducedMotion();

  return (
    <main className="underground-page">
      <SiteNav underground />
      <section className="underground-hero">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: -32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75 }}
          className="underground-heading"
        >
          <p className="eyebrow eyebrow--amber">LEVEL −01 · PORTFOLIO</p>
          <h1>欢迎来到我的<br /><em>产品工作地下室</em></h1>
          <p>每个房间保存一段从问题到方案的完整思考。请选择一盏亮着的灯。</p>
        </motion.div>
        <div className="depth-marker" aria-hidden="true"><span>地上</span><i /><strong>−12m</strong></div>
      </section>

      <section className="cave-grid" aria-label="项目房间">
        {projects.map((project, index) => {
          const Icon = iconMap[project.category];
          return (
            <motion.article
              key={project.slug}
              className={`project-room room--${project.cover} ${project.featured ? "room--featured" : ""}`}
              initial={reduceMotion ? false : { opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
            >
              <div className="room-shell">
                <div className="room-ceiling" />
                <div className="room-light"><span /></div>
                <div className="room-scene" aria-hidden="true">
                  <span className="desk" />
                  <span className="shelf" />
                  <span className="screen" />
                  <span className="stool" />
                  <span className="tiny-person" />
                </div>
                <div className="room-card">
                  <div className="room-kicker">
                    <span><Icon size={16} /> {project.featured ? "FEATURED PROJECT" : categoryLabels[project.category]}</span>
                    <span>{project.year}</span>
                  </div>
                  <h2>{project.title}</h2>
                  <p className="room-en">{project.titleEn}</p>
                  <p className="room-summary">{project.summary}</p>
                  <div className="room-footer">
                    <span>{project.role}</span>
                    <Link href={`/portfolio/${project.slug}`}>
                      查看详情 <ArrowRight size={17} />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.article>
          );
        })}

        <motion.article
          id="about"
          className="project-room room--about"
          initial={reduceMotion ? false : { opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="room-shell">
            <div className="room-ceiling" />
            <div className="room-light"><span /></div>
            <div className="about-room-scene" aria-hidden="true">
              <span className="portrait"><UserRound /></span>
              <span className="pin pin--1" />
              <span className="pin pin--2" />
              <span className="pin pin--3" />
            </div>
            <div className="room-card">
              <div className="room-kicker"><span><UserRound size={16} /> ABOUT ME</span><span>常驻</span></div>
              <h2>关于我</h2>
              <p className="room-en">The maker behind the work</p>
              <p className="room-summary">了解我的经历、能力地图、常用工具，以及我正在寻找的机会。</p>
              <div className="room-footer">
                <span>产品思考 · 协作 · 落地</span>
                <Link href="/about">走进房间 <ArrowRight size={17} /></Link>
              </div>
            </div>
          </div>
        </motion.article>
      </section>
      <footer className="cave-footer">
        <span>KEEP EXPLORING</span>
        <p>好的产品，来自对真实问题的耐心凝视。</p>
      </footer>
    </main>
  );
}
