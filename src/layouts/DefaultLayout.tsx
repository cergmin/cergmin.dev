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
        <meta name="color-scheme" content="light" />
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
        <meta
          name="yandex-tableau-widget"
          content="logo=/resources/images/favicons/512x512.png, color=#024fbf"
        />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;1,500&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Header />
      {children}
    </>
  );
}

export default DefaultLayout;
