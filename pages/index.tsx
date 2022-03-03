import Head from 'next/head';

import Footer from '../components/Footer';
import MobileTopBar from '../components/MobileTopBar';
import StartSubmission from '../components/StartSubmission';
import Steps from '../components/Steps';

export default function Index() {
  return (
    <div className="w-full">
      <Head>
        <title>cobogo - submit</title>
      </Head>

      <div className="grid grid-rows-1 sm:grid-rows-[870px_70px] grid-cols-1 sm:grid-cols-[332px_1fr]">
        <MobileTopBar />

        <Steps />

        <StartSubmission />

        <Footer />
      </div>
    </div>
  );
}
