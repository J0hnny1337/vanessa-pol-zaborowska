import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPaintings, getSeries, getSite } from "@/content/data";
import PageHero from "@/components/PageHero";
import SeriesSection from "@/components/SeriesSection";
import CtaBand from "@/components/CtaBand";

type Props = { params: Promise<{ seria: string }> };

// Każda seria ma własny adres: /portfolio/<id-serii>.
export async function generateStaticParams() {
  const series = await getSeries();
  return series.map((s) => ({ seria: s.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { seria } = await params;
  const s = (await getSeries()).find((x) => x.id === seria);
  return { title: s ? `${s.name.pl} · Portfolio` : "Portfolio" };
}

export default async function SeriesPage({ params }: Props) {
  const { seria } = await params;
  const [site, series, paintings] = await Promise.all([getSite(), getSeries(), getPaintings()]);
  const s = series.find((x) => x.id === seria);
  if (!s) notFound();

  return (
    <>
      <PageHero eyebrow={{ pl: "Portfolio", en: "Portfolio" }} title={s.name} subtitle={{ pl: s.years, en: s.years }} />
      <SeriesSection series={s} paintings={paintings} hideTitle />
      <CtaBand site={site} />
    </>
  );
}
