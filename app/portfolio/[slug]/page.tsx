import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft, ArrowRight, CheckCircle2, CircleDot, Compass, Flag,
  Layers3, Lightbulb, RefreshCcw, Route, Sparkles, Target, UserRound,
} from "lucide-react";
import { SiteNav } from "../../components/SiteNav";
import { categoryLabels, getProject, projects } from "../../data/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const project = getProject((await params).slug);
  return project ? { title: project.title, description: project.summary } : {};
}

function ListBlock({ items }: { items: string[] }) {
  return <ul className="case-list">{items.map((item) => (
    <li key={item}><CheckCircle2 size={18} /><span>{item}</span></li>
  ))}</ul>;
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const projectIndex = projects.findIndex((item) => item.slug === project.slug);
  const nextProject = projects[(projectIndex + 1) % projects.length];

  return (
    <main className="case-page">
      <SiteNav underground />
      <header className={`case-hero case-hero--${project.cover}`}>
        <div className="case-hero-inner">
          <Link href="/portfolio" className="back-link"><ArrowLeft size={17} /> 返回作品集总览</Link>
          <div className="case-labels">
            <span>{categoryLabels[project.category]}</span><span>{project.year}</span><span>{project.role}</span>
          </div>
          <p className="case-number">CASE STUDY · 0{projectIndex + 1}</p>
          <h1>{project.title}<small>{project.titleEn}</small></h1>
          <p className="case-summary">{project.summary}</p>
          <div className="case-stat-row">
            <div><strong>01</strong><span>完整产品案例</span></div>
            <div><strong>12</strong><span>结构化章节</span></div>
            <div><strong>0→1</strong><span>问题到落地</span></div>
          </div>
        </div>
        <div className="case-cave-window" aria-hidden="true">
          <span className="case-lamp" /><span className="case-table" />
          <span className="case-board" /><span className="case-figure" />
        </div>
      </header>

      <div className="case-layout">
        <aside className="case-toc" aria-label="案例目录">
          <p>案例目录</p>
          <a href="#overview">01 项目概览</a><a href="#background">02 背景与角色</a>
          <a href="#problem">03 问题与洞察</a><a href="#analysis">04 产品分析</a>
          <a href="#solution">05 核心方案</a><a href="#flow">06 产品流程</a>
          <a href="#prototype">07 原型展示</a><a href="#result">08 结果与复盘</a>
        </aside>

        <article className="case-content">
          <section id="overview" className="case-section">
            <div className="section-heading"><Compass /><span>01</span><h2>项目概览</h2></div>
            <p className="lead-copy">{project.overview}</p>
            <div className="overview-grid">
              <div><span>项目类型</span><strong>{categoryLabels[project.category]}</strong></div>
              <div><span>我的角色</span><strong>{project.role}</strong></div>
              <div><span>项目年份</span><strong>{project.year}</strong></div>
              <div><span>工作范围</span><strong>研究 / 策略 / 方案 / 验证</strong></div>
            </div>
          </section>

          <section id="background" className="case-section">
            <div className="section-heading"><Layers3 /><span>02</span><h2>项目背景</h2></div>
            <p>{project.background}</p>
            <div className="two-column-block">
              <div className="paper-card"><h3><UserRound /> 我的角色</h3><ListBlock items={project.responsibilities} /></div>
              <div className="paper-card paper-card--warm"><h3><Target /> 项目目标</h3><ListBlock items={project.goals} /></div>
            </div>
          </section>

          <section id="problem" className="case-section">
            <div className="section-heading"><CircleDot /><span>03</span><h2>问题定义与洞察</h2></div>
            <blockquote>{project.problem}</blockquote>
            <div className="insight-grid">{project.insights.map((insight, index) => (
              <div key={insight} className="insight-card"><span>INSIGHT 0{index + 1}</span><Lightbulb /><p>{insight}</p></div>
            ))}</div>
          </section>

          <section id="analysis" className="case-section">
            <div className="section-heading"><Flag /><span>04</span><h2>产品分析</h2></div>
            <div className="analysis-list">{project.analysis.map((item, index) => (
              <div key={item.title}><span>0{index + 1}</span><div><h3>{item.title}</h3><p>{item.description}</p></div></div>
            ))}</div>
          </section>

          <section id="solution" className="case-section">
            <div className="section-heading"><Sparkles /><span>05</span><h2>核心方案</h2></div>
            <div className="solution-stack">{project.solutions.map((solution, index) => (
              <div key={solution}><strong>{String(index + 1).padStart(2, "0")}</strong><p>{solution}</p></div>
            ))}</div>
          </section>

          <section id="flow" className="case-section">
            <div className="section-heading"><Route /><span>06</span><h2>产品流程 / 系统结构</h2></div>
            <div className="flow-line">{project.flow.map((step, index) => (
              <div key={step}><span>{index + 1}</span><p>{step}</p>{index < project.flow.length - 1 && <ArrowRight aria-hidden="true" />}</div>
            ))}</div>
          </section>

          <section id="prototype" className="case-section">
            <div className="section-heading"><Layers3 /><span>07</span><h2>原型与界面展示</h2></div>
            <div className="prototype-grid">{project.prototypes.map((item, index) => (
              <div key={item.title} className="prototype-card">
                <div className={`prototype-screen prototype-screen--${index + 1}`}>
                  <span className="screen-sidebar" /><span className="screen-topbar" />
                  <span className="screen-card screen-card--one" /><span className="screen-card screen-card--two" /><span className="screen-card screen-card--three" />
                </div>
                <span>0{index + 1}</span><h3>{item.title}</h3><p>{item.description}</p>
              </div>
            ))}</div>
          </section>

          <section id="result" className="case-section">
            <div className="section-heading"><CheckCircle2 /><span>08</span><h2>项目结果</h2></div>
            <ListBlock items={project.results} />
            <div className="reflection-block"><h3><RefreshCcw /> 复盘与反思</h3><ListBlock items={project.reflections} /></div>
          </section>

          <Link href={`/portfolio/${nextProject.slug}`} className="next-case">
            <span>下一个案例</span><strong>{nextProject.title}</strong><ArrowRight />
          </Link>
        </article>
      </div>
    </main>
  );
}
