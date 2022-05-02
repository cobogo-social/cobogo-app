import {
  createProfile,
  readAccountByReferralCode,
  readAccountByYoutubeAccountId,
  updateReferralAccount,
} from '@services/cobogoApi';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getSession({ req });

  const {
    description,
    handle,
    categories,
    queryRef,
    title,
    youtubeDescription,
    youtubeChannelId,
    bannerImage,
    profileImage,
    youtubeSubscribers,
  } = req.body;

  try {
    const account = await readAccountByYoutubeAccountId(session.user['id']);
    const referral = await readAccountByReferralCode(queryRef);

    if (referral) {
      await updateReferralAccount(account, referral);
    }

    const response = await createProfile(
      description,
      handle,
      categories,
      account.id,
      referral?.id,
      title,
      youtubeDescription,
      youtubeChannelId,
      bannerImage,
      profileImage,
      youtubeSubscribers,
    );

    res.status(201).json({ status: 201, data: response });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
}
