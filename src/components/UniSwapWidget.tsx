import { SwapWidget, Theme } from '@uniswap/widgets';
import { useCallback, useEffect, useState } from 'react';

export default function UniSwapWidget() {
  const [provider, setProvider] = useState(null);

  const theme: Theme = {
    primary: '#FFFFFF',
    secondary: '#FFFFFF',
    interactive: '#666666',
    container: '#000000',
    module: '#242424',
    accent: '#242424',
    outline: '#FFFFFF',
    dialog: '#FFFFFF',
    fontFamily: 'ProximaNova',
    borderRadius: 0,
  };

  const checkIfWalletIsConnected = useCallback(async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { ethereum } = window as any;

    try {
      await ethereum.request({ method: 'eth_accounts' });
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { ethereum } = window as any;
    setProvider(ethereum);
  }, [checkIfWalletIsConnected]);

  const jsonRpcEndpoint =
    'https://mainnet.infura.io/v3/5b4fdeecfa1d4a2486b38f37a979f33f';

  return (
    <SwapWidget
      provider={provider}
      jsonRpcEndpoint={jsonRpcEndpoint}
      width={432}
      theme={theme}
    />
  );
}
