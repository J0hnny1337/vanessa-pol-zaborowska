import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import type { NavItem, SiteSettings } from "@/lib/types";
import { getPaintings } from "@/content/data";
import Art from "./Art";

const socialIcons: Record<string, React.ReactNode> = {
  Instagram: <FaInstagram size={18} aria-hidden="true" />,
  Facebook: <FaFacebookF size={18} aria-hidden="true" />,
};

// Obraz w stopce: duży, mocno przycięty fragment.
const FOOTER_PAINTING = "baltyk";

/** Stopka: po lewej fragment obrazu, po prawej podpis, menu dużym pismem i kontakt. */
export default async function Footer({ site, nav }: { site: SiteSettings; nav: NavItem[] }) {
  const painting = (await getPaintings()).find((p) => p.id === FOOTER_PAINTING);
  return (
    <footer className="footer">
      {painting && (
        <div className="footer-pic">
          <Art image={painting.image} placeholder={painting.placeholder} ratio="auto" sizes="50vw" />
        </div>
      )}
      <div className="footer-side">
        {site.logo ? (
          <Image className="footer-sign" src={site.logo.src} alt={site.logo.alt.pl} width={1200} height={483} />
        ) : (
          <p className="footer-name">{site.artistName}</p>
        )}
        <p className="footer-note">{site.footerNote.pl}</p>

        <nav aria-label="Stopka">
          <ul className="footer-menu">
            {nav.map((item) => (
              <li key={item.href}><Link href={item.href}>{item.label.pl}</Link></li>
            ))}
            <li><Link href="/kontakt">Kontakt</Link></li>
          </ul>
        </nav>

        <div className="footer-blocks">
          <div>
            <h2>Kontakt</h2>
            <ul className="plain">
              {site.phone && <li><a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a></li>}
              <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
            </ul>
          </div>
          <div>
            <h2>Obserwuj</h2>
            <ul className="social">
              {site.social.map((s) => (
                <li key={s.label}><a href={s.url} rel="noopener noreferrer" aria-label={s.label}>{socialIcons[s.label] ?? s.label}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-bar">
          <span>© {new Date().getFullYear()} {site.artistName}</span>
          <ul className="legal">
            {site.legalLinks.map((l) => (
              <li key={l.label.pl}><a href={l.href}>{l.label.pl}</a></li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
