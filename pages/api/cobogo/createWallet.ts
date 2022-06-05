import {
  createWallet,
  readWalletByAddress,
  readAccountByYoutubeAccountId,
  createAccountToFan,
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
    let account;
    if (!wallet) {
      if (session?.user) {
        account = await readAccountByYoutubeAccountId(session.user['id']);
      } else {
        account = await createAccountToFan(walletAddress);
      }
      await createWallet(walletAddress, account);

      res.status(201).json({ status: 201 });
    } else {
      res.status(200).json({ status: 200 });
    }
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
}
