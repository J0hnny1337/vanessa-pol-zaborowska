"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Img } from "@/lib/types";
import Art from "./Art";

export type StageItem = { id: string; image?: Img; placeholder: string; title: string; series: string };
export type StageRow = { id: string; name: string; count: number; cover: StageItem };

const HOLD_MS = 6000;

/**
 * Strona główna jako „sztaluga”: po prawej obraz stoi w miejscu, po lewej przewija się tekst.
 * Zanim ktoś wybierze serię, obrazy z `cycle` zmieniają się powoli; najechanie na serię (lub fokus) stawia na sztaludze jej obraz.
 */
export default function Stage({ cycle, rows, intro, after }: { cycle: StageItem[]; rows: StageRow[]; intro: React.ReactNode; after: React.ReactNode }) {
  const [auto, setAuto] = useState(0);
  const [picked, setPicked] = useState<StageItem | null>(null);
  const items = [...cycle, ...rows.map((r) => r.cover).filter((c) => !cycle.some((x) => x.id === c.id))];
  const active = picked ?? cycle[auto] ?? items[0];

  useEffect(() => {
    if (picked || cycle.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => { if (!document.hidden) setAuto((i) => (i + 1) % cycle.length); }, HOLD_MS);
    return () => window.clearInterval(id);
  }, [picked, cycle.length]);

  return (
    <section className="stage">
      <div className="stage-col">
        {intro}

        <section className="ledger" aria-labelledby="ledger-h" onMouseLeave={() => setPicked(null)}>
          <h2 id="ledger-h" className="h2">Serie obrazów</h2>
          <ul className={picked ? "ledger-list has-pick" : "ledger-list"}>
            {rows.map((r) => (
              <li key={r.id} className={picked?.id === r.cover.id ? "on" : undefined}>
                <Link
                  href={`/portfolio#${r.id}`}
                  onMouseEnter={() => setPicked(r.cover)}
                  onFocus={() => setPicked(r.cover)}
                  onBlur={() => setPicked(null)}
                >
                  <span className="ledger-thumb" aria-hidden="true">
                    <Art image={r.cover.image} placeholder={r.cover.placeholder} ratio="1 / 1" sizes="64px" />
                  </span>
                  <span className="ledger-name">{r.name}</span>
                  <span className="ledger-count">{r.count} {r.count === 1 ? "obraz" : r.count < 5 ? "obrazy" : "obrazów"}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {after}
      </div>

      <div className="stage-pic" aria-live="polite">
        <div className="stage-frame">
          {items.map((it, i) => (
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
