import { createContext, useState } from 'react';

interface IErrorContext {
  error: string;
  setError: (value: string) => void;
}

export const ErrorContext = createContext<IErrorContext>({} as IErrorContext);

export function ErrorProvider({ children }) {
  const [error, setError] = useState<string>();

  return (
    <ErrorContext.Provider
      value={{
        error,
        setError,
      }}
    >
      {children}
    </ErrorContext.Provider>
  );
}
