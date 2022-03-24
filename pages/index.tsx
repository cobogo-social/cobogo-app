import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import Footer from '../components/Footer';
import PageWrapper from '../components/PageWrapper';
import StartSubmission from '../components/StartSubmission';
import Steps from '../components/Steps';

export default function Index() {
  const { query } = useRouter();

  useEffect(() => {
    if (query.ref) {
      sessionStorage.setItem('queryRef', query.ref as string);
    }
  }, []);

  return (
    <div className="w-full">
      <Head>
        <title>cobogo - submit</title>
      </Head>

      <PageWrapper>
        <Steps />

        <StartSubmission />

        <Footer />
      </PageWrapper>
    </div>
  );
}
