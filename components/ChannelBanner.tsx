import Image from 'next/image';

export default function ChannelBanner() {
  return (
    <div className="w-[275px] h-[296px] bg-black border-[1.5px] border-details">
      <Image
        src="/images/space-official.svg"
        width={275}
        height={43}
        alt="space official"
      />

      <p className="font-bold text-white text-xl px-4 mt-6">Space Official</p>
      <p className="text-white text-sm px-4">/spaceofficial</p>
      <p className="text-white px-4">
        Follow the latest Rocket launch webcasts, Conferences & more
        space-related Livestream events. SPACE (Official) provides a Platform
        for Aerospace companies (...)
      </p>
    </div>
  );
}
