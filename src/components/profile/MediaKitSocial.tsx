import DiscordIcon from '@components/icons/DiscordIcon';
import EditIcon from '@components/icons/EditIcon';
import InstagramIcon from '@components/icons/InstagramIcon';
import TelegramIcon from '@components/icons/TelegramIcon';
import TikTokIcon from '@components/icons/TikTokIcon';
import TwitchIcon from '@components/icons/TwitchIcon';
import TwitterIcon from '@components/icons/TwitterIcon';
import YouTubeIcon from '@components/icons/YouTubeIcon';
import { useEffect, useState } from 'react';

import EditMediaKitSocialSidebar from '../sidebars/EditMediaKitSocialSidebar';
import Social from './Social';
import SocialDetails from './SocialDetails';

interface MediaKitSocialProps {
  setSidebarOpened: (value: boolean) => void;
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
  handle: string;
}

export default function MediaKitSocial(props: MediaKitSocialProps) {
  const [singleOpen, setSingleOpen] = useState(false);

  const [step, setStep] = useState('');
  const [stepNumber, setStepNumber] = useState(0);
  const [availableSteps, setAvailableSteps] = useState(['youtube']);

  const [editMediaKitSocialSidebarIsOpen, setEditMediaKitSocialSidebarIsOpen] =
    useState(false);

  function openEditMediaKitSocialSidebar() {
    props.setSidebarOpened(true);
    setEditMediaKitSocialSidebarIsOpen(true);
  }

  function closeEditMediaKitSocialSidebar() {
    props.setSidebarOpened(false);
    setEditMediaKitSocialSidebarIsOpen(false);
  }

  function openStep(stepName: string) {
    setSingleOpen(true);
    setStepNumber(() => {
      const indexOfStepName = availableSteps.indexOf(stepName);

      return indexOfStepName;
    });
    setStep(stepName);
  }

  function closeStep() {
    setSingleOpen(false);
    setStepNumber(0);
    setStep('');
  }

  function skipStep() {
    if (stepNumber < availableSteps.length - 1) {
      setStepNumber((c) => {
        setStep(availableSteps[c + 1]);

        return c + 1;
      });
    }
  }

  function backStep() {
    if (stepNumber > 0) {
      setStepNumber((c) => {
        setStep(availableSteps[c - 1]);

        return c - 1;
      });
    }
  }

  useEffect(() => {
    if (props.instagramHandle) {
      setAvailableSteps((c) => [...c, 'instagram']);
    }
  }, [props.instagramHandle]);

  useEffect(() => {
    if (props.twitchHandle) {
      setAvailableSteps((c) => [...c, 'twitch']);
    }
  }, [props.twitchHandle]);

  useEffect(() => {
    if (props.tiktokHandle) {
      setAvailableSteps((c) => [...c, 'tiktok']);
    }
  }, [props.tiktokHandle]);

  return singleOpen ? (
    <>
      {step === 'youtube' && (
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
          stepNumber={stepNumber}
          title="YouTube"
          linkPlaceholder="visit channel"
          link={
            props.youtubeId
              ? `https://youtube.com/channel/${props.youtubeId}`
              : null
          }
          icon={<YouTubeIcon size={60} color="#FF0000" />}
          availableStepsLength={availableSteps.length}
        />
      )}

      {step === 'instagram' && (
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
          stepNumber={stepNumber}
          title="Instagram"
          linkPlaceholder={`@${props.instagramHandle}`}
          link={
            props.instagramHandle
              ? `https://instagram/${props.instagramHandle}`
              : null
          }
          icon={<InstagramIcon size={56} color="#E1306C" />}
          availableStepsLength={availableSteps.length}
        />
      )}

      {step === 'twitch' && (
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
          stepNumber={stepNumber}
          title="Twitch"
          linkPlaceholder={`@${props.twitchHandle}`}
          link={
            props.twitchHandle
              ? `https://twitch.tv/${props.twitchHandle}`
              : null
          }
          icon={<TwitchIcon size={54} color="#6441A5" />}
          availableStepsLength={availableSteps.length}
        />
      )}

      {step === 'tiktok' && (
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
          stepNumber={stepNumber}
          title="TikTok"
          linkPlaceholder={`@${props.tiktokHandle}`}
          link={
            props.tiktokHandle
              ? `https://tiktok.com/@${props.tiktokHandle}`
              : null
          }
          icon={<TikTokIcon size={46} color="#FF0050" />}
          availableStepsLength={availableSteps.length}
        />
      )}
    </>
  ) : (
    <>
      <EditMediaKitSocialSidebar
        opened={editMediaKitSocialSidebarIsOpen}
        close={closeEditMediaKitSocialSidebar}
        youtubeSubscribers={props.youtubeSubscribers}
        youtubeVideos={props.youtubeVideos}
        youtubeViews={props.youtubeViews}
        youtubeUniqueViewers={props.youtubeUniqueViewers}
        youtubeWatchTimeHours={props.youtubeWatchTimeHours}
        youtubeAvgViewDuration={props.youtubeAvgViewDuration}
        instagramHandle={props.instagramHandle}
        instagramFollowers={props.instagramFollowers}
        instagramImpressions={props.instagramImpressions}
        instagramStoriesAvgViews={props.instagramStoriesAvgViews}
        instagramPostsAvgLikes={props.instagramPostsAvgLikes}
        instagramReelsAvgViews={props.instagramReelsAvgViews}
        twitchHandle={props.twitchHandle}
        twitchSubscribers={props.twitchSubscribers}
        twitchVideos={props.twitchVideos}
        twitchAvgViewers={props.twitchAvgViewers}
        twitchPeakViewers={props.twitchPeakViewers}
        twitchWatchTimeHours={props.twitchWatchTimeHours}
        tiktokHandle={props.tiktokHandle}
        tiktokFollowers={props.tiktokFollowers}
        tiktokViews={props.tiktokViews}
        tiktokLikes={props.tiktokLikes}
        tiktokComments={props.tiktokComments}
        tiktokShares={props.tiktokShares}
        discordHandle={props.discordHandle}
        discordMembers={props.discordMembers}
        telegramHandle={props.telegramHandle}
        telegramMembers={props.telegramMembers}
        twitterHandle={props.twitterHandle}
        twitterFollowers={props.twitterFollowers}
        handle={props.handle}
      />

      <section className="flex w-full px-[150px] py-[70px] relative justify-center items-center">
        {props.isOwner && (
          <div
            onClick={openEditMediaKitSocialSidebar}
            className="flex hover:cursor-pointer absolute top-[30px] left-[30px]"
          >
            <EditIcon size={30} />
          </div>
        )}

        <div className="flex max-w-[1010px] w-full justify-center items-center">
          <div className="flex flex-wrap items-center justify-start w-full gap-10">
            <Social
              onClick={() => openStep('youtube')}
              icon={<YouTubeIcon size={36} />}
              number={props.youtubeSubscribers}
              placeholder="subscribers"
              link={
                props.youtubeId
                  ? `https://youtube.com/channel/${props.youtubeId}`
                  : null
              }
              linkPlaceholder="visit channel"
              handle={props.youtubeId}
              iconPosition="left-[-17px]"
              name="YouTube"
              isOwner={props.isOwner}
              openEditMediaKitSocialSidebar={openEditMediaKitSocialSidebar}
              hoverBorderColor="hover:border-redyoutube"
            />

            <Social
              onClick={() => openStep('instagram')}
              icon={<InstagramIcon size={31} />}
              number={props.instagramFollowers}
              placeholder="followers"
              link={
                props.instagramHandle
                  ? `https://instagram.com/${props.instagramHandle}`
                  : null
              }
              linkPlaceholder={`@${props.instagramHandle}`}
              handle={props.instagramHandle}
              iconPosition="left-[-15px]"
              name="Instagram"
              isOwner={props.isOwner}
              openEditMediaKitSocialSidebar={openEditMediaKitSocialSidebar}
              hoverBorderColor="hover:border-pinkinstagram"
            />

            <Social
              onClick={() => openStep('twitch')}
              icon={<TwitchIcon size={32} />}
              number={props.twitchSubscribers}
              placeholder="subscribers"
              link={
                props.twitchHandle
                  ? `https://twitch.tv/${props.twitchHandle}`
                  : null
              }
              linkPlaceholder={`/${props.twitchHandle}`}
              handle={props.twitchHandle}
              iconPosition="left-[-15px]"
              name="Twitch"
              isOwner={props.isOwner}
              openEditMediaKitSocialSidebar={openEditMediaKitSocialSidebar}
              hoverBorderColor="hover:border-violettwitch"
            />

            <Social
              onClick={() => openStep('tiktok')}
              icon={<TikTokIcon size={28} />}
              number={props.tiktokFollowers}
              placeholder="followers"
              link={
                props.tiktokHandle
                  ? `https://tiktok.com/@${props.tiktokHandle}`
                  : null
              }
              linkPlaceholder={`@${props.tiktokHandle}`}
              handle={props.tiktokHandle}
              iconPosition="left-[-15px]"
              name="TikTok"
              isOwner={props.isOwner}
              openEditMediaKitSocialSidebar={openEditMediaKitSocialSidebar}
              hoverBorderColor="hover:border-pinktiktok"
            />

            <Social
              icon={<TwitterIcon size={36} />}
              number={props.twitterFollowers}
              placeholder="followers"
              link={
                props.twitterHandle
                  ? `https://twitter.com/${props.twitterHandle}`
                  : null
              }
              linkPlaceholder={`@${props.twitterHandle}`}
              handle={props.twitterHandle}
              iconPosition="left-[-15px]"
              name="Twitter"
              isOwner={props.isOwner}
              openEditMediaKitSocialSidebar={openEditMediaKitSocialSidebar}
              hoverBorderColor="hover:border-bluetwitter"
            />

            <Social
              icon={<DiscordIcon size={38} />}
              number={props.discordMembers}
              placeholder="members"
              link={
                props.discordHandle
                  ? `https://discord.gg/${props.discordHandle}`
                  : null
              }
              linkPlaceholder="join my Discord"
              handle={props.discordHandle}
              iconPosition="left-[-19px]"
              name="Discord"
              isOwner={props.isOwner}
              openEditMediaKitSocialSidebar={openEditMediaKitSocialSidebar}
              hoverBorderColor="hover:border-violetdiscord"
            />

            <Social
              icon={<TelegramIcon size={31} />}
              number={props.telegramMembers}
              placeholder="members"
              link={
                props.telegramHandle
                  ? `https://t.me/${props.telegramHandle}`
                  : null
              }
              linkPlaceholder="join my Telegram"
              handle={props.telegramHandle}
              iconPosition="left-[-17px]"
              name="Telegram"
              isOwner={props.isOwner}
              openEditMediaKitSocialSidebar={openEditMediaKitSocialSidebar}
              hoverBorderColor="hover:border-bluetelegram"
            />
          </div>
        </div>
      </section>
    </>
  );
}
