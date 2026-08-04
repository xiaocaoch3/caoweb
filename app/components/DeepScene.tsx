import { JourneySnake } from "./JourneySnake";
import { SiteNav } from "./SiteNav";

export function DeepScene() {
  return (
    <main className="deep-page">
      <SiteNav underground />

      <section className="deep-cross-section" aria-label="更深层地下空间">
        <div className="deep-cross-section__art" aria-hidden="true" />
        <JourneySnake stage="level-two" previousHref="/portfolio" />
        <h1 className="sr-only">更深层地下空间</h1>
      </section>
    </main>
  );
}
