import Image from 'next/image';
import { useState } from 'react';

import EditMediaKitSocialModal from './EditMediaKitSocialModal';
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
  isOwner: boolean;
}

export default function MediaKitSocial(
  props: MediaKitSocialProps,
): JSX.Element {
  const [singleOpen, setSingleOpen] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);
  const [editMediaKitSocialModalIsOpen, setEditMediaKitSocialModalIsOpen] =
    useState<boolean>(false);

  function openEditMediaKitSocialModal() {
    setEditMediaKitSocialModalIsOpen(true);
  }

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
          youtubeSubscribers={props.youtubeSubscribers}
          youtubeVideos={props.youtubeVideos}
          youtubeViews={props.youtubeViews}
          youtubeUniqueViewers={props.youtubeUniqueViewers}
          youtubeWatchTimeHours={props.youtubeWatchTimeHours}
          youtubeAvgViewDuration={props.youtubeAvgViewDuration}
          youtubeId={props.youtubeId}
        />
      )}

      {step === 2 && (
        <MediaKitSocialTikTok
          backStep={backStep}
          skipStep={skipStep}
          closeStep={closeStep}
          tiktokFollowers={props.tiktokFollowers}
          tiktokViews={props.tiktokViews}
          tiktokLikes={props.tiktokLikes}
          tiktokComments={props.tiktokComments}
          tiktokShares={props.tiktokShares}
          tiktokHandle={props.tiktokHandle}
        />
      )}

      {step === 3 && (
        <MediaKitSocialInstagram
          backStep={backStep}
          skipStep={skipStep}
          closeStep={closeStep}
          instagramFollowers={props.instagramFollowers}
          instagramImpressions={props.instagramImpressions}
          instagramStoriesAvgViews={props.instagramStoriesAvgViews}
          instagramPostsAvgLikes={props.instagramPostsAvgLikes}
          instagramReelsAvgViews={props.instagramReelsAvgViews}
          instagramHandle={props.instagramHandle}
        />
      )}

      {step === 4 && (
        <MediaKitSocialTwitch
          backStep={backStep}
          closeStep={closeStep}
          twitchSubscribers={props.twitchSubscribers}
          twitchVideos={props.twitchVideos}
          twitchAvgViewers={props.twitchAvgViewers}
          twitchPeakViewers={props.twitchPeakViewers}
          twitchWatchTimeHours={props.twitchWatchTimeHours}
          twitchHandle={props.twitchHandle}
        />
      )}
    </>
  ) : (
    <>
      <EditMediaKitSocialModal
        open={editMediaKitSocialModalIsOpen}
        setOpen={setEditMediaKitSocialModalIsOpen}
      />

      <div className="flex w-full px-[150px] py-[70px] relative justify-center items-center">
        {props.isOwner && (
          <div
            onClick={openEditMediaKitSocialModal}
            className="flex hover:cursor-pointer absolute top-[30px] left-[30px]"
          >
            <Image
              src="/images/edit-icon.svg"
              width={30}
              height={28}
              alt="edit icon"
            />
          </div>
        )}

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
                  {props.youtubeSubscribers}
                </p>
                <p className="font-bold text-gray6 mb-[20px]">subscribers</p>
                <a
                  target="_blank"
                  href={`https://youtube.com/channel/${props.youtubeId}`}
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
                  {props.tiktokFollowers}
                </p>
                <p className="font-bold text-gray6 mb-[20px]">followers</p>

                {props.tiktokHandle && (
                  <a
                    target="_blank"
                    href={`https://tiktok.com/@${props.tiktokHandle}`}
                    className="font-bold text-blue"
                    rel="noreferrer"
                  >
                    @{props.tiktokHandle}{' '}
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
                  {props.instagramFollowers}
                </p>
                <p className="font-bold text-gray6 mb-[20px]">followers</p>

                {props.instagramHandle && (
                  <a
                    target="_blank"
                    href={`https://instagram.com/${props.instagramHandle}`}
                    className="font-bold text-blue"
                    rel="noreferrer"
                  >
                    @{props.instagramHandle}{' '}
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
                  {props.twitterFollowers}
                </p>
                <p className="font-bold text-gray6 mb-[20px]">followers</p>

                {props.twitterHandle && (
                  <a
                    target="_blank"
                    href={`https://twitter.com/${props.twitterHandle}`}
                    className="font-bold text-blue"
                    rel="noreferrer"
                  >
                    @{props.twitterHandle}{' '}
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
                  {props.twitchSubscribers}
                </p>
                <p className="font-bold text-gray6 mb-[20px]">subscribers</p>

                {props.twitchHandle && (
                  <a
                    target="_blank"
                    href={`https://twitch.tv/${props.twitchHandle}`}
                    className="font-bold text-blue"
                    rel="noreferrer"
                  >
                    /{props.twitchHandle}{' '}
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
                  {props.discordMembers}
                </p>
                <p className="font-bold text-gray6 mb-[20px]">members</p>

                {props.discordHandle && (
                  <a
                    target="_blank"
                    href={`https://discord.gg/${props.discordHandle}`}
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
    </>
  );
}
