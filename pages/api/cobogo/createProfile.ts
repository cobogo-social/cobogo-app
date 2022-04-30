import {
  createProfile,
  readAccountByReferralCode,
  readAccountByYoutubeAccountId,
  readChannelByAccount,
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
    const channel = await readChannelByAccount(account);
    const referral = await readAccountByReferralCode(queryRef);

    const response = await createProfile(
      description,
      handle,
      categories,
      account.id,
      channel.id,
      referral?.id,
    );

    res.status(201).json({ status: 201, data: response });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
}
