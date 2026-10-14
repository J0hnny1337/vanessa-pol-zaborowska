import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContentPage, getPageHeader, getSite } from "@/content/data";
import PageHero from "@/components/PageHero";
import ContentBody from "@/components/ContentBody";
import CtaBand from "@/components/CtaBand";

export const metadata: Metadata = { title: "Kontakt" };

export default async function ContactPage() {
  const [header, page, site] = await Promise.all([getPageHeader("kontakt"), getContentPage("kontakt"), getSite()]);
  if (!header || !page) notFound();

  return (
    <>
      <PageHero eyebrow={header.eyebrow} title={header.title} subtitle={header.subtitle} />
      <ContentBody page={page}>
        <ul className="plain contact-list">
          {site.phone && <li><span className="caps muted">Telefon</span> <a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a></li>}
          <li><span className="caps muted">E-mail</span> <a href={`mailto:${site.email}`}>{site.email}</a></li>
        </ul>
      </ContentBody>
      <CtaBand site={site} />
    </>
  );
}
