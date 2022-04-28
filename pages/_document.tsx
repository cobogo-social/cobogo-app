import Document, { Head, Html, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="shortcut icon" href="/favicon.ico" type="image/ico" />

          <meta
            name="description"
            content="cobogo is an aggregator of protocols that has the goal of funding Content Creators sustainably through their own community, using DeFi. It is a platform that leverages Web 3.0 to monetize Creators while maximizing their growth and community building abilities."
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
