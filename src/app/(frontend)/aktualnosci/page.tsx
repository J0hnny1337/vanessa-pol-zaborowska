import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContentPage, getNewsList, getPageHeader, getSite } from "@/content/data";
import PageHero from "@/components/PageHero";
import NewsList from "@/components/NewsList";
import GalleryBand from "@/components/GalleryBand";
import CtaBand from "@/components/CtaBand";

export const metadata: Metadata = { title: "Aktualności" };

export default async function NewsPage() {
  const [header, page, site, news] = await Promise.all([getPageHeader("aktualnosci"), getContentPage("aktualnosci"), getSite(), getNewsList()]);
  if (!header || !page) notFound();

  return (
    <>
      <PageHero eyebrow={header.eyebrow} title={header.title} subtitle={header.subtitle} />
      <NewsList items={news} />
      {page.gallery && page.gallery.photos.length > 0 && <GalleryBand title={page.gallery.title} items={page.gallery.photos} ratio="4 / 3" />}
      <CtaBand site={site} />
    </>
  );
}
