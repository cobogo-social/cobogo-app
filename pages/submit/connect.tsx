import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/react';
import Head from 'next/head';
import { useEffect, useState } from 'react';

import ChannelNotFound from '../../components/ChannelNotFound';
import Connect from '../../components/Connect';
import Footer from '../../components/Footer';
import MobileSteps from '../../components/MobileSteps';
import MobileTopBar from '../../components/MobileTopBar';
import PageWrapper from '../../components/PageWrapper';
import Steps from '../../components/Steps';
import cobogoApi from '../../services/cobogoApi';
import youtubeApi from '../../services/youtubeApi';

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
  
  session.teste = 'testando persistência';
  console.log(session)

  // const readUserChannels = async () => {
  //   const response = await youtubeApi.get(
  //     `/channels?part=snippet%2CbrandingSettings&mine=true`,
  //     {
  //       headers: {
  //         Authorization: `Bearer ${session.accessToken}`,
  //       },
  //     }
  //   );

  //   return response.data.items;
  // };

  // const readAccountByEmail = async () => {
  //   const response = await cobogoApi.get(
  //     `/api/accounts?filters[email][$eq]=${session.user.email}`,
  //     {
  //       headers: {
  //         Authorization: `Bearer ${process.env.COBOGO_API_TOKEN}`,
  //       },
  //     }
  //   );

  //   return response.data.data;
  // };

  // const userChannels = await readUserChannels();

  // const readChannelByChannelId = async () => {
  //   const response = await cobogoApi.get(
  //     `/api/channels?filters[channel_id][$eq]=${userChannels[0].id}`,
  //     {
  //       headers: {
  //         Authorization: `Bearer ${process.env.COBOGO_API_TOKEN}`,
  //       },
  //     }
  //   );
  //   return response.data.data;
  // };

  // const createAccount = async () => {
  //   const response = await cobogoApi.post(
  //     '/api/accounts',
  //     {
  //       data: {
  //         name: session.user.name,
  //         email: session.user.email,
  //         image: session.user.image,
  //       },
  //     },
  //     {
  //       headers: {
  //         Authorization: `Bearer ${process.env.COBOGO_API_TOKEN}`,
  //       },
  //     }
  //   );
  //   return response.data.data;
  // };

  // const createChannel = async () => {
  //   await cobogoApi.post(
  //     '/api/channels',
  //     {
  //       data: {
  //         title: session.youtubeChannels[0].snippet.title,
  //         description: session.youtubeChannels[0].snippet.description,
  //         channel_id: session.youtubeChannels[0].id,
  //         account: readAccountByEmail[0].id,
  //       },
  //     },
  //     {
  //       headers: {
  //         Authorization: `Bearer ${process.env.COBOGO_API_TOKEN}`,
  //       },
  //     }
  //   );
  // };

  // if (session?.user) {
  //   // Checar se a conta está criada no DB, se não estiver criar a conta.
  //   // Checar se o canal está criado no BD, se não estiver criar o canal.
  //   // Jogar para a sessão as informações da conta e do canal.

  //   // FIXME: Buscar a conta pelo ID do usuário e não pelo email.
  //   const account = (await readAccountByEmail()) || (await createAccount());
  //   session.account = account;

  //   session.youtubeChannels = await readUserChannels();

  //   if (session.youtubeChannels) {
  //     const channel =
  //       (await readChannelByChannelId()) || (await createChannel());
  //     session.channel = channel;

  //     return {
  //       redirect: {
  //         destination: '/submit/create-profile',
  //         permanent: false,
  //       },
  //     };
  //   }
  // }

  return {
    props: {},
  };
};
