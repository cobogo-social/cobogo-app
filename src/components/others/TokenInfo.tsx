import TokenInfoModal from '@components/modals/TokenInfoModal';
import Image from 'next/image';
import { useState } from 'react';

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

      <div onClick={openModal} className="flex hover:cursor-pointer">
        <div className="flex mr-2">
          <Image
            src="/images/cbg-icon.svg"
            width={24}
            height={21}
            alt="cbg icon"
          />
        </div>

        <p className="flex mr-8 font-bold">{tokens} CBG</p>
      </div>
    </>
  );
}
