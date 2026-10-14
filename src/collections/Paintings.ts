import type { CollectionConfig } from "payload";
import { revalidateHooks, siteUrl } from "@/lib/revalidate";

export const Paintings: CollectionConfig = {
  slug: "paintings",
  labels: { singular: "Obraz", plural: "Obrazy" },
  orderable: true,
  admin: {
    useAsTitle: "title",
    group: "Obrazy",
    description: "Każdy obraz to zdjęcie z tytułem. Wybierz serię, a obraz sam pojawi się w Portfolio. Kolejność w serii zmienisz, przeciągając wiersze.",
    defaultColumns: ["image", "title", "series", "status"],
    listSearchableFields: ["title"],
    livePreview: { url: `${siteUrl}/portfolio` },
  },
  // Obrazy ukryte (odznaczone „Pokaż na stronie”) widzi tylko zalogowany.
  access: { read: ({ req }) => (req.user ? true : { published: { not_equals: false } }) },
  hooks: revalidateHooks,
  fields: [
    { name: "image", label: "Zdjęcie obrazu", type: "upload", relationTo: "media", required: true, admin: { description: "Wgraj zdjęcie z telefonu lub aparatu. Zmniejszy się samo." } },
    { name: "title", label: "Tytuł", type: "text", required: true },
    { name: "series", label: "Seria", type: "relationship", relationTo: "series", admin: { description: "Do której serii należy obraz." } },
    {
      type: "row",
      fields: [
        { name: "year", label: "Rok", type: "number", min: 1900, max: 2100, admin: { width: "33%" } },
        { name: "widthCm", label: "Szerokość (cm)", type: "number", min: 1, admin: { width: "33%" } },
        { name: "heightCm", label: "Wysokość (cm)", type: "number", min: 1, admin: { width: "33%" } },
      ],
    },
    { name: "technique", label: "Technika", type: "text", admin: { description: "Np. „akwarela na papierze”, „akryl na płótnie”." } },
    {
      name: "status", label: "Status", type: "select", defaultValue: "available", required: true,
      options: [{ label: "Dostępny", value: "available" }, { label: "Sprzedany", value: "sold" }],
    },
    { name: "published", label: "Pokaż na stronie", type: "checkbox", defaultValue: true, admin: { position: "sidebar", description: "Odznacz, żeby ukryć obraz bez usuwania." } },
  ],
};
