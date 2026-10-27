import Link from "next/link";
import type { NewsItem } from "@/lib/types";

export const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("pl-PL", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(iso));

/** Lista artykułów w Aktualnościach: rok po lewej, tytuł, miejsce i wstęp po prawej. */
export default function NewsList({ items }: { items: NewsItem[] }) {
  if (items.length === 0) return null;
  return (
    <ol className="news">
      {items.map((n) => (
        <li key={n.slug}>
          <span className="year">{n.date.slice(0, 4)}</span>
          <article>
            <h3><Link href={`/aktualnosci/${n.slug}`}>{n.title}</Link></h3>
            {n.place && <p className="soft">{n.place}</p>}
            {n.excerpt && <p>{n.excerpt}</p>}
          </article>
        </li>
      ))}
    </ol>
  );
}
