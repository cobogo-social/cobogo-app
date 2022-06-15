import ChannelNotFound from '@components/ChannelNotFound';
import Connect from '@components/Connect';
import PageContainer from '@components/PageContainer';
import Steps from '@components/Steps';
import { LoadingContext } from '@contexts/LoadingContext';
import { fetchSessionData } from '@services/cobogoApi';
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
        <Steps />

        {!haveChannel ? (
          <ChannelNotFound setHaveChannel={changeHaveChannel} />
        ) : (
          <Connect />
        )}
      </PageContainer>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  try {
    const session = await getSession({ req });
    const { account, profile } = await fetchSessionData(session);

    if (account && profile) {
      return {
        redirect: {
          destination: '/submit/create-profile',
          permanent: false,
        },
      };
    }

    return {
      props: {},
    };
  } catch (error) {
    console.error(error.message);

    return {
      props: {},
    };
  }
};
