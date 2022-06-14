import { createContext, useState } from 'react';

interface ILoadingContext {
  loading: boolean;
  setLoading: (value: boolean) => void;
}

export const LoadingContext = createContext<ILoadingContext>(
  {} as ILoadingContext,
);

export function LoadingProvider({ children }) {
  // TODO: upgrade setLoading
  const [loading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider
      value={{
        loading,
        setLoading,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
}
