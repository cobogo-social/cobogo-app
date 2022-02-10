import Head from 'next/head';
import Connect from '../../components/Connect';
import Footer from '../../components/Footer';
import Steps from '../../components/Steps';

export default function Index() {
  return (
    <div className="w-full">
      <Head>
        <title>cobogo - submit</title>
      </Head>
      <div className="grid grid-rows-[945px_70px] grid-cols-[332px_1fr]">
        <Steps />
        <Connect />

        <Footer />
      </div>
    </div>
  );
}
