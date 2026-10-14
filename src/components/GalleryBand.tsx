import type { Img, L10n } from "@/lib/types";
import Art from "./Art";
import Carousel from "./Carousel";

type Item = { id: string; image?: Img; placeholder: string };

/** Pas z karuzelą zdjęć. Wszystkie slajdy mają te same proporcje (zdjęcie kadrowane). */
export default function GalleryBand({ title, items, ratio = "4 / 5", id }: { title: L10n; items: Item[]; ratio?: string; id?: string }) {
  return (
    <section className="band gallery-band" id={id}>
      <p className="eyebrow center">Galeria</p>
      <h2 className="display center">{title.pl}</h2>
      <Carousel label={title.pl}>
        {items.map((p) => (
          <figure className="slide-fig" key={p.id}>
            <Art image={p.image} placeholder={p.placeholder} ratio={ratio} />
          </figure>
        ))}
      </Carousel>
    </section>
  );
}
