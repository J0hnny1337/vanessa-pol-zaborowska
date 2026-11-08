"use client";

import { useEffect, useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

/**
 * Formularz „Zapytaj o obraz”. Wysyła wiadomość do /api/zapytanie, a ta mailem do artystki.
 * Adres strony może podpowiedzieć sprawę i obraz: /kontakt?temat=Kupno%20obrazu&obraz=Lilie%20wodne#formularz
 */
export default function InquiryForm({ subjects, email }: { subjects: string[]; email: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [subject, setSubject] = useState(subjects[0] ?? "");
  const [painting, setPainting] = useState("");

  useEffect(() => {
    const read = () => {
      const q = new URLSearchParams(window.location.search);
      const t = q.get("temat");
      const o = q.get("obraz");
      if (t && subjects.includes(t)) setSubject(t);
      if (o) { setPainting(o.slice(0, 200)); if (!t) setSubject(subjects[0] ?? ""); }
    };
    read();
    window.addEventListener("popstate", read);
    return () => window.removeEventListener("popstate", read);
  }, [subjects]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/zapytanie", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Nie udało się wysłać wiadomości.");
      form.reset();
      setPainting("");
      setStatus("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Nie udało się wysłać wiadomości.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="inquiry-done" role="status">
        <p className="contact-sentence">Dziękuję, wiadomość została wysłana.</p>
        <p className="soft">Odpowiedź przyjdzie na podany adres e-mail.</p>
        <button type="button" className="btn-line" onClick={() => setStatus("idle")}>Napisz kolejną wiadomość</button>
      </div>
    );
  }

  return (
    <form className="inquiry" onSubmit={onSubmit}>
      <div className="inquiry-row">
        <label>
          <span>Imię i nazwisko</span>
          <input name="name" required maxLength={100} autoComplete="name" />
        </label>
        <label>
          <span>E-mail</span>
          <input name="email" type="email" required maxLength={200} autoComplete="email" />
        </label>
      </div>
      <div className="inquiry-row">
        <label>
          <span>W jakiej sprawie</span>
          <select name="subject" value={subject} onChange={(e) => setSubject(e.target.value)}>
            {subjects.map((s) => <option key={s}>{s}</option>)}
          </select>
        </label>
        <label>
          <span>Obraz <span className="soft">(opcjonalnie)</span></span>
          <input name="painting" maxLength={200} value={painting} onChange={(e) => setPainting(e.target.value)} placeholder="np. tytuł z portfolio" />
        </label>
      </div>
      <label>
        <span>Wiadomość</span>
        <textarea name="message" required minLength={5} maxLength={5000} rows={7} />
      </label>
      {/* Pułapka na boty: ukryte pole, ludzie go nie widzą. */}
      <label className="inquiry-hp" aria-hidden="true">
        Strona www <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <p className="soft inquiry-note">
        Wysyłając wiadomość, przekazujesz dane podane w formularzu, żeby artystka mogła odpowiedzieć. Więcej w <a href="/polityka-prywatnosci">polityce prywatności</a>.
      </p>
      <div className="inquiry-actions">
        <button type="submit" className="btn" disabled={status === "sending"}>
          {status === "sending" ? "Wysyłanie…" : "Wyślij wiadomość"}
        </button>
        {status === "error" && (
          <p className="inquiry-error" role="alert">
            {error} Możesz też napisać na <a href={`mailto:${email}`}>{email}</a>.
          </p>
        )}
      </div>
    </form>
  );
}
