import { getSession } from 'next-auth/react';

import youtubeApi from '../../../services/youtubeApi';

export default async function handler(req, res) {
  const { id } = req.query;
  const session = await getSession({ req });

  try {
    const response = await youtubeApi.get(
      `/videos?part=snippet%2CcontentDetails`,
      {
        params: {
          id: id,
        },
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
