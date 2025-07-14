import Head from 'next/head';

export default function FanFeed() {
  return (
    <>
      <Head>
        <title>Fan Feed - Shonen Ark</title>
      </Head>
      <div className="max-w-4xl mx-auto px-6 py-8">
        <h1 className="text-4xl font-bold mb-6">Fan Feed</h1>
        <p className="text-[var(--text-secondary)]">Welcome to the Fan Feed!</p>
      </div>
    </>
  );
}
