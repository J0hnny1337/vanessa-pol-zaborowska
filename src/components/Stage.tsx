"use client";

import { useEffect, useState } from "react";
import type { Img } from "@/lib/types";
import Art from "./Art";

export type StageItem = { id: string; image?: Img; placeholder: string; title: string; series: string };

const HOLD_MS = 6000;

/**
 * Strona główna jako „sztaluga”: po prawej obraz stoi w miejscu, po lewej przewija się tekst.
 * Obrazy z `cycle` zmieniają się powoli (bez zmian przy ograniczonym ruchu).
 */
export default function Stage({ cycle, intro, after }: { cycle: StageItem[]; intro: React.ReactNode; after: React.ReactNode }) {
  const [auto, setAuto] = useState(0);
  const active = cycle[auto];

  useEffect(() => {
    if (cycle.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => { if (!document.hidden) setAuto((i) => (i + 1) % cycle.length); }, HOLD_MS);
    return () => window.clearInterval(id);
  }, [cycle.length]);

  if (!active) return null;

  return (
    <section className="stage">
      <div className="stage-col">
        {intro}
        {after}
      </div>

      <div className="stage-pic">
        <div className="stage-frame">
          {cycle.map((it, i) => (
            <div key={it.id} className={it.id === active.id ? "stage-img on" : "stage-img"} aria-hidden={it.id !== active.id}>
              <Art image={it.image} placeholder={it.placeholder} ratio="4 / 5" fit="contain" priority={i === 0} sizes="(min-width: 900px) 45vw, 100vw" />
            </div>
          ))}
        </div>
        <p className="stage-label">
          <strong>{active.title || "Bez tytułu"}</strong>
          <span>{active.series}</span>
        </p>
      </div>
    </section>
  );
}
