import { RichText } from "@payloadcms/richtext-lexical/react";
import type { Rich as RichData } from "@/lib/types";

/** Tekst z edytora w panelu: akapity, pogrubienie, linki. */
export default function Rich({ data, className = "prose" }: { data?: RichData; className?: string }) {
  if (!hasText(data)) return null;
  return <RichText data={data!} className={className} />;
}

/** Czy edytor zawiera jakikolwiek tekst (pusty edytor to jeden pusty akapit). */
export function hasText(data?: RichData): boolean {
  const walk = (n: unknown): boolean => {
    const node = n as { text?: string; children?: unknown[] };
    return !!node.text?.trim() || !!node.children?.some(walk);
  };
  return !!data && walk(data.root);
}
