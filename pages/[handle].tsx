import Button from '@components/Button';
import ProfileMediaKitAnalytics from '@components/ProfileMediaKitAnalytics';
import ProfileServices from '@components/ProfileServices';
import ProfileVideos from '@components/ProfileVideos';
import TopBar from '@components/TopBar';
import Image from 'next/image';

export default function Index() {
  return (
    <div>
      <TopBar noOnboardedFriends noTokens transparent />

      <div className="w-full h-[308px] bg-blue" />

      <div className="flex w-full px-[150px] py-[70px] relative justify-between items-end bg-black">
        <div className="flex hover:cursor-pointer absolute top-[30px] left-[30px]">
          <Image
            src="/images/edit-icon.svg"
            width={30}
            height={28}
            alt="edit icon"
          />
        </div>

        <div className="flex justify-center items-center absolute top-[-30px]">
          <div className="w-[140px] h-[140px] bg-blue mr-[30px] shadow-[0_0px_4px_4px_rgba(0,0,0,0.25)]" />

          <div className="flex flex-col">
            <p className="text-[34px]">
              username{' '}
              <Image src="/images/success-icon.svg" width={22} height={22} />
            </p>

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
            borderColor="border-gray4"
            borderSize="border-[1px]"
            textColor="text-blue"
            icon="/images/link-icon.svg"
          />
        </div>

        <div>
          <div className="mb-[45px] w-[480px] h-[268px] bg-blue shadow-[0_0px_4px_4px_rgba(0,0,0,0.25)]" />

          <div className="flex justify-around items-center">
            <p className="font-bold text-violet">rocket</p>

            <p className="font-bold text-pink">sky</p>

            <p className="font-bold text-violet">rocket</p>

            <p className="font-bold text-pink">sky</p>

            <p className="font-bold text-violet">rocket</p>
          </div>
        </div>
      </div>

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
        openEditDistributionsModal={() => {}}
      />

      <ProfileServices services={[]} />

      <ProfileVideos title="teste" videos={[]} />

      <div className="flex w-full px-[150px] py-[70px] relative justify-between items-center">
        <Image
          src="/images/profile-bg.svg"
          objectFit="cover"
          layout="fill"
          alt="profile background"
        />

        <div className="z-10">
          <p className="text-[40px] w-[370px] mb-[30px]">
            take control over your{' '}
            <span className="font-bold">monetization</span>
          </p>

          <p className="text-[22px] w-[455px] mb-[45px]">
            cobogo has designed a unique{' '}
            <span className="font-bold">Staking</span>{' '}
            <span className="font-bold">Mechanism</span> that allows{' '}
            <span className="font-bold">Fans</span> to support their favorite{' '}
            <span className="font-bold">Creators</span> while earning rewards in
            the form of a split yield.
          </p>

          <div className="flex">
            <div className="flex mr-[10px]">
              <Image
                src="/images/gitbook-icon.svg"
                width={30}
                height={21}
                alt="gitbook icon"
              />
            </div>

            <p className="font-bold">view docs</p>
          </div>
        </div>

        <div className="w-[345px] h-[481px] z-10">
          <div className="flex w-full justify-between items-center bg-white/[0.05] p-[30px] mb-[1px]">
            <div>
              <p className="font-bold">your stake</p>

              <p className="text-blue font-bold mb-[17px]">
                - <span className="text-gray6">CBG</span>
              </p>

              <p className="font-bold">total staked</p>

              <p className="text-green font-bold">
                - <span className="text-gray6">CBG</span>
              </p>
            </div>

            <div>
              <p className="font-bold">your rewards</p>

              <p className="text-blue font-bold mb-[17px]">
                - <span className="text-gray6">CBG</span>
              </p>

              <p className="font-bold">youtuber rewards</p>

              <p className="text-green font-bold">
                - <span className="text-gray6">CBG</span>
              </p>
            </div>
          </div>

          <div className="flex flex-col w-full justify-start items-start bg-white/[0.08] p-[30px] mb-[1px]">
            <p className="font-bold mb-[10px]">
              top stakers <span className="text-gray6">(-)</span>{' '}
            </p>

            <div className="flex w-full mb-[10px] justify-between">
              <div className="flex">
                <Image
                  src="/images/wallet-icon.svg"
                  width={26}
                  height={22}
                  alt="wallet icon"
                />

                <p className="ml-[10px] font-bold">wallet address</p>
              </div>

              <p className="text-green font-bold ml-[10px]">
                - <span className="text-gray6">CBG</span>
              </p>
            </div>

            <div className="flex w-full mb-[10px] justify-between">
              <div className="flex">
                <Image
                  src="/images/wallet2-icon.svg"
                  width={26}
                  height={22}
                  alt="wallet icon"
                />

                <p className="ml-[10px] font-bold">wallet address</p>
              </div>

              <p className="text-green font-bold ml-[10px]">
                - <span className="text-gray6">CBG</span>
              </p>
            </div>

            <div className="flex w-full mb-[10px] justify-between">
              <div className="flex">
                <Image
                  src="/images/wallet-icon.svg"
                  width={26}
                  height={22}
                  alt="wallet icon"
                />

                <p className="ml-[10px] font-bold">wallet address</p>
              </div>

              <p className="text-green font-bold ml-[10px]">
                - <span className="text-gray6">CBG</span>
              </p>
            </div>

            <div className="flex w-full justify-between">
              <div className="flex">
                <Image
                  src="/images/wallet2-icon.svg"
                  width={26}
                  height={22}
                  alt="wallet icon"
                />

                <p className="ml-[10px] font-bold">wallet address</p>
              </div>

              <p className="text-green font-bold ml-[10px]">
                - <span className="text-gray6">CBG</span>
              </p>
            </div>
          </div>

          <div className="flex w-full justify-between items-center bg-gradient-to-b from-white/[0.05] to-white/[0.0] p-[30px]">
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
