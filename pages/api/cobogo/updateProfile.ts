import { getSession } from 'next-auth/react';

import cobogoApi from '../../../services/cobogoApi';

export default async function handler(req, res) {
  const session = getSession({ req });

  try {
    const response = await cobogoApi.put(
      `/api/profiles/${(await session).profiles[0].id}`,
      {
        data: {
          waitlist: true,
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
