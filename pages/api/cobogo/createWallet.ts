import { createWallet, readWalletByAddress } from '@services/cobogoApi';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { address, account } = req.body;

  try {
    const wallet = await readWalletByAddress(address);

    if (!wallet) {
      const response = await createWallet(address, account);

      res.status(201).json({ status: 201, data: response });
    } else {
      res.status(200).json({ status: 200 });
    }
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
}
