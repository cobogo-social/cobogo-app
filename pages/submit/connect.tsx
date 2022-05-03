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
    const accountByYoutubeAccountId = await readAccountByYoutubeAccountId(
      session.user['id'],
    );

    if (!accountByYoutubeAccountId) {
      const account = await createAccount(session.user);
      const channel = await readChannel(session);

      if (channel) {
        await createProfile(
          account.id,
          channel.snippet.title,
          channel.snippet.description,
          channel.id,
          channel.brandingSettings.image?.bannerExternalUrl,
          channel.snippet.thumbnails.high.url,
          channel.statistics.subscriberCount,
        );

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
