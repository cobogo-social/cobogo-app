import Image from 'next/image';

interface MetaMaskProps {
  currentAccount: string;
  openDisconnectWalletModal: () => void;
}

export default function MetaMask({
  currentAccount,
  openDisconnectWalletModal,
}: MetaMaskProps) {
  return (
    <div
      onClick={openDisconnectWalletModal}
      className="flex items-center justify-center hover:cursor-pointer"
    >
      <Image
        src="/images/metamask-small-icon.svg"
        width={32}
        height={32}
        alt="metamask small icon"
      />

      <p className="flex ml-2 font-bold">
        {currentAccount.slice(0, 5)}...{currentAccount.slice(38)}
      </p>

      <div className="flex w-[9px] h-[9px] bg-green ml-2 rounded-full" />
    </div>
  );
}
