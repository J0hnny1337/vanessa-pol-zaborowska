import type { Painting, PortfolioSection, Series } from "@/lib/types";
import Art from "./Art";
import SeriesSection from "./SeriesSection";

/** Jednostronicowe Portfolio: kolejne sekcje z kotwicami (#obrazy, #fotografie, #wiersze, #poezja). */
export default function PortfolioSections({ sections, series, paintings }: { sections: PortfolioSection[]; series: Series[]; paintings: Painting[] }) {
  return (
    <>
      {sections.map((s) => (
        <section className="portfolio-section" id={s.id} key={s.id}>
          <div className="wide">
            <h2 className="display portfolio-title">{s.title.pl}</h2>
          </div>

          {s.kind === "paintings" && series.map((x) => <SeriesSection key={x.id} series={x} paintings={paintings} level="h3" />)}

          {s.kind === "photos" && (
            <div className="wide">
              <div className="grid">
                {["#d9d6d1", "#cfcdc8", "#d6d2cc"].map((c) => <Art key={c} placeholder={c} ratio="4 / 3" />)}
              </div>
              {s.placeholder && <p className="muted portfolio-empty">{s.placeholder.pl}</p>}
            </div>
          )}

          {s.kind === "text" && s.placeholder && (
            <div className="wide"><p className="muted portfolio-empty">{s.placeholder.pl}</p></div>
          )}
        </section>
      ))}
    </>
  );
}
