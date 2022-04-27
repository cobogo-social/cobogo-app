import axios from 'axios';

const api = axios.create({
  baseURL: process.env.COBOGO_API_URL,
});

export async function readProfileByChannel(channel, session) {
  try {
    const response = await api.get(
      `/api/profiles?filters[channel][id][$eq]=${channel.id}`,
      {
        headers: {
          Authorization: `Bearer ${session.user.cobogoAccessToken}`,
        },
      },
    );

    return response.data.data[0];
  } catch (error) {
    if (error.response) {
      console.log('readProfileByChannel');
      console.log(error.response.data);
    } else {
      console.log(error);
    }
  }
}

export async function readProfileByReferralCode(referralCode, session) {
  try {
    const response = await api.get(
      `/api/profiles?filters[referral_code][$eq]=${referralCode}`,
      {
        headers: {
          Authorization: `Bearer ${session.user.cobogoAccessToken}`,
        },
      },
    );

    return response.data.data[0];
  } catch (error) {
    if (error.response) {
      console.log('readProfileByReferralCode');
      console.log(error.response.data);
    } else {
      console.log(error);
    }
  }
}

export async function readProfilesByReferral(referral, session) {
  try {
    const response = await api.get(
      `/api/profiles?filters[referral][id][$eq]=${referral}&filters[waitlist][$eq]=true`,
      {
        headers: {
          Authorization: `Bearer ${session.user.cobogoAccessToken}`,
        },
      },
    );

    return response.data.data;
  } catch (error) {
    if (error.response) {
      console.log('readProfilesByReferral');
      console.log(error.response.data);
    } else {
      console.log(error);
    }
  }
}

export async function readProfileByHandle(handle, session) {
  try {
    const response = await api.get(
      `/api/profiles?filters[handle][$eq]=${handle}`,
      {
        headers: {
          Authorization: `Bearer ${session.user.cobogoAccessToken}`,
        },
      },
    );

    return response.data.data[0];
  } catch (error) {
    if (error.response) {
      console.log('readProfileByHandle');
      console.log(error.response.data);
    } else {
      console.log(error);
    }
  }
}

export async function readAccountByAccountId(accountId, session) {
  try {
    const response = await api.get(
      `/api/accounts?filters[account_id][$eq]=${accountId}`,
      {
        headers: {
          Authorization: `Bearer ${session.user.cobogoAccessToken}`,
        },
      },
    );

    return response.data.data[0];
  } catch (error) {
    if (error.response) {
      console.log('readAccountByAccountId');
      console.log(error.response.data);
    } else {
      console.log(error);
    }
  }
}

export async function readChannelByChannelId(channelId, session) {
  try {
    const response = await api.get(
      `/api/channels?filters[channel_id][$eq]=${channelId}`,
      {
        headers: {
          Authorization: `Bearer ${session.user.cobogoAccessToken}`,
        },
      },
    );

    return response.data.data[0];
  } catch (error) {
    if (error.response) {
      console.log('readChannelByChannelId');
      console.log(error.response.data);
    } else {
      console.log(error);
    }
  }
}

export async function readChannelByAccount(account, session) {
  try {
    const response = await api.get(
      `/api/channels?filters[account][id][$eq]=${account.id}`,
      {
        headers: {
          Authorization: `Bearer ${session.user.cobogoAccessToken}`,
        },
      },
    );

    return response.data.data[0];
  } catch (error) {
    if (error.response) {
      console.log('readChannelByAccount');
      console.log(error.response.data);
    } else {
      console.log(error);
    }
  }
}

export async function readChannelByProfile(profile, session) {
  try {
    const response = await api.get(
      `/api/channels?filters[profile][id][$eq]=${profile.id}`,
      {
        headers: {
          Authorization: `Bearer ${session.user.cobogoAccessToken}`,
        },
      },
    );

    return response.data.data[0];
  } catch (error) {
    if (error.response) {
      console.log('readChannelByProfile');
      console.log(error.response.data);
    } else {
      console.log(error);
    }
  }
}

export async function createAccount(user, session) {
  try {
    const response = await api.post(
      '/api/accounts',
      {
        data: {
          name: user.name,
          email: user.email,
          image: user.picture,
          account_id: user.sub,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${session.user.cobogoAccessToken}`,
        },
      },
    );

    return response.data.data;
  } catch (error) {
    if (error.response) {
      console.log('createAccount');
      console.log(error.response.data.error.details);
    } else {
      console.log(error);
    }
  }
}

export async function createChannel(account, youtubeChannel, session) {
  try {
    await api.post(
      '/api/channels',
      {
        data: {
          title: youtubeChannel.snippet.title,
          description: youtubeChannel.snippet.description,
          channel_id: youtubeChannel.id,
          account: account.id,
          banner: youtubeChannel.brandingSettings.image
            ? youtubeChannel.brandingSettings.image.bannerExternalUrl
            : null,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${session.user.cobogoAccessToken}`,
        },
      },
    );
  } catch (error) {
    if (error.response) {
      console.log('createChannel');
      console.log(error.response.data);
    } else {
      console.log(error);
    }
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
  session,
) {
  try {
    await api.post(
      '/api/profiles',
      {
        data: {
          description,
          handle,
          categories,
          account,
          channel,
          referral,
          referral_code: referralCode,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${session.user.cobogoAccessToken}`,
        },
      },
    );
  } catch (error) {
    if (error.response) {
      console.log('createProfile');
      console.log(error.response.data);
    } else {
      console.log(error);
    }
  }
}

export async function createVideo(
  validVideo,
  account,
  channel,
  profile,
  session,
) {
  try {
    await api.post(
      '/api/videos',
      {
        data: {
          title: validVideo.snippet.title,
          description: validVideo.snippet.description,
          video_id: validVideo.id.videoId,
          account: account.id,
          channel: channel.id,
          profile: profile.id,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${session.user.cobogoAccessToken}`,
        },
      },
    );
    return true;
  } catch (error) {
    if (error.response) {
      console.log('createVideo');
      console.log(error.response.data);
    } else {
      console.log(error);
    }
    return false;
  }
}

export async function updateWaitlistProfile(profile, session) {
  try {
    await api.put(
      `/api/profiles/${profile.id}`,
      {
        data: {
          waitlist: true,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${session.user.cobogoAccessToken}`,
        },
      },
    );
  } catch (error) {
    if (error.response) {
      console.log('updateWaitlistProfile');
      console.log(error.response.data);
    } else {
      console.log(error);
    }
  }
}
