import Image from 'next/image';
import { useState } from 'react';

import MediaKitSocialInstagram from './MediaKitSocialInstagram';
import MediaKitSocialTikTok from './MediaKitSocialTikTok';
import MediaKitSocialTwitch from './MediaKitSocialTwitch';
import MediaKitSocialYouTube from './MediaKitSocialYouTube';

interface MediaKitSocialProps {
  youtubeSubscribers: number;
  youtubeId: string;
  tiktokFollowers: number;
  tiktokHandle: string;
  instagramFollowers: number;
  instagramHandle: string;
  twitterFollowers: number;
  twitterHandle: string;
  twitchSubscribers: number;
  twitchHandle: string;
  discordMembers: number;
  discordHandle: string;
  youtubeVideos: number;
  youtubeViews: number;
  youtubeUniqueViewers: number;
  youtubeWatchTimeHours: number;
  youtubeAvgViewDuration: number;
  tiktokViews: number;
  tiktokLikes: number;
  tiktokComments: number;
  tiktokShares: number;
  instagramImpressions: number;
  instagramStoriesAvgViews: number;
  instagramPostsAvgLikes: number;
  instagramReelsAvgViews: number;
  twitchVideos: number;
  twitchAvgViewers: number;
  twitchPeakViewers: number;
  twitchWatchTimeHours: number;
}

