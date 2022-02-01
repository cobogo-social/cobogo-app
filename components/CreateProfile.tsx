import Image from 'next/image';
import Button from './Button';
import TopBar from './TopBar';

export default function Connect() {
  return (
    <div className="bg-primary w-full h-full p-8">
      <TopBar />
      <div className="flex flex-row justify-between items-start px-16">
        <div className="flex flex-col">
          <p className="text-4xl text-white">create profile</p>
          <p className="text-lg text-white mb-4">
            write a description to be visible on your public profile.
          </p>

          <textarea className="w-[432px] h-32 bg-black border-[1.5px] border-details mb-8 p-2 outline-none text-white" />

          <p className="text-lg text-white mb-4">choose a handle</p>
          <div className="flex">
            <div className="w-48 h-12 bg-secondary flex justify-center items-center border-[1.5px] border-r-0 border-details">
              <p className="text-white font-bold">https://cobogo-social/</p>
            </div>
            <input
              className="w-60 h-12 bg-black border-[1.5px] border-l-0 border-details mb-8 p-2 outline-none text-white"
              type="text"
            />
          </div>

          <p className="text-lg text-white mb-4">choose categories</p>
          <div className="flex">
            <div className="w-12 h-12 border-[1.5px] bg-black border-r-0 border-details flex justify-center items-center">
              <Image
                src="/images/search-icon.svg"
                width={19}
                height={19}
                alt="search icon"
              />
            </div>
            <input
              className="w-96 h-12 bg-black border-[1.5px] border-l-0 border-details mb-5 text-white p-2 outline-none"
              type="text"
            />
          </div>

          <div className="mb-12 w-24 h-8">
            <div className="bg-black border-[1.5px] border-details flex justify-center items-center p-1">
              <p className="font-bold text-white mr-2">SPACE</p>
              <Image
                src="/images/x-icon.svg"
                width={16}
                height={16}
                alt="x icon"
              />
            </div>
          </div>

          <Button
            text="send to review"
            color="bg-blue"
            hoverColor="brightness-90"
            width="w-40"
            height="h-9"
            fontSize=""
          />
        </div>
        <div className="w-[275px] h-[296px] bg-black border-[1.5px] border-details">
          <Image
            src="/images/space-official.svg"
            width={275}
            height={43}
            alt="space official"
          />

          <p className="font-bold text-white text-xl px-4">Space Official</p>
          <p className="text-white text-sm px-4">/spaceofficial</p>
          <p className="text-white px-4">
            Follow the latest Rocket launch webcasts, Conferences & more
            space-related Livestream events. SPACE (Official) provides a
            Platform for Aerospace companies (...)
          </p>
        </div>
      </div>
    </div>
  );
}
