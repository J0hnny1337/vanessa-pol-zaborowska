// Warstwa danych: jedyne miejsce, w którym strona pyta panel (Payload) o treść.
// Wyniki są mapowane na typy z src/lib/types.ts, więc komponenty nie wiedzą, skąd dane pochodzą.
import { getPayload } from "payload";
import config from "@payload-config";
import type { Media, News } from "@/payload-types";
import { mediaSrc } from "@/lib/media";
import type { ContentPage, HomePage, Img, L10n, NavItem, NewsArticle, NewsItem, PageHeader, Painting, Photo, Series, ServicePage, SiteSettings } from "@/lib/types";

const db = () => getPayload({ config });
const t = (text: string): L10n => ({ pl: text, en: text });
const opt = (text?: string | null) => (text ? t(text) : undefined);

// ---- Zdjęcia ----
const GREYS = ["#d9d6d1", "#cfcdc8", "#d6d2cc", "#d4d0c8", "#cdcac4", "#d8d5d0", "#d1cec9"];
const grey = (i = 0) => GREYS[i % GREYS.length];

/** Relacja z panelu bywa samym id (gdy nie jest rozwinięta) albo dokumentem. */
const doc = <T extends object>(v: T | number | string | null | undefined): T | undefined =>
  v && typeof v === "object" ? v : undefined;

const mediaImg = (m?: Media): Img | undefined => {
  const src = m && mediaSrc(m);
  return src ? { src, alt: t(m.alt || "") } : undefined;
};

const ratioOf = (m?: Media) => (m?.width && m?.height ? `${m.width} / ${m.height}` : "4 / 3");

const toPhoto = (m: Media | number | string | null | undefined, i = 0): Photo | undefined => {
  const media = doc<Media>(m);
  return media ? { id: String(media.id), ratio: ratioOf(media), image: mediaImg(media), placeholder: grey(i) } : undefined;
};
const toPhotos = (rows?: { photo?: Media | number | string | null }[] | null): Photo[] =>
  (rows ?? []).map((r, i) => toPhoto(r.photo, i)).filter((p) => !!p);

// ---- Pobieranie ----
export async function getSeries(): Promise<Series[]> {
  const payload = await db();
  const { docs } = await payload.find({ collection: "series", limit: 100, sort: "_order", pagination: false });
  return docs.map((s, i) => ({ id: s.slug || String(s.id), name: t(s.name), years: s.years ?? "", order: i + 1 }));
}

export async function getPaintings(): Promise<Painting[]> {
  const payload = await db();
  const { docs } = await payload.find({
    collection: "paintings", limit: 1000, pagination: false, depth: 2, sort: "_order",
    where: { published: { not_equals: false } },
  });
  const counters: Record<string, number> = {};
  return docs.map((p, i) => {
    const media = doc<Media>(p.image);
    const series = doc<{ slug?: string | null; id: number | string }>(p.series);
    const seriesId = series ? series.slug || String(series.id) : undefined;
    counters[seriesId ?? ""] = (counters[seriesId ?? ""] ?? 0) + 1;
    return {
      id: String(p.id), title: p.title, seriesId,
      year: p.year ?? undefined, widthCm: p.widthCm ?? undefined, heightCm: p.heightCm ?? undefined,
      ratio: ratioOf(media), technique: opt(p.technique), status: p.status === "sold" ? "sold" : "available",
      image: mediaImg(media), placeholder: grey(i), order: counters[seriesId ?? ""],
    };
  });
}

export async function getSite(): Promise<SiteSettings> {
  const payload = await db();
  const [s, about, ex] = await Promise.all([
    payload.findGlobal({ slug: "site-settings", depth: 2 }),
    payload.findGlobal({ slug: "about", depth: 2 }),
    payload.find({ collection: "exhibitions", limit: 500, pagination: false, sort: "-year" }),
  ]);
  const pdf = doc<Media>(about.portfolioPdf);
  return {
    artistName: s.artistName,
    tagline: t(s.tagline),
    logo: mediaImg(doc<Media>(s.logo)),
    email: s.email,
    phone: s.phone ?? undefined,
    social: (s.social ?? []).map((x) => ({ label: x.label, url: x.url })),
    portfolioPdfUrl: pdf ? mediaSrc(pdf) : undefined,
    bio: about.bio,
    statement: about.statement ?? undefined,
    portrait: toPhoto(about.portrait),
    exhibitionPhotos: toPhotos(about.exhibitionPhotos),
    exhibitions: ex.docs.map((e) => ({ year: e.year, title: e.title, place: e.place ?? undefined })),
    collections: about.collections ? [about.collections] : [],
    footerNote: t(s.footerNote ?? ""),
    legalLinks: (s.legalLinks ?? []).map((l) => ({ label: t(l.label), href: l.href })),
    cta: { title: t(s.cta.title), buttonLabel: t(s.cta.buttonLabel), href: s.cta.href },
  };
}

export async function getHome(): Promise<HomePage> {
  const h = await (await db()).findGlobal({ slug: "home", depth: 0 });
  const hero = typeof h.heroPainting === "object" ? h.heroPainting?.id : h.heroPainting;
  const blocks: HomePage["blocks"] = [];
  if (hero != null) blocks.push({ type: "hero", paintingId: String(hero), quote: t(h.quote) });
  if (h.showNews !== false) blocks.push({ type: "news" });
  if (h.showAbout) blocks.push({ type: "bio" });
  if (h.showCta !== false) blocks.push({ type: "cta" });
  return { blocks };
}

