import {
  createAccountToFan,
  readAccountByName,
  readAccountByYoutubeAccountId,
} from '@services/cobogoApi';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { name } = req.body;
  const session = await getSession({ req });

  try {
    if (!session?.user) {
      const account = await readAccountByName(name);

      if (!account) {
        const response = await createAccountToFan(name);

        res.status(201).json({ status: 201, data: response });
      } else {
        res.status(200).json({ status: 200 });
      }
    } else {
      const response = await readAccountByYoutubeAccountId(session.user['id']);

      res.status(200).json({ status: 200, data: response });
    }
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
}
