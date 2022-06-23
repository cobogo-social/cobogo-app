import About from '@components/profile/About';
import MediaKitSocial from '@components/profile/MediaKitSocial';
import MediaKitAnalytics from '@components/profile/MediaKitAnalytics';
import Services from '@components/profile/Services';
import Stake from '@components/profile/Stake';
import Videos from '@components/profile/Videos';
import TopBar from '@components/TopBar';
import { readCategories, readProfileByHandle } from '@services/cobogoApi';
import { readVideosByChannelId } from '@services/youtubeApi';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

interface ProfileProps {
  bannerImage: string;
  profileImage: string;
  title: string;
  youtubeSubscribers: number;
  description: string;
  tags: string[];
  youtubeId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  videos: any[];
  isOwner: boolean;
  handle: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  categories: any[];
  categoryName: string;
  youtubeVideos: number;
  youtubeViews: number;
  youtubeUniqueViewers: number;
  youtubeWatchTimeHours: number;
  youtubeAvgViewDuration: number;
  website: string;
  instagramFollowers: number;
  instagramImpressions: number;
  instagramStoriesAvgViews: number;
  instagramPostsAvgLikes: number;
  instagramReelsAvgViews: number;
  twitchSubscribers: number;
  twitchVideos: number;
  twitchAvgViewers: number;
  twitchPeakViewers: number;
  twitchWatchTimeHours: number;
  tiktokFollowers: number;
  tiktokViews: number;
  tiktokLikes: number;
  tiktokComments: number;
  tiktokShares: number;
  discordMembers: number;
  telegramMembers: number;
  twitterFollowers: number;
  instagramHandle: string;
  twitchHandle: string;
  tiktokHandle: string;
  discordHandle: string;
  telegramHandle: string;
  twitterHandle: string;
  audienceGenderDistributionMen: number;
  audienceGenderDistributionWomen: number;
  audienceGenderDistribution18: number;
  audienceGenderDistribution2534: number;
  audienceGenderDistribution35: number;
  audienceTopCountries1: number;
  audienceTopCountries2: number;
  audienceTopCountries3: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  services: any[];
}

