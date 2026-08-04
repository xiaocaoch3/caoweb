import { JourneySnake } from "./JourneySnake";
import { InterestHotspots } from "./InterestHotspots";
import { SiteNav } from "./SiteNav";

export function DeepScene() {
  return (
    <main className="deep-page">
      <SiteNav underground />

      <section className="deep-cross-section" aria-label="更深层地下空间">
        <header className="scene-chapter scene-chapter--deep">
          <span>LEVEL −02 · LIFE OFFLINE</span>
          <strong>兴趣收藏室</strong>
          <p>运动、影像与声音散落在洞穴里，点击物件认识工作之外的我。</p>
        </header>
        <div className="deep-scene-canvas">
          <div className="cave-artboard cave-artboard--deep">
            <div className="deep-cross-section__art" aria-hidden="true" />
            <InterestHotspots />
            <JourneySnake stage="level-two" previousHref="/portfolio" />
          </div>
        </div>
        <h1 className="sr-only">更深层地下空间</h1>
      </section>
    </main>
  );
}
