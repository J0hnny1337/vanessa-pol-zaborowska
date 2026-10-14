import type { ServicePage } from "@/lib/types";
import Art from "./Art";
import Rich from "./Rich";

export default function ServiceBody({ page }: { page: ServicePage }) {
  const photo = page.photo;
  return (
    <section className="narrow service">
      <div className="service-img">
        <Art image={photo?.image} placeholder={photo?.placeholder ?? "#d9d6d1"} ratio="1 / 1" sizes="(min-width: 900px) 30vw, 100vw" />
        <span className="tick" aria-hidden="true" />
      </div>
      <div className="service-text">
        <p className="eyebrow">{page.heading.pl}</p>
        <h2 className="display">{page.heading.pl}</h2>
        <span className="tick" aria-hidden="true" />
        <Rich data={page.body} />

        <aside className="callout">
          <p className="callout-title">{page.needs.title.pl}</p>
          <ul>
            {page.needs.items.map((it, i) => <li key={i}>{it.pl}</li>)}
          </ul>
        </aside>
      </div>
    </section>
  );
}
