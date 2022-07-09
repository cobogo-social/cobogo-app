import {
  createAccountToFan,
  createWallet,
  fetchSessionData,
  readWalletByAddress,
} from '@services/cobogoApi';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { walletAddress } = req.body;

  try {
    const session = await getSession({ req });

    const wallet = await readWalletByAddress(walletAddress);

    if (!wallet) {
      let account;

      if (session?.user) {
        ({ account } = await fetchSessionData(session));
      } else {
        account = await createAccountToFan(walletAddress);
      }

      await createWallet(walletAddress, account);

      res.status(201).json({ status: 201 });
    } else {
      res.status(200).json({
        status: 200,
        error:
          'This wallet is already being used by another account. Choose another wallet on MetaMask.',
      });
    }
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
}
