import Head from 'next/head';

import Footer from '../../components/Footer';
import MobileTopBar from '../../components/MobileTopBar';
import PageWrapper from '../../components/PageWrapper';
import StartSubmission from '../../components/StartSubmission';
import Steps from '../../components/Steps';

export default function Index() {
  return (
    <div className="w-full">
      <Head>
        <title>cobogo - submit</title>
      </Head>

      <PageWrapper>
        <MobileTopBar haveSteps={false} />

        <Steps />

        <StartSubmission />

        <Footer />
      </PageWrapper>
    </div>
  );
}
