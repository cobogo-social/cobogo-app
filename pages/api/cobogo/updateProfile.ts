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

  const {
    description,
    handle,
    categories,
    queryRef,
    category,
    website,
    presentationVideo,
  } = req.body;

  try {
    const { account } = await fetchSessionData(session);

    if (queryRef) {
      const referralAccount = await readAccountByReferralCode(queryRef);

      await updateReferralAccount(account, referralAccount);

      await updateTokensAccount(referralAccount, 50);
    }

    const profile = account.attributes.profiles.data[0];

    if (!profile.attributes.waitlist) {
      await updateTokensAccount(account, 100);
    }

    const response = await updateProfile(
      description,
      handle,
      categories,
      profile.id,
      category,
      website,
      presentationVideo,
    );

    res.status(201).json({ status: 201, data: response });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
}
