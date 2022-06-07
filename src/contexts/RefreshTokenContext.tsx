import { signIn, useSession } from 'next-auth/react';
import { createContext, useEffect } from 'react';

export const RefreshTokenContext = createContext({});

export function RefreshTokenProvider({ children }) {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.error === 'RefreshAccessTokenError') {
      signIn('google');
    }
  }, [session]);

  return (
    <RefreshTokenContext.Provider value={{}}>
      {children}
    </RefreshTokenContext.Provider>
  );
}
