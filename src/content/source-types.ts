// Model danych zaprojektowany pod przyszły CMS (Payload / Sanity).
// Każdy typ = jedna kolekcja lub jeden dokument w panelu.
// Strona jest dwujęzyczna na jednej podstronie: PL, a pod spodem EN (kursywą).

/** Pole tłumaczalne: w CMS to jedno pole z dwiema wersjami językowymi. */
export type L10n = { pl: string; en: string };

export type Img = { src: string; alt: L10n };

export type Series = { id: string; name: L10n; years: string; order: number };

export type Painting = {
  id: string;
  title: string;
  seriesId?: string;
  year?: number;
  widthCm?: number;
  heightCm?: number;
  ratio: string; // proporcje zdjęcia, np. "4 / 3"
  technique?: L10n;
  status: "available" | "sold";
  image?: Img;
  placeholder: string; // kolor zastępczy, dopóki nie ma zdjęcia
  source?: string; // plik w folderze "zdjęcia-malarka", który trafi w to miejsce
  order: number;
};

/** Zdjęcie, które nie jest obrazem: artystka, wystawy, wydarzenia. */
export type Photo = { id: string; ratio: string; image?: Img; placeholder: string; source?: string };

export type Exhibition = { year: number; title: string; place?: string };

export type SiteSettings = {
  artistName: string;
  tagline: L10n; // np. "Malarstwo · Portrety energetyczne"
  logo?: Img; // logo graficzne (podpis); bez niego pokazuje się nazwa tekstem
  portraitPhotoId?: string; // zdjęcie artystki w sekcji bio
  exhibitionPhotoIds?: string[]; // karuzela obok listy wystaw
  email: string;
  phone?: string;
  social: { label: string; url: string }[];
  portfolioPdfUrl?: string;
  bio: L10n[];
  statement?: L10n[]; // credo artystki, pokazywane pod bio jako cytat
  exhibitions: Exhibition[];
  collections: string[];
  footerNote: L10n;
  legalLinks: { label: L10n; href: string }[];
  cta: { title: L10n; buttonLabel: L10n; href: string };
};

/** Nagłówek podstrony: tytuł i jedno zdanie, co tu jest. */
export type PageHeader = { title: L10n; lead: L10n };

/** Pozycja menu. Każda zakładka = osobna podstrona (własny adres URL). */
export type NavItem = { label: L10n; href: string; children?: { label: L10n; href: string; note?: string }[] };

/** Jedna z rzeczy, które można u artystki zamówić lub z nią zrobić. */
export type Offer = { title: L10n; text: L10n; href: string; linkLabel: L10n };

/** Strona główna: zdanie pod imieniem, obrazy na „sztaludze”, list od artystki, oferta. */
export type HomePage = {
  lead: L10n;
  stagePaintingIds: string[]; // obrazy, które zmieniają się na sztaludze, zanim ktoś wybierze serię
  letter: L10n[];
  offers: Offer[];
};

/** Zaproszenie do kontaktu na końcu podstrony; temat trafia do wiadomości e-mail. */
export type ContactPrompt = { sentence: L10n; question: L10n; subject: string };

/** Podstrona z opisem usługi (Portrety na zamówienie). */
export type ServicePage = {
  slug: string;
  title: L10n;
  lead: L10n;
  paintingId?: string; // obraz obok tytułu
  body: L10n[];
  steps: { title: L10n; text: L10n }[];
  needs: { title: L10n; items: L10n[] };
  galleryTitle: L10n;
  galleryPaintingIds: string[];
};

/** Wpis na liście z datą: wydarzenie, spotkanie, aktualność. */
export type DatedItem = { year: number; title: L10n; place?: string; text?: L10n };

/** Prosta podstrona z tekstem (Edukacja, Spotkania autorskie, Aktualności, Kontakt). */
export type ContentPage = {
  body: L10n[];
  listTitle?: L10n;
  items?: DatedItem[];
  topics?: { title: L10n; text: L10n }[]; // tematy z nagłówkami (Edukacja)
  contact?: ContactPrompt;
  photoId?: string; // zdjęcie obok tytułu
  gallery?: { title: L10n; photoIds: string[] };
};
