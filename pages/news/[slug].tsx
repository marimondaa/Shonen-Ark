import Head from 'next/head';
import Link from 'next/link';
import { getNewsBySlug, NewsItem } from '../../src/lib/news';
import { GetServerSideProps } from 'next';
import Image from 'next/image';

type Props = { item: NewsItem | null };

export default function NewsDetailPage({ item }: Props) {
  if (!item) {
    return (
      <div className="min-h-screen transition-colors dark:bg-background dark:text-text-light">
        <div className="max-w-3xl mx-auto px-4 py-24 text-center">
          <h1 className="text-2xl font-bold">Article not found</h1>
          <Link className="text-purple underline" href="/news">Back to News</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen transition-colors dark:bg-background dark:text-text-light">
      <Head>
        <title>{item.title} - Shonen Ark</title>
      </Head>
      <article className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold">{item.title}</h1>
        <div className="text-sm text-gray-500 dark:text-grey mt-1">{item.published_at ? new Date(item.published_at).toLocaleString() : ''}</div>
        {item.cover_image && (
          <div className="w-full rounded-xl mt-6 overflow-hidden">
            <Image
              src={item.cover_image}
              alt={item.title}
              width={1200}
              height={630}
              className="w-full h-auto rounded-xl"
              unoptimized
              priority={false}
            />
          </div>
        )}
        {item.excerpt && <p className="mt-6 text-gray-600 dark:text-grey">{item.excerpt}</p>}
        {item.content && (
          <div className="prose prose-neutral dark:prose-invert max-w-none mt-6" dangerouslySetInnerHTML={{ __html: item.content }} />
        )}
        <div className="mt-10">
          <Link className="text-purple underline" href="/news">← Back to News</Link>
        </div>
      </article>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const slug = ctx.params?.slug as string;
  try {
    const item = await getNewsBySlug(slug);
    return { props: { item } };
  } catch (e) {
    return { props: { item: null } };
  }
};
