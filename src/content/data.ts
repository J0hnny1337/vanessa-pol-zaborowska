// Warstwa danych: układa treść z source.ts w kształt, którego oczekują komponenty (src/lib/types.ts).
// Strona jest statyczna: treść jest w kodzie, zdjęcia w public/img.
// Wersja z panelem CMS (Payload) jest w gałęzi/znaczniku "payload-cms-v1".
import type { ContentPage, HomePage, Img, L10n, NavItem, NewsArticle, NewsItem, PageHeader, Painting, Photo, PortfolioSection, Series, ServicePage, SiteSettings } from "@/lib/types";
import * as src from "./source";

const t = (text: string): L10n => ({ pl: text, en: text });

/** Zdjęcie z public/img: nazwa pliku bez rozszerzenia (np. "Obrazy/Golf/20250507_065947.jpg" → /img/20250507_065947.webp). */
const imgOf = (source: string | undefined, alt: string): Img | undefined => {
  if (!source) return undefined;
  const stem = source.split("/").pop()!.replace(/\.[^.]+$/, "");
  return { src: `/img/${stem}.webp`, alt: t(alt) };
};

const altOf = (id: string) =>
  id.startsWith("wydarzenie") ? "Zdjęcie z wystawy lub wydarzenia"
    : id === "edukacja-2" ? "Zajęcia w pracowni plastycznej"
    : id.startsWith("edukacja") ? "Zajęcia plenerowe z rysunku nad marinę"
    : src.site.artistName;

const photoById = new Map<string, Photo>(
  src.photos.map((p) => [p.id, { id: p.id, ratio: p.ratio, placeholder: p.placeholder, image: imgOf(p.source, altOf(p.id)) }]),
);
const photo = (id?: string) => (id ? photoById.get(id) : undefined);
const photosOf = (ids: string[] = []) => ids.map((id) => photoById.get(id)).filter((p) => !!p);
const para = (items: L10n[] = []) => items.map((p) => p.pl);

// ---- Strona ----
const site: SiteSettings = {
  artistName: src.site.artistName,
  tagline: src.site.tagline,
  email: src.site.email,
  phone: src.site.phone,
  social: src.site.social,
  bio: para(src.site.bio),
  statement: para(src.site.statement),
  portrait: photo(src.site.portraitPhotoId),
  exhibitionPhotos: photosOf(src.site.exhibitionPhotoIds),
  exhibitions: src.site.exhibitions,
  collections: src.site.collections,
  footerNote: src.site.footerNote,
  legalLinks: src.site.legalLinks,
  cta: src.site.cta,
};
export async function getSite() { return site; }

// ---- Obrazy i serie ----
export async function getSeries(): Promise<Series[]> {
  return [...src.series].sort((a, b) => a.order - b.order);
}

const paintings: Painting[] = src.paintings.map((p) => ({
  id: p.id, title: p.title, seriesId: p.seriesId, year: p.year, widthCm: p.widthCm, heightCm: p.heightCm,
  ratio: p.ratio, technique: p.technique, status: p.status, order: p.order, placeholder: p.placeholder,
  image: imgOf(p.source, p.title || "Obraz"),
}));
export async function getPaintings() { return paintings; }

// ---- Portfolio: jedna strona z sekcjami ----
const portfolioSections: PortfolioSection[] = [
  { id: "obrazy", title: t("Obrazy"), kind: "paintings" },
  { id: "fotografie", title: t("Fotografie"), kind: "photos", placeholder: t("Tu pojawią się fotografie.") },
  { id: "wiersze", title: t("Wiersze"), kind: "text", placeholder: t("Tu pojawią się wiersze.") },
  { id: "poezja", title: t("Poezja"), kind: "text", placeholder: t("Tu pojawi się poezja.") },
];
export async function getPortfolioSections() { return portfolioSections; }

// ---- Artykuły (Aktualności) ----
const slugify = (s: string) =>
  s.toLowerCase().replace(/ł/g, "l").normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const articles: NewsArticle[] = (src.contentPages.aktualnosci.items ?? [])
  .map((n) => ({
    slug: slugify(n.title.pl), title: n.title.pl, date: `${n.year}-06-01`, place: n.place,
    excerpt: n.text?.pl, content: n.text ? [n.text.pl] : [],
  }))
  .sort((a, b) => b.date.localeCompare(a.date));

export async function getNewsList(): Promise<NewsItem[]> { return articles; }
export async function getNewsArticle(slug: string): Promise<NewsArticle | null> {
  return articles.find((a) => a.slug === slug) ?? null;
}

// ---- Strona główna ----
export async function getHome(): Promise<HomePage> {
  const hero = src.home.blocks.find((b) => b.type === "hero");
  return {
    blocks: [
      ...(hero ? [hero] : []),
      ...(articles.length ? [{ type: "news" as const }] : []),
      { type: "cta" as const },
    ],
  };
}

// ---- Nagłówki i treść podstron ----
export async function getPageHeader(slug: string): Promise<PageHeader | null> {
  return src.pageHeaders[slug] ?? null;
}

export async function getContentPage(slug: string): Promise<ContentPage | null> {
  const page = src.contentPages[slug];
  if (!page) return null;
  const gallery = page.gallery && { title: page.gallery.title, photos: photosOf(page.gallery.photoIds) };
  return {
    body: para(page.body), listTitle: page.listTitle, invite: page.invite, photo: photo(page.photoId), gallery,
    // Aktualności pokazują artykuły (karty), nie prostą listę z datami.
    items: slug === "aktualnosci" ? undefined : page.items?.map((i) => ({ year: i.year, title: i.title, place: i.place, text: i.text })),
  };
}

export async function getServicePage(slug: string): Promise<ServicePage | null> {
  const p = src.portraitsPage;
  if (slug !== p.slug) return null;
  return { ...p, photo: photo(p.photoId), body: para(p.body) };
}

// ---- Menu ----
export async function getNavigation(): Promise<NavItem[]> {
  // Podmenu "Portfolio" = sekcje tej strony; kliknięcie przewija do sekcji (np. /portfolio#poezja).
  return src.navigation.map((item) =>
    item.href === "/portfolio"
      ? { ...item, children: portfolioSections.map((s) => ({ label: s.title, href: `/portfolio#${s.id}` })) }
      : item,
  );
}
