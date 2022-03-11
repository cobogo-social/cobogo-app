import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import { useState } from 'react';

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

  function handleSetOpen() {
    setOpen(!open);
  }

  return (
    <div className="w-full">
      <Head>
        <title>cobogo - submit</title>
      </Head>

      <PageWrapper>
        <MobileTopBar haveSteps setOpen={handleSetOpen} />

        <Steps />

        <MobileSteps open={open} />

        <Connect />

        <Footer />
      </PageWrapper>
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

    const response = await youtubeApi.get(
      `/channels?part=snippet%2CbrandingSettings&mine=true`,
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    );

    if (response.data.items) {
      const createdChannel = await cobogoApi.get(
        `/api/channels?filters[channel_id][$eq]=${response.data.items[0].id}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.COBOGO_API_TOKEN}`,
          },
        }
      );

      if (createdChannel.data.data.length === 0) {
        const createdAccount = await cobogoApi.get(
          `/api/accounts?filters[email][$eq]=${session.user.email}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.COBOGO_API_TOKEN}`,
            },
          }
        );

        await cobogoApi.post(
          '/api/channels',
          {
            data: {
              title: response.data.items[0].snippet.title,
              description: response.data.items[0].snippet.description,
              account: createdAccount.data.data[0].id,
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

    if (!response.data.items) {
      return {
        redirect: {
          destination: '/submit/channel-not-found',
          permanent: false,
        },
      };
    } else {
      return {
        redirect: {
          destination: `/submit/create-profile${
            query.ref ? '?ref=' + query.ref : ''
          }`,
          permanent: false,
        },
      };
    }
  }

  return {
    props: {},
  };
};
