import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPageHeader, getPaintings, getSite } from "@/content/data";
import PageIntro from "@/components/PageIntro";
import YearList from "@/components/YearList";
import ContactBand from "@/components/ContactBand";
import Quotes from "@/components/Quotes";
import Art from "@/components/Art";

export const metadata: Metadata = { title: "O Autorce" };

// Wystawy od tego roku widać od razu; starsze chowają się pod „Pokaż starsze”.
const RECENT_FROM = 2017;

export default async function AboutPage() {
  const header = await getPageHeader("o-autorce");
  if (!header) notFound();
  const [site, paintings] = await Promise.all([getSite(), getPaintings()]);
  const [education, painting, inspiration, exhibitionsBio] = site.bio;
  const chopin = paintings.find((p) => p.id === "chopin");
  const sails = paintings.find((p) => p.id === "zagle");
  const photos = site.exhibitionPhotos;
  const eventPhotos = [photos[7], photos[10]].filter((p) => !!p);
  const recent = site.exhibitions.filter((e) => e.year >= RECENT_FROM);
  const older = site.exhibitions.filter((e) => e.year < RECENT_FROM);
  const firstYear = Math.min(...site.exhibitions.map((e) => e.year));

  return (
    <>
      <PageIntro
        title="Vanessa Pol‑Zaborowska"
        lead={header.lead.pl}
        media={site.portrait && (
          <figure className="intro-figure intro-portrait">
            <Art image={site.portrait.image} placeholder={site.portrait.placeholder} ratio={site.portrait.ratio} priority sizes="(min-width: 900px) 40vw, 100vw" />
          </figure>
        )}
      >
        <p className="actions">
          <Link className="btn" href="/portfolio">Zobacz obrazy</Link>
          <Link className="text-link" href="/kontakt">Napisz wiadomość</Link>
        </p>
      </PageIntro>

      <section className="facts" aria-labelledby="facts-h">
        <div className="wide" data-reveal>
          <h2 id="facts-h" className="h2">W skrócie</h2>
          <dl className="facts-list">
            <div><dt>30+ lat</dt><dd>malowania i wystawiania prac</dd></div>
            <div><dt>Ponad 60</dt><dd>wystaw indywidualnych i zbiorowych</dd></div>
            <div><dt>II nagroda</dt><dd>w międzynarodowym konkursie Galerii Eclusier w Londynie</dd></div>
            <div><dt>Who is Who</dt><dd>sylwetka w XII i XIII wydaniu encyklopedii</dd></div>
          </dl>
        </div>
      </section>

      <section className="creation" aria-labelledby="creation-h">
        <div className="wide" data-reveal>
          <div className="creation-head">
            <h2 id="creation-h" className="h2">Twórczość</h2>
            <p className="creation-lead">
              Jej obrazy to autentyczne, wewnętrzne przeżycia, w których łączą się realizm i ekspresja.
              To prawda, naturalność oraz wyobraźnia.
            </p>
          </div>
          <div className="creation-cols">
            <div>
              <h3 className="creation-h3">Dorobek</h3>
              <p>
                Przez 31 lat stworzyła wiele obrazów, a jej dorobek szacuje się na około 700 prac.
                Tworzy też ilustracje, projekty okładek książek i płyt w technice akwareli oraz
                scenografie do przedstawień baletowych i teatralnych.
              </p>
            </div>
            <div>
              <h3 className="creation-h3">Wyobraźnia</h3>
              <p>
                Maluje z wewnętrznej potrzeby, kierując się instynktem i kreatywnością. To tak zwana
                twórcza wyobraźnia. Ma zdolność do zmiany emocji, a to sprawia, że w jej twórczości
                pojawia się różnorodna tematyka.
              </p>
            </div>
            <div>
              <h3 className="creation-h3">Słowo</h3>
              <p>
                Pisze i jednocześnie wyraża swoje podejście do przeżywania emocji, fantazji, filozofii
                i artyzmu. W 2023 roku nakładem Oficyny Wydawniczej STON2 ukazało się pierwsze wydanie
                tomiku prozy poetyckiej „Druga strona ciszy”.
              </p>
              <p className="soft creation-note">
                Druk i oprawa: <a href="https://www.kompus.net.pl" rel="noopener noreferrer">www.kompus.net.pl</a>.
                Projekt okładki i grafiki: Vanessa Pol‑Zaborowska.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bio">
        <div className="wide bio-in">
          <div className="prose" data-reveal>
            <h2 className="h2">Wykształcenie i praca</h2>
            <p>{education}</p>
            {site.work && site.work.length > 0 && (
              <>
                <p className="work-intro">Czym się zajmuje:</p>
                <ul className="work-list">
                  {site.work.map((w, i) => <li key={i}>{w}</li>)}
                </ul>
              </>
            )}
            <h2 className="h2">Jak maluje</h2>
            <p>{painting}</p>
            <h2 className="h2">Co ją inspiruje</h2>
            <p>{inspiration}</p>
          </div>
          {sails && (
            <figure className="side-art">
              <Art image={sails.image} placeholder={sails.placeholder} ratio={sails.ratio} sizes="(min-width: 900px) 40vw, 100vw" />
              <figcaption className="soft"><strong>{sails.title}</strong>, z serii Marynistyka</figcaption>
            </figure>
          )}
        </div>
      </section>

      {chopin && (
        <section className="prize">
          <div className="wide prize-in">
            <figure className="prize-art">
              <Art image={chopin.image} placeholder={chopin.placeholder} ratio={chopin.ratio} sizes="(min-width: 900px) 55vw, 100vw" />
            </figure>
            <div data-reveal>
              <h2 className="h2">Nagrodzony portret Chopina</h2>
              <p>{exhibitionsBio}</p>
              <Link className="text-link" href="/portfolio#portret">Zobacz portrety</Link>
            </div>
          </div>
        </section>
      )}

      {site.quotes && site.quotes.length > 0 && (
        <section className="quote" aria-label="Cytaty">
          <div className="wide" data-reveal>
            <Quotes items={site.quotes} />
          </div>
        </section>
      )}

      <section className="exh" aria-labelledby="exh-h">
        <div className="wide exh-in">
          <div data-reveal>
            <h2 id="exh-h" className="h2">Wybrane wystawy</h2>
            <p className="section-lead">Wystawy indywidualne i zbiorowe w całej Polsce. Obrazy są w kolekcjach prywatnych w Polsce i za granicą.</p>
            <YearList items={recent} />
            {older.length > 0 && (
              <details className="more">
                <summary>Pokaż starsze wystawy ({firstYear}–{RECENT_FROM - 1})</summary>
                <YearList items={older} />
              </details>
            )}
          </div>
          <div className="exh-photos">
            {eventPhotos.map((p) => (
              <figure key={p.id}>
                <Art image={p.image} placeholder={p.placeholder} ratio="4 / 3" sizes="(min-width: 900px) 40vw, 100vw" />
              </figure>
            ))}
            <p className="soft">Z wystaw i wydarzeń</p>
          </div>
        </div>
      </section>

      <ContactBand site={site} photo={photos[1]} prompt={{
        sentence: { pl: "Obraz z portfolio albo portret na zamówienie? Artystka chętnie opowie o swojej pracy.", en: "" },
        question: { pl: "Napisz wiadomość", en: "" },
        subject: "Pytanie o obraz",
      }} />
    </>
  );
}
