import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPageHeader, getPaintings, getPortfolioSections, getSeries, getSite } from "@/content/data";
import { paintingMeta } from "@/lib/painting";
import PageIntro from "@/components/PageIntro";
import PaintingGrid from "@/components/PaintingGrid";
import ContactBand from "@/components/ContactBand";
import Art from "@/components/Art";

export const metadata: Metadata = { title: "Portfolio" };

// Obraz obok tytułu strony.
const INTRO_PAINTING = "w-porcie";
// Ile obrazów serii widać od razu; resztę rozwija przycisk.
const VISIBLE = 6;

export default async function PortfolioPage() {
  const header = await getPageHeader("portfolio");
  if (!header) notFound();
  const [site, sections, series, paintings] = await Promise.all([getSite(), getPortfolioSections(), getSeries(), getPaintings()]);
  const intro = paintings.find((p) => p.id === INTRO_PAINTING);
  const groups = series
    .map((s) => ({ series: s, items: paintings.filter((p) => p.seriesId === s.id).sort((a, b) => a.order - b.order) }))
    .filter((g) => g.items.length > 0);
  const other = sections.filter((s) => s.kind !== "paintings");

  return (
    <>
      <PageIntro
        title={header.title.pl}
        lead={header.lead.pl}
        media={intro && (
          <figure className="intro-figure">
            <Art image={intro.image} placeholder={intro.placeholder} ratio={intro.ratio} priority sizes="(min-width: 900px) 45vw, 100vw" />
            <figcaption className="soft"><strong>{intro.title}</strong>, z serii Marynistyka i żaglowce</figcaption>
          </figure>
        )}
      />

      <section id="obrazy" className="pf-index" aria-labelledby="obrazy-h">
        <div className="wide pf-index-in" data-reveal>
          <h2 id="obrazy-h" className="h2">Obrazy</h2>
          <ul>
            {groups.map((g) => (
              <li key={g.series.id}><a href={`#${g.series.id}`}>{g.series.name.pl}</a> <span className="soft">{g.items.length}</span></li>
            ))}
          </ul>
        </div>
      </section>

      {groups.map((g) => (
        <section key={g.series.id} id={g.series.id} className="pf-series" aria-labelledby={`${g.series.id}-h`}>
          <div className="wide">
            <h3 id={`${g.series.id}-h`} className="h2" data-reveal>{g.series.name.pl}</h3>
            <PaintingGrid
              label={g.series.name.pl}
              visible={VISIBLE}
              items={g.items.map((p) => ({ id: p.id, image: p.image, placeholder: p.placeholder, ratio: p.ratio, title: p.title, meta: paintingMeta(p) }))}
            />
          </div>
        </section>
      ))}

      {other.length > 0 && (
        <section className="pf-soon" aria-label="Fotografie, wiersze i poezja">
          <div className="wide pf-soon-in" data-reveal>
            {other.map((s) => (
              <div key={s.id} id={s.id}>
                <h2 className="h2">{s.title.pl}</h2>
                <p>{s.placeholder?.pl}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <ContactBand site={site} prompt={{
        sentence: { pl: "Spodobał Ci się któryś obraz? Zapytaj o jego dostępność, wymiary i cenę.", en: "" },
        question: { pl: "Pytanie o obraz?", en: "" },
        subject: "Pytanie o obraz z portfolio",
      }} />
    </>
  );
}
