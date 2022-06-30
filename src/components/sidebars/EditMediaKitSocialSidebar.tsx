import SidebarContainer from '@components/containers/SidebarContainer';
import EditMediaKitSocialForm from '@components/forms/EditMediaKitSocialForm';
import Image from 'next/image';
import { useEffect } from 'react';

interface EditMediaKitSocialSidebarProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  youtubeSubscribers: number;
  youtubeVideos: number;
  youtubeViews: number;
  youtubeUniqueViewers: number;
  youtubeWatchTimeHours: number;
  youtubeAvgViewDuration: number;
  instagramHandle: string;
  instagramFollowers: number;
  instagramImpressions: number;
  instagramStoriesAvgViews: number;
  instagramPostsAvgLikes: number;
  instagramReelsAvgViews: number;
  twitchHandle: string;
  twitchSubscribers: number;
  twitchVideos: number;
  twitchAvgViewers: number;
  twitchPeakViewers: number;
  twitchWatchTimeHours: number;
  tiktokHandle: string;
  tiktokFollowers: number;
  tiktokViews: number;
  tiktokLikes: number;
  tiktokComments: number;
  tiktokShares: number;
  discordHandle: string;
  discordMembers: number;
  telegramHandle: string;
  telegramMembers: number;
  twitterHandle: string;
  twitterFollowers: number;
  handle: string;
}

export default function EditMediaKitSocialSidebar(
  props: EditMediaKitSocialSidebarProps,
) {
  function closeModal() {
    props.setOpen(false);
  }

  useEffect(() => {
    if (props.open) {
      document.body.classList.add('active-modal');
    } else {
      document.body.classList.remove('active-modal');
    }
  }, [props.open]);

  return props.open ? (
    <SidebarContainer>
      <div
        onClick={closeModal}
        className="absolute top-0 right-0 mt-[20px] mr-[20px] hover:cursor-pointer"
      >
        <Image src="/images/x2-icon.svg" width={13} height={13} alt="x2 icon" />
      </div>

      <EditMediaKitSocialForm
        buttonText="save"
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
        closeModal={closeModal}
      />
    </SidebarContainer>
  ) : null;
}
