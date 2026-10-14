import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPageHeader, getPaintings, getSeries, getSite } from "@/content/data";
import PageHero from "@/components/PageHero";
import SeriesSection from "@/components/SeriesSection";
import CtaBand from "@/components/CtaBand";

export const metadata: Metadata = { title: "Portfolio" };

export default async function PaintingsPage() {
  const header = await getPageHeader("portfolio");
  if (!header) notFound();
  const [site, series, paintings] = await Promise.all([getSite(), getSeries(), getPaintings()]);

  return (
    <>
      <PageHero eyebrow={header.eyebrow} title={header.title} subtitle={header.subtitle} />
      {series.map((s) => (
        <SeriesSection key={s.id} series={s} paintings={paintings} href={`/portfolio/${s.id}`} />
      ))}
      <CtaBand site={site} />
    </>
  );
}
