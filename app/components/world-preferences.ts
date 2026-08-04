import { useCallback, useEffect, useState } from "react";

export type Season = "spring" | "summer" | "autumn" | "winter";
export type Weather = "sunny" | "rain";

export interface WorldPreferences {
  season: Season;
  weather: Weather;
}

const STORAGE_KEY = "portfolio-world-preferences";
const CHANGE_EVENT = "portfolio-world-preferences-change";
const DEFAULT_PREFERENCES: WorldPreferences = {
  season: "spring",
  weather: "sunny",
};

const seasons: Season[] = ["spring", "summer", "autumn", "winter"];
const weatherTypes: Weather[] = ["sunny", "rain"];

export function readWorldPreferences(): WorldPreferences {
  if (typeof window === "undefined") return DEFAULT_PREFERENCES;

  try {
    const stored = JSON.parse(
      window.localStorage.getItem(STORAGE_KEY) ?? "{}",
    ) as Partial<WorldPreferences>;

    return {
      season: seasons.includes(stored.season as Season)
        ? (stored.season as Season)
        : DEFAULT_PREFERENCES.season,
      weather: weatherTypes.includes(stored.weather as Weather)
        ? (stored.weather as Weather)
        : DEFAULT_PREFERENCES.weather,
    };
  } catch {
    return DEFAULT_PREFERENCES;
  }
}

export function writeWorldPreferences(preferences: WorldPreferences) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
  window.dispatchEvent(
    new CustomEvent<WorldPreferences>(CHANGE_EVENT, { detail: preferences }),
  );
}

export function useWorldPreferences() {
  const [snapshot, setSnapshot] =
    useState<WorldPreferences>(DEFAULT_PREFERENCES);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setSnapshot(readWorldPreferences());
    });
    const handlePreferenceChange = (event: Event) => {
      const nextPreferences =
        event instanceof CustomEvent
          ? (event.detail as WorldPreferences)
          : readWorldPreferences();
      setSnapshot(nextPreferences);
    };

    window.addEventListener(CHANGE_EVENT, handlePreferenceChange);
    window.addEventListener("storage", handlePreferenceChange);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener(CHANGE_EVENT, handlePreferenceChange);
      window.removeEventListener("storage", handlePreferenceChange);
    };
  }, []);

  const updatePreferences = useCallback((preferences: WorldPreferences) => {
    writeWorldPreferences(preferences);
  }, []);

  return [snapshot, updatePreferences] as const;
}
