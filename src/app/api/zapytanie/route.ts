// Formularz „Zapytaj o obraz”: przyjmuje wiadomość ze strony i wysyła ją e-mailem do artystki przez Resend.
// Wymaga zmiennych środowiskowych (Vercel → Settings → Environment Variables):
//   RESEND_API_KEY  – klucz z resend.com
//   CONTACT_TO      – adres, na który mają przychodzić wiadomości
//   CONTACT_FROM    – nadawca, np. "Strona <formularz@twoja-domena.pl>" (domena zweryfikowana w Resend);
//                     bez niej używany jest testowy nadawca Resend (działa tylko na adres konta Resend).

import { site } from "@/content/source";

// Adres podawany w komunikacie tylko wtedy, gdy wysyłka się nie uda (na stronie go nie ma).
const FALLBACK = site.email;

const LIMITS = { name: 100, email: 200, subject: 200, painting: 200, message: 5000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const escapeHtml = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Nieprawidłowe dane." }, { status: 400 });
  }

  // Pułapka na boty: to pole jest ukryte, człowiek go nie wypełni. Udajemy sukces.
  if (clean(body.website, 200)) return Response.json({ ok: true });

  const name = clean(body.name, LIMITS.name);
  const email = clean(body.email, LIMITS.email);
  const subject = clean(body.subject, LIMITS.subject) || "Zapytanie ze strony";
  const painting = clean(body.painting, LIMITS.painting);
  const message = clean(body.message, LIMITS.message);

  if (!name || !EMAIL_RE.test(email) || message.length < 5) {
    return Response.json({ error: "Uzupełnij imię, poprawny e-mail i treść wiadomości." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  if (!apiKey || !to) {
    console.error("[zapytanie] Brak RESEND_API_KEY lub CONTACT_TO");
    return Response.json({ error: "Formularz jest chwilowo niedostępny.", fallback: FALLBACK }, { status: 500 });
  }

  const rows: [string, string][] = [["Imię", name], ["E-mail", email], ["Sprawa", subject]];
  if (painting) rows.push(["Obraz", painting]);
  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\n${message}`;
  const html = `<table cellpadding="4">${rows.map(([k, v]) => `<tr><td><b>${k}</b></td><td>${escapeHtml(v)}</td></tr>`).join("")}</table>
<p style="white-space:pre-wrap">${escapeHtml(message)}</p>
<p style="color:#888;font-size:12px">Wiadomość z formularza na stronie. Odpowiedz na tego maila, żeby napisać bezpośrednio do nadawcy.</p>`;

  let res: Response;
  try {
    res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM || "Formularz na stronie <onboarding@resend.dev>",
      to: [to],
      reply_to: email,
      subject: `${subject}${painting ? `: ${painting}` : ""} (${name})`,
      text,
      html,
    }),
    });
  } catch (err) {
    console.error("[zapytanie] Resend niedostępny:", err);
    return Response.json({ error: "Nie udało się wysłać wiadomości.", fallback: FALLBACK }, { status: 502 });
  }

  if (!res.ok) {
    console.error("[zapytanie] Resend:", res.status, await res.text());
    return Response.json({ error: "Nie udało się wysłać wiadomości.", fallback: FALLBACK }, { status: 502 });
  }
  return Response.json({ ok: true });
}
