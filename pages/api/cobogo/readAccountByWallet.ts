import { readAccountByWalletAddress } from '@services/cobogoApi';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { walletAddress } = req.query;

  try {
    const account = await readAccountByWalletAddress(walletAddress);

    res.status(200).json({ status: 200, data: account });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
}
