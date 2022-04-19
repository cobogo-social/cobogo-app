import { useState } from 'react';
import TokenInfoModal from '@components/modals/TokenInfoModal';

interface TokenInfoProps {
  tokens: number;
}

export default function TokenInfo({ tokens }: TokenInfoProps) {
  const [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <TokenInfoModal isOpen={isOpen} setIsOpen={setIsOpen} />

      <button onClick={openModal} className="flex mr-8 font-bold">
        {tokens} CBG
      </button>
    </>
  );
}
