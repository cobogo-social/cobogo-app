import Blankslate from '@components/Blankslate';
import BlankslateTopBar from '@components/BlankslateTopBar';
import BlankslateWrapper from '@components/BlankslateWrapper';
import Footer from '@components/Footer';
import {
  readAccountByReferralCode,
  readChannelByProfile,
  readProfileByHandle,
} from '@services/cobogoApi';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useCallback, useEffect, useState } from 'react';

interface BlankslateProps {
  title: string;
  banner: string;
  referralCode: string;
  tokens: number;
}

export default function Index({
  title,
  banner,
  referralCode,
  tokens,
}: BlankslateProps) {
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

      const createAccount = await axios.post('/api/cobogo/createAccountToFan', {
        name: address,
      });

      if (createAccount.data.data) {
        await axios.post('/api/cobogo/createWallet', {
          address,
          account: createAccount.data.data.id,
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
      setIsError(true);
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
          tokens={tokens}
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

  const referralCode = profile.attributes.account.data.attributes.referral_code;

  const account = await readAccountByReferralCode(referralCode);

  return {
    props: {
      title: channel.attributes.title,
      banner: channel.attributes.banner ? channel.attributes.banner : null,
      referralCode,
      tokens: account.attributes.tokens,
    },
  };
};
