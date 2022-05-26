import axios from 'axios';

const api = axios.create({
  baseURL: 'https://discord.com/api',
});

// TODO: add types on all functions
export async function readChannel(session) {
  try {
    const response = await api.get(`/v10/users/@me`, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    return response.data ? { discord: response.data } : null;
  } catch (error) {
    if (error.response) {
      console.error(error.response.data);
    } else {
      console.error(error);
    }
  }
}
