import { getSession } from 'next-auth/react';
import youtubeApi from '../../../services/youtubeApi';

export default async function handler(req, res) {
  const session = await getSession({ req });

  try {
    const response = await youtubeApi.get(
      `/channels?part=snippet%2CbrandingSettings&mine=true`,
      {
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
