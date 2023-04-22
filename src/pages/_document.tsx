import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class AppDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Titillium+Web:ital,wght@0,200;0,300;0,400;0,700;0,900;1,200&display=swap"
            rel="stylesheet"
          />
          <link rel="shortcut icon" href="/web/favicon.ico" type="image" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/web/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/web/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/web/favicon-16x16.png"
          />
          <link
            rel="mask-icon"
            href="/web/safari-pinned-tab.svg"
            color="#00875f"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
