import ChannelNotFound from '@components/ChannelNotFound';
import Connect from '@components/Connect';
import Footer from '@components/Footer';
import MobileTopBar from '@components/MobileTopBar';
import PageWrapper from '@components/PageWrapper';
import Steps from '@components/Steps';
import {
  createAccount,
  createChannel,
  readAccountByAccountId,
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

      <PageWrapper>
        <Steps />

        <MobileTopBar />

        {!haveChannel ? (
          <ChannelNotFound setHaveChannel={handleSetHaveChannel} />
        ) : (
          <Connect />
        )}

        <Footer />
      </PageWrapper>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (session?.user) {
    // FIXME: Buscar a conta pelo ID do usuário e não pelo email.
    const account =
      (await readAccountByAccountId(session.user.id)) ||
      (await createAccount(session.user));

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
