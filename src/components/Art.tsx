import Image from "next/image";
import type { Img } from "@/lib/types";

/** Obraz albo szary prostokąt o zadanych proporcjach, dopóki nie ma zdjęcia. */
export default function Art({
  image, placeholder, ratio, priority, sizes = "(min-width: 900px) 33vw, 100vw",
}: { image?: Img; placeholder: string; ratio: string; priority?: boolean; sizes?: string }) {
  return (
    <div className={image ? "art" : "art art-ph"} style={{ aspectRatio: ratio, background: placeholder }}>
      {image && <Image src={image.src} alt={image.alt.pl} fill priority={priority} sizes={sizes} style={{ objectFit: "cover" }} />}
    </div>
  );
}
