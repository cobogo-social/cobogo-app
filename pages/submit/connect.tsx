import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';

import Connect from '../../components/Connect';
import Footer from '../../components/Footer';
import Steps from '../../components/Steps';
import cobogoApi from '../../services/cobogoApi';
import youtubeApi from '../../services/youtubeApi';

export default function Index() {
  return (
    <div className="w-full">
      <Head>
        <title>cobogo - submit</title>
      </Head>

      <div className="grid grid-rows-[945px_70px] grid-cols-[332px_1fr]">
        <Steps />

        <Connect />

        <Footer />
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const session = await getSession({ req });

  if (session?.user) {
    await cobogoApi
      .get(`/api/accounts?filters[email][$eq]=${session.user.email}`, {
        headers: {
          Authorization: `Bearer ${process.env.COBOGO_API_TOKEN}`,
        },
      })
      .then(async (response) => {
        if (response.data.data.length === 0) {
          await cobogoApi.post(
            '/api/accounts',
            {
              data: {
                name: session?.user.name,
                email: session?.user.email,
                image: session?.user.image,
              },
            },
            {
              headers: {
                Authorization: `Bearer ${process.env.COBOGO_API_TOKEN}`,
              },
            }
          );
        }
      });

    const createdChannel = await cobogoApi.get(
      `/api/channels?filters[account_email][$eq]=${session.user.email}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.COBOGO_API_TOKEN}`,
        },
      }
    );

    const response = await youtubeApi.get(
      `/channels?part=snippet%2CbrandingSettings&mine=true`,
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    );

    if (response.data.items) {
      if (createdChannel.data.data.length === 0) {
        await cobogoApi.post(
          '/api/channels',
          {
            data: {
              title: response.data.items[0].snippet.title,
              description: response.data.items[0].snippet.description,
              account_email: session.user.email,
              channel_id: response.data.items[0].id,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.COBOGO_API_TOKEN}`,
            },
          }
        );
      }
    }

    return {
      redirect: {
        destination: `/submit/create-profile?ref=${query.ref}`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
