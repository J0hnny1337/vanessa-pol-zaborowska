"use client";

import { useEffect, useRef, useState } from "react";
import type { Img } from "@/lib/types";
import Art from "./Art";

export type GridItem = { id: string; image?: Img; placeholder: string; ratio: string; title?: string; meta?: string };

/**
 * Siatka obrazów: kliknięcie otwiera obraz w powiększeniu (strzałki zmieniają obraz, Esc zamyka).
 * Pokazuje pierwsze `visible` pozycji, resztę rozwija przycisk.
 */
export default function PaintingGrid({ items, visible = items.length, label }: { items: GridItem[]; visible?: number; label: string }) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const shown = open ? items : items.slice(0, visible);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (current !== null && !d.open) d.showModal();
    if (current === null && d.open) d.close();
  }, [current]);

  const step = (dir: -1 | 1) => setCurrent((i) => (i === null ? i : (i + dir + items.length) % items.length));
  const item = current !== null ? items[current] : null;

  return (
    <>
      <ul className="pgrid" data-reveal>
        {shown.map((p, i) => (
          <li key={p.id}>
            <button type="button" className="pgrid-open" onClick={() => setCurrent(i)} aria-label={`Powiększ: ${p.title || label}`}>
              <Art image={p.image} placeholder={p.placeholder} ratio={p.ratio} sizes="(min-width: 900px) 30vw, (min-width: 600px) 45vw, 100vw" />
            </button>
            {(p.title || p.meta) && (
              <p className="pgrid-cap">
                {p.title && <strong>{p.title}</strong>}
                {p.meta && <span className="soft">{p.meta}</span>}
              </p>
            )}
          </li>
        ))}
      </ul>
      {items.length > visible && (
        <p className="pgrid-more">
          <button type="button" className="btn-line" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
            {open ? "Pokaż mniej" : `Pokaż wszystkie (${items.length})`}
          </button>
        </p>
      )}

      <dialog
        ref={dialog}
        className="lightbox"
        aria-label={item?.title || label}
        onClose={() => setCurrent(null)}
        onClick={(e) => { if (e.target === e.currentTarget) setCurrent(null); }}
        onKeyDown={(e) => { if (e.key === "ArrowRight") step(1); if (e.key === "ArrowLeft") step(-1); }}
      >
        {item && (
          <>
            {item.image && (
              // eslint-disable-next-line @next/next/no-img-element -- pełny plik obrazu, bez przycinania
              <img src={item.image.src} alt={item.image.alt.pl} className="lightbox-img" />
            )}
            <div className="lightbox-bar">
              <p>{item.title && <strong>{item.title}</strong>} {item.meta && <span>{item.meta}</span>}</p>
              <div className="lightbox-nav">
                {items.length > 1 && (
                  <>
                    <button type="button" onClick={() => step(-1)} aria-label="Poprzedni obraz">←</button>
                    <button type="button" onClick={() => step(1)} aria-label="Następny obraz">→</button>
                  </>
                )}
                <button type="button" onClick={() => setCurrent(null)}>Zamknij</button>
              </div>
            </div>
          </>
        )}
      </dialog>
    </>
  );
}
