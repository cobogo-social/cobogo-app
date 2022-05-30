import Image from 'next/image';

export default function ProfileMediaKitAnalytics() {
  return (
    <div className="relative">
      <div className="absolute bottom-[-10px] w-full flex justify-center items-center">
        <div className="flex bg-gray7 px-[20px]">
          <p className=" font-bold text-blue mr-1">visit channel</p>

          <Image
            src="/images/link-icon.svg"
            width={15}
            height={15}
            alt="link icon"
          />
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex w-full justify-between px-[50px]">
          <div className="flex flex-col justify-between items-center">
            <div className="flex mb-[27px]">
              <div className="flex mr-[10px]">
                <Image
                  src="/images/ytb-icon.svg"
                  width={28}
                  height={22}
                  alt="youtube icon"
                />
              </div>

              <p className="font-bold text-[24px]">0</p>
            </div>

            <Image
              src="/images/selected-arrow.svg"
              width={14}
              height={7}
              alt="selected arrow"
            />
          </div>

          <div className="flex flex-col justify-between items-center">
            <div className="flex mb-[27px]">
              <div className="flex mr-[10px]">
                <Image
                  src="/images/instagram-icon.svg"
                  width={28}
                  height={22}
                  alt="instagram icon"
                />
              </div>

              <p className="font-bold text-[24px]">0</p>
            </div>

            <Image
              src="/images/selected-arrow.svg"
              width={14}
              height={7}
              alt="selected arrow"
            />
          </div>

          <div className="flex flex-col justify-between items-center">
            <div className="flex mb-[27px]">
              <div className="flex mr-[10px]">
                <Image
                  src="/images/twitch-icon.svg"
                  width={28}
                  height={22}
                  alt="twitch icon"
                />
              </div>

              <p className="font-bold text-[24px]">0</p>
            </div>

            <Image
              src="/images/selected-arrow.svg"
              width={14}
              height={7}
              alt="selected arrow"
            />
          </div>

          <div className="flex flex-col justify-between items-center">
            <div className="flex mb-[27px]">
              <div className="flex mr-[10px]">
                <Image
                  src="/images/tiktok-icon.svg"
                  width={28}
                  height={22}
                  alt="tiktok icon"
                />
              </div>

              <p className="font-bold text-[24px]">0</p>
            </div>

            <Image
              src="/images/selected-arrow.svg"
              width={14}
              height={7}
              alt="selected arrow"
            />
          </div>
        </div>

        <div className="w-[652px] h-[213px] flex justify-between border-[1px] border-gray10 px-[45px] py-[37px]">
          <div className="flex flex-col w-full justify-between">
            <div className="flex flex-col justify-center items-center">
              <p className="font-bold text-[24px]">0</p>

              <p className="font-bold text-[14px] text-gray6">subscribers</p>
            </div>

            <div className="flex flex-col justify-center items-center">
              <p className="font-bold text-[24px]">0</p>

              <p className="font-bold text-[14px] text-gray6">total videos</p>
            </div>
          </div>

          <div className="flex flex-col w-full justify-between">
            <div className="flex flex-col justify-center items-center">
              <p className="font-bold text-[24px]">0</p>

              <p className="font-bold text-[14px] text-gray6">total views</p>
            </div>

            <div className="flex flex-col justify-center items-center">
              <p className="font-bold text-[24px]">0</p>

              <p className="font-bold text-[14px] text-gray6">unique viewers</p>
            </div>
          </div>

          <div className="flex flex-col w-full justify-between">
            <div className="flex flex-col justify-center items-center">
              <p className="font-bold text-[24px]">0</p>

              <p className="font-bold text-[14px] text-gray6">
                watch time hours
              </p>
            </div>

            <div className="flex flex-col justify-center items-center">
              <p className="font-bold text-[24px]">0</p>

              <p className="font-bold text-[14px] text-gray6">
                average view duration
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
