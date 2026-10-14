import Image from "next/image";
import type { Img } from "@/lib/types";

/** Obraz albo szary prostokąt o zadanych proporcjach, dopóki nie ma zdjęcia (opcjonalnie z napisem `label`). */
export default function Art({
  image, placeholder, ratio, priority, label, sizes = "(min-width: 900px) 33vw, 100vw",
}: { image?: Img; placeholder: string; ratio: string; priority?: boolean; label?: string; sizes?: string }) {
  return (
    <div className={image ? "art" : "art art-ph"} style={{ aspectRatio: ratio, background: placeholder }}>
      {!image && label && <span className="ph-label">{label}</span>}
      {image && <Image src={image.src} alt={image.alt.pl} fill priority={priority} sizes={sizes} style={{ objectFit: "cover" }} />}
    </div>
  );
}
