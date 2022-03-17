import { getSession } from 'next-auth/react';

import youtubeApi from '../../../services/youtubeApi';

export default async function handler(req, res) {
  const session = await getSession({ req });

  try {
    const response = await youtubeApi.get(
      `/search?part=snippet&maxResults=25&type=video&videoDuration=short`,
      {
        params: {
          channelId: session.youtubeChannels[0].id,
          q: 'windows',
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
