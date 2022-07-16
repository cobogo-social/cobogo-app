import Image from 'next/image';

import Button from '../Button';

export default function Stake() {
  return (
    <section className="flex w-full px-[150px] py-[70px] relative justify-center items-center">
      <div className="flex max-w-[1010px] w-full justify-between items-center">
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

            <a
              target="_blank"
              href="https://docs.cobogo.social/"
              className="font-bold"
              rel="noreferrer"
            >
              view docs
            </a>
          </div>
        </div>

        <div className="w-[345px] h-[481px] z-10">
          <Image
            src="/images/stake-sample.png"
            width={348}
            height={481}
            alt="stake sample"
          />
        </div>

        {/* <div className="w-[345px] h-[481px] z-10">
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
              borderSize="border"
            />

            <Button text="stake" color="bg-blue" />
          </div>
        </div> */}
      </div>
    </section>
  );
}
