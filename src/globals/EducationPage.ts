import { page, photoField, richText, subtitleField } from "./shared";

export const EducationPage = page({
  slug: "education", label: "Edukacja", path: "/edukacja",
  fields: [
    subtitleField,
    photoField("photo", "Zdjęcie obok tekstu"),
    richText("body", "Tekst"),
    { name: "invite", label: "Zaproszenie na końcu strony", type: "textarea" },
  ],
});
