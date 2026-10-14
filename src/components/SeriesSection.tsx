import Link from "next/link";
import type { Painting, Series } from "@/lib/types";
import Art from "./Art";
import ExpandableGrid from "./ExpandableGrid";
import { paintingMeta } from "@/lib/painting";

export default function SeriesSection({ series, paintings, href, hideTitle, level = "h2" }: { series: Series; paintings: Painting[]; href?: string; hideTitle?: boolean; level?: "h2" | "h3" }) {
  const Heading = level;
  const items = paintings.filter((p) => p.seriesId === series.id).sort((a, b) => a.order - b.order);
  if (items.length === 0) return null;
  return (
    <section className="series">
      <div className="wide">
        {!hideTitle && (
          <Heading className="display">
            {href ? <Link href={href}>{series.name.pl}</Link> : series.name.pl} {series.years && <span className="muted years">{series.years}</span>}
          </Heading>
        )}
        <ExpandableGrid visible={3}>
          {items.map((p) => (
            <figure className="card" key={p.id}>
              <div className="card-frame">
                <Art image={p.image} placeholder={p.placeholder} ratio={p.ratio} />
                {p.status === "sold" && <span className="badge">Sprzedany</span>}
              </div>
              <figcaption>
                {p.title && <strong>{p.title}</strong>}
                {paintingMeta(p) && <span className="muted">{paintingMeta(p)}</span>}
              </figcaption>
            </figure>
          ))}
        </ExpandableGrid>
      </div>
    </section>
  );
}
