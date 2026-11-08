// Zgoda na reCAPTCHA (jedyne cookies na stronie, ustawia je Google przy formularzu).
// Wybór jest w localStorage pod kluczem "consent-recaptcha": { value: "granted" | "denied", date: ISO }.
// Komponenty słuchają zdarzeń na window, żeby baner, formularz i stopka były zgodne bez wspólnego stanu.

export type Consent = "granted" | "denied";

const KEY = "consent-recaptcha";
export const CONSENT_CHANGE = "consent-recaptcha-change"; // detail: Consent
export const CONSENT_OPEN = "consent-recaptcha-open"; // prośba o pokazanie banera

export function readConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const v = JSON.parse(raw)?.value;
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

/** Zapisuje wybór. Gdy zgoda zostaje wycofana po wcześniejszym udzieleniu, przeładowuje stronę, żeby usunąć skrypt Google. */
export function saveConsent(value: Consent) {
  const before = readConsent();
  try {
    localStorage.setItem(KEY, JSON.stringify({ value, date: new Date().toISOString() }));
  } catch {}
  if (before === "granted" && value === "denied") {
    window.location.reload();
    return;
  }
  window.dispatchEvent(new CustomEvent<Consent>(CONSENT_CHANGE, { detail: value }));
}

export function openConsentSettings() {
  window.dispatchEvent(new Event(CONSENT_OPEN));
}
