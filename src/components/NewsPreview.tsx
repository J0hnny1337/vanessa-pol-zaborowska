import Link from "next/link";
import type { NewsItem } from "@/lib/types";
import Art from "./Art";
import { formatDate } from "./NewsList";

/** Sekcja „Aktualności” na stronie głównej: najnowsze artykuły jako karty. */
export default function NewsPreview({ items }: { items: NewsItem[] }) {
  if (items.length === 0) return null;
  return (
    <section className="series news-preview">
      <div className="wide">
        <h2 className="display">
          <Link href="/aktualnosci">Aktualności</Link>
        </h2>
        <div className="news-preview-grid">
          {items.map((n) => (
            <article className="news-preview-card" key={n.slug}>
              <Link href={`/aktualnosci/${n.slug}`} aria-label={n.title}>
                <Art image={n.cover?.image} placeholder={n.cover?.placeholder ?? "#d9d6d1"} ratio="4 / 3" label="Zdjęcie do uzupełnienia" sizes="(min-width: 900px) 33vw, 100vw" />
              </Link>
              <p className="eyebrow">{formatDate(n.date)}</p>
              <h3><Link href={`/aktualnosci/${n.slug}`}>{n.title}</Link></h3>
              {n.excerpt && <p className="muted">{n.excerpt}</p>}
            </article>
          ))}
        </div>
        <p className="news-preview-more"><Link href="/aktualnosci" className="more-link caps">Wszystkie aktualności →</Link></p>
      </div>
    </section>
  );
}
