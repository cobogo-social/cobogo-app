import Blankslate from '@components/Blankslate';
import BlankslateTopBar from '@components/BlankslateTopBar';
import BlankslateWrapper from '@components/BlankslateWrapper';
import Footer from '@components/Footer';
import { readChannelByProfile, readProfileByHandle } from '@services/cobogoApi';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useCallback, useEffect, useState } from 'react';

interface ProfileProps {
  title: string;
  banner: string;
  referralCode: string;
}

export default function Index({ title, banner, referralCode }: ProfileProps) {
  const [currentAccount, setCurrentAccount] = useState('');
  const [isError, setIsError] = useState(false);

  async function handleConnectWallet() {
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

      setCurrentAccount(address);

      const readWalletByAddress = await axios.get(
        '/api/cobogo/readWalletByAddress',
        {
          params: {
            address,
          },
        },
      );

      if (!readWalletByAddress.data.data) {
        await axios.post('/api/cobogo/createWallet', {
          address,
        });
      }
    } catch (error) {
      setIsError(true);
    }
  }

  const checkIfWalletIsConnected = useCallback(async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { ethereum } = window as any;

    try {
      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (accounts.length !== 0) {
        const account = accounts[0];
        setCurrentAccount(account);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [checkIfWalletIsConnected]);

  return (
    <div className="w-full">
      <Head>
        <title>cobogo - {title}</title>
      </Head>

      <BlankslateWrapper>
        <BlankslateTopBar
          onboardedFriends={0}
          currentAccount={currentAccount}
        />

        <Blankslate
          banner={banner}
          title={title}
          referralCode={referralCode}
          connectWallet={handleConnectWallet}
          isError={isError}
          setIsError={setIsError}
          currentAccount={currentAccount}
        />
      </BlankslateWrapper>

      <Footer />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { blankslate } = params;

  const profile = await readProfileByHandle(blankslate);

  if (!profile) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const channel = await readChannelByProfile(profile);

  return {
    props: {
      title: channel.attributes.title,
      banner: channel.attributes.banner ? channel.attributes.banner : null,
      referralCode: profile.attributes.account.data.attributes.referral_code,
    },
  };
};
