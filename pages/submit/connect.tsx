import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/react';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { readAccountByEmail, createAccount, readChannelByYoutubeId, createChannel } from '../../services/cobogoApi';
import { readChannel as readChannelFromYoutube } from '../../services/youtubeApi';

import ChannelNotFound from '../../components/ChannelNotFound';
import Connect from '../../components/Connect';
import Footer from '../../components/Footer';
import MobileSteps from '../../components/MobileSteps';
import MobileTopBar from '../../components/MobileTopBar';
import PageWrapper from '../../components/PageWrapper';
import Steps from '../../components/Steps';

export default function Index() {
  const [open, setOpen] = useState(false);
  const [haveChannel, setHaveChannel] = useState<boolean>();
  const { data: session } = useSession();

  function handleSetOpen() {
    setOpen(!open);
  }

  function handleSetHaveChannel() {
    setHaveChannel(true);
  }

  useEffect(() => {
    if (session?.user) {
      if (!session.youtubeChannels) {
        setHaveChannel(false);
      } else {
        setHaveChannel(true);
      }
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
        <MobileTopBar haveSteps setOpen={handleSetOpen} />

        <Steps />

        <MobileSteps open={open} />

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
    const account = (await readAccountByEmail(session.user.email)) || (await createAccount(session.user));

    const youtubeChannel = await readChannelFromYoutube(session);

    if (youtubeChannel) {
      (await readChannelByYoutubeId(youtubeChannel.id)) || (await createChannel(account, youtubeChannel));

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
