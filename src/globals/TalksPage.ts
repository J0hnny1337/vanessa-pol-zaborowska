import { page, photoField, richText, subtitleField } from "./shared";

export const TalksPage = page({
  slug: "talks", label: "Spotkania autorskie", path: "/spotkania-autorskie",
  fields: [
    subtitleField,
    photoField("photo", "Zdjęcie obok tekstu"),
    richText("body", "Tekst"),
    { name: "listTitle", label: "Tytuł listy", type: "text", defaultValue: "Dotychczasowe spotkania" },
    {
      name: "items", label: "Lista spotkań", type: "array", labels: { singular: "Spotkanie", plural: "Spotkania" },
      fields: [
        { type: "row", fields: [
          { name: "year", label: "Rok", type: "number", required: true, admin: { width: "20%" } },
          { name: "title", label: "Tytuł", type: "text", required: true, admin: { width: "50%" } },
          { name: "place", label: "Miejsce", type: "text", admin: { width: "30%" } },
        ] },
      ],
    },
    { name: "invite", label: "Zaproszenie na końcu strony", type: "textarea" },
  ],
});
