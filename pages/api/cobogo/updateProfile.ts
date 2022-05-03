import {
  readAccountByReferralCode,
  readAccountByYoutubeAccountId,
  updateProfile,
  updateReferralAccount,
} from '@services/cobogoApi';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getSession({ req });

  const { description, handle, categories, queryRef } = req.body;

  try {
    const account = await readAccountByYoutubeAccountId(session.user['id']);
    const referral = await readAccountByReferralCode(queryRef);

    if (referral) {
      await updateReferralAccount(account, referral);
    }

    const profile = account.attributes.profiles.data[0];

    const response = await updateProfile(
      description,
      handle,
      categories,
      profile.id,
    );

    res.status(201).json({ status: 201, data: response });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
}
