import { motion } from 'framer-motion';
import Image from 'next/image';

interface MediaKitSocialTwitchProps {
  backStep: () => void;
  closeStep: () => void;
  twitchSubscribers: number;
  twitchVideos: number;
  twitchAvgViewers: number;
  twitchPeakViewers: number;
  twitchWatchTimeHours: number;
  twitchHandle: string;
}

export default function MediaKitSocialTwitch({
  backStep,
  closeStep,
  twitchSubscribers,
  twitchVideos,
  twitchAvgViewers,
  twitchPeakViewers,
  twitchWatchTimeHours,
  twitchHandle,
}: MediaKitSocialTwitchProps): JSX.Element {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex w-full px-[150px] py-[70px] relative justify-center items-center"
    >
      <div className="flex absolute top-[74px] right-[152px]">
        <div
          onClick={backStep}
          className="flex hover:cursor-pointer w-[39px] h-[35px] justify-center items-center border-[2px] border-gray5"
        >
          <Image
            src="/images/back2-icon.svg"
            width={16}
            height={10}
            alt="back icon"
          />
        </div>

        <div className="flex ml-[40px] w-[39px] h-[35px] justify-center items-center border-[2px] border-gray5">
          <Image
            src="/images/skip-disabled-icon.svg"
            width={16}
            height={10}
            alt="skip disabled icon"
          />
        </div>

        <div
          onClick={closeStep}
          className="flex ml-[65px] hover:cursor-pointer w-[39px] h-[35px] justify-center items-center border-[2px] border-gray5"
        >
          <Image
            src="/images/x2-icon.svg"
            width={16}
            height={15}
            alt="x icon"
          />
        </div>
      </div>

      <div className="flex max-w-[1000px] w-full justify-between items-center">
        <div className="flex flex-col w-full">
          <div className="flex w-full">
            <div className="mr-[20px] flex">
              <Image
                src="/images/twitch-icon.svg"
                width={60}
                height={42}
                alt="twitch icon"
              />
            </div>

            <div className="flex flex-col">
              <p className="font-bold text-[22px]">Twitch</p>

              {twitchHandle && (
                <a
                  target="_blank"
                  href={`https://twitch.tv/${twitchHandle}`}
                  className="font-bold text-blue"
                  rel="noreferrer"
                >
                  /{twitchHandle}{' '}
                  <Image
                    src="/images/link-icon.svg"
                    width={15}
                    height={15}
                    alt="link icon"
                  />
                </a>
              )}
            </div>
          </div>

          <div className="flex justify-around items-center w-full mt-[70px]">
            <div className="flex flex-col justify-center items-center">
              <p className="text-[60px] font-bold leading-[25px] mb-[10px]">
                {twitchSubscribers}
              </p>

              <p className="text-[18px] font-bold text-gray6 mb-[60px]">
                subscribers
              </p>

              <p className="text-[60px] font-bold leading-[25px] mb-[10px]">
                {twitchVideos}
              </p>

              <p className="text-[18px] font-bold text-gray6">videos</p>
            </div>

            <div className="flex flex-col justify-center items-center">
              <p className="text-[60px] font-bold leading-[25px] mb-[10px]">
                {twitchAvgViewers}
              </p>

              <p className="text-[18px] font-bold text-gray6 mb-[60px]">
                average viewers
              </p>

              <p className="text-[60px] font-bold leading-[25px] mb-[10px]">
                {twitchPeakViewers}
              </p>

              <p className="text-[18px] font-bold text-gray6">peak viewers</p>
            </div>

            <div className="flex flex-col justify-center items-center">
              <p className="text-[60px] font-bold leading-[25px] mb-[10px]">
                {twitchWatchTimeHours}
              </p>

              <p className="text-[18px] font-bold text-gray6">
                watch time hours
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
