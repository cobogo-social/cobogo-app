import { getSession } from 'next-auth/react';

import cobogoApi from '../../../services/cobogoApi';

export default async function handler(req, res) {
  const { title, description, video_id } = req.body;
  const session = getSession({ req });

  try {
    const response = await cobogoApi.post(
      '/api/videos',
      {
        data: {
          title,
          description,
          video_id,
          account: (await session).account[0].id,
          channel: (await session).channels[0].id,
          profile: (await session).profiles[0].id,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.COBOGO_API_TOKEN}`,
        },
      }
    );

    res.status(201).json(response.data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
