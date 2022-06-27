import DiscordIcon from '@components/icons/DiscordIcon';
import EditIcon from '@components/icons/EditIcon';
import InstagramIcon from '@components/icons/InstagramIcon';
import TelegramIcon from '@components/icons/TelegramIcon';
import TikTokIcon from '@components/icons/TikTokIcon';
import TwitchIcon from '@components/icons/TwitchIcon';
import TwitterIcon from '@components/icons/TwitterIcon';
import YouTubeIcon from '@components/icons/YouTubeIcon';
import { useState } from 'react';

import EditMediaKitSocialModal from './EditMediaKitSocialModal';
import Social from './Social';
import SocialDetails from './SocialDetails';

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
  telegramMembers: number;
  telegramHandle: string;
}

export default function MediaKitSocial(props: MediaKitSocialProps) {
  const [singleOpen, setSingleOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [editMediaKitSocialModalIsOpen, setEditMediaKitSocialModalIsOpen] =
    useState(false);

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
        <SocialDetails
          backStep={backStep}
          skipStep={skipStep}
          closeStep={closeStep}
          number1={props.youtubeSubscribers}
          number2={props.youtubeVideos}
          number3={props.youtubeViews}
          number4={props.youtubeUniqueViewers}
          number5={props.youtubeWatchTimeHours}
          number6={props.youtubeAvgViewDuration}
          placeholder1="subscribers"
          placeholder2="videos"
          placeholder3="views"
          placeholder4="unique viewers"
          placeholder5="watch time hours"
          placeholder6="average view duration"
          step={step}
          title="YouTube"
          linkPlaceholder="visit channel"
          link={
            props.youtubeId
              ? `https://youtube.com/channel/${props.youtubeId}`
              : null
          }
          icon={<YouTubeIcon size={60} />}
        />
      )}

      {step === 2 && (
        <SocialDetails
          backStep={backStep}
          skipStep={skipStep}
          closeStep={closeStep}
          number1={props.instagramFollowers}
          number2={props.instagramImpressions}
          number3={props.instagramStoriesAvgViews}
          number4={props.instagramPostsAvgLikes}
          number5={props.instagramReelsAvgViews}
          placeholder1="followers"
          placeholder2="impressions"
          placeholder3="stories average views"
          placeholder4="posts average views"
          placeholder5="reels average views"
          step={step}
          title="Instagram"
          linkPlaceholder={`@${props.instagramHandle}`}
          link={
            props.instagramHandle
              ? `https://instagram/${props.instagramHandle}`
              : null
          }
          icon={<InstagramIcon size={56} />}
        />
      )}

      {step === 3 && (
        <SocialDetails
          backStep={backStep}
          skipStep={skipStep}
          closeStep={closeStep}
          number1={props.twitchSubscribers}
          number2={props.twitchVideos}
          number3={props.twitchAvgViewers}
          number4={props.twitchPeakViewers}
          number5={props.twitchWatchTimeHours}
          placeholder1="subscribers"
          placeholder2="videos"
          placeholder3="average viewers"
          placeholder4="peak viewers"
          placeholder5="watch time hours"
          step={step}
          title="Twitch"
          linkPlaceholder={`@${props.twitchHandle}`}
          link={
            props.twitchHandle
              ? `https://twitch.tv/${props.twitchHandle}`
              : null
          }
          icon={<TwitchIcon size={54} />}
        />
      )}

      {step === 4 && (
        <SocialDetails
          backStep={backStep}
          skipStep={skipStep}
          closeStep={closeStep}
          number1={props.tiktokFollowers}
          number2={props.tiktokViews}
          number3={props.tiktokLikes}
          number4={props.tiktokComments}
          number5={props.tiktokShares}
          placeholder1="followers"
          placeholder2="views"
          placeholder3="likes"
          placeholder4="comments"
          placeholder5="shares"
          step={step}
          title="TikTok"
          linkPlaceholder={`@${props.tiktokHandle}`}
          link={
            props.tiktokHandle
              ? `https://tiktok.com/@${props.tiktokHandle}`
              : null
          }
          icon={<TikTokIcon size={46} />}
        />
      )}
    </>
  ) : (
    <>
      <EditMediaKitSocialModal
        open={editMediaKitSocialModalIsOpen}
        setOpen={setEditMediaKitSocialModalIsOpen}
      />

      <section className="flex w-full px-[150px] py-[70px] relative justify-center items-center">
        {props.isOwner && (
          <div
            onClick={openEditMediaKitSocialModal}
            className="flex hover:cursor-pointer absolute top-[30px] left-[30px]"
          >
            <EditIcon size={30} />
          </div>
        )}

        <div className="flex max-w-[1000px] w-full justify-center items-center">
          <div className="flex flex-row flex-wrap items-center justify-between w-full gap-10">
            <Social
              onClick={() => openStep(1)}
              icon={<YouTubeIcon size={60} />}
              number={props.youtubeSubscribers}
              placeholder="subscribers"
              link={
                props.youtubeId
                  ? `https://youtube.com/channel/${props.youtubeId}`
                  : null
              }
              linkPlaceholder="visit channel"
            />

            <Social
              onClick={() => openStep(2)}
              icon={<InstagramIcon size={56} />}
              number={props.instagramFollowers}
              placeholder="followers"
              link={
                props.instagramHandle
                  ? `https://instagram.com/${props.instagramHandle}`
                  : null
              }
              linkPlaceholder={`@${props.instagramHandle}`}
            />

            <Social
              onClick={() => openStep(3)}
              icon={<TwitchIcon size={54} />}
              number={props.twitchSubscribers}
              placeholder="subscribers"
              link={
                props.twitchHandle
                  ? `https://twitch.tv/${props.twitchHandle}`
                  : null
              }
              linkPlaceholder={`/${props.twitchHandle}`}
            />

            <Social
              onClick={() => openStep(4)}
              icon={<TikTokIcon size={46} />}
              number={props.tiktokFollowers}
              placeholder="followers"
              link={
                props.tiktokHandle
                  ? `https://tiktok.com/@${props.tiktokHandle}`
                  : null
              }
              linkPlaceholder={`@${props.tiktokHandle}`}
            />

            <Social
              icon={<TwitterIcon size={60} />}
              number={props.twitterFollowers}
              placeholder="followers"
              link={
                props.twitterHandle
                  ? `https://twitter.com/${props.twitterHandle}`
                  : null
              }
              linkPlaceholder={`@${props.twitterHandle}`}
            />

            <Social
              icon={<DiscordIcon size={61} />}
              number={props.discordMembers}
              placeholder="members"
              link={
                props.discordHandle
                  ? `https://discord.gg/${props.discordHandle}`
                  : null
              }
              linkPlaceholder="join my Discord"
            />

            <Social
              icon={<TelegramIcon size={54} />}
              number={props.telegramMembers}
              placeholder="members"
              link={
                props.telegramHandle
                  ? `https://t.me/${props.telegramHandle}`
                  : null
              }
              linkPlaceholder="join my Telegram"
            />
          </div>
        </div>
      </section>
    </>
  );
}
