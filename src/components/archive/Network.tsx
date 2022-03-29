export default function Network() {
  // async function addArbitrumNetwork() {
  //   const { ethereum } = window as any;

  //   ethereum.request({
  //     method: 'wallet_addEthereumChain',
  //     params: [
  //       {
  //         chainId: '0xA4B1',
  //         chainName: 'Arbitrum',
  //         nativeCurrency: {
  //           name: 'Ethereum',
  //           symbol: 'ETH',
  //           decimals: 18,
  //         },
  //         rpcUrls: ['https://arb1.arbitrum.io/rpc'],
  //         blockExplorerUrls: ['https://arbiscan.io/'],
  //       },
  //     ],
  //   });
  // }

  return (
    <div className="w-full h-full p-8">
      {/* <TopBar />
      <div className="flex flex-row justify-between items-start px-16">
        <div className="flex flex-col">
          <p className="text-4xl text-white mb-4">network</p>
          <p className="text-xl text-white w-[408px] mb-12">
            to use cobogo, your MetaMask Wallet must be connected to Arbitrum.
          </p>

          <div className="w-[250px] flex justify-between mb-5">
            <Image
              src="/images/arbitrum-icon.svg"
              width={62}
              height={67}
              alt="arbitrum icon"
            />
            <Image
              src="/images/arrow-right.svg"
              width={62}
              height={67}
              alt="arbitrum icon"
            />
            <Image
              src="/images/metamask-medium-icon.svg"
              width={62}
              height={67}
              alt="arbitrum icon"
            />
          </div>

          <p className="font-bold text-white mb-4">
            you need to add Arbitrum to your Wallet first.
          </p>

          <Button
            width="w-60"
            height="h-9"
            color="bg-ocean"
            hoverColor="brightness-90"
            text="add Arbitrum to MetaMask"
            onClick={addArbitrumNetwork}
          />
        </div>

        <ChannelBanner />
      </div> */}
    </div>
  );
}
