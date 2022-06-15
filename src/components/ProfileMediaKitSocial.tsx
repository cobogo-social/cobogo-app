import Image from 'next/image';

export default function ProfileMediaKitSocial(): JSX.Element {
  return (
    <div className="flex w-full px-[150px] py-[70px] relative justify-between items-center">
      <div className="flex hover:cursor-pointer absolute top-[30px] left-[30px]">
        <Image
          src="/images/edit-icon.svg"
          width={30}
          height={28}
          alt="edit icon"
        />
      </div>

      <div className="flex flex-col">
        <div className="flex mb-[90px]">
          <div className="mr-[27px] flex">
            <Image
              src="/images/ytb-icon.svg"
              width={74}
              height={42}
              alt="youtube icon"
            />
          </div>

          <div className="flex flex-col">
            <p className="font-bold text-[45px]">3.87M</p>
            <p className="font-bold text-gray6">subscribers</p>
            <p className="font-bold text-blue">visit channel</p>
          </div>
        </div>

        <div className="flex">
          <div className="mr-[27px] flex">
            <Image
              src="/images/tiktok-icon.svg"
              width={74}
              height={56}
              alt="tiktok icon"
            />
          </div>

          <div className="flex flex-col">
            <p className="font-bold text-[45px]">3.87M</p>
            <p className="font-bold text-gray6">subscribers</p>
            <p className="font-bold text-blue">visit channel</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex mb-[90px]">
          <div className="mr-[27px] flex">
            <Image
              src="/images/instagram-icon.svg"
              width={74}
              height={56}
              alt="instagram icon"
            />
          </div>

          <div className="flex flex-col">
            <p className="font-bold text-[45px]">3.87M</p>
            <p className="font-bold text-gray6">subscribers</p>
            <p className="font-bold text-blue">visit channel</p>
          </div>
        </div>

        <div className="flex">
          <div className="mr-[27px] flex">
            <Image
              src="/images/twitter-icon.svg"
              width={74}
              height={74}
              alt="twitter icon"
            />
          </div>

          <div className="flex flex-col">
            <p className="font-bold text-[45px]">3.87M</p>
            <p className="font-bold text-gray6">subscribers</p>
            <p className="font-bold text-blue">visit channel</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex mb-[90px]">
          <div className="mr-[27px] flex">
            <Image
              src="/images/twitch-icon.svg"
              width={74}
              height={58}
              alt="twitch icon"
            />
          </div>

          <div className="flex flex-col">
            <p className="font-bold text-[45px]">3.87M</p>
            <p className="font-bold text-gray6">subscribers</p>
            <p className="font-bold text-blue">visit channel</p>
          </div>
        </div>

        <div className="flex">
          <div className="mr-[27px] flex">
            <Image
              src="/images/discord-icon.svg"
              width={74}
              height={65}
              alt="discord icon"
            />
          </div>

          <div className="flex flex-col">
            <p className="font-bold text-[45px]">3.87M</p>
            <p className="font-bold text-gray6">subscribers</p>
            <p className="font-bold text-blue">visit channel</p>
          </div>
        </div>
      </div>
    </div>
  );
}
