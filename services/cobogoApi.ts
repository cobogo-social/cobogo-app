import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_COBOGO_API_URL,
  headers: {
    Authorization: `Bearer ${process.env.COBOGO_API_TOKEN}`,
  },
});

export const readProfileByChannel = async (channel) => {
  const response = await api.get(
    `/api/profiles?filters[channel][id][$eq]=${channel.id}`
  );

  return response.data.data[0];
};

export const readProfileByReferralCode = async (referralCode) => {
  try {
    const response = await api.get(
      `/api/profiles?filters[referral_code][$eq]=${referralCode}`
    );

    return response.data.data;
  } catch (error) {
    return null;
  }
};

export const readProfileByReferralId = async (referralId) => {
  console.log('oi')
  try {
    await api
      .get(`/api/profiles?filters[referral][id][$eq]=${referralId}`)
      .then((response) => response.data)
      .catch((e) => e.response.data);
  } catch (e) {
    console.error(e);
  }
};

export const readAccountByEmail = async (email) => {
  const response = await api.get(`/api/accounts?filters[email][$eq]=${email}`);

  return response.data.data[0];
};

export const readChannelByYoutubeId = async (youtubeChannelId) => {
  const response = await api.get(
    `/api/channels?filters[channel_id][$eq]=${youtubeChannelId}`
  );

  return response.data.data[0];
};

export const readChannelByAccount = async (account) => {
  try {
    const response = await api.get(
      `/api/channels?filters[account][id][$eq]=${account.id}`
    );

    return response.data.data[0];
  } catch (e) {
    console.error(e);
  }
};

export const createAccount = async (user) => {
  const response = await api.post('/api/accounts', {
    data: {
      name: user.name,
      email: user.email,
      image: user.image,
    },
  });

  return response.data.data;
};

export const createChannel = async (account, youtubeChannel) => {
  await api.post('/api/channels', {
    data: {
      title: youtubeChannel.snippet.title,
      description: youtubeChannel.snippet.description,
      channel_id: youtubeChannel.id,
      account: account.id,
    },
  });
};

export default api;
