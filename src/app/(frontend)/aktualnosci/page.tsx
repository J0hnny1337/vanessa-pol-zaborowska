import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContentPage, getNewsList, getPageHeader, getSite } from "@/content/data";
import PageIntro from "@/components/PageIntro";
import NewsList from "@/components/NewsList";
import PaintingGrid from "@/components/PaintingGrid";
import ContactBand from "@/components/ContactBand";
import Art from "@/components/Art";

export const metadata: Metadata = { title: "Aktualności" };

export default async function NewsPage() {
  const [header, page, site, news] = await Promise.all([getPageHeader("aktualnosci"), getContentPage("aktualnosci"), getSite(), getNewsList()]);
  if (!header || !page) notFound();
  const photos = page.gallery?.photos ?? [];
  const cover = photos[10] ?? photos[0];

  return (
    <>
      <PageIntro
        title={header.title.pl}
        lead={header.lead.pl}
        media={cover && (
          <figure className="intro-figure">
            <Art image={cover.image} placeholder={cover.placeholder} ratio={cover.ratio} priority sizes="(min-width: 900px) 45vw, 100vw" />
          </figure>
        )}
      />

      {page.upcoming && page.upcoming.items.length > 0 && (
        <section className="news-sec" aria-labelledby="upcoming-h">
          <div className="wide" data-reveal>
            <h2 id="upcoming-h" className="h2">{page.upcoming.title.pl}</h2>
            <ol className="news">
              {page.upcoming.items.map((e, i) => (
                <li key={i}>
                  <span className="year">{e.year}</span>
                  <article>
                    <h3>{e.title.pl}</h3>
                    {e.place && <p className="soft">{e.place}</p>}
                    {e.text && <p>{e.text.pl}</p>}
                  </article>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      <section className="news-sec" aria-labelledby="news-h">
        <div className="wide" data-reveal>
          <h2 id="news-h" className="h2">Najnowsze</h2>
          <NewsList items={news} />
        </div>
      </section>

      {photos.length > 0 && (
        <section className="photo-sec" aria-labelledby="photos-h">
          <div className="wide">
            <h2 id="photos-h" className="h2" data-reveal>{page.gallery!.title.pl}</h2>
            <PaintingGrid label={page.gallery!.title.pl} visible={6} items={photos.map((p) => ({ id: p.id, image: p.image, placeholder: p.placeholder, ratio: "4 / 3" }))} />
          </div>
        </section>
      )}

      <ContactBand site={site} photo={photos[1]} prompt={{
        sentence: { pl: "Organizujesz wystawę albo chcesz pokazać obrazy Vanessy w swojej galerii lub klubie?", en: "" },
        question: { pl: "Napisz wiadomość", en: "" },
        subject: "Wystawa obrazów",
      }} />
    </>
  );
}
