"use client";

import { useRef, useState } from "react";

/** Karuzela: przewijanie strzałkami lub gestem, kropki pokazują pozycję. */
/** `single` = jeden slajd na całą szerokość (np. w wąskiej kolumnie). */
export default function Carousel({ children, label, single }: { children: React.ReactNode[]; label: string; single?: boolean }) {
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const count = children.length;

  const go = (dir: -1 | 1) => {
    const el = track.current;
    if (!el) return;
    const step = (el.firstElementChild as HTMLElement | null)?.offsetWidth ?? el.clientWidth;
    el.scrollBy({ left: dir * (step + 24), behavior: "smooth" });
  };
  const onScroll = () => {
    const el = track.current;
    if (!el) return;
    const step = ((el.firstElementChild as HTMLElement | null)?.offsetWidth ?? el.clientWidth) + 24;
    setIndex(Math.min(count - 1, Math.round(el.scrollLeft / step)));
  };

  return (
    <div className={single ? "carousel single" : "carousel"} role="region" aria-roledescription="karuzela" aria-label={label}>
      <div className="track" ref={track} onScroll={onScroll}>
        {children.map((c, i) => <div className="slide" key={i}>{c}</div>)}
      </div>
      <div className="controls">
        <button type="button" onClick={() => go(-1)} aria-label="Poprzednie">←</button>
        <button type="button" onClick={() => go(1)} aria-label="Następne">→</button>
      </div>
      <div className="dots" aria-hidden="true">
        {children.map((_, i) => <span key={i} className={i === index ? "on" : ""} />)}
      </div>
    </div>
  );
}
