import { motion } from 'framer-motion';
import Image from 'next/image';

interface MediaKitSocialInstagramProps {
  backStep: () => void;
  skipStep: () => void;
  closeStep: () => void;
  instagramFollowers: number;
  instagramImpressions: number;
  instagramStoriesAvgViews: number;
  instagramPostsAvgLikes: number;
  instagramReelsAvgViews: number;
  instagramHandle: string;
}

export default function MediaKitSocialInstagram({
  backStep,
  skipStep,
  closeStep,
  instagramFollowers,
  instagramImpressions,
  instagramStoriesAvgViews,
  instagramPostsAvgLikes,
  instagramReelsAvgViews,
  instagramHandle,
}: MediaKitSocialInstagramProps): JSX.Element {
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
                src="/images/instagram-icon.svg"
                width={60}
                height={42}
                alt="instagram icon"
              />
            </div>

            <div className="flex flex-col">
              <p className="font-bold text-[22px]">Instagram</p>

              {instagramHandle && (
                <a
                  target="_blank"
                  href={`https://instagram.com/${instagramHandle}`}
                  className="font-bold text-blue"
                  rel="noreferrer"
                >
                  @{instagramHandle}{' '}
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
                {instagramFollowers}
              </p>

              <p className="text-[18px] font-bold text-gray6 mb-[60px]">
                followers
              </p>

              <p className="text-[60px] font-bold leading-[25px] mb-[10px]">
                {instagramImpressions}
              </p>

              <p className="text-[18px] font-bold text-gray6">impressions</p>
            </div>

            <div className="flex flex-col justify-center items-center">
              <p className="text-[60px] font-bold leading-[25px] mb-[10px]">
                {instagramStoriesAvgViews}
              </p>

              <p className="text-[18px] font-bold text-gray6 mb-[60px]">
                stories average views
              </p>

              <p className="text-[60px] font-bold leading-[25px] mb-[10px]">
                {instagramPostsAvgLikes}
              </p>

              <p className="text-[18px] font-bold text-gray6">
                posts average likes
              </p>
            </div>

            <div className="flex flex-col justify-center items-center">
              <p className="text-[60px] font-bold leading-[25px] mb-[10px]">
                {instagramReelsAvgViews}
              </p>

              <p className="text-[18px] font-bold text-gray6">
                reels average views
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
