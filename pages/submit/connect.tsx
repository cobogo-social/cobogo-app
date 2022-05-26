import ChannelNotFound from '@components/ChannelNotFound';
import Connect from '@components/Connect';
import Footer from '@components/Footer';
import MobileSubmitMenu from '@components/MobileSubmitMenu';
import PageContainer from '@components/PageContainer';
import StepsMenu from '@components/StepsMenu';
import { LoadingContext } from '@contexts/LoadingContext';
import {
  createAccount,
  createProfile,
  readAccountByYoutubeAccountId,
} from '@services/cobogoApi';
import { readChannel as readChannelFromTwitch } from '@services/twitchApi';
import { readChannel as readChannelFromTwitter } from '@services/twitterApi';
import { readChannel as readChannelFromYoutube } from '@services/youtubeApi';
import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/react';
import { useContext, useEffect, useState } from 'react';

export default function Index() {
  const [haveChannel, setHaveChannel] = useState<boolean>();
  const { data: session } = useSession();
  const { setLoading } = useContext(LoadingContext);

  function changeHaveChannel() {
    setHaveChannel(true);
  }

  useEffect(() => {
    if (session?.user) {
      setHaveChannel(false);
    } else {
      setHaveChannel(true);
    }
  }, [session]);

  useEffect(() => {
    setLoading(false);
  }, [setLoading]);

  return (
    <div className="w-full">
      <PageContainer>
        <StepsMenu />

        <MobileSubmitMenu noLogout />

        {!haveChannel ? (
          <ChannelNotFound setHaveChannel={changeHaveChannel} />
        ) : (
          <Connect />
        )}

        <Footer />
      </PageContainer>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  try {
    const session = await getSession({ req });

    if (session?.user) {
      const account = await readAccountByYoutubeAccountId(session.user['id']);

      let createdAccount;

      if (!account) {
        createdAccount = await createAccount(session.user);
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const channel: any =
        (await readChannelFromYoutube(session)) ||
        (await readChannelFromTwitch(session)) ||
        (await readChannelFromTwitter(session));

      let profile = null;

      if (channel) {
        if (account) {
          if (channel.youtube) {
            profile = account.attributes.profiles.data.find(
              (profileFound) =>
                profileFound.attributes.youtube_channel_id ===
                channel.youtube.id,
            );
          }

          if (channel.twitch) {
            profile = account.attributes.profiles.data.find(
              (profileFound) =>
                profileFound.attributes.twitch_id === channel.twitch.id,
            );
          }

          if (channel.twitter) {
            profile = account.attributes.profiles.data.find(
              (profileFound) =>
                profileFound.attributes.twitter_id === channel.twitter.id,
            );
          }
        }

        if (!profile) {
          // TODO: update all methods to this pattern
          if (channel.youtube) {
            profile = await createProfile({
              accounts: createdAccount ? createdAccount.id : account.id,
              title: channel.youtube.snippet.title,
              youtube_description: channel.youtube.snippet.description,
              youtube_channel_id: channel.youtube.id,
              banner_image:
                channel.youtube.brandingSettings.image?.bannerExternalUrl,
              profile_image: channel.youtube.snippet.thumbnails.high.url,
              youtube_subscribers: channel.youtube.statistics.subscriberCount,
            });
          }

          if (channel.twitch) {
            profile = await createProfile({
              accounts: createdAccount ? createdAccount.id : account.id,
              title: channel.twitch.display_name,
              twitch_description: channel.twitch.description,
              twitch_id: channel.twitch.id,
              profile_image: channel.twitch.profile_image_url,
            });
          }

          if (channel.twitter) {
            profile = await createProfile({
              accounts: createdAccount ? createdAccount.id : account.id,
              title: channel.twitter.name,
              twitter_description: channel.twitter.description,
              twitter_id: channel.twitter.id,
              profile_image: channel.twitter.profile_image_url,
            });
          }
        }
      }

      if (profile.id) {
        return {
          redirect: {
            destination: '/submit/create-profile',
            permanent: false,
          },
        };
      }
    }

    return {
      props: {},
    };
  } catch (error) {
    console.error(error);
  }

  return {
    props: {},
  };
};
