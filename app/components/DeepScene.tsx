import { JourneySnake } from "./JourneySnake";
import { InterestHotspots } from "./InterestHotspots";
import { SiteNav } from "./SiteNav";

export function DeepScene() {
  return (
    <main className="deep-page">
      <SiteNav underground />

      <section className="deep-cross-section" aria-label="更深层地下空间">
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
