import type { CollectionConfig } from "payload";
import {
  AlignFeature, BlockquoteFeature, BoldFeature, FixedToolbarFeature, HeadingFeature, HorizontalRuleFeature,
  InlineToolbarFeature, ItalicFeature, LinkFeature, OrderedListFeature, ParagraphFeature, UnderlineFeature,
  UnorderedListFeature, UploadFeature, lexicalEditor,
} from "@payloadcms/richtext-lexical";
import { revalidateHooks, siteUrl } from "@/lib/revalidate";

const slugify = (s: string) =>
  s.toLowerCase().replace(/ł/g, "l").normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/** Pełny edytor artykułów: nagłówki, listy, cytaty, zdjęcia w tekście, stały pasek narzędzi. */
export const articleEditor = lexicalEditor({
  features: () => [
    ParagraphFeature(),
    HeadingFeature({ enabledHeadingSizes: ["h2", "h3"] }),
    BoldFeature(), ItalicFeature(), UnderlineFeature(),
    UnorderedListFeature(), OrderedListFeature(),
    BlockquoteFeature(), HorizontalRuleFeature(), AlignFeature(),
    LinkFeature(),
    UploadFeature({
      collections: { media: { fields: [{ name: "caption", label: "Podpis pod zdjęciem", type: "text" }] } },
    }),
    FixedToolbarFeature(),
    InlineToolbarFeature(),
  ],
});

export const News: CollectionConfig = {
  slug: "news",
  labels: { singular: "Artykuł", plural: "Artykuły (aktualności)" },
  defaultSort: "-date",
  admin: {
    useAsTitle: "title",
    group: "Wpisy",
    description: "Artykuły na stronie „Aktualności”. Każdy ma własną stronę. Zapisz jako szkic, a gdy będzie gotowy, kliknij „Opublikuj”.",
    defaultColumns: ["title", "date", "_status"],
    livePreview: { url: ({ data }) => `${siteUrl}/aktualnosci${data?.slug ? `/${data.slug}` : ""}` },
  },
  // Anonimowy odwiedzający widzi tylko opublikowane artykuły (szkice są tylko dla zalogowanych).
  access: { read: ({ req }) => (req.user ? true : { _status: { equals: "published" } }) },
  hooks: revalidateHooks,
  versions: { maxPerDoc: 20, drafts: true },
  fields: [
    { name: "title", label: "Tytuł", type: "text", required: true },
    {
      type: "row",
      fields: [
        { name: "date", label: "Data", type: "date", required: true, defaultValue: () => new Date().toISOString(), admin: { width: "35%", date: { pickerAppearance: "dayOnly", displayFormat: "d MMMM yyyy" } } },
        { name: "place", label: "Miejsce (opcjonalnie)", type: "text", admin: { width: "65%", description: "Np. „Galeria Sztuki Ado-Art, Gdynia”." } },
      ],
    },
    { name: "cover", label: "Zdjęcie główne", type: "upload", relationTo: "media", admin: { description: "Pokazuje się na liście aktualności i nad artykułem." } },
    { name: "excerpt", label: "Krótki wstęp", type: "textarea", admin: { description: "Dwa–trzy zdania widoczne na liście aktualności." } },
    {
      name: "content", label: "Treść artykułu", type: "richText", editor: articleEditor, required: true,
      admin: { description: "Zdjęcie wstawisz przyciskiem „Wgraj” na pasku narzędzi (albo wpisz „/” i wybierz zdjęcie)." },
    },
    {
      name: "slug", label: "Adres w przeglądarce", type: "text", unique: true, index: true,
      admin: { readOnly: true, position: "sidebar", description: "Tworzy się sam z tytułu." },
      hooks: { beforeValidate: [({ value, data }) => value || (data?.title ? slugify(data.title) : value)] },
    },
  ],
};
