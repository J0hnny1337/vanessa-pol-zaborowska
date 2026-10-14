"use client";

import { useState } from "react";

/** Siatka, która pokazuje pierwsze `visible` pozycji, a resztę rozwija przyciskiem. Bez przycisku, gdy pozycji jest mało. */
export default function ExpandableGrid({ children, visible = 3 }: { children: React.ReactNode[]; visible?: number }) {
  const [open, setOpen] = useState(false);
  const items = children;

  const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const section = e.currentTarget.closest("section");
    const next = !open;
    setOpen(next);
    // Po zwinięciu wracamy do początku kategorii, żeby nie zostać gdzieś pośrodku długiej strony.
    if (!next) requestAnimationFrame(() => section?.scrollIntoView({ block: "start" }));
  };

  return (
    <>
      <div className="grid">
        {items.map((c, i) => (
          <div key={i} className={open && i >= visible ? "grid-item reveal" : "grid-item"} hidden={!open && i >= visible}>
            {c}
          </div>
        ))}
      </div>
      {items.length > visible && (
        <p className="more-wrap">
          <button type="button" className="more-btn" aria-expanded={open} onClick={toggle}>
            {open ? "Pokaż mniej" : `Pokaż wszystkie (${items.length})`} <span aria-hidden="true">{open ? "▴" : "▾"}</span>
          </button>
        </p>
      )}
    </>
  );
}
