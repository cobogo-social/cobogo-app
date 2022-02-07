import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

export default function TopBar() {
  const [currentAccount, setCurrentAccount] = useState('');

  const checkIfWalletIsConnected = useCallback(async () => {
    const { ethereum } = window as any;

    try {
      if (!ethereum) {
        console.log('Make sure you have metamask!');
      } else {
        console.log('We have the ethereum object', ethereum);
      }

      const accounts = await ethereum.request({ method: 'eth_accounts' });
      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log('Found an authorized account:', account);
        setCurrentAccount(account);
      } else {
        console.log('No authorized account found');
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
    checkIfWalletIsConnected();
  }, [checkIfWalletIsConnected]);

  return (
    <div className="flex w-full justify-end items-center mb-[70px]">
      {/* <Link href="/">
        <a>
          <p className="text-white font-bold mr-8">back to home</p>
        </a>
      </Link> */}
      <p
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
              {currentAccount.slice(0, 5)}...{currentAccount.slice(6, 10)}
            </p>
            <div className="w-[9px] h-[9px] bg-green ml-2 rounded-full"></div>
          </div>
        )}
      </p>
    </div>
  );
}
