// reCAPTCHA v3 (niewidoczna). Skrypt Google jest dokładany do strony dopiero po zgodzie (zob. consent.ts).

export const RECAPTCHA_ACTION = "zapytanie";
const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";

type Grecaptcha = { ready(cb: () => void): void; execute(key: string, opts: { action: string }): Promise<string> };
declare global { interface Window { grecaptcha?: Grecaptcha } }

let loading: Promise<Grecaptcha> | null = null;

/** Ładuje skrypt raz. Bez klucza (np. lokalnie) nic nie robi. */
export function loadRecaptcha(): Promise<Grecaptcha> | null {
  if (!SITE_KEY) return null;
  if (loading) return loading;
  loading = new Promise<Grecaptcha>((resolve, reject) => {
    const s = document.createElement("script");
    s.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(SITE_KEY)}`;
    s.async = true;
    s.onload = () => (window.grecaptcha ? window.grecaptcha.ready(() => resolve(window.grecaptcha!)) : reject(new Error("grecaptcha")));
    s.onerror = () => { loading = null; s.remove(); reject(new Error("Nie udało się wczytać reCAPTCHA.")); };
    document.head.appendChild(s);
  });
  return loading;
}

/** Token do dołączenia do wiadomości; pusty, gdy reCAPTCHA nie jest skonfigurowana. */
export async function getRecaptchaToken(): Promise<string> {
  const p = loadRecaptcha();
  if (!p) return "";
  const g = await p;
  return g.execute(SITE_KEY, { action: RECAPTCHA_ACTION });
}
