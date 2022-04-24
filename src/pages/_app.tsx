import type { AppProps } from 'next/app';
import DefaultLayout from '@/layouts/DefaultLayout';
import '@/resources/styles/colors.css';
import '@/resources/styles/light-theme.css';
import '@/resources/styles/reset.css';
import '@/resources/fonts/RFTone/main.css';
import '@/resources/styles/article-blocks.css';
import '@/resources/styles/main.css';

function App({ Component, pageProps }: AppProps) {
  return (
    <DefaultLayout>
      <Component {...pageProps} />
    </DefaultLayout>
  );
}

export default App;
