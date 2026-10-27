import Image from "next/image";
import Link from "next/link";
import { getHome, getPaintings, getSeries, getSite } from "@/content/data";
import type { Painting, Series } from "@/lib/types";
import Stage, { type StageItem } from "@/components/Stage";
import ContactBand from "@/components/ContactBand";
import YearList from "@/components/YearList";
import Art from "@/components/Art";

const toStage = (p: Painting, series: Series[]): StageItem => ({
  id: p.id, image: p.image, placeholder: p.placeholder, title: p.title,
  series: series.find((s) => s.id === p.seriesId)?.name.pl ?? "",
});

export default async function HomePage() {
  const [site, home, series, paintings] = await Promise.all([getSite(), getHome(), getSeries(), getPaintings()]);

  // Każda seria z jej pierwszym obrazem.
  const seriesCovers = series.flatMap((s) => {
    const first = paintings.filter((p) => p.seriesId === s.id).sort((a, b) => a.order - b.order)[0];
    return first ? [{ series: s, cover: first }] : [];
  });

  // Gdzie zobaczyć obrazy: najnowsze pozycje z listy wystaw.
  const where = site.exhibitions.slice(0, 5);
  const wherePhoto = site.exhibitionPhotos[1];

  return (
    <>
      <Stage
        cycle={home.stagePaintings.map((p) => toStage(p, series))}
        intro={
          <div className="stage-intro">
            <h1 className="hero-name">Vanessa Pol‑Zaborowska</h1>
            <p className="intro-lead">{home.lead.pl}</p>
            <p className="actions">
              <Link className="btn" href="/portfolio">Zobacz obrazy</Link>
              <Link className="text-link" href="/portrety-energetyczne">Portret na zamówienie</Link>
            </p>
          </div>
        }
        after={
          <section className="letter" aria-labelledby="letter-h" data-reveal>
            <h2 id="letter-h" className="h2">Kilka słów ode mnie</h2>
            {home.letter.map((p, i) => <p key={i}>{p}</p>)}
            {site.logo && <Image className="letter-sign" src={site.logo.src} alt={site.logo.alt.pl} width={1200} height={483} />}
            <p className="soft">Vanessa Pol-Zaborowska, malarka</p>
            <Link className="text-link" href="/o-autorce">Więcej o mnie</Link>
          </section>
        }
      />

      <section className="series-band" aria-labelledby="series-h">
        <div className="wide">
          <h2 id="series-h" className="h2" data-reveal>Serie obrazów</h2>
          <ul className="series-grid" data-reveal>
            {seriesCovers.map(({ series: s, cover }) => (
              <li key={s.id}>
                <Link href={`/portfolio#${s.id}`}>
                  <span className="series-pic">
                    <Art image={cover.image} placeholder={cover.placeholder} ratio="1 / 1" sizes="(min-width: 900px) 25vw, 50vw" />
                  </span>
                  <span className="series-name">{s.name.pl}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="where" aria-labelledby="where-h">
        <div className="wide where-in">
          <div data-reveal>
            <h2 id="where-h" className="h2">Gdzie zobaczyć obrazy</h2>
            <p className="section-lead">Stałe ekspozycje, galerie i ostatnie wystawy.</p>
            <YearList items={where} />
            <Link className="text-link" href="/aktualnosci">Wszystkie aktualności</Link>
          </div>
          {wherePhoto && (
            <figure className="where-photo">
              <Art image={wherePhoto.image} placeholder={wherePhoto.placeholder} ratio="4 / 5" sizes="(min-width: 900px) 40vw, 100vw" />
              <figcaption className="soft">Z wystaw i wydarzeń</figcaption>
            </figure>
          )}
        </div>
      </section>

      <section className="offers" aria-labelledby="offers-h">
        <div className="wide">
          <h2 id="offers-h" className="h2" data-reveal>Co mogę dla Ciebie zrobić</h2>
          <ul className="offer-list" data-reveal>
            {home.offers.map((o) => (
              <li key={o.href}>
                <h3>{o.title.pl}</h3>
                <p>{o.text.pl}</p>
                <Link className="text-link" href={o.href}>{o.linkLabel.pl}</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ContactBand site={site} />
    </>
  );
}
