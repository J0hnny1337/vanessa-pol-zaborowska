import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPageHeader, getPaintings, getPortfolioSections, getSeries, getSite } from "@/content/data";
import PageHero from "@/components/PageHero";
import PortfolioSections from "@/components/PortfolioSections";
import CtaBand from "@/components/CtaBand";

export const metadata: Metadata = { title: "Portfolio" };

export default async function PortfolioPage() {
  const header = await getPageHeader("portfolio");
  if (!header) notFound();
  const [site, sections, series, paintings] = await Promise.all([getSite(), getPortfolioSections(), getSeries(), getPaintings()]);

  return (
    <>
      <PageHero eyebrow={header.eyebrow} title={header.title} subtitle={header.subtitle} />
      <PortfolioSections sections={sections} series={series} paintings={paintings} />
      <CtaBand site={site} />
    </>
  );
}
