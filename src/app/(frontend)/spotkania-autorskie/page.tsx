import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContentPage, getPageHeader, getSite } from "@/content/data";
import PageHero from "@/components/PageHero";
import ContentBody from "@/components/ContentBody";
import CtaBand from "@/components/CtaBand";

export const metadata: Metadata = { title: "Spotkania autorskie" };

export default async function ArtistTalksPage() {
  const [header, page, site] = await Promise.all([getPageHeader("spotkania-autorskie"), getContentPage("spotkania-autorskie"), getSite()]);
  if (!header || !page) notFound();

  return (
    <>
      <PageHero eyebrow={header.eyebrow} title={header.title} subtitle={header.subtitle} />
      <ContentBody page={page} />
      <CtaBand site={site} />
    </>
  );
}
