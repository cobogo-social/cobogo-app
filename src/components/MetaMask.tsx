import Image from 'next/image';

interface MetaMaskProps {
  currentWallet: string;
  openDisconnectWalletModal: () => void;
}

export default function MetaMask({
  currentWallet,
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

      {currentWallet ? (
        <p className="flex ml-2 font-bold">
          {currentWallet.slice(0, 5)}...{currentWallet.slice(38)}
        </p>
      ) : (
        'connect wallet'
      )}

      <div className="flex w-[9px] h-[9px] bg-green ml-2 rounded-full" />
    </div>
  );
}
