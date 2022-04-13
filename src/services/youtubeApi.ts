import axios from 'axios';

const api = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
});

export async function readChannel(session) {
  try {
    const response = await api.get(
      `/channels?part=snippet%2CbrandingSettings&mine=true`,
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      },
    );

    return response.data.items ? response.data.items[0] : null;
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
    } else {
      console.log(error);
    }
  }
}

export async function readVideos(session, youtubeChannel) {
  try {
    const response = await api.get(
      `/search?part=snippet&maxResults=25&type=video`,
      {
        params: {
          channelId: youtubeChannel.id,
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
      console.log(error.response.data);
    } else {
      console.log(error);
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
      console.log(error.response.data);
    } else {
      console.log(error);
    }
  }
}
