import Footer from '../../components/Footer';
import Network from '../../components/Network';
import Steps from '../../components/Steps';

export default function Index() {
  

  return (
    <div className="w-full">
      <div className="grid grid-rows-[945px_70px] grid-cols-[332px_1fr]">
        <Steps />
        <Network />

        <Footer />
      </div>
    </div>
  );
}
