import {
  fetchSessionData,
  readAccountByReferralCode,
  updateProfile,
  updateReferralAccount,
  updateTokensAccount,
} from '@services/cobogoApi';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getSession({ req });

  try {
    const { account } = await fetchSessionData(session);

    if (req.body.queryRef) {
      const referralAccount = await readAccountByReferralCode(
        req.body.queryRef,
      );

      await updateReferralAccount(account, referralAccount);

      await updateTokensAccount(referralAccount, 50);
    }

    const profile = account.attributes.profiles.data[0];

    if (!profile.attributes.waitlist) {
      await updateTokensAccount(account, 100);
    }

    const response = await updateProfile(
      req.body.description,
      req.body.handle,
      req.body.categories,
      profile.id,
      req.body.category,
      req.body.website,
      req.body.presentationVideo,
      req.body.youtubeVideos,
      req.body.youtubeViews,
      req.body.youtubeUniqueViewers,
      req.body.youtubeWatchTimeHours,
      req.body.youtubeAvgViewDuration,
      req.body.instagramHandle,
      req.body.instagramFollowers,
      req.body.instagramImpressions,
      req.body.instagramStoriesAvgViews,
      req.body.instagramPostsAvgLikes,
      req.body.instagramReelsAvgViews,
      req.body.twitchHandle,
      req.body.twitchSubscribers,
      req.body.twitchVideos,
      req.body.twitchAvgViewers,
      req.body.twitchPeakViewers,
      req.body.twitchWatchTimeHours,
      req.body.tiktokHandle,
      req.body.tiktokFollowers,
      req.body.tiktokViews,
      req.body.tiktokLikes,
      req.body.tiktokComments,
      req.body.tiktokShares,
      req.body.discordHandle,
      req.body.discordMembers,
      req.body.telegramHandle,
      req.body.telegramMembers,
      req.body.twitterHandle,
      req.body.twitterFollowers,
      req.body.audienceGenderDistributionMen,
      req.body.audienceGenderDistributionWomen,
      req.body.audienceGenderDistributionOthers,
      req.body.audienceAgeDistribution18,
      req.body.audienceAgeDistribution2534,
      req.body.audienceAgeDistribution35,
      req.body.audienceTopCountries1,
      req.body.audienceTopCountries2,
      req.body.audienceTopCountries3,
      req.body.language,
      req.body.audienceTopCountry1,
      req.body.audienceTopCountry2,
      req.body.audienceTopCountry3,
    );

    res.status(201).json({ status: 201, data: response });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
}
