# Szablon strony malarki (Next.js + TypeScript)

Odtworzony wygląd i struktura (bez sklepu): nagłówek z menu serii i przyciskiem Kontakt,
strona główna z blokami, podstrona usługi (Portrety energetyczne) z pasem cytatu,
opisem, ramką "czego potrzebuję", karuzelą, pasem CTA i stopką.
Treść jest dwujęzyczna na jednej stronie: PL, a pod spodem EN kursywą (jak w oryginale).

## Uruchomienie
    npm install
    npm run dev        # http://localhost:3000
    npm run build

## Gdzie co jest
- `src/lib/types.ts`    model danych = przyszłe kolekcje CMS (Painting, Series, SiteSettings, HomePage, ServicePage)
- `src/content/data.ts` treść zastępcza + funkcje `get*()` — jedyne miejsce do podmiany na CMS
- `src/components/`     komponenty bez treści, dostają dane przez propsy
- `src/app/globals.css` tokeny wyglądu na górze (font Jost, kolory, szerokości)
- Strona główna to lista bloków (`HomePage.blocks`): hero, serie, bio, cta.

## Czego nie ma / do ustalenia
- strona główna jest zbudowana z opisu tekstowego, bez zrzutu oryginału
- logo graficzne (pole `logo` w SiteSettings), podstrony Kontakt i O mnie, baner cookies
