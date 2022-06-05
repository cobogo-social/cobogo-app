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
  const [currentWallet, setCurrentWallet] = useState('');
  const { push } = useRouter();

  async function pushToNextStep() {
    setLoading(true);
    push('/submit/invite-and-share');
  }

  async function connectMetaMaskWallet() {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { ethereum } = window as any;

      if (!ethereum) {
        setError(
          'Metamask is not available in thie browser. Please install Metamask to continue.',
        );
        return;
      }
      setLoading(true);

      const ethereumAccounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });

      if (ethereumAccounts.length !== 0) {
        const address = ethereumAccounts[0];

        await axios.post('/api/cobogo/createWallet', {
          address,
        });

        setCurrentWallet(address);
      }

      await axios.put('/api/cobogo/updateWaitlistProfile');

      pushToNextStep();
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }

  const checkWallets = useCallback(
    async (ethereumWallets = null) => {
      try {
        let ethereumAccounts = ethereumWallets;

        if (!ethereumAccounts) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const { ethereum } = window as any;

          ethereumAccounts = await ethereum.request({
            method: 'eth_accounts',
          });
        }

        if (ethereumAccounts.length > 0) {
          const walletAddress = ethereumAccounts[0];
          await axios.post('/api/cobogo/createWallet', {
            walletAddress,
          });
          setCurrentWallet(walletAddress);
        } else {
          setCurrentWallet('');
        }
      } catch (error) {
        setError(error.message);
      }
    },
    [setError],
  );

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { ethereum } = window as any;
    ethereum.on('accountsChanged', (ethereumAccounts) => {
      checkWallets(ethereumAccounts);
    });

    checkWallets();
  }, [checkWallets, setLoading]);

  // TODO: Retirar isso dessa tela, deve ficar fora na checagem de todas as telas,
  // mas não entendi o use case disso aqui.
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

          <div className="flex flex-row items-center justify-between pl-16 mt-16 sm:px-16 2xl:px-64 sm:mt-0">
            <div>
              <p className="mb-4 text-4xl">connect wallet</p>

              <p className="sm:text-xl sm:w-[408px]">MetaMask</p>

              <p className="sm:text-lg sm:w-[420px] mb-8 text-gray3">
                available as a browser extension and as a mobile app
              </p>

              {!currentWallet ? (
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
