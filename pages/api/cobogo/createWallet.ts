import {
  createWallet,
  readAccountByYoutubeAccountId,
} from '@services/cobogoApi';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getSession({ req });
  const { wallet } = req.body;

  try {
    const account = await readAccountByYoutubeAccountId(session.user['id']);

    const response = await createWallet(wallet, account);

    res.status(201).json({ status: 201, data: response });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
}
