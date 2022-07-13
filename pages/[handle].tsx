import About from '@components/profile/About';
import MediaKitAnalytics from '@components/profile/MediaKitAnalytics';
import MediaKitSocial from '@components/profile/MediaKitSocial';
import Services from '@components/profile/Services';
import Stake from '@components/profile/Stake';
import Videos from '@components/profile/Videos';
import TopBar from '@components/TopBar';
import {
  readCategories,
  readCountries,
  readLanguages,
  readProfileByHandle,
} from '@services/cobogoApi';
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
  categoryId: number;
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
  audienceGenderDistributionOthers: number;
  audienceAgeDistribution18: number;
  audienceAgeDistribution2534: number;
  audienceAgeDistribution35: number;
  audienceTopCountries1: number;
  audienceTopCountries2: number;
  audienceTopCountries3: number;
  services: unknown[];
  presentationVideo: string;
  languages: string[];
  languageName: string;
  languageId: number;
  countries: string[];
  country1Name: string;
  country2Name: string;
  country3Name: string;
  country1Id: number;
  country2Id: number;
  country3Id: number;
  status: string;
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
        categoryId={props.categoryId}
        presentationVideo={props.presentationVideo}
        languages={props.languages}
        languageName={props.languageName}
        languageId={props.languageId}
        status={props.status}
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
        handle={props.handle}
      />

      <MediaKitAnalytics
        audienceAgeDistribution18={props.audienceAgeDistribution18}
        audienceAgeDistribution2534={props.audienceAgeDistribution2534}
        audienceAgeDistribution35={props.audienceAgeDistribution35}
        audienceTopCountries1={props.audienceTopCountries1}
        audienceTopCountries2={props.audienceTopCountries2}
        audienceTopCountries3={props.audienceTopCountries3}
        audienceGenderDistributionMen={props.audienceGenderDistributionMen}
        audienceGenderDistributionWomen={props.audienceGenderDistributionWomen}
        audienceGenderDistributionOthers={
          props.audienceGenderDistributionOthers
        }
        handle={props.handle}
        isOwner={props.isOwner}
        countries={props.countries}
        country1Name={props.country1Name}
        country2Name={props.country2Name}
        country3Name={props.country3Name}
        country1Id={props.country1Id}
        country2Id={props.country2Id}
        country3Id={props.country3Id}
      />

      <Services
        services={props.services}
        isOwner={props.isOwner}
        handle={props.handle}
      />

      <Videos videos={props.videos} />

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

    const languages = await readLanguages();

    const countries = await readCountries();

    const isOwner = session?.user
      ? session.user['id'] === profile.attributes.accounts.data[0].id
      : false;

    if (profile.attributes.status === 'draft' && !isOwner) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    if (profile.attributes.status === 'blocked') {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

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
        isOwner,
        handle: profile.attributes.handle,
        categories,
        categoryName: profile.attributes.category.data.attributes.name,
        categoryId: profile.attributes.category.data.id,
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
        audienceGenderDistributionOthers:
          profile.attributes.audience_gender_distribution_others,
        audienceAgeDistribution18:
          profile.attributes.audience_age_distribution_18,
        audienceAgeDistribution2534:
          profile.attributes.audience_age_distribution_25_34,
        audienceAgeDistribution35:
          profile.attributes.audience_age_distribution_35,
        audienceTopCountries1: profile.attributes.audience_top_countries_1,
        audienceTopCountries2: profile.attributes.audience_top_countries_2,
        audienceTopCountries3: profile.attributes.audience_top_countries_3,
        services: profile.attributes.services.data,
        presentationVideo: profile.attributes.presentation_video,
        languages,
        languageName: profile.attributes.language.data
          ? profile.attributes.language.data.attributes.name
          : null,
        languageId: profile.attributes.language.data
          ? profile.attributes.language.data.id
          : null,
        countries,
        country1Name: profile.attributes.audience_top_country_1.data
          ? profile.attributes.audience_top_country_1.data.attributes.name
          : null,
        country2Name: profile.attributes.audience_top_country_2.data
          ? profile.attributes.audience_top_country_2.data.attributes.name
          : null,
        country3Name: profile.attributes.audience_top_country_3.data
          ? profile.attributes.audience_top_country_3.data.attributes.name
          : null,
        country1Id: profile.attributes.audience_top_country_1.data
          ? profile.attributes.audience_top_country_1.data.id
          : null,
        country2Id: profile.attributes.audience_top_country_2.data
          ? profile.attributes.audience_top_country_2.data.id
          : null,
        country3Id: profile.attributes.audience_top_country_3.data
          ? profile.attributes.audience_top_country_3.data.id
          : null,
        status: profile.attributes.status,
      },
    };
  } catch (error) {
    console.error(error.message);

    return {
      props: {},
    };
  }
};
