import Head from 'next/head';

export default function MangaShowcaseRedirect() {
  return null;
}

export async function getServerSideProps() {
  return {
    redirect: {
      destination: '/',
      permanent: false,
    },
  };
}
