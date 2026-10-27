import Image from "next/image";
import type { Img } from "@/lib/types";

/** Obraz albo szary prostokąt o zadanych proporcjach, dopóki nie ma zdjęcia (opcjonalnie z napisem `label`).
 *  `fit="contain"` pokazuje cały obraz bez przycinania (np. na sztaludze). */
export default function Art({
  image, placeholder, ratio, priority, label, sizes = "(min-width: 900px) 33vw, 100vw", fit = "cover",
}: { image?: Img; placeholder: string; ratio: string; priority?: boolean; label?: string; sizes?: string; fit?: "cover" | "contain" }) {
  return (
    <div className={image ? "art" : "art art-ph"} style={{ aspectRatio: ratio, background: image && fit === "contain" ? undefined : placeholder }}>
      {!image && label && <span className="ph-label">{label}</span>}
      {image && <Image src={image.src} alt={image.alt.pl} fill priority={priority} sizes={sizes} style={{ objectFit: fit }} />}
    </div>
  );
}