// ---- Nagłówki stron ----
// Linia nad tytułem i tytuły zakładek są w kodzie (to adresy stron), podtytuł edytuje się w panelu.
const eyebrow = t("Vanessa Pol-Zaborowska · Malarstwo");
const headers: Record<string, { title: string; slug: "portfolio-page" | "about" | "news-page" | "talks" | "education" | "contact"; fallback: string }> = {
  portfolio: { title: "Portfolio", slug: "portfolio-page", fallback: "Wszystkie serie" },
  "o-autorce": { title: "O Autorce", slug: "about", fallback: "Bio · Wystawy · Kolekcje" },
  aktualnosci: { title: "Aktualności", slug: "news-page", fallback: "Wystawy · Wydarzenia · Nowe prace" },
  "spotkania-autorskie": { title: "Spotkania autorskie", slug: "talks", fallback: "Zaproszenia · Terminy" },
  edukacja: { title: "Edukacja", slug: "education", fallback: "Zajęcia · Przygotowanie do egzaminów · Konkursy" },
  kontakt: { title: "Kontakt", slug: "contact", fallback: "Napisz lub zadzwoń" },
};

export async function getPageHeader(slug: string): Promise<PageHeader | null> {
  const h = headers[slug];
  if (!h) return null;
  const g = await (await db()).findGlobal({ slug: h.slug, depth: 0 });
  const subtitle = "subtitle" in g && typeof g.subtitle === "string" && g.subtitle ? g.subtitle : h.fallback;
  return { eyebrow, title: t(h.title), subtitle: t(subtitle) };
}

export async function getContentPage(slug: string): Promise<ContentPage | null> {
  const payload = await db();
  switch (slug) {
    case "edukacja": {
      const g = await payload.findGlobal({ slug: "education", depth: 2 });
      return { body: g.body ?? undefined, photo: toPhoto(g.photo), invite: opt(g.invite) };
    }
    case "kontakt": {
      const g = await payload.findGlobal({ slug: "contact", depth: 2 });
      return { body: g.body ?? undefined, photo: toPhoto(g.photo) };
    }
    case "spotkania-autorskie": {
      const g = await payload.findGlobal({ slug: "talks", depth: 2 });
      return {
        body: g.body ?? undefined, photo: toPhoto(g.photo), listTitle: opt(g.listTitle), invite: opt(g.invite),
        items: (g.items ?? []).map((i) => ({ year: i.year, title: t(i.title), place: i.place ?? undefined })),
      };
    }
    case "aktualnosci": {
      const g = await payload.findGlobal({ slug: "news-page", depth: 2 });
      return { gallery: { title: t(g.galleryTitle || "Z wystaw i wydarzeń"), photos: toPhotos(g.gallery) } };
    }
    default:
      return null;
  }
}

export async function getServicePage(slug: string): Promise<ServicePage | null> {
  if (slug !== "portrety-energetyczne") return null;
  const g = await (await db()).findGlobal({ slug: "portraits", depth: 2 });
  return {
    slug, eyebrow,
    title: t(g.title), subtitle: t(g.subtitle ?? ""), lead: t(g.lead ?? ""), heading: t(g.heading || "Portrety"),
    photo: toPhoto(g.photo), body: g.body as ServicePage["body"],
    needs: { title: t(g.needsTitle ?? ""), items: (g.needs ?? []).map((n) => t(n.text)) },
    galleryTitle: t(g.galleryTitle || "Wybrane portrety"),
    galleryPaintingIds: (g.galleryPaintings ?? []).map((p) => String(typeof p === "object" ? p.id : p)),
  };
}

// ---- Artykuły (Aktualności) ----
const published = { _status: { equals: "published" } } as const;

const toNewsItem = (n: News, i = 0): NewsItem => ({
  slug: n.slug ?? String(n.id), title: n.title, date: n.date,
  place: n.place || undefined, excerpt: n.excerpt || undefined,
  cover: toPhoto(n.cover, i),
});

export async function getNewsList(): Promise<NewsItem[]> {
  const { docs } = await (await db()).find({ collection: "news", where: published, sort: "-date", limit: 200, pagination: false, depth: 1 });
  return docs.map((n, i) => toNewsItem(n, i));
}

export async function getNewsArticle(slug: string): Promise<NewsArticle | null> {
  const { docs } = await (await db()).find({ collection: "news", where: { and: [published, { slug: { equals: slug } }] }, limit: 1, depth: 2 });
  const n = docs[0];
  return n ? { ...toNewsItem(n), content: n.content } : null;
}

// ---- Menu ----
const navigation: NavItem[] = [
  { label: t("Portfolio"), href: "/portfolio" },
  { label: t("O Autorce"), href: "/o-autorce" },
  { label: t("Aktualności"), href: "/aktualnosci" },
  { label: t("Spotkania autorskie"), href: "/spotkania-autorskie" },
  { label: t("Edukacja"), href: "/edukacja" },
];

export async function getNavigation(): Promise<NavItem[]> {
  // Podmenu "Portfolio" budujemy z listy serii, żeby nowa seria sama pojawiła się w menu.
  const s = await getSeries();
  return navigation.map((item) =>
    item.href === "/portfolio"
      ? { ...item, children: s.map((x) => ({ label: x.name, href: `/portfolio/${x.id}`, note: x.years })) }
      : item,
  );
}
