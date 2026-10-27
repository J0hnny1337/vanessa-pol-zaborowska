import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContentPage, getPageHeader, getSite } from "@/content/data";
import PageIntro from "@/components/PageIntro";
import PaintingGrid from "@/components/PaintingGrid";
import ContactBand from "@/components/ContactBand";
import Art from "@/components/Art";

export const metadata: Metadata = { title: "Edukacja" };

export default async function EducationPage() {
  const [header, page, site] = await Promise.all([getPageHeader("edukacja"), getContentPage("edukacja"), getSite()]);
  if (!header || !page) notFound();
  const photo = page.photo;
  const gallery = page.gallery?.photos ?? [];

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
      >
        <p className="actions">
          <a className="btn" href={`mailto:${site.email}?subject=${encodeURIComponent(page.contact?.subject ?? "Zajęcia")}`}>Umów lekcje</a>
          {site.phone && <a className="text-link" href={`tel:${site.phone.replace(/\s/g, "")}`}>Zadzwoń: {site.phone}</a>}
        </p>
      </PageIntro>

      {page.topics && (
        <section className="topics" aria-labelledby="topics-h">
          <div className="wide">
            <h2 id="topics-h" className="h2" data-reveal>Czym się zajmuję</h2>
            <ul className="topic-list" data-reveal>
              {page.topics.map((t, i) => (
                <li key={i}>
                  <h3>{t.title.pl}</h3>
                  <p>{t.text.pl}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {gallery.length > 0 && (
        <section className="photo-sec" aria-labelledby="edu-photos-h">
          <div className="wide">
            <h2 id="edu-photos-h" className="h2" data-reveal>{page.gallery!.title.pl}</h2>
            <PaintingGrid label={page.gallery!.title.pl} items={gallery.map((p) => ({ id: p.id, image: p.image, placeholder: p.placeholder, ratio: p.ratio }))} />
          </div>
        </section>
      )}

      <ContactBand site={site} prompt={page.contact} photo={gallery[1]} />
    </>
  );
}
