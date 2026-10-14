import type { CollectionConfig } from "payload";
import sharp from "sharp";
import { revalidateHooks, siteUrl } from "@/lib/revalidate";

export const Media: CollectionConfig = {
  slug: "media",
  labels: { singular: "Zdjęcie", plural: "Biblioteka zdjęć" },
  admin: {
    useAsTitle: "alt",
    group: "Zdjęcia",
    description: "Wszystkie wgrane zdjęcia. Wielkie pliki z aparatu zmniejszą się same. Nowe zdjęcia wgrywasz też bezpośrednio w polach, np. przy obrazie.",
    defaultColumns: ["filename", "alt", "kind"],
  },
  access: { read: () => true },
  hooks: {
    ...revalidateHooks,
    afterChange: [
      ...revalidateHooks.afterChange,
      // Zdjęcia wgrane prosto do Blob nie przechodzą przez serwer, więc Payload nie zna ich wymiarów.
      // Strona liczy z nich proporcje, więc uzupełniamy je po wgraniu.
      async ({ doc, req, context }) => {
        if (context.fillDimensions || doc.width || !doc.mimeType?.startsWith("image/") || !doc.url) return doc;
        try {
          const url = /^https?:\/\//.test(doc.url) ? doc.url : `${siteUrl}${doc.url}`;
          const meta = await sharp(Buffer.from(await (await fetch(url)).arrayBuffer())).metadata();
          if (meta.width && meta.height) {
            await req.payload.update({
              collection: "media", id: doc.id, data: { width: meta.width, height: meta.height },
              context: { fillDimensions: true }, req,
            });
          }
        } catch (e) {
          req.payload.logger.warn(`Nie udało się odczytać wymiarów zdjęcia ${doc.filename}: ${(e as Error).message}`);
        }
        return doc;
      },
    ],
  },
  upload: {
    staticDir: "media",
    mimeTypes: ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif", "application/pdf"],
    resizeOptions: { width: 2500, height: 2500, fit: "inside", withoutEnlargement: true },
    formatOptions: { format: "webp", options: { quality: 85 } },
    imageSizes: [
      { name: "thumb", width: 400, formatOptions: { format: "webp" } },
      { name: "card", width: 900, formatOptions: { format: "webp" } },
      { name: "large", width: 1800, formatOptions: { format: "webp" } },
    ],
    adminThumbnail: "thumb",
  },
  fields: [
    { name: "alt", label: "Opis zdjęcia", type: "text", required: true, admin: { description: "Co widać na zdjęciu, np. „Żaglowiec w porcie”." } },
    {
      name: "kind", label: "Rodzaj", type: "select", defaultValue: "painting",
      options: [
        { label: "Obraz", value: "painting" },
        { label: "Artystka", value: "artist" },
        { label: "Wydarzenie", value: "event" },
      ],
    },
  ],
};
