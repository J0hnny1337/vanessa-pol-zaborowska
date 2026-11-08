"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { CONSENT_CHANGE, CONSENT_OPEN, readConsent, saveConsent, type Consent } from "@/lib/consent";

// Strony z formularzem, na których baner pokazuje się sam, gdy nie ma jeszcze wyboru.
// Na pozostałych stronach nic nie ustawia cookies, więc baner otwiera się tylko z „Ustawień cookies” w stopce.
const FORM_PAGES = ["/kontakt"];

/** Baner zgody na reCAPTCHA. Region bez blokowania strony; dwa równorzędne przyciski. */
export default function ConsentBanner() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<Consent | null>(null);
  const box = useRef<HTMLDivElement>(null);
  const opener = useRef<HTMLElement | null>(null);

  // Samo pojawienie się na stronie z formularzem.
  useEffect(() => {
    if (FORM_PAGES.includes(pathname) && readConsent() === null) setOpen(true);
  }, [pathname]);

  // Otwarcie z „Ustawień cookies” albo z formularza.
  useEffect(() => {
    const onOpen = () => {
      opener.current = document.activeElement as HTMLElement | null;
      setCurrent(readConsent());
      setOpen(true);
      requestAnimationFrame(() => box.current?.focus());
    };
    // Zgoda dana z formularza też zamyka baner.
    const onChange = () => setOpen(false);
    window.addEventListener(CONSENT_OPEN, onOpen);
    window.addEventListener(CONSENT_CHANGE, onChange);
    return () => {
      window.removeEventListener(CONSENT_OPEN, onOpen);
      window.removeEventListener(CONSENT_CHANGE, onChange);
    };
  }, []);

  // Rezerwuje miejsce pod banerem, żeby nie zasłaniał końca formularza ani stopki (zwłaszcza na telefonie).
  useEffect(() => {
    const root = document.documentElement;
    if (!open || !box.current) { root.style.removeProperty("--consent-h"); return; }
    const el = box.current;
    const ro = new ResizeObserver(() => root.style.setProperty("--consent-h", `${el.offsetHeight}px`));
    ro.observe(el);
    return () => { ro.disconnect(); root.style.removeProperty("--consent-h"); };
  }, [open]);

  const close = () => {
    setOpen(false);
    opener.current?.focus?.();
    opener.current = null;
  };
  const choose = (v: Consent) => { saveConsent(v); close(); };

  if (!open) return null;
  return (
    <div
      ref={box}
      className="consent"
      role="region"
      aria-labelledby="consent-h"
      tabIndex={-1}
      onKeyDown={(e) => { if (e.key === "Escape") close(); }}
    >
      <div className="consent-in">
        <div className="consent-text">
          <h2 id="consent-h">Cookies przy formularzu</h2>
          <p>
            Formularz kontaktowy chroni przed spamem usługa Google reCAPTCHA, która zapisuje cookies i przesyła do Google dane o Twojej przeglądarce. Włącza się tylko za Twoją zgodą. Bez niej strona działa normalnie, ale wiadomości nie wyślesz przez formularz.{" "}
            <a href="/polityka-prywatnosci#cookies">Polityka prywatności</a>
          </p>
          {current && <p className="soft">Obecnie: {current === "granted" ? "zgoda udzielona" : "zgoda odrzucona"}.</p>}
        </div>
        <div className="consent-actions">
          <button type="button" className="btn-line" onClick={() => choose("granted")}>Akceptuję</button>
          <button type="button" className="btn-line" onClick={() => choose("denied")}>Odrzucam</button>
        </div>
      </div>
    </div>
  );
}
