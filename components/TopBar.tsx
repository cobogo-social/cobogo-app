import axios from 'axios';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

interface TopBarProps {
  email?: string;
}

export default function TopBar({ email }: TopBarProps) {
  const [currentAccount, setCurrentAccount] = useState('');
  const [acceptedLength, setAcceptedLength] = useState(0);

  const checkIfWalletIsConnected = useCallback(async () => {
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

  async function connectWallet() {
    const { ethereum } = window as any;

    try {
      if (!ethereum) {
        alert('Get MetaMask!');
        return;
      }

      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });

      setCurrentAccount(accounts[0]);
    } catch (error) {
      alert(error);
    }
  }

  useEffect(() => {
    if (email) {
      axios
        .get('/api/cobogo/readProfileByEmail', {
          params: { email: email },
        })
        .then((response) => {
          axios
            .get('/api/cobogo/readProfileByReferralProfileId', {
              params: {
                referral_profile_id: response.data.data[0].id,
              },
            })
            .then((response) => setAcceptedLength(response.data.data.length));
        });
    }
  }, []);

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [checkIfWalletIsConnected]);

  return (
    <div className="hidden sm:flex w-full justify-end items-center mb-[70px]">
      {/* <Link href="/"> */}
      <a>
        <p className="text-white mr-8">accepted invites: {acceptedLength}</p>
      </a>

      <div className="flex">
        <div className="flex mr-2">
          <Image src="/images/cbg-icon.svg" width={24} height={21} />
        </div>

        <p className="text-white font-bold">850 CBG</p>
      </div>
      {/* </Link> */}
      {/* <p
        className="text-white font-bold hover:cursor-pointer"
        onClick={connectWallet}
      >
        {currentAccount === '' ? (
          'connect wallet'
        ) : (
          <div className="flex justify-center items-center">
            <Image
              src="/images/metamask-small-icon.svg"
              width={32}
              height={32}
              alt="metamask small icon"
            />

            <p className="ml-2">
              {currentAccount.slice(0, 5)}...{currentAccount.slice(38)}
            </p>

            <div className="w-[9px] h-[9px] bg-green ml-2 rounded-full"></div>
          </div>
        )}
      </p> */}
    </div>
  );
}
