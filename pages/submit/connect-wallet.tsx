import Button from '@components/Button';
import Footer from '@components/Footer';
import PageContainer from '@components/PageContainer';
import StepContainer from '@components/StepContainer';
import StepsMenu from '@components/StepsMenu';
import TopBar from '@components/TopBar';
import { LoadingContext } from '@contexts/LoadingContext';
import { WalletContext } from '@contexts/WalletContext';
import { fetchSessionData } from '@services/cobogoApi';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useContext } from 'react';

export default function Index() {
  const { setLoading } = useContext(LoadingContext);
  const { currentWallet, connectMetaMaskWallet } = useContext(WalletContext);
  const { push } = useRouter();

  async function pushToInviteAndShare() {
    setLoading(true);
    push('/submit/invite-and-share');
  }

  return (
    <div className="w-full">
      <PageContainer>
        <StepsMenu />

        <StepContainer>
          <TopBar noOnboardedFriends noLogo />

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
                  onClick={() =>
                    connectMetaMaskWallet('/submit/invite-and-share')
                  }
                />
              ) : (
                <Button
                  text="next step"
                  color="bg-blue"
                  onClick={pushToInviteAndShare}
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
    const { account, profile } = await fetchSessionData(session);

    if (!account) {
      return {
        redirect: {
          destination: '/submit/connect',
          permanent: false,
        },
      };
    }

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