export default function Index(props: ProfileProps) {
  return (
    <div>
      <TopBar noOnboardedFriends noTokens transparent />

      <About
        bannerImage={props.bannerImage}
        profileImage={props.profileImage}
        title={props.title}
        handle={props.handle}
        description={props.description}
        tags={props.tags}
        isOwner={props.isOwner}
        categories={props.categories}
        categoryName={props.categoryName}
        website={props.website}
      />

      <MediaKitSocial
        youtubeSubscribers={props.youtubeSubscribers}
        youtubeId={props.youtubeId}
        tiktokFollowers={props.tiktokFollowers}
        tiktokHandle={props.tiktokHandle}
        instagramFollowers={props.instagramFollowers}
        instagramHandle={props.instagramHandle}
        twitterFollowers={props.twitterFollowers}
        twitterHandle={props.twitterHandle}
        twitchSubscribers={props.twitchSubscribers}
        twitchHandle={props.twitchHandle}
        discordMembers={props.discordMembers}
        discordHandle={props.discordHandle}
        youtubeVideos={props.youtubeVideos}
        youtubeViews={props.youtubeViews}
        youtubeUniqueViewers={props.youtubeUniqueViewers}
        youtubeWatchTimeHours={props.youtubeWatchTimeHours}
        youtubeAvgViewDuration={props.youtubeAvgViewDuration}
        tiktokViews={props.tiktokViews}
        tiktokLikes={props.tiktokLikes}
        tiktokComments={props.tiktokComments}
        tiktokShares={props.tiktokShares}
        instagramImpressions={props.instagramImpressions}
        instagramStoriesAvgViews={props.instagramStoriesAvgViews}
        instagramPostsAvgLikes={props.instagramPostsAvgLikes}
        instagramReelsAvgViews={props.instagramReelsAvgViews}
        twitchVideos={props.twitchVideos}
        twitchAvgViewers={props.twitchAvgViewers}
        twitchPeakViewers={props.twitchPeakViewers}
        twitchWatchTimeHours={props.twitchWatchTimeHours}
        isOwner={props.isOwner}
        telegramMembers={props.telegramMembers}
        telegramHandle={props.telegramHandle}
      />

      <MediaKitAnalytics
        audienceGenderDistribution18={props.audienceGenderDistribution18}
        audienceGenderDistribution2534={props.audienceGenderDistribution2534}
        audienceGenderDistribution35={props.audienceGenderDistribution35}
        audienceTopCountries1={props.audienceTopCountries1}
        audienceTopCountries2={props.audienceTopCountries2}
        audienceTopCountries3={props.audienceTopCountries3}
        audienceGenderDistributionMen={props.audienceGenderDistributionMen}
        audienceGenderDistributionWomen={props.audienceGenderDistributionWomen}
        isOwner={props.isOwner}
      />

      <Services services={props.services} isOwner={props.isOwner} />

      <Videos title={props.title} videos={props.videos} />

      <Stake />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  try {
    const session = await getSession({ req });
    const { handle } = params;

    const profile = await readProfileByHandle(handle);

    if (!profile) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    const videos = await readVideosByChannelId(profile.attributes.youtube_id);

    const categories = await readCategories();

    return {
      props: {
        bannerImage: profile.attributes.banner_image,
        profileImage: profile.attributes.profile_image,
        title: profile.attributes.title,
        youtubeSubscribers: profile.attributes.youtube_subscribers,
        description: profile.attributes.description,
        tags: profile.attributes.categories.split(','),
        youtubeId: profile.attributes.youtube_id,
        videos,
        isOwner: session?.user
          ? session.user['id'] === profile.attributes.accounts.data[0].id
          : false,
        handle: profile.attributes.handle,
        categories,
        categoryName: profile.attributes.category.data.attributes.name,
        youtubeVideos: profile.attributes.youtube_videos,
        youtubeViews: profile.attributes.youtube_views,
        youtubeUniqueViewers: profile.attributes.youtube_unique_viewers,
        youtubeWatchTimeHours: profile.attributes.youtube_watch_time_hours,
        youtubeAvgViewDuration: profile.attributes.youtube_avg_view_duration,
        website: profile.attributes.website,
        instagramFollowers: profile.attributes.instagram_followers,
        instagramImpressions: profile.attributes.instagram_impressions,
        instagramStoriesAvgViews:
          profile.attributes.instagram_stories_avg_views,
        instagramPostsAvgLikes: profile.attributes.instagram_posts_avg_likes,
        instagramReelsAvgViews: profile.attributes.instagram_reels_avg_views,
        twitchSubscribers: profile.attributes.twitch_subscribers,
        twitchVideos: profile.attributes.twitch_videos,
        twitchAvgViewers: profile.attributes.twitch_avg_viewers,
        twitchPeakViewers: profile.attributes.twitch_peak_viewers,
        twitchWatchTimeHours: profile.attributes.twitch_watch_time_hours,
        tiktokFollowers: profile.attributes.tiktok_followers,
        tiktokViews: profile.attributes.tiktok_views,
        tiktokLikes: profile.attributes.tiktok_likes,
        tiktokComments: profile.attributes.tiktok_comments,
        tiktokShares: profile.attributes.tiktok_shares,
        discordMembers: profile.attributes.discord_members,
        telegramMembers: profile.attributes.telegram_members,
        twitterFollowers: profile.attributes.twitter_followers,
        instagramHandle: profile.attributes.instagram_handle,
        twitchHandle: profile.attributes.twitch_handle,
        tiktokHandle: profile.attributes.tiktok_handle,
        discordHandle: profile.attributes.discord_handle,
        telegramHandle: profile.attributes.telegram_handle,
        twitterHandle: profile.attributes.twitter_handle,
        audienceGenderDistributionMen:
          profile.attributes.audience_gender_distribution_men,
        audienceGenderDistributionWomen:
          profile.attributes.audience_gender_distribution_women,
        audienceGenderDistribution18:
          profile.attributes.audience_age_distribution_18,
        audienceGenderDistribution2534:
          profile.attributes.audience_age_distribution_25_34,
        audienceGenderDistribution35:
          profile.attributes.audience_age_distribution_35,
        audienceTopCountries1: profile.attributes.audience_top_countries_1,
        audienceTopCountries2: profile.attributes.audience_top_countries_2,
        audienceTopCountries3: profile.attributes.audience_top_countries_3,
        services: profile.attributes.services.data,
      },
    };
  } catch (error) {
    console.error(error.message);

    return {
      props: {},
    };
  }
};
