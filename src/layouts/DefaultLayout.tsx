import { ReactNode } from 'react';
import Head from 'next/head';
import Header from '@/components/Header';

export interface DefaultLayoutProps {
  children: ReactNode;
}

function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Notes" />
        <meta name="robots" content="index, follow" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <title>Sergey Minakov</title>

        <link
          rel="icon"
          href="/resources/images/favicons/favicon.ico"
          sizes="any"
        />
        <link
          rel="apple-touch-icon"
          href="/resources/images/favicons/180x180_maskable.png"
        />
        <link
          rel="icon"
          href="/resources/images/favicons/favicon.svg"
          type="image/svg+xml"
        />

        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.15.3/dist/katex.min.css"
          integrity="sha384-KiWOvVjnN8qwAZbuQyWDIbfCLFhLXNETzBQjA/92pIowpC0d2O3nppDGQVgwd2nB"
          crossOrigin="anonymous"
        />
      </Head>
      <Header />
      {children}
    </>
  );
}

export default DefaultLayout;
