import { notFound } from 'next/navigation';
import { getArticleBySlug } from '@/lib/data';

export async function generateMetadata({ params }) {
  const article = getArticleBySlug(params.slug);
  if (!article) return {};
  return { title: article.title, description: article.excerpt };
}

export default function ArticleDetailPage({ params }) {
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();

  const date = article.published_at ? new Date(article.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '';

  return (
    <>
      <section className="bg-emerald-deep text-white">
        <div className="container-x py-16 sm:py-20 max-w-3xl">
          {article.category && <span className="eyebrow text-gold-light">{article.category}</span>}
          <h1 className="font-display text-3xl sm:text-4xl mt-4">{article.title}</h1>
          {date && <p className="mt-4 text-sand/60 text-sm">{date}</p>}
        </div>
        <div className="arch-row text-sand" />
      </section>
      <article className="container-x py-16 sm:py-20 max-w-3xl">
        {article.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={article.image} alt={article.title} className="w-full h-72 sm:h-96 object-cover mb-10" />
        )}
        <div className="prose-content text-ink/75 text-lg whitespace-pre-line">{article.content}</div>
      </article>
    </>
  );
}
