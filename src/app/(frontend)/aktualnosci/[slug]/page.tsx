import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getNewsArticle, getNewsList, getSite } from "@/content/data";
import Art from "@/components/Art";
import Article from "@/components/Article";
import ContactBand from "@/components/ContactBand";
import { formatDate } from "@/components/NewsList";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getNewsList()).map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const a = await getNewsArticle(slug);
  return { title: a ? `${a.title} · Aktualności` : "Aktualności", description: a?.excerpt };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const [article, site] = await Promise.all([getNewsArticle(slug), getSite()]);
  if (!article) notFound();

  return (
    <>
      <article className="article-page">
        <div className="wide narrow-col">
          <p className="back"><Link href="/aktualnosci" className="text-link">← Aktualności</Link></p>
          <h1 className="intro-title">{article.title}</h1>
          <p className="intro-lead">{formatDate(article.date)}{article.place && `, ${article.place}`}</p>
          {article.cover?.image && (
            <figure className="article-cover">
              <Art image={article.cover.image} placeholder={article.cover.placeholder} ratio={article.cover.ratio} priority sizes="(min-width: 900px) 760px, 100vw" />
            </figure>
          )}
          <Article data={article.content} />
        </div>
      </article>
      <ContactBand site={site} />
    </>
  );
}
