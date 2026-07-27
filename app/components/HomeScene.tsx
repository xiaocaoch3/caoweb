"use client";

import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, BriefcaseBusiness, Download, Mail, MapPin } from "lucide-react";
import { useState } from "react";
import { SiteNav } from "./SiteNav";

export function HomeScene() {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const [diving, setDiving] = useState(false);

  function enterPortfolio() {
    if (diving) return;
    if (reduceMotion) {
      router.push("/portfolio");
      return;
    }
    setDiving(true);
    window.setTimeout(() => router.push("/portfolio"), 1050);
  }

  return (
    <main className={`surface-page ${diving ? "is-diving" : ""}`}>
      <SiteNav />
      <motion.div
        className="surface-sky"
        animate={diving && !reduceMotion ? { y: "-34vh", opacity: 0 } : undefined}
        transition={{ duration: 1, ease: [0.65, 0, 0.35, 1] }}
      >
        <div className="sky-orb sky-orb--one" />
        <div className="sky-orb sky-orb--two" />
        <div className="distant-hill distant-hill--left" />
        <div className="distant-hill distant-hill--right" />
      </motion.div>

      <section className="surface-content">
        <motion.div
          className="hero-copy"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="eyebrow"><MapPin size={15} /> SHANGHAI · OPEN TO WORK</p>
          <h1><span>YOUR NAME</span><small>YOUR ENGLISH NAME</small></h1>
          <div className="role-row">
            <span>互联网产品经理</span>
            <i />
            <span>硬件产品经理</span>
          </div>
          <h2>关注用户体验、产品策略与<br className="desktop-break" />软硬件协同的产品探索者</h2>
          <p className="hero-intro">
            我喜欢把模糊问题梳理成清晰路径，在用户需求、商业目标与工程约束之间，
            找到可以真正落地的产品答案。
          </p>
          <div className="hero-actions">
            <button className="primary-action" onClick={enterPortfolio} disabled={diving}>
              <span>进入地下作品集</span><ArrowDown size={18} />
            </button>
            <a className="secondary-action" href="/resume.pdf" download>
              <Download size={17} /><span>下载简历</span>
            </a>
          </div>
          <div className="contact-links" aria-label="联系方式">
            <a href="mailto:hello@example.com"><Mail size={16} /> hello@example.com</a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer"><BriefcaseBusiness size={16} /> LinkedIn</a>
          </div>
        </motion.div>

        <motion.div
          className="entrance-scene"
          animate={diving && !reduceMotion ? { scale: 1.7, y: "-4vh" } : undefined}
          transition={{ duration: 1.05, ease: [0.65, 0, 0.35, 1] }}
          aria-label="原创洞穴入口场景"
        >
          <div className="tree">
            <span className="tree-crown tree-crown--1" />
            <span className="tree-crown tree-crown--2" />
            <span className="tree-crown tree-crown--3" />
            <span className="tree-trunk" />
          </div>
          <div className="signpost">
            <span>作品在下面</span>
          </div>
          <div className="mailbox">
            <Mail size={17} />
          </div>
          <div className="cave-mound">
            <div className="cave-door">
              <span className="cave-glow" />
              <span className="cave-step cave-step--1" />
              <span className="cave-step cave-step--2" />
              <span className="cave-step cave-step--3" />
            </div>
          </div>
          <div className="character" aria-hidden="true">
            <span className="character-head"><i /><b /></span>
            <span className="character-body" />
            <span className="character-bag" />
          </div>
          <div className="grass-line" />
        </motion.div>
      </section>
      <div className="foreground-plants" aria-hidden="true">
        {Array.from({ length: 9 }).map((_, index) => <i key={index} />)}
      </div>
      <motion.div
        className="dive-overlay"
        initial={false}
        animate={{ opacity: diving ? 1 : 0 }}
        transition={{ duration: 0.65, delay: diving ? 0.35 : 0 }}
      >
        <span>向下探索</span><ArrowDown />
      </motion.div>
    </main>
  );
}
