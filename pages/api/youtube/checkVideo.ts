import {
  createVideo,
  fetchSessionData,
  updateTokensAccount,
} from '@services/cobogoApi';
import { readVideoById, readVideos } from '@services/youtubeApi';
import moment from 'moment';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getSession({ req });

  try {
    const { account, profile } = await fetchSessionData(session);
    const videos = await readVideos(session, profile.attributes.youtube_id);

    let validVideo = null;

    if (videos.length) {
      for (const video of videos) {
        const validTitle = video.snippet.title.toLowerCase().includes('cobogo');
        const validDescription = video.snippet.description
          .toLowerCase()
          .includes(`app.cobogo.social/${profile.attributes.handle}`);

        if (validTitle && validDescription) {
          const item = await readVideoById(session, video);
          const validLength =
            moment.duration(item.contentDetails.duration).asMinutes() >= 2;

          if (validLength) {
            validVideo = video;
            break;
          }
        }
      }

      if (validVideo !== null) {
        if (!profile.attributes.video.data) {
          await createVideo(validVideo, account, profile);

          await updateTokensAccount(account, 1000);

          res.status(200).json({ status: 200, data: { validVideo: 1 } });
        } else {
          res.status(200).json({ status: 200, data: { validVideo: 0 } });
        }
      } else {
        res.status(200).json({ status: 200, data: { validVideo: 0 } });
      }
    } else {
      res.status(200).json({ status: 200, data: { validVideo: 0 } });
    }
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
}
