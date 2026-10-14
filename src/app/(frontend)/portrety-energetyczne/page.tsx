import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPaintings, getServicePage, getSite } from "@/content/data";
import PageHero from "@/components/PageHero";
import LeadBand from "@/components/LeadBand";
import ServiceBody from "@/components/ServiceBody";
import GalleryBand from "@/components/GalleryBand";
import CtaBand from "@/components/CtaBand";

export const metadata: Metadata = { title: "Portrety energetyczne" };

export default async function PortraitsPage() {
  const page = await getServicePage("portrety-energetyczne");
  if (!page) notFound();
  const [site, paintings] = await Promise.all([getSite(), getPaintings()]);
  const gallery = page.galleryPaintingIds.map((id) => paintings.find((p) => p.id === id)).filter((p) => !!p);

  return (
    <>
      <PageHero eyebrow={page.eyebrow} title={page.title} subtitle={page.subtitle} />
      <LeadBand text={page.lead} />
      <ServiceBody page={page} />
      <GalleryBand title={page.galleryTitle} items={gallery} id="galeria-portretow" />
      <CtaBand site={site} />
    </>
  );
}
