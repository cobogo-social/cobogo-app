import { createService, fetchSessionData } from '@services/cobogoApi';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { name, description, bannerImage } = req.body;

  try {
    const session = await getSession({ req });

    const { account } = await fetchSessionData(session);

    const profile = account.attributes.profiles.data[0];

    await createService(name, description, profile.id, bannerImage);

    res.status(201).json({ status: 201 });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
}
