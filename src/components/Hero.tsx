import type { L10n, Painting, SiteSettings } from "@/lib/types";
import Art from "./Art";
import { paintingMeta } from "@/lib/painting";

/** Obraz na górze strony głównej. Bez obrazu pokazuje pole z napisem do uzupełnienia. */
export default function Hero({ site, painting, quote }: { site: SiteSettings; painting?: Painting; quote: L10n }) {
  return (
    <section className="home-hero">
      <div className="home-hero-in">
        <div className="home-hero-text">
          <h1 className="name">{site.artistName}</h1>
          <p className="eyebrow">{site.tagline.pl}</p>
          <blockquote>{quote.pl}</blockquote>
        </div>
        <figure className="home-hero-art">
          <Art image={painting?.image} placeholder={painting?.placeholder ?? "#d9d6d1"} ratio={painting?.ratio ?? "4 / 3"} label="Zdjęcie do uzupełnienia" priority sizes="(min-width: 900px) 50vw, 100vw" />
          {painting && (
            <figcaption className="muted">
              {painting.title && <strong>{painting.title}</strong>}{paintingMeta(painting) && `${painting.title ? ", " : ""}${paintingMeta(painting)}`}
            </figcaption>
          )}
        </figure>
      </div>
    </section>
  );
}
