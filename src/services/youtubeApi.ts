import axios from 'axios';

const api = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
});

export async function readChannel(accessToken) {
  try {
    const response = await api.get(
      `/channels?part=snippet%2CbrandingSettings%2Cstatistics&mine=true`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response.data.items ? response.data.items[0] : null;
  } catch (error) {
    if (error.response) {
      console.error(error.response.data);
    } else {
      console.error(error);
    }
  }
}

export async function readVideos(session, youtubeChannelId) {
  try {
    const response = await api.get(
      `/search?part=snippet&maxResults=25&type=video`,
      {
        params: {
          channelId: youtubeChannelId,
          q: 'cobogo',
        },
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      },
    );

    return response.data.items;
  } catch (error) {
    if (error.response) {
      console.error(error.response.data);
    } else {
      console.error(error);
    }
  }
}

export async function readVideoById(session, video) {
  try {
    const response = await api.get(`/videos?part=snippet%2CcontentDetails`, {
      params: {
        id: video.id.videoId,
      },
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    return response.data.items[0];
  } catch (error) {
    if (error.response) {
      console.error(error.response.data);
    } else {
      console.error(error);
    }
  }
}

export async function readVideosByChannelId(youtubeChannelId) {
  try {
    const response = await api.get(`/search?`, {
      params: {
        channelId: youtubeChannelId,
        key: process.env.YOUTUBE_API_KEY,
        type: 'video',
        part: 'snippet',
        maxResults: 4,
        order: 'date',
      },
    });

    return response.data.items;
  } catch (error) {
    if (error.response) {
      console.error(error.response.data);
    } else {
      console.error(error);
    }
    return [];
  }
}
