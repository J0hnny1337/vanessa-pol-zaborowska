import type { Exhibition, SiteSettings } from "@/lib/types";
import Art from "./Art";
import Carousel from "./Carousel";
import Rich from "./Rich";

// Ile wystaw widać od razu; reszta chowa się pod "Pokaż wszystkie".
const VISIBLE_EXHIBITIONS = 10;

export default function BioSection({ site, hideTitle }: { site: SiteSettings; hideTitle?: boolean }) {
  const { portrait, exhibitionPhotos: gallery } = site;
  return (
    <section className="band bio">
      <div className="wide bio-in">
        <div>
          {!hideTitle && (
            <>
              <p className="eyebrow">Bio</p>
              <h2 className="display">O mnie</h2>
            </>
          )}
          <Rich data={site.bio} />
          <Rich data={site.statement} as="blockquote" className="statement" />
          {site.portfolioPdfUrl && <p><a className="btn-dark" href={site.portfolioPdfUrl}>Pobierz portfolio (PDF)</a></p>}
        </div>
        <div>
          {portrait && (
            <figure className="bio-portrait">
              <Art image={portrait.image} placeholder={portrait.placeholder} ratio={portrait.ratio} sizes="(min-width: 900px) 35vw, 100vw" />
            </figure>
          )}
        </div>
      </div>

      {/* Wystawy, a obok karuzela ze zdjęciami z wystaw */}
      <div className="wide bio-in bio-exhibitions">
        <div>
          <h3 className="caps">Wybrane wystawy</h3>
          <ExhibitionList items={site.exhibitions.slice(0, VISIBLE_EXHIBITIONS)} />
          {site.exhibitions.length > VISIBLE_EXHIBITIONS && (
            <details className="more">
              <summary className="caps">Pokaż wszystkie ({site.exhibitions.length})</summary>
              <ExhibitionList items={site.exhibitions.slice(VISIBLE_EXHIBITIONS)} />
            </details>
          )}
          <h3 className="caps">Kolekcje prywatne</h3>
          <p>{site.collections.join(" · ")}</p>
        </div>
        {gallery.length > 0 && (
          <div className="bio-gallery">
            <Carousel label="Zdjęcia z wystaw" single>
              {gallery.map((p) => (
                <figure className="slide-fig" key={p.id}>
                  <Art image={p.image} placeholder={p.placeholder} ratio="4 / 3" sizes="(min-width: 900px) 45vw, 100vw" />
                </figure>
              ))}
            </Carousel>
          </div>
        )}
      </div>
    </section>
  );
}

function ExhibitionList({ items }: { items: Exhibition[] }) {
  return (
    <ul className="plain">
      {items.map((e, i) => (
        <li key={`${e.year}-${i}-${e.title}`}><span className="muted">{e.year}</span> {e.title}{e.place && `, ${e.place}`}</li>
      ))}
    </ul>
  );
}
