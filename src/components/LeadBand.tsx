import type { L10n } from "@/lib/types";

export default function LeadBand({ text }: { text: L10n }) {
  return (
    <section className="band lead-band">
      <div className="lead">
        <p className="pl">{text.pl}</p>
      </div>
    </section>
  );
}
