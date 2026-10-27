import type { ContentPage } from "@/lib/types";
import Art from "./Art";
import Carousel from "./Carousel";
import Rich, { hasText } from "./Rich";

/** Treść prostej podstrony: zdjęcie, tekst, lista wpisów z datą, zaproszenie. */
export default function ContentBody({ page, children }: { page: ContentPage; children?: React.ReactNode }) {
  const { photo, gallery } = page;
  const slides = gallery?.photos ?? [];
  return (
    <section className="narrow content">
      {slides.length > 0 ? (
        <div className="content-photo">
          <Carousel label={gallery!.title.pl} single>
            {slides.map((p) => (
              <figure className="slide-fig" key={p.id}>
                <Art image={p.image} placeholder={p.placeholder} ratio="4 / 3" sizes="(min-width: 900px) 30vw, 100vw" />
              </figure>
            ))}
          </Carousel>
        </div>
      ) : photo && (
        <figure className="content-photo">
          <Art image={photo.image} placeholder={photo.placeholder} ratio={photo.ratio} sizes="(min-width: 900px) 30vw, 100vw" />
        </figure>
      )}
      {hasText(page.body) && <Rich data={page.body} />}

      {children}

      {page.items && page.items.length > 0 && (
        <>
          {page.listTitle && <h3 className="caps">{page.listTitle.pl}</h3>}
          <ul className="dated">
            {page.items.map((it, i) => (
              <li key={i}>
                <span className="muted">{it.year}</span>
                <div>
                  <p className="dated-title">{it.title.pl}</p>
                  {it.place && <p className="muted">{it.place}</p>}
                  {it.text && <p>{it.text.pl}</p>}
                </div>
              </li>
            ))}
          </ul>
        </>
      )}

      {page.invite && <p className="invite">{page.invite.pl}</p>}
    </section>
  );
}
