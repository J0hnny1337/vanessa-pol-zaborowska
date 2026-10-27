import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContentPage, getPageHeader, getPaintings, getSite } from "@/content/data";
import PageIntro from "@/components/PageIntro";
import Art from "@/components/Art";

export const metadata: Metadata = { title: "Kontakt" };

// Sprawy, w których można napisać; każda otwiera e-mail z gotowym tematem. `pic` = id obrazu albo zdjęcia obok.
const TOPICS = [
  { title: "Kupno obrazu", text: "Zapytaj o dostępność, wymiary i cenę obrazu z portfolio.", subject: "Kupno obrazu", pic: "italia" },
  { title: "Portret na zamówienie", text: "Opowiedz, kogo mam namalować i na jaką okazję.", subject: "Portret na zamówienie", pic: "chopin-2" },
  { title: "Spotkanie autorskie", text: "Zaproś mnie do galerii, biblioteki, szkoły lub klubu.", subject: "Spotkanie autorskie", pic: "wydarzenie-8" },
  { title: "Zajęcia z rysunku i malarstwa", text: "Lekcje indywidualne, grupowe i przygotowanie do egzaminów.", subject: "Zajęcia z rysunku i malarstwa", pic: "edukacja-1" },
  { title: "Wystawa", text: "Chcesz pokazać moje obrazy w swojej galerii, hotelu lub klubie?", subject: "Wystawa obrazów", pic: "wydarzenie-11" },
];

export default async function ContactPage() {
  const [header, page, site, paintings, edu] = await Promise.all([getPageHeader("kontakt"), getContentPage("kontakt"), getSite(), getPaintings(), getContentPage("edukacja")]);
  if (!header || !page) notFound();
  const photo = page.photo;
  const pics = [...paintings, ...site.exhibitionPhotos, ...(edu?.gallery?.photos ?? [])];
  const picOf = (id: string) => pics.find((p) => p.id === id);

  return (
    <>
      <PageIntro
        title={header.title.pl}
        lead={header.lead.pl}
        media={photo && (
          <figure className="intro-figure intro-portrait">
            <Art image={photo.image} placeholder={photo.placeholder} ratio={photo.ratio} priority sizes="(min-width: 900px) 40vw, 100vw" />
          </figure>
        )}
      >
        <ul className="contact-big">
          {site.phone && <li><span className="soft">Telefon</span><a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a></li>}
          <li><span className="soft">E-mail</span><a href={`mailto:${site.email}`}>{site.email}</a></li>
        </ul>
      </PageIntro>

      <section className="topics last" aria-labelledby="ct-topics-h">
        <div className="wide">
          <h2 id="ct-topics-h" className="h2" data-reveal>W jakiej sprawie?</h2>
          <ul className="topic-list with-pics" data-reveal>
            {TOPICS.map((t) => (
              <li key={t.subject}>
                {(() => { const pic = picOf(t.pic); return pic && (
                  <span className="topic-thumb"><Art image={pic.image} placeholder={pic.placeholder} ratio="1 / 1" sizes="110px" /></span>
                ); })()}
                <h3>{t.title}</h3>
                <p>{t.text}</p>
                <a className="text-link" href={`mailto:${site.email}?subject=${encodeURIComponent(t.subject)}`}>Napisz w tej sprawie</a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
