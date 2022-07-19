import TokenInfoModal from '@components/modals/TokenInfoModal';
import Image from 'next/image';
import { useState } from 'react';

interface TokenInfoProps {
  tokens: number;
}

export default function TokenInfo(props: TokenInfoProps) {
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
            src="/images/purple-cbg-flat-icon.svg"
            width={24}
            height={21}
            alt="purple cbg flat icon"
          />
        </div>

        <p className="flex font-bold">{props.tokens} CBG</p>
      </div>
    </>
  );
}
