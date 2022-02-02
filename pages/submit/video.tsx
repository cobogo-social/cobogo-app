import Video from '../../components/Video';
import Footer from '../../components/Footer';
import Steps from '../../components/Steps';

export default function Index() {
  return (
    <div className="w-full">
      <div className="grid grid-rows-[945px_70px] grid-cols-[332px_1fr]">
        <Steps />
        <Video />

        <Footer />
      </div>
    </div>
  );
}
