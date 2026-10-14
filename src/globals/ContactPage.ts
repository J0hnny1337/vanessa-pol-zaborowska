import { page, photoField, richText, subtitleField } from "./shared";

export const ContactPage = page({
  slug: "contact", label: "Kontakt", path: "/kontakt",
  admin: { description: "Telefon i e-mail zmieniasz w „Dane i kontakt”." },
  fields: [subtitleField, photoField("photo", "Zdjęcie obok tekstu"), richText("body", "Tekst")],
});
