import ConnectWallet from '../../components/ConnectWallet';
import Footer from '../../components/Footer';
import Steps from '../../components/Steps';

export default function Index() {
  return (
    <div className="w-full">
      <div className="grid grid-rows-[945px_70px] grid-cols-[332px_1fr]">
        <Steps />
        <ConnectWallet />

        <Footer />
      </div>
    </div>
  );
}