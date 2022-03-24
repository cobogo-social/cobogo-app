import axios from 'axios';

const api = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
});

export const readChannel = async (session) => {
  try {
    const response = await api.get(
      `/channels?part=snippet%2CbrandingSettings&mine=true`,
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    );

    return response.data.items ? response.data.items[0] : null;
  } catch (error) {
    console.log(error);
  }
};

export const readVideos = async (session, youtubeChannel) => {
  try {
    const response = await api.get(
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

    return response.data.items;
  } catch (error) {
    console.log(error);
  }
};

export const readVideoById = async (session, video) => {
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
    console.log(error);
  }
};

export default api;
