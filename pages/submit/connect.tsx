import ChannelNotFound from '@components/ChannelNotFound';
import Connect from '@components/Connect';
import Footer from '@components/Footer';
import MobileMenu from '@components/MobileMenu';
import PageContainer from '@components/PageContainer';
import StepsMenu from '@components/StepsMenu';
import {
  createAccount,
  createProfile,
  readAccountByYoutubeAccountId,
} from '@services/cobogoApi';
import { readChannel } from '@services/youtubeApi';
import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function Index() {
  const [haveChannel, setHaveChannel] = useState<boolean>();
  const { data: session } = useSession();

  function handleSetHaveChannel() {
    setHaveChannel(true);
  }

  useEffect(() => {
    if (session?.user) {
      setHaveChannel(false);
    } else {
      setHaveChannel(true);
    }
  }, [session]);

  return (
    <div className="w-full">
      <PageContainer>
        <StepsMenu />

        <MobileMenu noLogout />

        {!haveChannel ? (
          <ChannelNotFound setHaveChannel={handleSetHaveChannel} />
        ) : (
          <Connect />
        )}

        <Footer />
      </PageContainer>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (session?.user) {
    const account = await readAccountByYoutubeAccountId(session.user['id']);

    let createdAccount;

    if (!account) {
      createdAccount = await createAccount(session.user);
    }

    const channel = await readChannel(session);

    let profile = null;

    if (channel) {
      if (account) {
        profile = account.attributes.profiles.data.find(
          (profileFound) =>
            profileFound.attributes.youtube_channel_id === channel.id,
        );
      }

      if (!profile) {
        profile = await createProfile({
          accounts: createdAccount ? createdAccount.id : account.id,
          title: channel.snippet.title,
          youtube_description: channel.snippet.description,
          youtube_channel_id: channel.id,
          banner_image: channel.brandingSettings.image?.bannerExternalUrl,
          profile_image: channel.snippet.thumbnails.high.url,
          youtube_subscribers: channel.statistics.subscriberCount,
        });
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
  }

  return {
    props: {},
  };
};
