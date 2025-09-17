import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  // Force dark mode globally via the HTML class
  return (
    <Html lang="en" className="dark">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
