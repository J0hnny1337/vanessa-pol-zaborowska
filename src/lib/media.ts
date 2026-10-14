import type { Media } from "@/payload-types";

/**
 * Adres zdjęcia dla strony. Na Vercelu (magazyn Blob) Payload podaje pełny adres CDN, więc używamy go
 * wprost. Lokalnie zdjęcia idą przez /api/media/file/<plik> (bez parametrów, bo next/image ich nie lubi).
 */
export const mediaSrc = (m: Pick<Media, "url" | "filename">): string | undefined => {
  if (m.url && /^https?:\/\//.test(m.url)) return m.url.split("?")[0];
  return m.filename ? `/api/media/file/${encodeURIComponent(m.filename)}` : undefined;
};
