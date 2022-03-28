import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_COBOGO_API_URL,
  headers: {
    Authorization: `Bearer ${process.env.COBOGO_API_TOKEN}`,
  },
});

export async function readProfileByChannel(channel) {
  try {
    const response = await api.get(
      `/api/profiles?filters[channel][id][$eq]=${channel.id}`
    );

    return response.data.data[0];
  } catch (error) {
    console.log(error);
  }
}

export async function readProfileByReferralCode(referralCode) {
  try {
    const response = await api.get(
      `/api/profiles?filters[referral_code][$eq]=${referralCode}`
    );

    return response.data.data;
  } catch (error) {
    console.log(error);
  }
}

export async function readProfilesByReferral(referral) {
  try {
    const response = await api.get(
      `/api/profiles?filters[referral][id][$eq]=${referral}`
    );

    return response.data.data;
  } catch (error) {
    console.error(error);
  }
}

export async function readProfileByHandle(handle) {
  try {
    const response = await api.get(
      `/api/profiles?filters[handle][$eq]=${handle}`
    );

    return response.data.data;
  } catch (error) {
    console.log(error);
  }
}

export async function readAccountByAccountId(accountId) {
  try {
    const response = await api.get(
      `/api/accounts?filters[account_id][$eq]=${accountId}`
    );

    return response.data.data[0];
  } catch (error) {
    console.log(error);
  }
}

export async function readChannelByChannelId(channelId) {
  try {
    const response = await api.get(
      `/api/channels?filters[channel_id][$eq]=${channelId}`
    );

    return response.data.data[0];
  } catch (error) {
    console.log(error);
  }
}

export async function readChannelByAccount(account) {
  try {
    const response = await api.get(
      `/api/channels?filters[account][id][$eq]=${account.id}`
    );

    return response.data.data[0];
  } catch (error) {
    console.error(error);
  }
}

export async function createAccount(user) {
  try {
    const response = await api.post('/api/accounts', {
      data: {
        name: user.name,
        email: user.email,
        image: user.image,
        account_id: user.id,
      },
    });

    return response.data.data;
  } catch (error) {
    console.log(error);
  }
}

export async function createChannel(account, youtubeChannel) {
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
}

export async function createProfile(
  description,
  handle,
  categories,
  account,
  channel,
  referral,
  referral_code
) {
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
}

export async function createVideo(validVideo, account, channel, profile) {
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
}

export async function updateWaitlistProfile(profile) {
  try {
    await api.put(`/api/profiles/${profile.id}`, {
      data: {
        waitlist: true,
      },
    });
  } catch (error) {
    console.log(error);
  }
}

export default api;
