import type { CollectionConfig } from "payload";
import { revalidateHooks, siteUrl } from "@/lib/revalidate";

const slugify = (s: string) =>
  s.toLowerCase().replace(/ł/g, "l").normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export const Series: CollectionConfig = {
  slug: "series",
  labels: { singular: "Seria", plural: "Serie" },
  orderable: true,
  admin: {
    useAsTitle: "name",
    group: "Obrazy",
    description: "Serie to grupy obrazów, np. „Marynistyka”. Każda seria ma własną stronę i pozycję w menu Portfolio. Kolejność zmienisz, przeciągając wiersze na liście.",
    defaultColumns: ["name", "years"],
    livePreview: { url: `${siteUrl}/portfolio` },
  },
  access: { read: () => true },
  hooks: revalidateHooks,
  fields: [
    { name: "name", label: "Nazwa serii", type: "text", required: true, admin: { description: "Np. „Marynistyka i żaglowce”." } },
    { name: "years", label: "Lata", type: "text", admin: { description: "Opcjonalnie, np. „2022–2024”." } },
    {
      name: "slug", label: "Adres w przeglądarce", type: "text", unique: true, index: true,
      admin: { readOnly: true, position: "sidebar", description: "Tworzy się sam z nazwy." },
      hooks: { beforeValidate: [({ value, data }) => value || (data?.name ? slugify(data.name) : value)] },
    },
    { name: "paintings", label: "Obrazy w tej serii", type: "join", collection: "paintings", on: "series", admin: { description: "Obrazy dodajesz w zakładce „Obrazy”, wybierając tę serię." } },
  ],
};
