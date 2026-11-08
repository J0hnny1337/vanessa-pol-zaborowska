import type { ContactPrompt, Photo, SiteSettings } from "@/lib/types";
import Art from "./Art";
import { inquiryHref } from "@/lib/inquiry";

const fallback: ContactPrompt = {
  sentence: { pl: "Chcesz kupić obraz, zamówić obraz według własnego pomysłu albo zaprosić artystkę na spotkanie? Napisz wiadomość.", en: "" },
  question: { pl: "Masz pytanie?", en: "Any questions?" },
  subject: "Pytanie o obraz",
};

/** Zamknięcie podstrony: jedno zdanie, małe zdjęcie i link do formularza z gotowym tematem. */
export default function ContactBand({ site, prompt = fallback, photo }: { site: SiteSettings; prompt?: ContactPrompt; photo?: Photo }) {
  const pic = photo ?? site.portrait;
  return (
    <section className="contact-band" aria-labelledby="contact-band-h">
      <div className="wide contact-band-in" data-reveal>
        <p className="contact-sentence">{prompt.sentence.pl}</p>
        {pic && (
          <figure className="contact-photo">
            <Art image={pic.image} placeholder={pic.placeholder} ratio="1 / 1" sizes="170px" />
          </figure>
        )}
        <div className="contact-links">
          <h2 id="contact-band-h">{prompt.question.pl}</h2>
          <ul>
            {site.phone && <li><a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a></li>}
            <li><a href={inquiryHref(prompt.subject)}>Napisz wiadomość</a></li>
          </ul>
          <p className="soft">Na każdą wiadomość dostaniesz odpowiedź.</p>
        </div>
      </div>
    </section>
  );
}
