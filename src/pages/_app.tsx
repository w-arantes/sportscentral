import type { AppProps } from 'next/app';
import { Providers } from './_providers';

import { Header, Footer } from '@/layout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </Providers>
  );
}
