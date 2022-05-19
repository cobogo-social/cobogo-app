import '@styles/globals.css';

import { SessionProvider } from 'next-auth/react';
import { DefaultSeo } from 'next-seo';
import { AppProps } from 'next/app';

import SEO from '../next-seo-config';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo
        {...SEO}
        additionalMetaTags={[
          {
            property: 'twitter:card',
            content: 'summary_large_image',
          },
          {
            property: 'twitter:description',
            content:
              'cobogo is an aggregator of protocols that has the goal of funding Content Creators sustainably through their own community, using DeFi. It is a platform that leverages Web 3.0 to monetize Creators while maximizing their growth and community building abilities.',
          },
          {
            property: 'twitter:title',
            content: 'cobogo',
          },
          {
            property: 'twitter:image',
            content: '/images/open-graph.png',
          },
        ]}
      />

      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
}

export default MyApp;
