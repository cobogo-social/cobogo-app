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

export default api;
