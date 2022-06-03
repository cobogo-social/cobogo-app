import Button from '@components/Button';
import Footer from '@components/Footer';
import MobileSubmitMenu from '@components/MobileSubmitMenu';
import PageContainer from '@components/PageContainer';
import StepContainer from '@components/StepContainer';
import StepsMenu from '@components/StepsMenu';
import TopBar from '@components/TopBar';
import { ErrorContext } from '@contexts/ErrorContext';
import { LoadingContext } from '@contexts/LoadingContext';
import { readAccountByYoutubeAccountId } from '@services/cobogoApi';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { getSession, signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback, useContext, useEffect, useState } from 'react';

export default function Index() {
  const { data: session } = useSession();
  const { setLoading } = useContext(LoadingContext);
  const { setError } = useContext(ErrorContext);
  const [currentAccount, setCurrentAccount] = useState('');
  const { push } = useRouter();

  async function connectMetaMaskWallet() {
    try {
      setLoading(true);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { ethereum } = window as any;

      if (!ethereum) {
        return;
      }

      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });

      const address = accounts[0];

      setCurrentAccount(address);

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
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }

  const checkIfWalletIsConnected = useCallback(async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { ethereum } = window as any;

      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (accounts.length !== 0) {
        await axios.put('/api/cobogo/updateWaitlistProfile');
      }
    } catch (error) {
      setError(error.message);
    }
  }, [setError]);

  async function pushToNextStep() {
    setLoading(true);
    await connectMetaMaskWallet();
    push('/submit/invite-and-share');
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [checkIfWalletIsConnected]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { ethereum } = window as any;

    ethereum.on('accountsChanged', (accounts) => {
      if (accounts.length > 0) {
        setCurrentAccount(accounts[0]);
      } else {
        setCurrentAccount('');
      }
    });
  }, []);

  useEffect(() => {
    if (session?.error === 'RefreshAccessTokenError') {
      signIn('google');
    }
  }, [session]);

  useEffect(() => {
    setLoading(false);
  }, [setLoading]);

  return (
    <div className="w-full">
      <PageContainer>
        <StepsMenu />

        <MobileSubmitMenu />

        <StepContainer>
          <TopBar />

          <div className="flex flex-row items-center justify-between pl-16 mt-16 sm:px-16 2xl:px-64 sm:mt-0">
            <div>
              <p className="mb-4 text-4xl">connect wallet</p>

              <p className="sm:text-xl sm:w-[408px]">MetaMask</p>

              <p className="sm:text-lg sm:w-[420px] mb-8 text-gray3">
                available as a browser extension and as a mobile app
              </p>

              {!currentAccount ? (
                <Button
                  text="connect to MetaMask"
                  color="bg-blue"
                  onClick={connectMetaMaskWallet}
                />
              ) : (
                <Button
                  text="next step"
                  color="bg-blue"
                  onClick={pushToNextStep}
                />
              )}
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
  try {
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

    if (account.attributes.wallets.data.length && profile.attributes.waitlist) {
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
  } catch (error) {
    console.error(error.message);

    return {
      props: {},
    };
  }
};
