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

/** Nagłówek podstrony (zakładki): ten sam układ na każdej podstronie. */
export type PageHeader = { eyebrow: L10n; title: L10n; subtitle: L10n };

/** Pozycja menu. Każda zakładka = osobna podstrona (własny adres URL). */
export type NavItem = { label: L10n; href: string; children?: { label: L10n; href: string; note?: string }[] };

/** Strona główna: lista sekcji pokazywanych po kolei. */
export type HomeBlock =
  | { type: "hero"; paintingId?: string; quote: L10n } // bez obrazu: pole z napisem "do uzupełnienia"
  | { type: "series"; seriesId: string }
  | { type: "news" }
  | { type: "bio" }
  | { type: "cta" };

export type HomePage = { blocks: HomeBlock[] };

/** Podstrona z opisem usługi (np. "Portrety na zamówienie"). */
export type ServicePage = {
  slug: string;
  eyebrow: L10n;
  title: L10n;
  subtitle: L10n;
  lead: L10n;
  heading: L10n;
  photo?: Photo;
  body: Rich;
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
  invite?: L10n; // zaproszenie do kontaktu na końcu tekstu
  photo?: Photo; // zdjęcie obok tekstu
  gallery?: { title: L10n; photos: Photo[] };
};
