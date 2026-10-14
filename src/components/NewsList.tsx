import Link from "next/link";
import type { NewsItem } from "@/lib/types";
import Art from "./Art";

export const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("pl-PL", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(iso));

/** Lista artykułów w Aktualnościach: karty ze zdjęciem, datą, tytułem i wstępem. */
export default function NewsList({ items }: { items: NewsItem[] }) {
  if (items.length === 0) return null;
  return (
    <section className="wide news-list">
      {items.map((n) => (
        <article className="news-card" key={n.slug}>
          <Link href={`/aktualnosci/${n.slug}`} className="news-cover" aria-label={n.title}>
            <Art image={n.cover?.image} placeholder={n.cover?.placeholder ?? "#d9d6d1"} ratio="4 / 3" sizes="(min-width: 900px) 33vw, 100vw" />
          </Link>
          <div className="news-body">
            <p className="eyebrow">{formatDate(n.date)}{n.place && ` · ${n.place}`}</p>
            <h2><Link href={`/aktualnosci/${n.slug}`}>{n.title}</Link></h2>
            {n.excerpt && <p>{n.excerpt}</p>}
            <Link href={`/aktualnosci/${n.slug}`} className="more-link caps">Czytaj dalej →</Link>
          </div>
        </article>
      ))}
    </section>
  );
}
