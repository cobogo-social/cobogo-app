import Button from '@components/Button';
import Footer from '@components/Footer';
import MobileSubmitMenu from '@components/MobileSubmitMenu';
import PageContainer from '@components/PageContainer';
import StepContainer from '@components/StepContainer';
import StepsMenu from '@components/StepsMenu';
import TopBar from '@components/TopBar';
import axios from 'axios';
import { signIn, useSession } from 'next-auth/react';
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

            <Image
              src="/images/metamask-icon.svg"
              width={406}
              height={406}
              alt="metamask icon"
            />
          </div>
        </StepContainer>

        <Footer />
      </PageContainer>
    </div>
  );
}
