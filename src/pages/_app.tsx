import type { AppProps } from 'next/app';

import { Providers } from './_providers';

import { Header } from '@/layout/Header';
import { Footer } from '@/layout/Footer';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </Providers>
  );
}
