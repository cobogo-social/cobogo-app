import {
  readAccountByYoutubeAccountId,
  updateTokensAccount,
  updateWaitlistProfile,
} from '@services/cobogoApi';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getSession({ req });

  try {
    const account = await readAccountByYoutubeAccountId(session.user['id']);
    const profile = account.attributes.profiles.data[0];

    if (!profile.attributes.waitlist) {
      await updateTokensAccount(account, 100);

      if (account.attributes.referral.data) {
        await updateTokensAccount(account.attributes.referral.data, 50);
      }
    }

    const response = await updateWaitlistProfile(profile);

    res.status(200).json({ status: 200, data: response });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
}
