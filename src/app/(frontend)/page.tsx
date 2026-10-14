import { getHome, getNewsList, getPaintings, getSeries, getSite } from "@/content/data";
import Hero from "@/components/Hero";
import SeriesSection from "@/components/SeriesSection";
import NewsPreview from "@/components/NewsPreview";
import BioSection from "@/components/BioSection";
import CtaBand from "@/components/CtaBand";

export default async function HomePage() {
  const [site, home, series, paintings, news] = await Promise.all([getSite(), getHome(), getSeries(), getPaintings(), getNewsList()]);

  // Strona główna = lista bloków z CMS-a, renderowana po kolei.
  return (
    <>
      {home.blocks.map((block, i) => {
        switch (block.type) {
          case "hero": {
            const painting = block.paintingId ? paintings.find((p) => p.id === block.paintingId) : undefined;
            return <Hero key={i} site={site} painting={painting} quote={block.quote} />;
          }
          case "series": {
            const s = series.find((x) => x.id === block.seriesId);
            return s ? <SeriesSection key={i} series={s} paintings={paintings} href={`/portfolio/${s.id}`} /> : null;
          }
          case "news":
            return <NewsPreview key={i} items={news.slice(0, 3)} />;
          case "bio":
            return <BioSection key={i} site={site} />;
          case "cta":
            return <CtaBand key={i} site={site} />;
        }
      })}
    </>
  );
}
