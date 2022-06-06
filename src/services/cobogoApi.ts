import axios from 'axios';
import referralCodeGenerator from 'referral-code-generator';
import { readChannel } from '@services/youtubeApi';

const api = axios.create({
  baseURL: process.env.COBOGO_API_URL,
  headers: {
    Authorization: `Bearer ${process.env.COBOGO_API_TOKEN}`,
  },
});

// TODO: add types on all functions
export async function readAccountByReferralCode(referralCode) {
  try {
    const response = await api.get(
      `/api/accounts?filters[referral_code][$eq]=${referralCode}`,
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

export async function readAccountsByReferralId(referralId) {
  try {
    const response = await api.get(
      `/api/accounts?populate=*&filters[referral][id][$eq]=${referralId}`,
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

export async function readAccountById(accountId) {
  try {
    const account = (
      await api.get(
        `/api/accounts/${accountId}?populate[profiles][populate]=*&populate[referral][populate]=*&populate[affiliates][populate]=*&populate[wallets][populate]=*`,
      )
    ).data.data;

    return account;
  } catch (error) {
    if (error.response) {
      console.error(error.response.data);
    } else {
      console.error(error);
    }
  }
}

export async function fetchSessionData(session) {
  if (!session?.user) {
    return { account: null, profile: null };
  }

  try {
    const account = await readAccountById(session.user.id);
    const profile = account.attributes.profiles.data[0];

    return { account, profile };
  } catch (error) {
    if (error.response) {
      console.error(error.response.data);
    } else {
      console.error(error);
    }
    return { account: null, profile: null };
  }
}

export async function createAccount(oAuthUser) {
  try {
    const referralCode = await referralCodeGenerator.alphaNumeric(
      'lowercase',
      2,
      2,
    );

    const response = await api.post('/api/accounts', {
      data: {
        name: oAuthUser.name,
        email: oAuthUser.email,
        image: oAuthUser.image,
        youtube_account_id: oAuthUser.id,
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

export async function createProfile(data) {
  try {
    const response = await api.post('/api/profiles', { data });

    return response.data.data;
  } catch (error) {
    if (error.response) {
      console.error(error.response.data);
    } else {
      console.error(error);
    }
  }
}

export async function readOrCreateAccountByOauth(oAuthUser, oAuthAccount) {
  try {
    const youtubeAccountId = oAuthUser['id'];
    const filter = {
      google: 'youtube_account_id',
    };

    const response = await api.get(
      `/api/accounts?populate=*&filters[${
        filter[oAuthAccount.provider]
      }][$eq]=${youtubeAccountId}`,
    );

    let account = response.data.data[0];
    if (!account) {
      account = await createAccount(oAuthUser);
    }

    const channel = await readChannel(oAuthAccount.access_token);
    if (channel) {
      let profile;

      if (account.attributes.profiles) {
        profile = account.attributes.profiles.data.find(
          (profileFound) =>
            profileFound.attributes.youtube_channel_id === channel.id,
        );
      }

      if (!profile) {
        await createProfile({
          accounts: account.id,
          title: channel.snippet.title,
          youtube_description: channel.snippet.description,
          youtube_channel_id: channel.id,
          banner_image: channel.brandingSettings.image?.bannerExternalUrl,
          profile_image: channel.snippet.thumbnails.high.url,
          youtube_subscribers: channel.statistics.subscriberCount,
        });
      }
    }

    return account;
  } catch (error) {
    if (error.response) {
      console.error(error.response.data);
    } else {
      console.error(error);
    }
  }
}

export async function readAccountByWalletAddress(address) {
  try {
    const wallet = (
      await api.get(
        `/api/wallets?populate[account][populate]=*&filters[address][$eq]=${address}`,
      )
    ).data.data[0];

    const account = wallet.attributes.account.data;
    return account;
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

    return response.data.data[0] ? response.data.data[0] : null;
  } catch (error) {
    if (error.response) {
      console.error(error.response.data);
    } else {
      console.error(error);
    }
  }
}

export async function readProfilesByCategory(categoryId) {
  try {
    const response = await api.get(
      `/api/profiles?filters[category][id][$eq]=${categoryId}`,
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

export async function readProfiles(page) {
  try {
    const response = await api.get(
      `/api/profiles?sort[0]=id:DESC&pagination[page]=${page}&pagination[pageSize]=3`,
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

export async function readCategories() {
  try {
    const response = await api.get(`/api/categories`);

    return response.data.data;
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

export async function createVideo(validVideo, account, profile) {
  try {
    await api.post('/api/videos', {
      data: {
        title: validVideo.snippet.title,
        description: validVideo.snippet.description,
        video_id: validVideo.id.videoId,
        account: account.id,
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

export async function updateProfile(
  description: string,
  handle: string,
  categories: string,
  profileId: number,
  category: number,
) {
  try {
    await api.put(`/api/profiles/${profileId}`, {
      data: {
        description,
        handle,
        categories,
        category,
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

export async function updateReferralAccount(account, referral) {
  try {
    await api.put(`/api/accounts/${account.id}`, {
      data: {
        referral: referral.id,
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
