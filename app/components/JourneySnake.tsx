"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

type JourneySnakeProps = {
  stage: "surface" | "level-one" | "level-two";
  nextHref?: string;
  previousHref?: string;
};

type NavigationDirection = "forward" | "backward";

const corgiGuideByStage = {
  surface: {
    src: "/corgi-guide-surface-v2.png",
    alt: "低头闻草的小柯基",
  },
  "level-one": {
    src: "/corgi-guide-study-v3.png",
    alt: "放松地板鸭趴着的小柯基",
  },
  "level-two": {
    src: "/corgi-guide-deep-v3.png",
    alt: "肚皮朝上仰躺的小柯基",
  },
} as const;

let blockedWheelDirection: NavigationDirection | null = null;
let wheelReleaseTimer: number | null = null;

function scheduleWheelRelease() {
  if (typeof window === "undefined") return;

  if (wheelReleaseTimer) window.clearTimeout(wheelReleaseTimer);
  wheelReleaseTimer = window.setTimeout(() => {
    blockedWheelDirection = null;
    wheelReleaseTimer = null;
  }, 320);
}

export function JourneySnake({
  stage,
  nextHref,
  previousHref,
}: JourneySnakeProps) {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const [navigationDirection, setNavigationDirection] =
    useState<NavigationDirection | null>(null);
  const navigatingRef = useRef(false);
  const routeTimer = useRef<number | null>(null);

  const navigateTo = useCallback(
    (href: string | undefined, direction: NavigationDirection) => {
      if (!href || navigatingRef.current) return;

      navigatingRef.current = true;
      blockedWheelDirection = direction;
      if (wheelReleaseTimer) {
        window.clearTimeout(wheelReleaseTimer);
        wheelReleaseTimer = null;
      }

      if (reduceMotion) {
        router.push(href);
        return;
      }

      setNavigationDirection(direction);
      routeTimer.current = window.setTimeout(
        () => router.push(href),
        direction === "forward" ? 760 : 460,
      );
    },
    [reduceMotion, router],
  );

  const enterNextPage = useCallback(() => {
    navigateTo(nextHref, "forward");
  }, [navigateTo, nextHref]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      navigatingRef.current = false;
      setNavigationDirection(null);
      scheduleWheelRelease();
    });

    return () => window.cancelAnimationFrame(frame);
  }, [stage]);

  useEffect(() => {
    if (!nextHref && !previousHref) return;

    let wheelDistance = 0;
    let wheelDirection = 0;
    let resetTimer: number | null = null;

    const handleWheel = (event: WheelEvent) => {
      if (event.deltaY === 0 || event.ctrlKey || navigatingRef.current) {
        return;
      }

      const target = event.target as HTMLElement | null;
      if (target?.closest("input, textarea, select, [contenteditable='true']")) return;

      const direction: NavigationDirection =
        event.deltaY > 0 ? "forward" : "backward";
      const href = direction === "forward" ? nextHref : previousHref;
      if (!href) return;

      if (blockedWheelDirection === direction) {
        event.preventDefault();
        scheduleWheelRelease();
        return;
      }

      if (blockedWheelDirection && blockedWheelDirection !== direction) {
        blockedWheelDirection = null;
        if (wheelReleaseTimer) {
          window.clearTimeout(wheelReleaseTimer);
          wheelReleaseTimer = null;
        }
      }

      event.preventDefault();

      const currentWheelDirection = Math.sign(event.deltaY);
      if (currentWheelDirection !== wheelDirection) {
        wheelDistance = 0;
        wheelDirection = currentWheelDirection;
      }

      wheelDistance += Math.min(Math.abs(event.deltaY), 120);

      if (resetTimer) window.clearTimeout(resetTimer);
      resetTimer = window.setTimeout(() => {
        wheelDistance = 0;
        wheelDirection = 0;
      }, 240);

      if (wheelDistance >= 64) {
        wheelDistance = 0;
        navigateTo(href, direction);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      if (resetTimer) window.clearTimeout(resetTimer);
    };
  }, [navigateTo, nextHref, previousHref]);

  useEffect(() => {
    return () => {
      if (routeTimer.current) window.clearTimeout(routeTimer.current);
    };
  }, []);

  const label = nextHref
    ? stage === "surface"
      ? "点击小柯基或向下滚动，进入地下第一层"
      : "点击小柯基或向下滚动进入更深层，向上滚动返回上一层"
    : "向上滚动，返回地下第一层";

  const corgiGuide = corgiGuideByStage[stage];

  return (
    <div
      className={`journey-snake-host journey-snake-host--${stage}`}
      data-entering={navigationDirection === "forward"}
      data-returning={navigationDirection === "backward"}
      data-terminal={!nextHref}
    >
      <button
        type="button"
        className="journey-snake"
        onClick={enterNextPage}
        disabled={!nextHref || navigationDirection !== null}
        aria-label={label}
        title={label}
      >
        <span className="journey-snake__burrow" aria-hidden="true" />
        <span className="journey-snake__figure" aria-hidden="true">
          <Image
            className="journey-snake__image"
            src={corgiGuide.src}
            width={1254}
            height={1254}
            alt={corgiGuide.alt}
            draggable={false}
            unoptimized
          />
        </span>
      </button>

      <div className="journey-snake__transition" aria-hidden="true" />
    </div>
  );
}
