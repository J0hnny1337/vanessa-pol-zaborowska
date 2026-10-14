import type { Field, GlobalConfig } from "payload";
import { BoldFeature, ItalicFeature, LinkFeature, ParagraphFeature, lexicalEditor } from "@payloadcms/richtext-lexical";
import { revalidateHooks, siteUrl } from "@/lib/revalidate";

/** Edytor tekstu: tylko akapity, pogrubienie, kursywa i linki. */
export const simpleEditor = lexicalEditor({
  features: () => [ParagraphFeature(), BoldFeature(), ItalicFeature(), LinkFeature()],
});

export const richText = (name: string, label: string, description?: string, required = false): Field => ({
  name, label, type: "richText", editor: simpleEditor, required, admin: { description },
});

export const photoField = (name: string, label: string, description?: string): Field => ({
  name, label, type: "upload", relationTo: "media", admin: { description },
});

export const subtitleField: Field = {
  name: "subtitle", label: "Podtytuł pod nagłówkiem", type: "text",
  admin: { description: "Mała linijka pod dużym tytułem strony." },
};

/** Wspólna konfiguracja strony: grupa „Strony”, podgląd na żywo, historia zmian. */
export const page = (c: Omit<GlobalConfig, "access" | "hooks" | "versions"> & { path: string }): GlobalConfig => {
  const { path, admin, ...rest } = c;
  return {
    ...rest,
    admin: { group: "Strony", livePreview: { url: `${siteUrl}${path}` }, ...admin },
    access: { read: () => true },
    hooks: revalidateHooks,
    versions: { max: 20 },
  };
};
