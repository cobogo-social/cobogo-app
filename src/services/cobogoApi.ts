import axios from 'axios';

const api = axios.create({
  baseURL: process.env.COBOGO_API_URL,
  headers: {
    Authorization: `Bearer ${process.env.COBOGO_API_TOKEN}`,
  },
});

export async function readProfileByChannel(channel) {
  try {
    const response = await api.get(
      `/api/profiles?filters[channel][id][$eq]=${channel.id}`,
    );

    return response.data.data[0];
  } catch (error) {
    console.log(error);
  }
}

export async function readProfileByReferralCode(referralCode) {
  try {
    const response = await api.get(
      `/api/profiles?filters[referral_code][$eq]=${referralCode}`,
    );

    return response.data.data[0];
  } catch (error) {
    console.log(error);
  }
}

export async function readProfilesByReferral(referral) {
  try {
    const response = await api.get(
      `/api/profiles?filters[referral][id][$eq]=${referral}`,
    );

    return response.data.data;
  } catch (error) {
    console.log(error);
  }
}

export async function readProfileByHandle(handle) {
  try {
    const response = await api.get(
      `/api/profiles?filters[handle][$eq]=${handle}`,
    );

    return response.data.data[0];
  } catch (error) {
    console.log(error);
  }
}

export async function readAccountByAccountId(accountId) {
  try {
    const response = await api.get(
      `/api/accounts?filters[account_id][$eq]=${accountId}`,
    );

    return response.data.data[0];
  } catch (error) {
    console.log(error);
  }
}

export async function readChannelByChannelId(channelId) {
  try {
    const response = await api.get(
      `/api/channels?filters[channel_id][$eq]=${channelId}`,
    );

    return response.data.data[0];
  } catch (error) {
    console.log(error);
  }
}

export async function readChannelByAccount(account) {
  try {
    const response = await api.get(
      `/api/channels?filters[account][id][$eq]=${account.id}`,
    );

    return response.data.data[0];
  } catch (error) {
    console.log(error);
  }
}

export async function readChannelByProfile(profile) {
  try {
    const response = await api.get(
      `/api/channels?filters[profile][id][$eq]=${profile.id}`,
    );

    return response.data.data[0];
  } catch (error) {
    console.log(error);
  }
}

export async function readWalletByAccount(account) {
  try {
    const response = await api.get(
      `/api/wallets?filters[account][$eq]=${account}`,
    );

    return response.data.data[0] ? response.data.data[0] : null;
  } catch (error) {
    console.log(error);
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

export async function createWallet(wallet, referralCode) {
  console.log(wallet, referralCode);

  try {
    await api.post('/api/wallets', {
      data: {
        account: wallet,
        referral_code: referralCode,
      },
    });
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
        banner: youtubeChannel.brandingSettings.image
          ? youtubeChannel.brandingSettings.image.bannerExternalUrl
          : null,
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
  referralCode,
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
        referral_code: referralCode,
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
        video_id: validVideo.id.videoId,
        account: account.id,
        channel: channel.id,
        profile: profile.id,
      },
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
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
