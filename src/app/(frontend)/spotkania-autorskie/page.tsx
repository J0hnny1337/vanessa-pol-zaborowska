import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContentPage, getPageHeader, getSite } from "@/content/data";
import PageIntro from "@/components/PageIntro";
import YearList from "@/components/YearList";
import PaintingGrid from "@/components/PaintingGrid";
import ContactBand from "@/components/ContactBand";
import Art from "@/components/Art";

export const metadata: Metadata = { title: "Spotkania autorskie" };

export default async function ArtistTalksPage() {
  const [header, page, site] = await Promise.all([getPageHeader("spotkania-autorskie"), getContentPage("spotkania-autorskie"), getSite()]);
  if (!header || !page) notFound();
  const photo = page.photo;
  const more = site.exhibitionPhotos.filter((p) => p.id !== photo?.id).slice(2, 8);

  return (
    <>
      <PageIntro
        title={header.title.pl}
        lead={header.lead.pl}
        media={photo && (
          <figure className="intro-figure">
            <Art image={photo.image} placeholder={photo.placeholder} ratio={photo.ratio} priority sizes="(min-width: 900px) 45vw, 100vw" />
          </figure>
        )}
      />

      <section className="talks">
        <div className="wide talks-in">
          <div className="prose" data-reveal>
            <h2 className="h2">Obrazy i poezja</h2>
            {page.body?.map((p, i) => <p key={i}>{p}</p>)}
          </div>
          {page.items && page.items.length > 0 && (
            <div data-reveal>
              <h2 className="h2">{page.listTitle?.pl ?? "Dotychczasowe spotkania"}</h2>
              <YearList items={page.items.map((i) => ({ year: i.year, title: i.title.pl, place: i.place, text: i.text?.pl }))} />
            </div>
          )}
        </div>
      </section>

      {more.length > 0 && (
        <section className="photo-sec" aria-labelledby="talk-photos-h">
          <div className="wide">
            <h2 id="talk-photos-h" className="h2" data-reveal>Ze spotkań i wystaw</h2>
            <PaintingGrid label="Ze spotkań i wystaw" items={more.map((p) => ({ id: p.id, image: p.image, placeholder: p.placeholder, ratio: "4 / 3" }))} />
          </div>
        </section>
      )}

      <ContactBand site={site} prompt={page.contact} photo={site.exhibitionPhotos[1]} />
    </>
  );
}
