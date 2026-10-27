import type { SiteSettings } from "@/lib/types";

export default function CtaBand({ site, title, buttonLabel }: { site: SiteSettings; title?: string; buttonLabel?: string }) {
  return (
    <section className="band cta-band">
      <h2 className="display center">{title ?? site.cta.title.pl}</h2>
      <div className="cta-actions">
        <a className="btn-light" href={site.cta.href}>{buttonLabel ?? site.cta.buttonLabel.pl} →</a>
      </div>
    </section>
  );
}