export default function MediaKitSocial({
  youtubeSubscribers,
  youtubeId,
  tiktokFollowers,
  tiktokHandle,
  instagramFollowers,
  instagramHandle,
  twitterFollowers,
  twitterHandle,
  twitchSubscribers,
  twitchHandle,
  discordMembers,
  discordHandle,
  youtubeVideos,
  youtubeViews,
  youtubeUniqueViewers,
  youtubeWatchTimeHours,
  youtubeAvgViewDuration,
  tiktokViews,
  tiktokLikes,
  tiktokComments,
  tiktokShares,
  instagramImpressions,
  instagramStoriesAvgViews,
  instagramPostsAvgLikes,
  instagramReelsAvgViews,
  twitchVideos,
  twitchAvgViewers,
  twitchPeakViewers,
  twitchWatchTimeHours,
}: MediaKitSocialProps): JSX.Element {
  const [singleOpen, setSingleOpen] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);

  function openStep(stepNumber: number) {
    setSingleOpen(true);
    setStep(stepNumber);
  }

  function closeStep() {
    setSingleOpen(false);
  }

  function skipStep() {
    if (step < 4) {
      setStep((c) => c + 1);
    }
  }

  function backStep() {
    if (step > 1) {
      setStep((c) => c - 1);
    }
  }

  return singleOpen ? (
    <>
      {step === 1 && (
        <MediaKitSocialYouTube
          skipStep={skipStep}
          closeStep={closeStep}
          youtubeSubscribers={youtubeSubscribers}
          youtubeVideos={youtubeVideos}
          youtubeViews={youtubeViews}
          youtubeUniqueViewers={youtubeUniqueViewers}
          youtubeWatchTimeHours={youtubeWatchTimeHours}
          youtubeAvgViewDuration={youtubeAvgViewDuration}
          youtubeId={youtubeId}
        />
      )}

      {step === 2 && (
        <MediaKitSocialTikTok
          backStep={backStep}
          skipStep={skipStep}
          closeStep={closeStep}
          tiktokFollowers={tiktokFollowers}
          tiktokViews={tiktokViews}
          tiktokLikes={tiktokLikes}
          tiktokComments={tiktokComments}
          tiktokShares={tiktokShares}
          tiktokHandle={tiktokHandle}
        />
      )}

      {step === 3 && (
        <MediaKitSocialInstagram
          backStep={backStep}
          skipStep={skipStep}
          closeStep={closeStep}
          instagramFollowers={instagramFollowers}
          instagramImpressions={instagramImpressions}
          instagramStoriesAvgViews={instagramStoriesAvgViews}
          instagramPostsAvgLikes={instagramPostsAvgLikes}
          instagramReelsAvgViews={instagramReelsAvgViews}
          instagramHandle={instagramHandle}
        />
      )}

      {step === 4 && (
        <MediaKitSocialTwitch
          backStep={backStep}
          closeStep={closeStep}
          twitchSubscribers={twitchSubscribers}
          twitchVideos={twitchVideos}
          twitchAvgViewers={twitchAvgViewers}
          twitchPeakViewers={twitchPeakViewers}
          twitchWatchTimeHours={twitchWatchTimeHours}
          twitchHandle={twitchHandle}
        />
      )}
    </>
  ) : (
    <div className="flex w-full px-[150px] py-[70px] relative justify-center items-center">
      <div className="flex hover:cursor-pointer absolute top-[30px] left-[30px]">
        <Image
          src="/images/edit-icon.svg"
          width={30}
          height={28}
          alt="edit icon"
        />
      </div>

      <div className="flex max-w-[1000px] w-full justify-between items-center">
        <div className="flex flex-col">
          <div className="flex mb-[90px]">
            <div
              onClick={() => openStep(1)}
              className="mr-[27px] flex hover:cursor-pointer"
            >
              <Image
                src="/images/ytb-icon.svg"
                width={74}
                height={42}
                alt="youtube icon"
              />
            </div>

            <div className="flex flex-col">
              <p className="font-bold text-[45px] leading-[25px] mb-[10px]">
                {youtubeSubscribers}
              </p>
              <p className="font-bold text-gray6 mb-[20px]">subscribers</p>
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

          <div className="flex">
            <div
              onClick={() => openStep(2)}
              className="mr-[27px] flex hover:cursor-pointer"
            >
              <Image
                src="/images/tiktok-icon.svg"
                width={74}
                height={56}
                alt="tiktok icon"
              />
            </div>

            <div className="flex flex-col">
              <p className="font-bold text-[45px] leading-[25px] mb-[10px]">
                {tiktokFollowers}
              </p>
              <p className="font-bold text-gray6 mb-[20px]">followers</p>

              {tiktokHandle && (
                <a
                  target="_blank"
                  href={`https://tiktok.com/@${tiktokHandle}`}
                  className="font-bold text-blue"
                  rel="noreferrer"
                >
                  @{tiktokHandle}{' '}
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
        </div>

        <div className="flex flex-col">
          <div className="flex mb-[90px]">
            <div
              onClick={() => openStep(3)}
              className="mr-[27px] flex hover:cursor-pointer"
            >
              <Image
                src="/images/instagram-icon.svg"
                width={74}
                height={56}
                alt="instagram icon"
              />
            </div>

            <div className="flex flex-col">
              <p className="font-bold text-[45px] leading-[25px] mb-[10px]">
                {instagramFollowers}
              </p>
              <p className="font-bold text-gray6 mb-[20px]">followers</p>

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
              <p className="font-bold text-[45px] leading-[25px] mb-[10px]">
                {twitterFollowers}
              </p>
              <p className="font-bold text-gray6 mb-[20px]">followers</p>

              {twitterHandle && (
                <a
                  target="_blank"
                  href={`https://twitter.com/${twitterHandle}`}
                  className="font-bold text-blue"
                  rel="noreferrer"
                >
                  @{twitterHandle}{' '}
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
        </div>

        <div className="flex flex-col">
          <div className="flex mb-[90px]">
            <div
              onClick={() => openStep(4)}
              className="mr-[27px] flex hover:cursor-pointer"
            >
              <Image
                src="/images/twitch-icon.svg"
                width={74}
                height={58}
                alt="twitch icon"
              />
            </div>

            <div className="flex flex-col">
              <p className="font-bold text-[45px] leading-[25px] mb-[10px]">
                {twitchSubscribers}
              </p>
              <p className="font-bold text-gray6 mb-[20px]">subscribers</p>

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
              <p className="font-bold text-[45px] leading-[25px] mb-[10px]">
                {discordMembers}
              </p>
              <p className="font-bold text-gray6 mb-[20px]">members</p>

              {discordHandle && (
                <a
                  target="_blank"
                  href={`https://discord.gg/${discordHandle}`}
                  className="font-bold text-blue"
                  rel="noreferrer"
                >
                  join my Discord{' '}
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
        </div>
      </div>
    </div>
  );
}
