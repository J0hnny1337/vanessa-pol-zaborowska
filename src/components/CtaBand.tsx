import type { SiteSettings } from "@/lib/types";

export default function CtaBand({ site }: { site: SiteSettings }) {
  return (
    <section className="band cta-band">
      <h2 className="display center">{site.cta.title.pl}</h2>
      <div className="cta-actions">
        <a className="btn-light" href={site.cta.href}>{site.cta.buttonLabel.pl} →</a>
      </div>
    </section>
  );
}
