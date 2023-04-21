import type { AppProps } from 'next/app';
import { Titillium_Web } from 'next/font/google';

import { Providers } from './_providers';

const defaultFontFamily = Titillium_Web({
  weight: ['400', '600', '700'],
  style: ['normal'],
  subsets: ['latin']
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <main className={defaultFontFamily.className}>
        <Component {...pageProps} />
      </main>
    </Providers>
  );
}
