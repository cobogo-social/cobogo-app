import ChannelNotFound from '@components/ChannelNotFound';
import Connect from '@components/Connect';
import PageContainer from '@components/PageContainer';
import Footer from '@components/Footer';
import MobileMenu from '@components/MobileMenu';
import StepsMenu from '@components/StepsMenu';
import {
  createAccount,
  createChannel,
  readAccountByYoutubeAccountId,
  readChannelByChannelId,
} from '@services/cobogoApi';
import { readChannel as readChannelFromYoutube } from '@services/youtubeApi';
import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/react';
import Head from 'next/head';
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
      <Head>
        <title>cobogo - submit</title>
      </Head>

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
    const account =
      (await readAccountByYoutubeAccountId(session.user['id'])) ||
      (await createAccount(session.user));

    if (!account) {
      return {
        props: {},
      };
    }

    const youtubeChannel = await readChannelFromYoutube(session);

    if (youtubeChannel) {
      (await readChannelByChannelId(youtubeChannel.id)) ||
        (await createChannel(account, youtubeChannel));

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
};
