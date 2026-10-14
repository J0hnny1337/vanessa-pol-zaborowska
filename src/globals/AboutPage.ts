import { page, photoField, richText, subtitleField } from "./shared";

export const AboutPage = page({
  slug: "about", label: "O mnie", path: "/o-autorce",
  admin: { description: "Wystawy dodajesz w zakładce „Wystawy”." },
  fields: [
    subtitleField,
    photoField("portrait", "Zdjęcie artystki", "Pokazuje się obok biografii."),
    richText("bio", "Biografia", "Każdy akapit od nowej linii.", true),
    richText("statement", "Credo (cytat pod biografią)"),
    {
      name: "exhibitionPhotos", label: "Zdjęcia z wystaw (karuzela obok listy wystaw)", type: "array",
      labels: { singular: "Zdjęcie", plural: "Zdjęcia" },
      admin: { description: "Dodaj zdjęcia i przeciągnij, żeby ustawić kolejność." },
      fields: [{ name: "photo", label: "Zdjęcie", type: "upload", relationTo: "media", required: true }],
    },
    { name: "collections", label: "Kolekcje prywatne", type: "text", defaultValue: "Polska i za granicą", admin: { description: "Np. „Polska, Niemcy, Wielka Brytania”." } },
    { name: "portfolioPdf", label: "Portfolio do pobrania (PDF)", type: "upload", relationTo: "media", admin: { description: "Opcjonalnie. Gdy wgrasz plik, na stronie pojawi się przycisk „Pobierz portfolio”." } },
  ],
});
