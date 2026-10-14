import { page, photoField, richText } from "./shared";

export const PortraitsPage = page({
  slug: "portraits", label: "Portrety na zamówienie", path: "/portrety-energetyczne",
  fields: [
    { name: "title", label: "Tytuł strony", type: "text", required: true },
    { name: "subtitle", label: "Podtytuł", type: "text" },
    { name: "lead", label: "Zdanie wstępne (w pasie pod nagłówkiem)", type: "textarea" },
    photoField("photo", "Zdjęcie obok tekstu"),
    { name: "heading", label: "Nagłówek nad tekstem", type: "text", defaultValue: "Portrety" },
    richText("body", "Tekst", "Opis, jak powstają portrety."),
    { name: "needsTitle", label: "Tytuł ramki „czego potrzebuję”", type: "text" },
    {
      name: "needs", label: "Lista „czego potrzebuję”", type: "array", labels: { singular: "Punkt", plural: "Punkty" },
      fields: [{ name: "text", label: "Treść", type: "text", required: true }],
    },
    { name: "galleryTitle", label: "Tytuł galerii", type: "text", defaultValue: "Wybrane portrety" },
    { name: "galleryPaintings", label: "Obrazy w galerii", type: "relationship", relationTo: "paintings", hasMany: true, admin: { description: "Wybierz obrazy z zakładki „Obrazy” i ustaw kolejność przeciąganiem." } },
  ],
});
