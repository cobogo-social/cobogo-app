import { createContext, Dispatch, SetStateAction, useState } from 'react';

interface IMessage {
  text: string;
  type: 'none' | 'error' | 'warning';
}

interface IMesssageContext {
  message: IMessage;
  setMessage: Dispatch<SetStateAction<IMessage>>;
}

export const MesssageContext = createContext<IMesssageContext>(
  {} as IMesssageContext,
);

export function MessageProvider({ children }) {
  const [message, setMessage] = useState<IMessage>({
    text: '',
    type: 'none',
  } as IMessage);

  return (
    <MesssageContext.Provider
      value={{
        message,
        setMessage,
      }}
    >
      {children}
    </MesssageContext.Provider>
  );
}
