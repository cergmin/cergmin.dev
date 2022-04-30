import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '@/components/Header';

export interface DefaultLayoutProps {
  children: ReactNode;
}

function DefaultLayout({ children }: DefaultLayoutProps) {
  const router = useRouter();

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
          href="/resources/styles/light-theme.css"
          rel="stylesheet"
          media="(prefers-color-scheme: light)"
        />
        <link
          href="/resources/styles/dark-theme.css"
          rel="stylesheet"
          media="(prefers-color-scheme: dark)"
        />
      </Head>
      <Header />
      {children}
    </>
  );
}

export default DefaultLayout;
