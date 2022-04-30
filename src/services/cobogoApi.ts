import axios from 'axios';
import referralCodeGenerator from 'referral-code-generator';

const api = axios.create({
  baseURL: process.env.COBOGO_API_URL,
  headers: {
    Authorization: `Bearer ${process.env.COBOGO_API_TOKEN}`,
  },
});

export async function readProfileByChannel(channel) {
  try {
    const response = await api.get(
      `/api/profiles?populate=*&filters[channel][id][$eq]=${channel.id}`,
    );

    return response.data.data[0];
  } catch (error) {
    if (error.response) {
      console.error(error.response.data);
    } else {
      console.error(error);
    }
  }
}

export async function readAccountByReferralCode(referralCode) {
  try {
    const response = await api.get(
      `/api/accounts?filters[referral_code][$eq]=${referralCode}`,
    );

    return response.data.data[0];
  } catch (error) {
    if (error.response) {
      console.error(error.response.data);
    } else {
      console.error(error);
    }
  }
}

export async function readProfilesByReferral(referral) {
  try {
    const response = await api.get(
      `/api/profiles?filters[referral][id][$eq]=${referral}&filters[waitlist][$eq]=true`,
    );

    return response.data.data;
  } catch (error) {
    if (error.response) {
      console.error(error.response.data);
    } else {
      console.error(error);
    }
  }
}

export async function readAccountByYoutubeAccountId(youtubeAccountId) {
  try {
    const response = await api.get(
      `/api/accounts?populate=*&filters[youtube_account_id][$eq]=${youtubeAccountId}`,
    );

    return response.data.data[0];
  } catch (error) {
    if (error.response) {
      console.error(error.response.data);
    } else {
      console.error(error);
    }
  }
}

export async function readAccountByName(name) {
  try {
    const response = await api.get(
      `/api/accounts?populate=*&filters[name][$eq]=${name}`,
    );

    return response.data.data[0] ? response.data.data[0] : null;
  } catch (error) {
    if (error.response) {
      console.error(error.response.data);
    } else {
      console.error(error);
    }
  }
}

export async function readProfileByHandle(handle) {
  try {
    const response = await api.get(
      `/api/profiles?populate=*&filters[handle][$eq]=${handle}`,
    );

    return response.data.data[0];
  } catch (error) {
    if (error.response) {
      console.error(error.response.data);
    } else {
      console.error(error);
    }
  }
}

export async function readChannelByChannelId(channelId) {
  try {
    const response = await api.get(
      `/api/channels?filters[channel_id][$eq]=${channelId}`,
    );

    return response.data.data[0];
  } catch (error) {
    if (error.response) {
      console.error(error.response.data);
    } else {
      console.error(error);
    }
  }
}

export async function readChannelByAccount(account) {
  try {
    const response = await api.get(
      `/api/channels?filters[account][id][$eq]=${account.id}`,
    );

    return response.data.data[0];
  } catch (error) {
    if (error.response) {
      console.error(error.response.data);
    } else {
      console.error(error);
    }
  }
}

export async function readChannelByProfile(profile) {
  try {
    const response = await api.get(
      `/api/channels?filters[profile][id][$eq]=${profile.id}`,
    );

    return response.data.data[0];
  } catch (error) {
    if (error.response) {
      console.error(error.response.data);
    } else {
      console.error(error);
    }
  }
}

export async function readProfileById(id) {
  try {
    const response = await api.get(
      `/api/profiles?populate=*&filters[id][$eq]=${id}`,
    );

    return response.data.data[0] ? response.data.data[0] : null;
  } catch (error) {
    if (error.response) {
      console.error(error.response.data);
    } else {
      console.error(error);
    }
  }
}

export async function readWalletByAddress(address) {
  try {
    const response = await api.get(
      `/api/wallets?filters[address][$eq]=${address}`,
    );

    return response.data.data[0] ? response.data.data[0] : null;
  } catch (error) {
    if (error.response) {
      console.error(error.response.data);
    } else {
      console.error(error);
    }
  }
}

export async function createAccount(user) {
  try {
    const referralCode = await referralCodeGenerator.alphaNumeric(
      'lowercase',
      2,
      2,
    );

    const response = await api.post('/api/accounts', {
      data: {
        name: user.name,
        email: user.email,
        image: user.image,
        youtube_account_id: user.id,
        referral_code: referralCode,
      },
    });

    return response.data.data;
  } catch (error) {
    if (error.response) {
      console.error(error.response.data);
    } else {
      console.error(error);
    }
  }
}

export async function createAccountToFan(name) {
  try {
    const referralCode = await referralCodeGenerator.alphaNumeric(
      'lowercase',
      2,
      2,
    );

    const response = await api.post('/api/accounts', {
      data: {
        name,
        referral_code: referralCode,
      },
    });

    return response.data.data;
  } catch (error) {
    if (error.response) {
      console.error(error.response.data);
    } else {
      console.error(error);
    }
  }
}

export async function createWallet(address, account) {
  try {
    await api.post('/api/wallets', {
      data: {
        address,
        account,
      },
    });
  } catch (error) {
    if (error.response) {
      console.error(error.response.data);
    } else {
      console.error(error);
    }
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
    if (error.response) {
      console.error(error.response.data);
    } else {
      console.error(error);
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
      },
    });
  } catch (error) {
    if (error.response) {
      console.error(error.response.data);
    } else {
      console.error(error);
    }
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
    if (error.response) {
      console.error(error.response.data);
    } else {
      console.error(error);
    }

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
    if (error.response) {
      console.error(error.response.data);
    } else {
      console.error(error);
    }
  }
}

export async function updateTokensAccount(account, tokens) {
  try {
    await api.put(`/api/accounts/${account.id}`, {
      data: {
        tokens: account.attributes.tokens + tokens,
      },
    });
  } catch (error) {
    if (error.response) {
      console.error(error.response.data);
    } else {
      console.error(error);
    }
  }
}
