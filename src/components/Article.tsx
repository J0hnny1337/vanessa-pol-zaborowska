import type { Rich } from "@/lib/types";

/** Treść artykułu: akapity tekstu. */
export default function Article({ data }: { data: Rich }) {
  return (
    <div className="article prose">
      {data.map((p, i) => <p key={i}>{p}</p>)}
    </div>
  );
}
