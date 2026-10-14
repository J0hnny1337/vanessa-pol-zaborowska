import type { CollectionConfig } from "payload";
import { revalidateHooks, siteUrl } from "@/lib/revalidate";

export const Exhibitions: CollectionConfig = {
  slug: "exhibitions",
  labels: { singular: "Wystawa", plural: "Wystawy" },
  defaultSort: "-year",
  admin: {
    useAsTitle: "title",
    group: "Wpisy",
    description: "Lista „Wybrane wystawy” na stronie „O mnie”, od najnowszych.",
    defaultColumns: ["year", "title", "place"],
    livePreview: { url: `${siteUrl}/o-autorce` },
  },
  access: { read: () => true },
  hooks: revalidateHooks,
  fields: [
    { name: "year", label: "Rok", type: "number", required: true, min: 1900, max: 2100 },
    { name: "title", label: "Tytuł wystawy", type: "text", required: true },
    { name: "place", label: "Miejsce", type: "text", admin: { description: "Np. „Galeria Sztuki Ado-Art, Gdynia”." } },
  ],
};
