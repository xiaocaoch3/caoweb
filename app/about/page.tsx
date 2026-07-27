import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowDownToLine, ArrowRight, Boxes, Cpu, LayoutTemplate, Mail, MapPin,
  MessageSquareText, PenTool, Search, Sparkles,
} from "lucide-react";
import { SiteNav } from "../components/SiteNav";

export const metadata: Metadata = { title: "关于我", description: "我的经历、能力地图、工具与联系方式。" };

const capabilities = [
  { icon: Search, title: "发现问题", text: "用户研究、竞品分析、数据洞察与机会识别" },
  { icon: PenTool, title: "定义产品", text: "产品策略、需求分析、信息架构与交互原型" },
  { icon: Boxes, title: "推动落地", text: "版本规划、跨团队协作、工程约束与项目推进" },
  { icon: Sparkles, title: "验证迭代", text: "可用性测试、指标设计、复盘与持续迭代" },
];

export default function AboutPage() {
  return (
    <main className="about-page">
      <SiteNav underground />
      <header className="about-hero">
        <div className="about-portrait" aria-hidden="true">
          <span className="portrait-head"><i /><b /></span><span className="portrait-body" /><span className="portrait-notebook" />
        </div>
        <div className="about-intro">
          <p className="eyebrow eyebrow--amber">ABOUT THE MAKER</p>
          <h1>你好，我是<br /><em>YOUR NAME</em></h1>
          <p>我是一名关注用户体验、产品策略与软硬件协同的产品探索者。我享受从混乱信息中找到关键问题，也享受和设计、研发一起把答案做出来。</p>
          <div className="about-tags"><span>互联网产品</span><span>智能硬件</span><span>用户研究</span><span>0→1</span></div>
          <div className="hero-actions">
            <a className="primary-action" href="/resume.pdf" download><ArrowDownToLine size={18} /> 下载完整简历</a>
            <a className="secondary-action" href="mailto:hello@example.com"><Mail size={17} /> 和我聊聊</a>
          </div>
        </div>
      </header>

      <section className="about-section">
        <div className="about-section-title"><span>01</span><div><p>WHAT I DO</p><h2>能力地图</h2></div></div>
        <div className="capability-grid">{capabilities.map(({ icon: Icon, title, text }, index) => (
          <article key={title}><span>0{index + 1}</span><Icon /><h3>{title}</h3><p>{text}</p></article>
        ))}</div>
      </section>

      <section className="about-section about-section--split">
        <div>
          <div className="about-section-title"><span>02</span><div><p>EXPERIENCE</p><h2>经历路径</h2></div></div>
          <div className="timeline">
            <article><span>NOW</span><div><h3>寻找下一段产品旅程</h3><p>互联网产品经理 / 硬件产品经理</p></div></article>
            <article><span>2025</span><div><h3>智能设备产品实践</h3><p>场景研究、产品定义、软硬件协同</p></div></article>
            <article><span>2024</span><div><h3>产品研究与项目实践</h3><p>用户研究、竞品分析、交互原型</p></div></article>
          </div>
        </div>
        <div>
          <div className="about-section-title"><span>03</span><div><p>TOOLBOX</p><h2>常用工具</h2></div></div>
          <div className="toolbox">
            <span><LayoutTemplate /> Figma</span><span><MessageSquareText /> Notion</span>
            <span><Cpu /> 硬件原型</span><span><Boxes /> Axure</span>
            <span><Search /> 调研分析</span><span><PenTool /> AI 辅助</span>
          </div>
        </div>
      </section>

      <section className="contact-room">
        <div><p>THE LIGHT IS ON</p><h2>如果你也在做有意思的产品，<br />欢迎来敲门。</h2></div>
        <div className="contact-card">
          <a href="mailto:hello@example.com"><Mail /> hello@example.com</a>
          <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer"><MapPin /> LinkedIn · Placeholder</a>
          <Link href="/portfolio">返回地下作品集 <ArrowRight /></Link>
        </div>
      </section>
    </main>
  );
}
