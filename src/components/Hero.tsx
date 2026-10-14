import type { L10n, Painting, SiteSettings } from "@/lib/types";
import Art from "./Art";
import { paintingMeta } from "@/lib/painting";

export default function Hero({ site, painting, quote }: { site: SiteSettings; painting: Painting; quote: L10n }) {
  return (
    <section className="home-hero">
      <div className="home-hero-in">
        <div className="home-hero-text">
          <h1 className="name">{site.artistName}</h1>
          <p className="eyebrow">{site.tagline.pl}</p>
          <blockquote>{quote.pl}</blockquote>
        </div>
        <figure className="home-hero-art">
          <Art image={painting.image} placeholder={painting.placeholder} ratio={painting.ratio} priority sizes="(min-width: 900px) 50vw, 100vw" />
          <figcaption className="muted">
            <strong>{painting.title}</strong>{paintingMeta(painting) && `, ${paintingMeta(painting)}`}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
