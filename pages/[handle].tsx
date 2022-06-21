import MediaKitSocial from '@components/profile/MediaKitSocial';
import ProfileAbout from '@components/ProfileAbout';
import ProfileMediaKitAnalytics from '@components/ProfileMediaKitAnalytics';
import ProfileServices from '@components/ProfileServices';
import ProfileStake from '@components/ProfileStake';
import ProfileVideos from '@components/ProfileVideos';
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

export default function Index({
  bannerImage,
  profileImage,
  title,
  youtubeSubscribers,
  description,
  tags,
  youtubeId,
  videos,
  isOwner,
  handle,
  categories,
  categoryName,
  youtubeVideos,
  youtubeViews,
  youtubeUniqueViewers,
  youtubeWatchTimeHours,
  youtubeAvgViewDuration,
  website,
  instagramFollowers,
  instagramImpressions,
  instagramStoriesAvgViews,
  instagramPostsAvgLikes,
  instagramReelsAvgViews,
  twitchSubscribers,
  twitchVideos,
  twitchAvgViewers,
  twitchPeakViewers,
  twitchWatchTimeHours,
  tiktokFollowers,
  tiktokViews,
  tiktokLikes,
  tiktokComments,
  tiktokShares,
  discordMembers,
  telegramMembers,
  twitterFollowers,
  instagramHandle,
  twitchHandle,
  tiktokHandle,
  discordHandle,
  telegramHandle,
  twitterHandle,
  audienceGenderDistributionMen,
  audienceGenderDistributionWomen,
  audienceGenderDistribution18,
  audienceGenderDistribution2534,
  audienceGenderDistribution35,
  audienceTopCountries1,
  audienceTopCountries2,
  audienceTopCountries3,
  services,
}: ProfileProps) {
  return (
    <div>
      <TopBar noOnboardedFriends noTokens transparent />

      <ProfileAbout
        bannerImage={bannerImage}
        profileImage={profileImage}
        title={title}
        handle={handle}
        description={description}
        tags={tags}
      />

      <MediaKitSocial
        youtubeSubscribers={youtubeSubscribers}
        youtubeId={youtubeId}
        tiktokFollowers={tiktokFollowers}
        tiktokHandle={tiktokHandle}
        instagramFollowers={instagramFollowers}
        instagramHandle={instagramHandle}
        twitterFollowers={twitterFollowers}
        twitterHandle={twitterHandle}
        twitchSubscribers={twitchSubscribers}
        twitchHandle={twitchHandle}
        discordMembers={discordMembers}
        discordHandle={discordHandle}
        youtubeVideos={youtubeVideos}
        youtubeViews={youtubeViews}
        youtubeUniqueViewers={youtubeUniqueViewers}
        youtubeWatchTimeHours={youtubeWatchTimeHours}
        youtubeAvgViewDuration={youtubeAvgViewDuration}
        tiktokViews={tiktokViews}
        tiktokLikes={tiktokLikes}
        tiktokComments={tiktokComments}
        tiktokShares={tiktokShares}
        instagramImpressions={instagramImpressions}
        instagramStoriesAvgViews={instagramStoriesAvgViews}
        instagramPostsAvgLikes={instagramPostsAvgLikes}
        instagramReelsAvgViews={instagramReelsAvgViews}
        twitchVideos={twitchVideos}
        twitchAvgViewers={twitchAvgViewers}
        twitchPeakViewers={twitchPeakViewers}
        twitchWatchTimeHours={twitchWatchTimeHours}
      />

      <ProfileMediaKitAnalytics
        audienceGenderDistribution18={audienceGenderDistribution18}
        audienceGenderDistribution2534={audienceGenderDistribution2534}
        audienceGenderDistribution35={audienceGenderDistribution35}
        audienceTopCountries1={audienceTopCountries1}
        audienceTopCountries2={audienceTopCountries2}
        audienceTopCountries3={audienceTopCountries3}
        audienceGenderDistributionMen={audienceGenderDistributionMen}
        audienceGenderDistributionWomen={audienceGenderDistributionWomen}
      />

      <ProfileServices services={services} />

      <ProfileVideos title={title} videos={videos} />

      <ProfileStake />
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
          ? session.user['id'] ===
            profile.attributes.accounts.data[0].attributes.youtube_account_id
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
