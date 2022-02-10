import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import Button from './Button';
import TopBar from './TopBar';

export default function ConnectWallet() {
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
      checkIfWalletIsConnected();
    } catch (error) {
      alert(error);
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [checkIfWalletIsConnected]);

  return (
    <div className="bg-primary w-full h-full p-8">
      {/* <TopBar />
      <div className="flex flex-row justify-between items-start px-16">
        <div className="flex flex-col">
          <p className="text-4xl text-white mb-4">connect wallet</p>
          <p className="text-xl text-white mb-4">MetaMask</p>
          <p className="text-white w-[408px] mb-12">
            available as a browser extension and as a mobile app, MetaMask
            equips you with a key vault, secure login, token wallet, and token
            exchange—everything you need to manage your digital assets.
          </p>

          <Button
            width="w-52"
            height="h-9"
            color="bg-orange"
            hoverColor="brightness-90"
            text={currentAccount === '' ? 'connect to MetaMask' : 'connected'}
            fontSize=""
            onClick={connectWallet}
          />
        </div>

        <Image
          src="/images/metamask-icon.svg"
          width={420}
          height={420}
          alt="metamask icon"
        />
      </div> */}
    </div>
  );
}
