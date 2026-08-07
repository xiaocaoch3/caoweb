"use client";

import Link from "next/link";
import { Mountain } from "lucide-react";
import { usePathname } from "next/navigation";
import {
  type Season,
  useWorldPreferences,
} from "./world-preferences";

type SiteNavProps = {
  underground?: boolean;
};

const seasons: { id: Season; label: string }[] = [
  { id: "spring", label: "春" },
  { id: "summer", label: "夏" },
  { id: "autumn", label: "秋" },
  { id: "winter", label: "冬" },
];

const pages = [
  { href: "/", label: "第一页：地上" },
  { href: "/portfolio", label: "第二页：学习洞穴" },
  { href: "/deep", label: "第三页：更深层地下" },
];

export function SiteNav({ underground = false }: SiteNavProps) {
  const pathname = usePathname();
  const [{ season, weather }, updatePreferences] = useWorldPreferences();
  const isHome = pathname === "/";
  const isPortfolio = pathname.startsWith("/portfolio");
  const isDeep = pathname === "/deep";

  return (
    <>
      <header className={`site-nav ${underground ? "site-nav--underground" : ""}`}>
        <Link href="/" className="brand" aria-label="回到地上首页">
          <span className="brand-mark"><Mountain size={18} /></span>
          <span>YOUR NAME</span>
        </Link>
        <nav aria-label="季节和天气控制">
          <div className="site-nav__world-controls" aria-label="切换季节和天气">
            <div aria-label="切换季节">
              {seasons.map((item) => (
                <button
                  key={item.id}
                  className={season === item.id ? "is-active" : ""}
                  onClick={() =>
                    updatePreferences({ season: item.id, weather })
                  }
                  aria-pressed={season === item.id}
                  aria-label={`切换到${item.label}季`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <i aria-hidden="true" />
            <div aria-label="切换天气">
              <button
                className={weather === "sunny" ? "is-active" : ""}
                onClick={() => updatePreferences({ season, weather: "sunny" })}
                aria-pressed={weather === "sunny"}
                aria-label="晴天"
              >
                晴
              </button>
              <button
                className={weather === "rain" ? "is-active" : ""}
                onClick={() => updatePreferences({ season, weather: "rain" })}
                aria-pressed={weather === "rain"}
                aria-label="雨天"
              >
                雨
              </button>
            </div>
          </div>
        </nav>
      </header>

      <nav
        className={`page-dots ${underground ? "page-dots--underground" : ""}`}
        aria-label="三页切换"
      >
        {pages.map((page) => {
          const isCurrent =
            page.href === "/"
              ? isHome
              : page.href === "/portfolio"
                ? isPortfolio
                : isDeep;

          return (
            <Link
              key={page.href}
              href={page.href}
              className="page-dot"
              aria-label={page.label}
              aria-current={isCurrent ? "page" : undefined}
              title={page.label}
            >
              <i className="page-dot__marker" aria-hidden="true" />
            </Link>
          );
        })}
      </nav>
    </>
  );
}
