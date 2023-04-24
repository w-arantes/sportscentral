import type { AppProps } from 'next/app';
import { Providers } from './_providers';
import { Layout } from './_layout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Providers>
  );
}
