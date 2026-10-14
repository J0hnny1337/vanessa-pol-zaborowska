import type { ContentPage } from "@/lib/types";
import Art from "./Art";
import Rich, { hasText } from "./Rich";

/** Treść prostej podstrony: zdjęcie, tekst, lista wpisów z datą, zaproszenie. */
export default function ContentBody({ page, children }: { page: ContentPage; children?: React.ReactNode }) {
  const { photo } = page;
  return (
    <section className="narrow content">
      {photo && (
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
