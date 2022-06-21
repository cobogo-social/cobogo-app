import { motion } from 'framer-motion';
import Image from 'next/image';

interface MediaKitSocialYouTubeProps {
  skipStep: () => void;
  closeStep: () => void;
  youtubeSubscribers: number;
  youtubeVideos: number;
  youtubeViews: number;
  youtubeUniqueViewers: number;
  youtubeWatchTimeHours: number;
  youtubeAvgViewDuration: number;
  youtubeId: string;
}

export default function MediaKitSocialYouTube({
  skipStep,
  closeStep,
  youtubeSubscribers,
  youtubeVideos,
  youtubeViews,
  youtubeUniqueViewers,
  youtubeWatchTimeHours,
  youtubeAvgViewDuration,
  youtubeId,
}: MediaKitSocialYouTubeProps): JSX.Element {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex w-full px-[150px] py-[70px] relative justify-center items-center"
    >
      <div className="flex absolute top-[74px] right-[152px]">
        <div className="flex w-[39px] h-[35px] justify-center items-center border-[2px] border-gray5">
          <Image
            src="/images/back2-disabled-icon.svg"
            width={16}
            height={10}
            alt="back disabled icon"
          />
        </div>

        <div
          onClick={skipStep}
          className="flex ml-[40px] hover:cursor-pointer w-[39px] h-[35px] justify-center items-center border-[2px] border-gray5"
        >
          <Image
            src="/images/skip-icon.svg"
            width={16}
            height={10}
            alt="skip icon"
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
                src="/images/ytb-icon.svg"
                width={60}
                height={42}
                alt="youtube icon"
              />
            </div>

            <div className="flex flex-col">
              <p className="font-bold text-[22px]">YouTube</p>

              <a
                target="_blank"
                href={`https://youtube.com/channel/${youtubeId}`}
                className="font-bold text-blue"
                rel="noreferrer"
              >
                visit channel{' '}
                <Image
                  src="/images/link-icon.svg"
                  width={15}
                  height={15}
                  alt="link icon"
                />
              </a>
            </div>
          </div>

          <div className="flex justify-around items-center w-full mt-[70px]">
            <div className="flex flex-col justify-center items-center">
              <p className="text-[60px] font-bold leading-[25px] mb-[10px]">
                {youtubeSubscribers}
              </p>

              <p className="text-[18px] font-bold text-gray6 mb-[60px]">
                subscribers
              </p>

              <p className="text-[60px] font-bold leading-[25px] mb-[10px]">
                {youtubeVideos}
              </p>

              <p className="text-[18px] font-bold text-gray6">videos</p>
            </div>

            <div className="flex flex-col justify-center items-center">
              <p className="text-[60px] font-bold leading-[25px] mb-[10px]">
                {youtubeViews}
              </p>

              <p className="text-[18px] font-bold text-gray6 mb-[60px]">
                views
              </p>

              <p className="text-[60px] font-bold leading-[25px] mb-[10px]">
                {youtubeUniqueViewers}
              </p>

              <p className="text-[18px] font-bold text-gray6">unique viewers</p>
            </div>

            <div className="flex flex-col justify-center items-center">
              <p className="text-[60px] font-bold leading-[25px] mb-[10px]">
                {youtubeWatchTimeHours}
              </p>

              <p className="text-[18px] font-bold text-gray6 mb-[60px]">
                watch time hours
              </p>

              <p className="text-[60px] font-bold leading-[25px] mb-[10px]">
                {youtubeAvgViewDuration}
              </p>

              <p className="text-[18px] font-bold text-gray6">
                average view duration
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
