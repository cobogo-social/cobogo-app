import {
  createVideo,
  readAccountByEmail,
  readChannelByAccount,
  readProfileByChannel,
  updateWaitlistProfile,
} from '@services/cobogoApi';
import {
  readChannel as readChannelFromYoutube,
  readVideoById,
  readVideos,
} from '@services/youtubeApi';
import moment from 'moment';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  const session = await getSession({ req });

  const youtubeChannel = await readChannelFromYoutube(session);

  try {
    const videos = await readVideos(session, youtubeChannel);
    let validVideo = null;

    if (videos.length) {
      const account = await readAccountByEmail(session.user.email);
      const channel = await readChannelByAccount(account);
      const profile = await readProfileByChannel(channel);

      videos.forEach(async (video) => {
        if (!validVideo) {
          const item = await readVideoById(session, video);

          if (
            moment.duration(item.contentDetails.duration).asMinutes() >= 2 &&
            item.snippet.title.toLowerCase().includes('cobogo') &&
            item.snippet.description
              .toLowerCase()
              .includes(`app.cobogo.social/${profile.attributes.handle}`)
          ) {
            validVideo = item;

            if (validVideo !== null) {
              await createVideo(validVideo, account, channel, profile);

              await updateWaitlistProfile(profile);

              res.status(200).json({ validVideo: 1 });
            } else {
              res.status(200).json({ validVideo: 0 });
            }
          }
        }
      });
    } else {
      res.status(200).json({ validVideo: 0 });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
