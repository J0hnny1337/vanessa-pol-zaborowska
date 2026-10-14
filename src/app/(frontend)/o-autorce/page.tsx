import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPageHeader, getSite } from "@/content/data";
import PageHero from "@/components/PageHero";
import BioSection from "@/components/BioSection";
import CtaBand from "@/components/CtaBand";

export const metadata: Metadata = { title: "O Autorce" };

export default async function AboutPage() {
  const header = await getPageHeader("o-autorce");
  if (!header) notFound();
  const site = await getSite();

  return (
    <>
      <PageHero eyebrow={header.eyebrow} title={header.title} subtitle={header.subtitle} />
      <BioSection site={site} hideTitle />
      <CtaBand site={site} />
    </>
  );
}
