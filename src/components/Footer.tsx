import Link from "next/link";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import type { NavItem, SiteSettings } from "@/lib/types";

const socialIcons: Record<string, React.ReactNode> = {
  Instagram: <FaInstagram size={16} aria-hidden="true" />,
  Facebook: <FaFacebookF size={16} aria-hidden="true" />,
};

export default function Footer({ site, nav }: { site: SiteSettings; nav: NavItem[] }) {
  return (
    <footer className="footer">
      <div className="footer-in">
        <div className="footer-brand">
          <p className="caps strong">{site.artistName}</p>
          <p className="caps muted small">{site.tagline.pl}</p>
          <p className="muted">{site.footerNote.pl}</p>
          <ul className="social">
            {site.social.map((s) => (
              <li key={s.label}><a href={s.url} rel="noopener noreferrer" aria-label={s.label}>{socialIcons[s.label] ?? s.label.slice(0, 2)}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="caps">Menu</h4>
          <ul className="plain">
            {nav.map((item) => (
              <li key={item.href}><Link href={item.href}>{item.label.pl}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="caps">Kontakt</h4>
          <ul className="plain">
            {site.phone && <li><a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a></li>}
            <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bar">
        <span className="muted">© {new Date().getFullYear()} {site.artistName}</span>
        <ul className="legal">
          {site.legalLinks.map((l) => (
            <li key={l.label.pl}><a className="caps" href={l.href}>{l.label.pl}</a></li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
