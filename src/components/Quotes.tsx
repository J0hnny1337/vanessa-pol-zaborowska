"use client";

import { useEffect, useState } from "react";

const HOLD_MS = 7000;

/**
 * Cytaty artystki, zmieniają się po kolei co kilka sekund. Najechanie lub fokus wstrzymuje zmianę,
 * kropki pod spodem pozwalają wybrać cytat. Przy ograniczonym ruchu cytaty zmienia się tylko kropkami.
 */
export default function Quotes({ items }: { items: string[] }) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || items.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => { if (!document.hidden) setCurrent((i) => (i + 1) % items.length); }, HOLD_MS);
    return () => window.clearInterval(id);
  }, [paused, items.length]);

  if (items.length === 0) return null;

  return (
    <div className="quotes" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
      <div className="quotes-stack">
        {items.map((q, i) => (
          <blockquote key={i} className={i === current ? "on" : undefined} aria-hidden={i !== current}>
            <p>„{q}”</p>
          </blockquote>
        ))}
      </div>
      {items.length > 1 && (
        <div className="quotes-dots">
          {items.map((_, i) => (
            <button key={i} type="button" className={i === current ? "on" : undefined} aria-label={`Cytat ${i + 1} z ${items.length}`} aria-pressed={i === current} onClick={() => setCurrent(i)} />
          ))}
        </div>
      )}
    </div>
  );
}
