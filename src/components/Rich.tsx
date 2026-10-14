import type { Rich as RichData } from "@/lib/types";

/** Tekst jako akapity. `as="blockquote"` daje cytat (credo). */
export default function Rich({ data, className = "prose", as: Tag = "div" }: { data?: RichData; className?: string; as?: "div" | "blockquote" }) {
  if (!hasText(data)) return null;
  return <Tag className={className}>{data!.map((p, i) => <p key={i}>{p}</p>)}</Tag>;
}

/** Czy tekst zawiera cokolwiek poza pustymi akapitami. */
export function hasText(data?: RichData): boolean {
  return !!data?.some((p) => p.trim());
}
