import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.twitch.tv/helix',
  headers: {
    'Client-Id': process.env.TWITCH_CLIENT_ID,
  },
});

// TODO: add types on all functions
export async function readChannel(session) {
  try {
    const response = await api.get(`/users`, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
      params: {
        id: session.user.id,
      },
    });

    return response.data.data ? { twitch: response.data.data[0] } : null;
  } catch (error) {
    if (error.response) {
      console.error(error.response.data);
    } else {
      console.error(error);
    }
  }
}
