import type { Metadata } from "next";
import "@fontsource-variable/jost";
import "./globals.css";
import { getNavigation, getSite } from "@/content/data";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";

// Ustawia zapisany motyw przed pierwszym malowaniem, żeby uniknąć błysku. Klasa "js" włącza animacje wejścia (bez skryptu treść jest od razu widoczna).
const THEME_INIT = `document.documentElement.classList.add("js");try{if(localStorage.getItem("theme")==="dark")document.documentElement.dataset.theme="dark"}catch(e){}`;

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  // Podstrony ustawiają własny tytuł, np. "O mnie" → "O mnie · Imię Nazwisko".
  return {
    title: { default: `${site.artistName} · ${site.tagline.pl}`, template: `%s · ${site.artistName}` },
    description: site.tagline.pl,
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [site, nav] = await Promise.all([getSite(), getNavigation()]);
  return (
    <html lang="pl" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
      </head>
      <body>
        <a className="skip" href="#content">Przejdź do treści</a>
        <Header site={site} nav={nav} />
        <main id="content">{children}</main>
        <Footer site={site} nav={nav} />
        <Reveal />
      </body>
    </html>
  );
}
