import {
  createAccountToFan,
  createWallet,
  fetchSessionData,
  readWalletByAddress,
  updateTokensAccount,
  updateWaitlistProfile,
} from '@services/cobogoApi';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { walletAddress } = req.body;
  const session = await getSession({ req });

  try {
    const wallet = await readWalletByAddress(walletAddress);

    if (!wallet) {
      let account;

      if (session?.user) {
        ({ account } = await fetchSessionData(session));
      } else {
        account = await createAccountToFan(walletAddress);
      }

      const profile = account.attributes.profiles.data[0];

      await createWallet(walletAddress, account);
      await updateWaitlistProfile(profile);

      if (!profile.attributes.waitlist) {
        await updateTokensAccount(account, 100);
      }

      res.status(201).json({ status: 201 });
    } else {
      res.status(200).json({ status: 200 });
    }
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
}
