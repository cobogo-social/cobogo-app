import { MessageContext } from '@contexts/MessageContext';
import { SwapWidget, Theme } from '@uniswap/widgets';
import { useCallback, useContext, useEffect, useState } from 'react';

export default function UniSwapWidget() {
  const [provider, setProvider] = useState(null);
  const { setMessage } = useContext(MessageContext);

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
    try {
      const { ethereum } = window as any;

      await ethereum.request({ method: 'eth_accounts' });
    } catch (error) {
      setMessage({
        text: error.message,
        type: 'error',
      });
    }
  }, [setMessage]);

  useEffect(() => {
    const { ethereum } = window as any;
    setProvider(ethereum);
  }, [checkIfWalletIsConnected]);

  const jsonRpcEndpoint = process.env.NEXT_PUBLIC_INFURA_ENDPOINT;

  return (
    <>
      <div className="hidden sm:block">
        <SwapWidget
          provider={provider}
          jsonRpcEndpoint={jsonRpcEndpoint}
          width={432}
          theme={theme}
        />
      </div>

      <div className="sm:hidden">
        <SwapWidget
          provider={provider}
          jsonRpcEndpoint={jsonRpcEndpoint}
          width={200}
          theme={theme}
        />
      </div>
    </>
  );
}
