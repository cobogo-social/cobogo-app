import {
  readAccountByReferralCode,
  fetchSessionData,
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

  const { description, handle, categories, queryRef, category } = req.body;

  try {
    const { account } = await fetchSessionData(session);
    const referralAccount = await readAccountByReferralCode(queryRef);

    if (referralAccount) {
      await updateReferralAccount(account, referralAccount);
    }

    const profile = account.attributes.profiles.data[0];

    const response = await updateProfile(
      description,
      handle,
      categories,
      profile.id,
      category,
    );

    res.status(201).json({ status: 201, data: response });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
}
