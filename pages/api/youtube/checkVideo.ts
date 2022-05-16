import {
  createVideo,
  readAccountByYoutubeAccountId,
  updateTokensAccount,
  updateWaitlistProfile,
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
    const account = await readAccountByYoutubeAccountId(session.user['id']);
    const profile = account.attributes.profiles.data[0];
    const videos = await readVideos(
      session,
      profile.attributes.youtube_channel_id,
    );

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
        if (!profile.attributes.waitlist) {
          await createVideo(validVideo, account, profile);

          await updateWaitlistProfile(profile);
          await updateTokensAccount(account, 1000);

          if (account.attributes.referral.data) {
            await updateTokensAccount(account.attributes.referral.data, 50);
          }

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
