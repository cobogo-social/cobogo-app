import Button from '@components/Button';
import Footer from '@components/Footer';
import MobileSubmitMenu from '@components/MobileSubmitMenu';
import PageContainer from '@components/PageContainer';
import StepContainer from '@components/StepContainer';
import StepsMenu from '@components/StepsMenu';
import TopBar from '@components/TopBar';
import { readAccountByYoutubeAccountId } from '@services/cobogoApi';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { getSession, signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';

export default function Index() {
  const { data: session } = useSession();
  const { push } = useRouter();

  async function connectMetaMaskWallet() {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { ethereum } = window as any;

      if (!ethereum) {
        return;
      }

      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });

      const address = accounts[0];

      const createAccount = await axios.post(
        '/api/cobogo/createAccountToFanOrYoutuber',
        {
          name: address,
        },
      );

      if (createAccount.data.data) {
        await axios.post('/api/cobogo/createWallet', {
          address,
          account: createAccount.data.data.id,
        });
      }

      await axios.put('/api/cobogo/updateWaitlistProfile');

      push('/submit/invite-and-share');
    } catch (error) {
      console.error(error);
    }
  }

  const checkIfWalletIsConnected = useCallback(async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { ethereum } = window as any;

    try {
      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (accounts.length !== 0) {
        await axios.put('/api/cobogo/updateWaitlistProfile');

        push('/submit/invite-and-share');
      }
    } catch (error) {
      console.error(error);
    }
  }, [push]);

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [checkIfWalletIsConnected]);

  useEffect(() => {
    if (session?.error === 'RefreshAccessTokenError') {
      signIn('google');
    }
  }, [session]);

  return (
    <div className="w-full">
      <PageContainer>
        <StepsMenu />

        <MobileSubmitMenu />

        <StepContainer>
          <TopBar />

          <div className="flex flex-row justify-between items-center pl-16 sm:px-16 2xl:px-64 mt-16 sm:mt-0">
            <div className="flex flex-col">
              <p className="mb-4 text-4xl">connect wallet</p>

              <p className="sm:text-xl sm:w-[408px]">MetaMask</p>

              <p className="sm:text-lg sm:w-[408px] mb-8 text-gray3">
                available as a browser extension and as a mobile app
              </p>

              <Button
                text="connect to MetaMask"
                color="bg-blue"
                width="w-[206px]"
                onClick={connectMetaMaskWallet}
              />
            </div>

            <div className="hidden sm:block">
              <Image
                src="/images/metamask-icon.svg"
                width={406}
                height={406}
                alt="metamask icon"
              />
            </div>
          </div>
        </StepContainer>

        <Footer />
      </PageContainer>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session?.user) {
    return {
      redirect: {
        destination: '/submit/connect',
        permanent: false,
      },
    };
  }

  const account = await readAccountByYoutubeAccountId(session.user['id']);
  const profile = account.attributes.profiles.data[0];

  if (!profile.attributes.handle) {
    return {
      redirect: {
        destination: '/submit/create-profile',
        permanent: false,
      },
    };
  }

  if (profile.attributes.waitlist) {
    return {
      redirect: {
        destination: '/submit/invite-and-share',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
