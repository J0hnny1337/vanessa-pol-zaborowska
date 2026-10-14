import Image from "next/image";
import { RichText } from "@payloadcms/richtext-lexical/react";
import type { JSXConvertersFunction } from "@payloadcms/richtext-lexical/react";
import type { Media } from "@/payload-types";
import type { Rich } from "@/lib/types";
import { mediaSrc } from "@/lib/media";

/** Zdjęcie wstawione w tekst artykułu: z podpisem, jeśli artystka go wpisała. */
const converters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  upload: ({ node }) => {
    const media = node.value as Media | number;
    const src = typeof media === "object" ? mediaSrc(media) : undefined;
    if (typeof media !== "object" || !src) return null;
    const caption = (node.fields as { caption?: string } | undefined)?.caption;
    return (
      <figure className="article-figure">
        <Image
          src={src}
          alt={caption || media.alt || ""}
          width={media.width ?? 1600}
          height={media.height ?? 1200}
          sizes="(min-width: 900px) 760px, 100vw"
        />
        {caption && <figcaption className="muted">{caption}</figcaption>}
      </figure>
    );
  },
});

/** Treść artykułu z pełnego edytora. */
export default function Article({ data }: { data: Rich }) {
  return <RichText className="article prose" data={data} converters={converters} />;
}
