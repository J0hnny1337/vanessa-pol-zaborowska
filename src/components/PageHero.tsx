import type { L10n } from "@/lib/types";

export default function PageHero({ eyebrow, title, subtitle }: { eyebrow: L10n; title: L10n; subtitle: L10n }) {
  return (
    <section className="page-hero">
      <div className="narrow">
        <p className="eyebrow">{eyebrow.pl}</p>
        <h1 className="display">{title.pl}</h1>
        <p className="eyebrow">{subtitle.pl}</p>
      </div>
    </section>
  );
}
