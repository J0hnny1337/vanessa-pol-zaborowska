import { page } from "./shared";

export const HomePage = page({
  slug: "home", label: "Strona główna", path: "/",
  fields: [
    { name: "heroPainting", label: "Obraz na górze strony", type: "relationship", relationTo: "paintings", required: true, admin: { description: "Duży obraz widoczny zaraz po wejściu na stronę." } },
    { name: "quote", label: "Cytat przy obrazie", type: "textarea", required: true },
    { name: "showNews", label: "Pokaż sekcję „Aktualności” (trzy najnowsze artykuły)", type: "checkbox", defaultValue: true },
    { name: "showAbout", label: "Pokaż sekcję „O mnie” na stronie głównej", type: "checkbox", defaultValue: false },
    { name: "showCta", label: "Pokaż pas „Zamów portret” na dole", type: "checkbox", defaultValue: true },
  ],
});
