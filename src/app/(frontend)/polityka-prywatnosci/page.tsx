import type { Metadata } from "next";
import { getPrivacyPolicy } from "@/content/data";

export const metadata: Metadata = { title: "Polityka prywatności" };

export default async function PrivacyPage() {
  const policy = await getPrivacyPolicy();

  return (
    <>
      <section className="intro intro-text">
        <div className="wide">
          <h1 className="intro-title">Polityka prywatności</h1>
          <p className="intro-lead">{policy.intro}</p>
          <p className="soft">Ostatnia aktualizacja: {policy.updated}</p>
        </div>
      </section>

      <section className="policy">
        <div className="wide policy-in">
          <nav className="policy-toc" aria-label="Spis treści">
            <h2>Spis treści</h2>
            <ul>
              {policy.sections.map((s) => <li key={s.id}><a href={`#${s.id}`}>{s.title}</a></li>)}
            </ul>
          </nav>
          <div className="policy-body">
            {policy.sections.map((s) => (
              <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`}>
                <h2 id={`${s.id}-h`} className="h2">{s.title}</h2>
                {s.body?.map((p, i) => <p key={i}>{p}</p>)}
                {s.items && <ul>{s.items.map((it, i) => <li key={i}>{it}</li>)}</ul>}
                {s.after?.map((p, i) => <p key={i}>{p}</p>)}
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
