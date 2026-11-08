import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPaintings, getSeries, getServicePage, getSite } from "@/content/data";
import { paintingMeta } from "@/lib/painting";
import PageIntro from "@/components/PageIntro";
import PaintingGrid from "@/components/PaintingGrid";
import ContactBand from "@/components/ContactBand";
import Art from "@/components/Art";

export const metadata: Metadata = { title: "Obrazy na zamówienie" };

const SUBJECT = "Obraz na zamówienie";

export default async function CommissionsPage() {
  const page = await getServicePage("obrazy-na-zamowienie");
  if (!page) notFound();
  const [site, paintings, series] = await Promise.all([getSite(), getPaintings(), getSeries()]);
  const gallery = page.galleryPaintingIds.map((id) => paintings.find((p) => p.id === id)).filter((p) => !!p);
  const p = page.painting;
  const seriesName = series.find((s) => s.id === p?.seriesId)?.name.pl;

  return (
    <>
      <PageIntro
        title={page.title.pl}
        lead={page.lead.pl}
        media={p && (
          <figure className="intro-figure intro-portrait">
            <Art image={p.image} placeholder={p.placeholder} ratio={p.ratio} priority sizes="(min-width: 900px) 40vw, 100vw" />
            <figcaption className="soft"><strong>{p.title}</strong>{seriesName && `, z serii ${seriesName}`}</figcaption>
          </figure>
        )}
      >
        <p className="actions">
          <a className="btn" href={`mailto:${site.email}?subject=${encodeURIComponent(SUBJECT)}`}>Napisz w sprawie obrazu</a>
          {site.phone && <a className="text-link" href={`tel:${site.phone.replace(/\s/g, "")}`}>Zadzwoń: {site.phone}</a>}
        </p>
      </PageIntro>

      <section className="pt-about">
        <div className="wide pt-about-in">
          <div className="prose" data-reveal>
            <h2 className="h2">Co można zamówić</h2>
            {page.body.map((t, i) => <p key={i}>{t}</p>)}
            <div className="options">
              {page.options.map((o, i) => (
                <div key={i}>
                  <h3>{o.title.pl}</h3>
                  <p>{o.text.pl}</p>
                </div>
              ))}
            </div>
            <Link className="text-link" href="/portfolio">Zobacz portfolio</Link>
          </div>
          <aside className="needs" aria-labelledby="needs-h" data-reveal>
            <h2 id="needs-h" className="h2">{page.needs.title.pl}</h2>
            <ul>
              {page.needs.items.map((it, i) => <li key={i}>{it.pl}</li>)}
            </ul>
          </aside>
        </div>
      </section>

      <section className="steps" aria-labelledby="steps-h">
        <div className="wide">
          <h2 id="steps-h" className="h2" data-reveal>Jak powstaje obraz</h2>
          <ol className="steps-list" data-reveal>
            {page.steps.map((s, i) => (
              <li key={i}>
                <h3>{s.title.pl}</h3>
                <p>{s.text.pl}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="pt-gallery" aria-labelledby="gallery-h">
        <div className="wide">
          <h2 id="gallery-h" className="h2" data-reveal>{page.galleryTitle.pl}</h2>
          <PaintingGrid
            label={page.galleryTitle.pl}
            items={gallery.map((g) => ({ id: g.id, image: g.image, placeholder: g.placeholder, ratio: g.ratio, title: g.title, meta: paintingMeta(g) }))}
          />
        </div>
      </section>

      <ContactBand site={site} prompt={{
        sentence: { pl: "Obraz na zamówienie to dobry prezent i pamiątka na lata. Opowiedz, co ma się na nim znaleźć.", en: "" },
        question: { pl: "Chcesz zamówić obraz?", en: "" },
        subject: SUBJECT,
      }} />
    </>
  );
}
