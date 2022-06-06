import '@styles/globals.css';

import ErrorModal from '@components/ErrorModal';
import Loading from '@components/Loading';
import { ErrorProvider } from '@contexts/ErrorContext';
import { LoadingProvider } from '@contexts/LoadingContext';
import { SessionProvider } from 'next-auth/react';
import { DefaultSeo } from 'next-seo';
import { AppProps } from 'next/app';

import SEO from '../next-seo-config';

export default function MyApp({ Component, pageProps }: AppProps) {
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
          {
            property: 'twitter:url',
            content: 'https://app.cobogo.social/',
          },
          {
            property: 'twitter:domain',
            content: 'app.cobogo.social',
          },
          {
            property: 'twitter:image:alt',
            content: 'cobogo logo',
          },
        ]}
      />

      <LoadingProvider>
        <ErrorProvider>
          <SessionProvider session={pageProps.session}>
            <Loading />
            <ErrorModal />

            <Component {...pageProps} />
          </SessionProvider>
        </ErrorProvider>
      </LoadingProvider>
    </>
  );
}
