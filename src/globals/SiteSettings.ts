import type { GlobalConfig } from "payload";
import { revalidateHooks } from "@/lib/revalidate";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings", label: "Dane i kontakt",
  admin: { group: "Ustawienia", description: "Dane widoczne na całej stronie: nazwisko, kontakt, stopka, przycisk „Zamów portret”." },
  access: { read: () => true },
  hooks: revalidateHooks,
  versions: { max: 20 },
  fields: [
    { name: "artistName", label: "Imię i nazwisko", type: "text", required: true },
    { name: "tagline", label: "Hasło pod nazwiskiem", type: "text", required: true, admin: { description: "Np. „Malarstwo · Akwarela · Marynistyka”." } },
    { name: "logo", label: "Logo (podpis)", type: "upload", relationTo: "media", admin: { description: "Opcjonalnie. Bez logo na górze strony pojawia się nazwisko." } },
    { type: "row", fields: [
      { name: "email", label: "E-mail", type: "email", required: true, admin: { width: "50%" } },
      { name: "phone", label: "Telefon", type: "text", admin: { width: "50%" } },
    ] },
    {
      name: "social", label: "Media społecznościowe", type: "array", labels: { singular: "Profil", plural: "Profile" },
      fields: [{ type: "row", fields: [
        { name: "label", label: "Serwis", type: "select", required: true, options: ["Instagram", "Facebook"], admin: { width: "35%" } },
        { name: "url", label: "Adres profilu", type: "text", required: true, admin: { width: "65%" } },
      ] }],
    },
    { name: "footerNote", label: "Zdanie w stopce", type: "textarea" },
    {
      name: "cta", label: "Pas „Zamów portret” (na dole stron)", type: "group",
      fields: [
        { name: "title", label: "Nagłówek", type: "text", required: true },
        { name: "buttonLabel", label: "Napis na przycisku", type: "text", required: true },
        { name: "href", label: "Dokąd prowadzi przycisk", type: "text", required: true, admin: { description: "Np. mailto:adres@poczta.pl albo /kontakt." } },
      ],
    },
    {
      name: "legalLinks", label: "Linki w stopce (regulamin, polityka prywatności)", type: "array", labels: { singular: "Link", plural: "Linki" },
      fields: [{ type: "row", fields: [
        { name: "label", label: "Napis", type: "text", required: true, admin: { width: "40%" } },
        { name: "href", label: "Adres", type: "text", required: true, admin: { width: "60%" } },
      ] }],
    },
  ],
};
