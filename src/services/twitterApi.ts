import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.twitter.com',
});

// TODO: add types on all functions
export async function readChannel(session) {
  try {
    const response = await api.get(
      `/2/users/me?user.fields=description,profile_image_url`,
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      },
    );

    return response.data.data ? { twitter: response.data.data } : null;
  } catch (error) {
    if (error.response) {
      console.error(error.response.data);
    } else {
      console.error(error);
    }
  }
}
