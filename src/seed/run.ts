// Wgrywa do panelu obecną treść strony (src/seed/content.ts) i zdjęcia z folderu "zdjęcia-malarka".
// Uruchomienie: npm run seed (tylko na pustym panelu; konto użytkownika zakłada się w /admin).
import path from "node:path";
import { getPayload } from "payload";
import config from "@payload-config";
import { contentPages, home, paintings, photos, pageHeaders, portraitsPage, series, site } from "./content";
import type { L10n } from "./content-types";

const SRC = path.resolve(process.cwd(), "../zdjęcia-malarka");

/** Akapity tekstu → stan edytora Lexical. */
const lexical = (paragraphs: string[]) => ({
  root: {
    type: "root", format: "" as const, indent: 0, version: 1, direction: "ltr" as const,
    children: paragraphs.map((text) => ({
      type: "paragraph", format: "" as const, indent: 0, version: 1, direction: "ltr" as const, textFormat: 0,
      children: [{ type: "text", text, format: 0, detail: 0, mode: "normal", style: "", version: 1 }],
    })),
  },
});
const rich = (items: L10n[]) => lexical(items.map((p) => p.pl));

const payload = await getPayload({ config });

if ((await payload.count({ collection: "paintings" })).totalDocs > 0) {
  console.error("Panel nie jest pusty (są już obrazy). Seed przerwany, żeby nic nie nadpisać.");
  process.exit(1);
}

// ---- Zdjęcia: każdy plik wgrywamy raz ----
const mediaIds = new Map<string, number>(); // source → id
const upload = async (source: string, alt: string, kind: "painting" | "artist" | "event") => {
  if (mediaIds.has(source)) return mediaIds.get(source)!;
  const doc = await payload.create({ collection: "media", data: { alt, kind }, filePath: path.join(SRC, source) });
  mediaIds.set(source, doc.id as number);
  console.log(`  zdjęcie ${mediaIds.size}: ${source}`);
  return doc.id as number;
};

console.log("Serie…");
const seriesIds = new Map<string, number>();
for (const s of series) {
  const doc = await payload.create({ collection: "series", data: { name: s.name.pl, years: s.years || undefined, slug: s.id } });
  seriesIds.set(s.id, doc.id as number);
}

console.log("Obrazy…");
const paintingIds = new Map<string, number>();
for (const p of paintings) {
  const image = await upload(p.source!, p.title === "Bez tytułu" ? "Obraz" : p.title, "painting");
  const doc = await payload.create({
    collection: "paintings",
    data: { title: p.title, image, series: seriesIds.get(p.seriesId!), status: p.status, published: true },
  });
  paintingIds.set(p.id, doc.id as number);
}

console.log("Zdjęcia artystki i wydarzeń…");
const photoId = new Map<string, number>();
for (const ph of photos) {
  const isEvent = ph.id.startsWith("wydarzenie");
  photoId.set(ph.id, await upload(ph.source!, isEvent ? "Zdjęcie z wystawy lub wydarzenia" : "Vanessa Pol-Zaborowska", isEvent ? "event" : "artist"));
}
const eventPhotos = photos.filter((p) => p.id.startsWith("wydarzenie")).map((p) => ({ photo: photoId.get(p.id)! }));

console.log("Wystawy i aktualności…");
for (const e of [...site.exhibitions].reverse()) await payload.create({ collection: "exhibitions", data: e });
for (const n of [...contentPages.aktualnosci.items!].reverse()) {
  await payload.create({
    collection: "news",
    data: { title: n.title.pl, date: `${n.year}-06-01T12:00:00.000Z`, place: n.place, excerpt: n.text?.pl, content: lexical([n.text?.pl ?? n.title.pl]), _status: "published" },
  });
}

console.log("Strony…");
const hero = home.blocks.find((b) => b.type === "hero");
const heroQuote = hero && hero.type === "hero" ? hero.quote.pl : "";
const sub = (slug: string) => pageHeaders[slug].subtitle.pl;
await payload.updateGlobal({
  slug: "site-settings",
  data: {
    artistName: site.artistName, tagline: site.tagline.pl, email: site.email, phone: site.phone,
    social: site.social.map((s) => ({ label: s.label as "Instagram" | "Facebook", url: s.url })),
    footerNote: site.footerNote.pl,
    cta: { title: site.cta.title.pl, buttonLabel: site.cta.buttonLabel.pl, href: site.cta.href },
    legalLinks: site.legalLinks.map((l) => ({ label: l.label.pl, href: l.href })),
  },
});
await payload.updateGlobal({
  slug: "home",
  data: { heroPainting: paintingIds.get("zagle")!, quote: heroQuote, showAbout: false, showCta: true },
});
await payload.updateGlobal({ slug: "portfolio-page", data: { subtitle: sub("portfolio") } });
await payload.updateGlobal({
  slug: "about",
  data: {
    subtitle: sub("o-autorce"), portrait: photoId.get("sesja-4"), bio: rich(site.bio), statement: rich(site.statement ?? []),
    exhibitionPhotos: eventPhotos, collections: site.collections.join(" · "),
  },
});
await payload.updateGlobal({ slug: "news-page", data: { subtitle: sub("aktualnosci"), galleryTitle: contentPages.aktualnosci.gallery!.title.pl, gallery: eventPhotos } });
const talks = contentPages["spotkania-autorskie"];
await payload.updateGlobal({
  slug: "talks",
  data: {
    subtitle: sub("spotkania-autorskie"), photo: photoId.get("sesja-7"), body: rich(talks.body), listTitle: talks.listTitle!.pl,
    items: talks.items!.map((i) => ({ year: i.year, title: i.title.pl, place: i.place })), invite: talks.invite!.pl,
  },
});
await payload.updateGlobal({ slug: "education", data: { subtitle: sub("edukacja"), photo: photoId.get("sesja-2"), body: rich(contentPages.edukacja.body), invite: contentPages.edukacja.invite!.pl } });
await payload.updateGlobal({ slug: "contact", data: { subtitle: sub("kontakt"), photo: photoId.get("sesja-3"), body: rich(contentPages.kontakt.body) } });
await payload.updateGlobal({
  slug: "portraits",
  data: {
    title: portraitsPage.title.pl, subtitle: portraitsPage.subtitle.pl, lead: portraitsPage.lead.pl, photo: photoId.get("sesja-8"),
    heading: portraitsPage.heading.pl, body: rich(portraitsPage.body), needsTitle: portraitsPage.needs.title.pl,
    needs: portraitsPage.needs.items.map((i) => ({ text: i.pl })), galleryTitle: portraitsPage.galleryTitle.pl,
    galleryPaintings: portraitsPage.galleryPaintingIds.map((id) => paintingIds.get(id)!).filter(Boolean),
  },
});

// Opcjonalnie: konto administratora z zmiennych środowiskowych (żeby nikt nie wyprzedził Cię na pustym /admin).
if (process.env.SEED_ADMIN_EMAIL && process.env.SEED_ADMIN_PASSWORD) {
  await payload.create({ collection: "users", data: { email: process.env.SEED_ADMIN_EMAIL, password: process.env.SEED_ADMIN_PASSWORD, role: "admin" } });
  console.log("Utworzono konto administratora:", process.env.SEED_ADMIN_EMAIL);
}

console.log("Gotowe.");
process.exit(0);
