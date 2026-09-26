import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head><script dangerouslySetInnerHTML={{ __html: `(function(){try{var v=localStorage.getItem('shonen-ark-appearance');var d=v==='dark'||(v!=='light'&&matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.dataset.theme=d?'dark':'light';document.documentElement.classList.add(d?'dark':'light')}catch(e){}})()` }} /></Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
