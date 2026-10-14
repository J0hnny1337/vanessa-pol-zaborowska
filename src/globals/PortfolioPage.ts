import { page, subtitleField } from "./shared";

export const PortfolioPage = page({
  slug: "portfolio-page", label: "Portfolio", path: "/portfolio",
  admin: { description: "Obrazy i serie dodajesz w zakładce „Obrazy”. Tutaj zmieniasz tylko podtytuł." },
  fields: [subtitleField],
});
