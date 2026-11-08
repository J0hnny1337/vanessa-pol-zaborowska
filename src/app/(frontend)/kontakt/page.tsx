import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContentPage, getPageHeader, getPaintings, getSite } from "@/content/data";
import PageIntro from "@/components/PageIntro";
import Art from "@/components/Art";
import InquiryForm from "@/components/InquiryForm";

export const metadata: Metadata = { title: "Kontakt" };

// Sprawy, w których można napisać; każda przewija do formularza z wybraną sprawą. `pic` = id obrazu albo zdjęcia obok.
const TOPICS = [
  { title: "Kupno obrazu", text: "Zapytaj o dostępność, wymiary i cenę obrazu z portfolio.", subject: "Kupno obrazu", pic: "italia" },
  { title: "Obraz na zamówienie", text: "Opisz swój pomysł albo wskaż obraz z portfolio, który chcesz mieć w nowej wersji.", subject: "Obraz na zamówienie", pic: "lilie-wodne" },
  { title: "Spotkanie autorskie", text: "Zaproś artystkę do swojej galerii, biblioteki, szkoły lub klubu.", subject: "Spotkanie autorskie", pic: "wydarzenie-8" },
  { title: "Zajęcia z rysunku i malarstwa", text: "Lekcje indywidualne, grupowe i przygotowanie do egzaminów.", subject: "Zajęcia z rysunku i malarstwa", pic: "edukacja-1" },
  { title: "Wystawa", text: "Chcesz pokazać obrazy Vanessy w swojej galerii, hotelu lub klubie?", subject: "Wystawa obrazów", pic: "wydarzenie-11" },
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
          <li><span className="soft">E-mail</span><a href={`mailto:${site.email}`}>Kontakt mailowy</a></li>
          <li><span className="soft">Formularz</span><a href="#formularz">Zapytaj o obraz</a></li>
        </ul>
      </PageIntro>

      <section className="topics" aria-labelledby="ct-topics-h">
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
                <a className="text-link" href={`?temat=${encodeURIComponent(t.subject)}#formularz`}>Napisz w tej sprawie</a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="formularz" className="inquiry-sec" aria-labelledby="ct-form-h">
        <div className="wide inquiry-in">
          <div>
            <h2 id="ct-form-h" className="h2" data-reveal>Zapytaj o obraz</h2>
            <p className="soft">Napisz, o który obraz chodzi albo opisz swój pomysł. Wiadomość trafi prosto do artystki.</p>
          </div>
          <InquiryForm subjects={TOPICS.map((t) => t.subject)} email={site.email} />
        </div>
      </section>
    </>
  );
}
