import { NextSeo, NextSeoProps } from 'next-seo';

interface SeoProps extends NextSeoProps {
  pageTitle: string;
  url: string;
}

export function SEO({ pageTitle, url }: SeoProps) {
  const description = `SportsCentral | ${pageTitle}`;

  return (
    <NextSeo
      title={pageTitle}
      description={description}
      openGraph={{
        type: 'website',
        locale: 'en',
        site_name: 'SportsCentral',
        url,
        title: pageTitle,
        description,
        images: [
          {
            url: '/seo/thumbnail.png',
            alt: pageTitle,
            width: 1280,
            height: 720
          }
        ]
      }}
      additionalLinkTags={[
        {
          rel: 'icon',
          href: '/favicon.ico'
        }
      ]}
    />
  );
}
