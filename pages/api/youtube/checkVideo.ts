import {
  createVideo,
  readAccountByAccountId,
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
      const account = await readAccountByAccountId(session.user['id']);
      const channel = await readChannelByAccount(account);
      const profile = await readProfileByChannel(channel);

      for (const video of videos) {
        const validTitle = video.snippet.title.toLowerCase().includes('cobogo');
        const validDescription = video.snippet.description.toLowerCase().includes(`app.cobogo.social/${profile.attributes.handle}`);

        console.log(`Validation video ${video.snippet.title}`);
        console.log(`  Valid Title: ${validTitle}`);
        console.log(`  Valid Description: ${validDescription} (app.cobogo.social/${profile.attributes.handle})`);

        if (
          validTitle &&
          validDescription
        ) {
          const item = await readVideoById(session, video);
          const validLength = moment.duration(item.contentDetails.duration).asMinutes() >= 2;
          console.log(`  Valid Length: ${validLength}`);
          if(validLength) {
            validVideo = video;
            break;
          }
        }
      }

      if (validVideo !== null) {
        if(await createVideo(validVideo, account, channel, profile)) {
          await updateWaitlistProfile(profile);

          res.status(200).json({ validVideo: 1 });
        } else {
          res.status(200).json({ validVideo: 0 });
        }
      } else {
        res.status(200).json({ validVideo: 0 });
      }
    } else {
      res.status(200).json({ validVideo: 0 });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
