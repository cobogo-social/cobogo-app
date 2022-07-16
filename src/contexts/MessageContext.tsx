import { createContext, Dispatch, SetStateAction, useState } from 'react';

interface IMessage {
  text: string;
  type: 'none' | 'error' | 'warning';
}

interface IMessageContext {
  message: IMessage;
  setMessage: Dispatch<SetStateAction<IMessage>>;
}

export const MessageContext = createContext<IMessageContext>(
  {} as IMessageContext,
);

export function MessageProvider({ children }) {
  const [message, setMessage] = useState<IMessage>({
    text: '',
    type: 'none',
  } as IMessage);

  return (
    <MessageContext.Provider
      value={{
        message,
        setMessage,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
}
