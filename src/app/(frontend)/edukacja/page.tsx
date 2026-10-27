import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContentPage, getPageHeader, getSite } from "@/content/data";
import PageHero from "@/components/PageHero";
import ContentBody from "@/components/ContentBody";
import CtaBand from "@/components/CtaBand";

export const metadata: Metadata = { title: "Edukacja" };

export default async function EducationPage() {
  const [header, page, site] = await Promise.all([getPageHeader("edukacja"), getContentPage("edukacja"), getSite()]);
  if (!header || !page) notFound();

  return (
    <>
      <PageHero eyebrow={header.eyebrow} title={header.title} subtitle={header.subtitle} />
      <ContentBody page={page} />
      <CtaBand site={site} title="Umów lekcje" buttonLabel="Umów lekcje" />
    </>
  );
}
