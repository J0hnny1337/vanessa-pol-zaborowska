import type { Painting } from "./types";

/** Opis pod obrazem: rok · wymiary · technika (tylko to, co jest uzupełnione). */
export function paintingMeta(p: Painting) {
  return [p.year, p.widthCm && p.heightCm && `${p.widthCm} × ${p.heightCm} cm`, p.technique?.pl].filter(Boolean).join(" · ");
}
