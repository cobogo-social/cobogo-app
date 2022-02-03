import Image from 'next/image';
import Link from 'next/link';
import Button from './Button';
import ChannelBanner from './ChannelBanner';
import TopBar from './TopBar';

export default function ConnectWallet() {
  return (
    <div className="bg-primary w-full h-full p-8">
      <TopBar />
      <div className="flex flex-row justify-between items-start px-16">
        <div className="flex flex-col">
          <p className="text-4xl text-white mb-4">connect wallet</p>
          <p className="text-xl text-white mb-4">MetaMask</p>
          <p className="text-white w-[408px] mb-12">
            available as a browser extension and as a mobile app, MetaMask
            equips you with a key vault, secure login, token wallet, and token
            exchange—everything you need to manage your digital assets.
          </p>

          <Link href="/submit/video">
            <a>
              <Button
                width="w-52"
                height="h-9"
                color="bg-orange"
                hoverColor="brightness-90"
                text="connect to MetaMask"
                fontSize=""
              />
            </a>
          </Link>
        </div>

        <Image
          src="/images/metamask-icon.svg"
          width={420}
          height={420}
          alt="metamask icon"
        />
      </div>
    </div>
  );
}
