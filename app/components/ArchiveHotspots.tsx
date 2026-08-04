"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { FolderOpen, X } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { archiveFolders, type ArchiveFolder } from "../data/site-content";

export function ArchiveHotspots() {
  const [active, setActive] = useState<ArchiveFolder | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!active) return;
    closeButtonRef.current?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [active]);

  return (
    <>
      <div className="archive-hotspots" aria-label="项目档案夹">
        {archiveFolders.map((folder) => (
          <button
            key={folder.id}
            className="scene-hotspot archive-hotspot"
            style={{ "--hotspot-x": folder.position.x, "--hotspot-y": folder.position.y } as CSSProperties}
            onClick={() => setActive(folder)}
            aria-label={`打开${folder.title}`}
          >
            <Image
              src="/archive-folder-spine-v2-cropped.png"
              width={96}
              height={96}
              alt=""
              aria-hidden="true"
              unoptimized
            />
            <span>{folder.title}</span>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="scene-dialog-backdrop"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setActive(null);
            }}
          >
            <motion.article
              className="archive-dialog"
              role="dialog"
              aria-modal="true"
              aria-labelledby="archive-dialog-title"
              initial={reduceMotion ? false : { opacity: 0, y: 24, scale: .98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 14, scale: .99 }}
              transition={{ duration: .24, ease: "easeOut" }}
            >
              <header>
                <div className="archive-dialog__eyebrow"><FolderOpen /> {active.code} · {active.year}</div>
                <button ref={closeButtonRef} onClick={() => setActive(null)} aria-label="关闭档案">
                  <X />
                </button>
              </header>
              <p className="archive-dialog__title-en">{active.titleEn}</p>
              <h2 id="archive-dialog-title">{active.title}</h2>
              <p className="archive-dialog__role">{active.role}</p>
              <p className="archive-dialog__summary">{active.summary}</p>
              <section>
                <h3>我做了什么</h3>
                <ul>{active.work.map((item) => <li key={item}>{item}</li>)}</ul>
              </section>
              <section className="archive-dialog__result">
                <h3>结果</h3>
                <p>{active.result}</p>
              </section>
              <small>当前为内容占位，可随时替换为真实项目资料与图片。</small>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
