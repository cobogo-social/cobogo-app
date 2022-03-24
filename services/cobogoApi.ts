import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_COBOGO_API_URL,
  headers: {
    Authorization: `Bearer ${process.env.COBOGO_API_TOKEN}`,
  },
});

export const readProfileByChannel = async (channel) => {
  try {
    const response = await api.get(
      `/api/profiles?filters[channel][id][$eq]=${channel.id}`
    );

    return response.data.data[0];
  } catch (error) {
    console.log(error);
  }
};

export const readProfileByReferralCode = async (referralCode) => {
  try {
    const response = await api.get(
      `/api/profiles?filters[referral_code][$eq]=${referralCode}`
    );

    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const readProfilesByReferral = async (referralId) => {
  try {
    const response = await api.get(
      `/api/profiles?filters[referral][id][$eq]=${referralId}`
    );

    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};

export const readProfileByHandle = async (handle) => {
  try {
    const response = await api.get(
      `/api/profiles?filters[handle][$eq]=${handle}`
    );

    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const readAccountByEmail = async (email) => {
  try {
    const response = await api.get(
      `/api/accounts?filters[email][$eq]=${email}`
    );

    return response.data.data[0];
  } catch (error) {
    console.log(error);
  }
};

export const readChannelByYoutubeId = async (youtubeChannelId) => {
  try {
    const response = await api.get(
      `/api/channels?filters[channel_id][$eq]=${youtubeChannelId}`
    );

    return response.data.data[0];
  } catch (error) {
    console.log(error);
  }
};

export const readChannelByAccount = async (account) => {
  try {
    const response = await api.get(
      `/api/channels?filters[account][id][$eq]=${account.id}`
    );

    return response.data.data[0];
  } catch (error) {
    console.error(error);
  }
};

export const createAccount = async (user) => {
  try {
    const response = await api.post('/api/accounts', {
      data: {
        name: user.name,
        email: user.email,
        image: user.image,
      },
    });

    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const createChannel = async (account, youtubeChannel) => {
  try {
    await api.post('/api/channels', {
      data: {
        title: youtubeChannel.snippet.title,
        description: youtubeChannel.snippet.description,
        channel_id: youtubeChannel.id,
        account: account.id,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const createProfile = async (
  description,
  handle,
  categories,
  account,
  channel,
  referral,
  referral_code
) => {
  try {
    await api.post('/api/profiles', {
      data: {
        description,
        handle,
        categories,
        account,
        channel,
        referral,
        referral_code,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const createVideo = async (validVideo, account, channel, profile) => {
  try {
    await api.post('/api/videos', {
      data: {
        title: validVideo.snippet.title,
        description: validVideo.snippet.description,
        video_id: validVideo.id,
        account: account.id,
        channel: channel.id,
        profile: profile.id,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateWaitlistProfile = async (profile) => {
  try {
    await api.put(`/api/profiles/${profile.id}`, {
      data: {
        waitlist: true,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export default api;
