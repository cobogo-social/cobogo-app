import moment from 'moment';
import { getSession } from 'next-auth/react';

import cobogoApi, {
  readAccountByEmail,
  readChannelByAccount,
  readProfileByChannel,
} from '../../../services/cobogoApi';
import youtubeApi, {
  readChannel as readChannelFromYoutube,
} from '../../../services/youtubeApi';

export default async function handler(req, res) {
  const session = await getSession({ req });

  const youtubeChannel = await readChannelFromYoutube(session);

  try {
    const response = await youtubeApi.get(
      `/search?part=snippet&maxResults=25&type=video&videoDuration=short`,
      {
        params: {
          channelId: youtubeChannel.id,
          q: 'cobogo',
        },
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    );

    const videos = response.data.items;
    let validVideo = null;

    if (videos.length) {
      const account = await readAccountByEmail(session.user.email);
      const channel = await readChannelByAccount(account);
      const profile = await readProfileByChannel(channel);

      videos.forEach(async (video) => {
        if (!validVideo) {
          const response = await youtubeApi.get(
            `/videos?part=snippet%2CcontentDetails`,
            {
              params: {
                id: video.id.videoId,
              },
              headers: {
                Authorization: `Bearer ${session.accessToken}`,
              },
            }
          );

          const item = response.data.items[0];

          if (
            moment.duration(item.contentDetails.duration).asMinutes() >= 2 &&
            item.snippet.title.toLowerCase().includes('cobogo') &&
            item.snippet.description
              .toLowerCase()
              .includes(`app.cobogo.social/${profile.attributes.handle}`)
          ) {
            validVideo = item;

            if (validVideo !== null) {
              await cobogoApi.post('/api/videos', {
                data: {
                  title: validVideo.snippet.title,
                  description: validVideo.snippet.description,
                  video_id: validVideo.id,
                  account: account.id,
                  channel: channel.id,
                  profile: profile.id,
                },
              });

              await cobogoApi.put(`/api/profiles/${profile.id}`, {
                data: {
                  waitlist: true,
                },
              });

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
