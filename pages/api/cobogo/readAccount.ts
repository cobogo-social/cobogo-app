import { fetchSessionData } from '@services/cobogoApi';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getSession({ req });

  try {
    const { account } = await fetchSessionData(session);

    res.status(200).json({ status: 200, data: account });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
}
