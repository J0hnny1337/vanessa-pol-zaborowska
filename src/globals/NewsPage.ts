import { page, subtitleField } from "./shared";

export const NewsPage = page({
  slug: "news-page", label: "Aktualności", path: "/aktualnosci",
  admin: { description: "Wpisy dodajesz w zakładce „Aktualności (wpisy)”. Tutaj ustawiasz podtytuł i galerię zdjęć." },
  fields: [
    subtitleField,
    { name: "galleryTitle", label: "Tytuł galerii", type: "text", defaultValue: "Z wystaw i wydarzeń" },
    {
      name: "gallery", label: "Galeria zdjęć z wydarzeń", type: "array",
      labels: { singular: "Zdjęcie", plural: "Zdjęcia" },
      admin: { description: "Dodaj zdjęcia i przeciągnij, żeby ustawić kolejność." },
      fields: [{ name: "photo", label: "Zdjęcie", type: "upload", relationTo: "media", required: true }],
    },
  ],
});
