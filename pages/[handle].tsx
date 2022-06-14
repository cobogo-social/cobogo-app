import Button from '@components/Button';
import ProfileMediaKitAnalytics from '@components/ProfileMediaKitAnalytics';
import ProfileServices from '@components/ProfileServices';
import ProfileVideos from '@components/ProfileVideos';
import TopBar from '@components/TopBar';
import Image from 'next/image';

export default function Index() {
  return (
    <div>
      <TopBar noOnboardedFriends noTokens />

      <div className="w-full h-[308px] bg-blue" />

      <div className="flex w-full h-[482px] px-[150px] py-[70px] relative justify-between items-end bg-black">
        <div className="flex justify-center items-center absolute top-[-30px]">
          <div className="w-[140px] h-[140px] bg-red mr-[30px]" />

          <div className="flex flex-col">
            <p className="text-[34px]">username</p>

            <p className="text-[20px]">channel</p>
          </div>
        </div>

        <div>
          <p className="text-[22px]">about</p>

          <p className="w-[464px] mb-[30px]">
            Follow the latest Rocket launch webcasts, Conferences & more
            space-related Livestream events. SPACE (Official) provides a
            Platform for Aerospace companies, nonprofit organizations &
            scientists to communicate their work to the general public,
            decreasing the knowledge gap between academia and society.
          </p>

          <Button
            text="website"
            color="bg-primary"
            borderColor="border-gray4"
            borderSize="border-[1px]"
            textColor="text-blue"
            icon="/images/link-icon.svg"
          />
        </div>

        <div>
          <div className="mb-[45px]">
            <Image
              src="/images/video.svg"
              width={480}
              height={268}
              alt="video"
            />
          </div>

          <div className="flex justify-around items-center">
            <p className="font-bold text-violet">rocket</p>

            <p className="font-bold text-pink">sky</p>

            <p className="font-bold text-violet">rocket</p>

            <p className="font-bold text-pink">sky</p>

            <p className="font-bold text-violet">rocket</p>
          </div>
        </div>
      </div>

      <div className="flex w-full h-[439px] px-[150px] py-[70px] relative justify-between items-center">
        <div className="flex flex-col">
          <div className="flex mb-[90px]">
            <div className="mr-[27px] flex">
              <Image src="/images/ytb-icon.svg" width={74} height={42} />
            </div>

            <div className="flex flex-col">
              <p className="font-bold text-[45px]">3.87M</p>
              <p className="font-bold text-gray6">subscribers</p>
              <p className="font-bold text-blue">visit channel</p>
            </div>
          </div>

          <div className="flex">
            <div className="mr-[27px] flex">
              <Image src="/images/tiktok-icon.svg" width={74} height={56} />
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
              <Image src="/images/instagram-icon.svg" width={74} height={56} />
            </div>

            <div className="flex flex-col">
              <p className="font-bold text-[45px]">3.87M</p>
              <p className="font-bold text-gray6">subscribers</p>
              <p className="font-bold text-blue">visit channel</p>
            </div>
          </div>

          <div className="flex">
            <div className="mr-[27px] flex">
              <Image src="/images/twitter-icon.svg" width={74} height={74} />
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
              <Image src="/images/twitch-icon.svg" width={74} height={58} />
            </div>

            <div className="flex flex-col">
              <p className="font-bold text-[45px]">3.87M</p>
              <p className="font-bold text-gray6">subscribers</p>
              <p className="font-bold text-blue">visit channel</p>
            </div>
          </div>

          <div className="flex">
            <div className="mr-[27px] flex">
              <Image src="/images/discord-icon.svg" width={74} height={65} />
            </div>

            <div className="flex flex-col">
              <p className="font-bold text-[45px]">3.87M</p>
              <p className="font-bold text-gray6">subscribers</p>
              <p className="font-bold text-blue">visit channel</p>
            </div>
          </div>
        </div>
      </div>

      <ProfileMediaKitAnalytics
        audienceGenderDistribution18={25}
        audienceGenderDistribution2534={50}
        audienceGenderDistribution35={25}
        audienceTopCountries1={20}
        audienceTopCountries2={20}
        audienceTopCountries3={40}
        audienceGenderDistributionMen={50}
        audienceGenderDistributionWomen={50}
        isOwner
        openEditDistributionsModal={() => {}}
      />

      <ProfileServices services={[]} isOwner />

      <ProfileVideos title="teste" videos={[]} />

      <div className="flex w-full h-[621px] px-[150px] py-[70px] relative justify-between items-end">
        <Image src="/images/profile-bg.svg" objectFit="cover" layout="fill" />

        <div className="z-10">
          <p className="text-[40px] w-[370px]">
            ut enim staking ad veniam quis
          </p>

          <p className="text-[22px] w-[438px]">
            sed ut perspiciatis unde omnis iste natus error sit crypto
            accusantium doloremque laudantium.
          </p>
        </div>

        <div className="w-[345px] h-[481px] z-10 p-[30px]">
          <div className="flex w-full justify-between items-center h-[97px]">
            <Button
              text="withdraw"
              borderColor="border-violet"
              borderSize="border-[1px]"
            />

            <Button text="stake" color="bg-blue" />
          </div>
        </div>
      </div>
    </div>
  );
}
