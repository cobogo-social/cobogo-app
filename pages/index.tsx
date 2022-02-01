import Image from 'next/image';
import Link from 'next/link';
import Footer from '../components/Footer';
import StartSubmission from '../components/StartSubmission';
import Steps from '../components/Steps';

export default function Home() {
  return (
    <div className="w-full">
      <div className="grid grid-rows-[945px_70px] grid-cols-[332px_1fr]">
        <Steps />
        <StartSubmission />

        <Footer />
      </div>
    </div>
  );
}
