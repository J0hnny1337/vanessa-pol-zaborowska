import Link from "next/link";
import type { Painting, Series } from "@/lib/types";
import Art from "./Art";
import { paintingMeta } from "@/lib/painting";

export default function SeriesSection({ series, paintings, href, hideTitle }: { series: Series; paintings: Painting[]; href?: string; hideTitle?: boolean }) {
  const items = paintings.filter((p) => p.seriesId === series.id).sort((a, b) => a.order - b.order);
  if (items.length === 0) return null;
  return (
    <section className="series">
      <div className="wide">
        {!hideTitle && (
          <h2 className="display">
            {href ? <Link href={href}>{series.name.pl}</Link> : series.name.pl} <span className="muted years">{series.years}</span>
          </h2>
        )}
        <div className="grid">
          {items.map((p) => (
            <figure className="card" key={p.id}>
              <div className="card-frame">
                <Art image={p.image} placeholder={p.placeholder} ratio={p.ratio} />
                {p.status === "sold" && <span className="badge">Sprzedany</span>}
              </div>
              <figcaption>
                <strong>{p.title}</strong>
                {paintingMeta(p) && <span className="muted">{paintingMeta(p)}</span>}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
