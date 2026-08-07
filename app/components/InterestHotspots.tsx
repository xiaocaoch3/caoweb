"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { Activity, Bike, Camera, Dumbbell, Footprints, Mic2, Waves, X, type LucideIcon } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { interestItems, type InterestItem } from "../data/site-content";

const icons: Record<InterestItem["icon"], LucideIcon> = {
  bike: Bike,
  swim: Waves,
  badminton: Activity,
  run: Footprints,
  fitness: Dumbbell,
  yoga: Activity,
  camera: Camera,
  microphone: Mic2,
};

const propAssets: Partial<Record<InterestItem["icon"], string>> = {
  swim: "/deep-swim-gear-v1.png",
  badminton: "/deep-badminton-v1.png",
};

export function InterestHotspots() {
  const [active, setActive] = useState<InterestItem | null>(null);
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
      <div className="interest-hotspots" aria-label="兴趣物品">
        {interestItems.map((item) => {
          const Icon = icons[item.icon];
          const propAsset = propAssets[item.icon];
          return (
            <button
              key={item.id}
              className={`scene-hotspot interest-hotspot interest-hotspot--${item.id}`}
              style={{ "--hotspot-x": item.position.x, "--hotspot-y": item.position.y } as CSSProperties}
              onClick={() => setActive(item)}
              aria-label={`查看${item.title}`}
            >
              {propAsset ? (
                <Image
                  className="interest-hotspot__prop"
                  src={propAsset}
                  width={240}
                  height={180}
                  alt=""
                  aria-hidden="true"
                  unoptimized
                />
              ) : (
                <Icon className="interest-hotspot__marker" aria-hidden="true" />
              )}
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {active && (
          <motion.aside
            className="interest-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="interest-dialog-title"
            initial={reduceMotion ? false : { opacity: 0, x: 24, y: 12 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 18, y: 8 }}
            transition={{ duration: .22, ease: "easeOut" }}
          >
            <button ref={closeButtonRef} className="interest-dialog__close" onClick={() => setActive(null)} aria-label="关闭介绍">
              <X />
            </button>
            <span className="interest-dialog__icon">{(() => { const Icon = icons[active.icon]; return <Icon />; })()}</span>
            <small>MY INTEREST</small>
            <h2 id="interest-dialog-title">{active.title}</h2>
            <p>{active.summary}</p>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
