import Button from '@components/Button';
import Link from '@components/Link';
import PageContainer from '@components/PageContainer';
import StepContainer from '@components/StepContainer';
import Steps from '@components/Steps';
import TopBar from '@components/TopBar';
import { LoadingContext } from '@contexts/LoadingContext';
import { WalletContext } from '@contexts/WalletContext';
import { fetchSessionData } from '@services/cobogoApi';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Image from 'next/image';
import { useContext } from 'react';

export default function Index() {
  const { connectMetaMaskWallet } = useContext(WalletContext);
  const { setLoading } = useContext(LoadingContext);

  return (
    <div className="w-full">
      <PageContainer>
        <Steps />

        <StepContainer>
          <TopBar noOnboardedFriends noLogo noTokens noConnectWallet />

          <div className="flex flex-row items-center justify-between pl-16 mt-16 sm:px-16 2xl:px-64 sm:mt-0 px-8 py-4">
            <div>
              <p className="mb-6 text-[40px]">connect wallet</p>

              <p className="text-xl sm:w-[408px]">MetaMask</p>

              <p className="text-lg sm:w-[420px] mb-10 text-gray3">
                available as a browser extension and as a mobile app
              </p>

              <div className="mb-10">
                <Button
                  text="connect to MetaMask"
                  color="bg-blue"
                  onClick={() =>
                    connectMetaMaskWallet('/submit/invite-and-share')
                  }
                />
              </div>

              <Link href="/submit/invite-and-share">
                <button
                  onClick={() => setLoading(true)}
                  className="font-bold text-gray3 hover:cursor-pointer"
                >
                  do it later
                </button>
              </Link>
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
      </PageContainer>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  try {
    const session = await getSession({ req });
    const { account, profile } = await fetchSessionData(session);

    if (!account) {
      return {
        redirect: {
          destination: '/submit/connect',
          permanent: false,
        },
      };
    }

    if (!profile.attributes.handle || !profile.attributes.waitlist) {
      return {
        redirect: {
          destination: '/submit/create-profile',
          permanent: false,
        },
      };
    }

    if (account.attributes.wallets.data.length) {
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
