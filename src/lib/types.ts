// Kształt danych, który dostają komponenty strony (src/content/data.ts).
/** Tekst jako lista akapitów. */
export type Rich = string[];

/** Pole z dwiema wersjami językowymi (strona pokazuje na razie tylko PL). */
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
  order: number;
};

/** Zdjęcie, które nie jest obrazem: artystka, wystawy, wydarzenia. */
export type Photo = { id: string; ratio: string; image?: Img; placeholder: string };

export type Exhibition = { year: number; title: string; place?: string };

export type SiteSettings = {
  artistName: string;
  tagline: L10n; // np. "Malarstwo · Portrety energetyczne"
  logo?: Img; // logo graficzne (podpis); bez niego pokazuje się nazwa tekstem
  email: string;
  phone?: string;
  social: { label: string; url: string }[];
  portfolioPdfUrl?: string;
  bio: Rich;
  statement?: Rich; // credo artystki, pokazywane pod bio jako cytat
  portrait?: Photo; // zdjęcie artystki w sekcji bio
  exhibitionPhotos: Photo[]; // karuzela obok listy wystaw
  exhibitions: Exhibition[];
  collections: string[];
  footerNote: L10n;
  legalLinks: { label: L10n; href: string }[];
  cta: { title: L10n; buttonLabel: L10n; href: string };
};

/** Sekcja jednostronicowego Portfolio; pozycje podmenu przewijają do sekcji o tym id. */
export type PortfolioSection = { id: string; title: L10n; kind: "paintings" | "photos" | "text"; placeholder?: L10n };

/** Nagłówek podstrony: tytuł i jedno zdanie, co tu jest. */
export type PageHeader = { title: L10n; lead: L10n };

/** Pozycja menu. Każda zakładka = osobna podstrona (własny adres URL). */
export type NavItem = { label: L10n; href: string; children?: { label: L10n; href: string; note?: string }[] };

/** Jedna z rzeczy, które można u artystki zamówić lub z nią zrobić. */
export type Offer = { title: L10n; text: L10n; href: string; linkLabel: L10n };

/** Strona główna: zdanie pod imieniem, obrazy na „sztaludze”, list od artystki, oferta. */
export type HomePage = { lead: L10n; stagePaintings: Painting[]; letter: Rich; offers: Offer[] };

/** Zaproszenie do kontaktu na końcu podstrony; temat trafia do wiadomości e-mail. */
export type ContactPrompt = { sentence: L10n; question: L10n; subject: string };

/** Podstrona z opisem usługi (Portrety na zamówienie). */
export type ServicePage = {
  slug: string;
  title: L10n;
  lead: L10n;
  painting?: Painting;
  body: Rich;
  steps: { title: L10n; text: L10n }[];
  needs: { title: L10n; items: L10n[] };
  galleryTitle: L10n;
  galleryPaintingIds: string[];
};

/** Artykuł w Aktualnościach: karta na liście i osobna strona. */
export type NewsItem = { slug: string; title: string; date: string; place?: string; excerpt?: string; cover?: Photo };
export type NewsArticle = NewsItem & { content: Rich };

/** Wpis na liście z datą: wydarzenie, spotkanie, aktualność. */
export type DatedItem = { year: number; title: L10n; place?: string; text?: L10n };

/** Prosta podstrona z tekstem (Edukacja, Spotkania autorskie, Aktualności, Kontakt). */
export type ContentPage = {
  body?: Rich;
  listTitle?: L10n;
  items?: DatedItem[];
  topics?: { title: L10n; text: L10n }[]; // tematy z nagłówkami (Edukacja)
  contact?: ContactPrompt;
  photo?: Photo; // zdjęcie obok tytułu
  gallery?: { title: L10n; photos: Photo[] };
};
