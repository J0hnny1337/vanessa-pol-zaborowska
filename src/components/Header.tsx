"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import type { NavItem, SiteSettings } from "@/lib/types";

export default function Header({ site, nav }: { site: SiteSettings; nav: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const [subOpen, setSubOpen] = useState(false); // podmenu Portfolio na telefonie (domyślnie zwinięte)
  const pathname = usePathname();
  const close = () => { setOpen(false); setSubOpen(false); };
  // Zakładka jest aktywna na swojej podstronie i na jej podstronach (np. /obrazy/seria-a).
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="header">
      <div className="header-in">
        <div className="brand">
          <Link href="/" className="logo" onClick={close}>
            {site.logo ? (
              <Image src={site.logo.src} alt={site.logo.alt.pl} width={1200} height={483} priority />
            ) : (
              site.artistName
            )}
          </Link>
        </div>

        <button className="menu-toggle" aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen((v) => !v)}>
          Menu
        </button>

        <nav id="main-nav" className={`nav ${open ? "is-open" : ""}`} aria-label="Główna">
          {nav.map((item) =>
            item.children?.length ? (
              <div className={`nav-item has-sub ${subOpen ? "sub-open" : ""}`} key={item.href}>
                <Link href={item.href} onClick={close} aria-current={isActive(item.href) ? "page" : undefined}>
                  {item.label.pl} <span className="sub-arrow" aria-hidden="true">▾</span>
                </Link>
                <button type="button" className="sub-toggle" aria-expanded={subOpen} aria-label={`Pokaż serie: ${item.label.pl}`} onClick={() => setSubOpen((v) => !v)}>
                  <span aria-hidden="true">▾</span>
                </button>
                <ul className="sub">
                  {item.children.map((c) => (
                    <li key={c.href}>
                      <Link href={c.href} onClick={close} aria-current={pathname === c.href ? "page" : undefined}>
                        {c.label.pl} {c.note && <span className="muted">{c.note}</span>}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <Link key={item.href} href={item.href} onClick={close} aria-current={isActive(item.href) ? "page" : undefined}>
                {item.label.pl}
              </Link>
            ),
          )}
          <Link href="/kontakt" className="btn-dark" aria-current={isActive("/kontakt") ? "page" : undefined} onClick={close}>Kontakt</Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
