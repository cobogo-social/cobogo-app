import { useState } from 'react';

import Button from '../Button';
import ServiceModal from './ServiceModal';

interface ServiceProps {
  name: string;
  description: string;
}

export default function Service({ name, description }: ServiceProps) {
  const [serviceModalIsOpen, setServiceModalIsOpen] = useState(false);

  function openServiceModal() {
    setServiceModalIsOpen(true);
  }

  return (
    <>
      <ServiceModal
        isOpen={serviceModalIsOpen}
        setIsOpen={setServiceModalIsOpen}
        name={name}
        description={description}
      />

      <div className="w-[310px] h-[464px] border border-gray10">
        <div className="bg-blue w-[310px] h-[204px]" />

        <div className="px-8 py-10 flex flex-col h-[260px] justify-between">
          <p className="text-[22px]">{name}</p>

          <p className="mb-8 break-words">{description.slice(0, 111)} (...)</p>

          <div>
            <Button
              color="bg-gray7"
              text="more info"
              borderColor="border-gray2"
              borderSize="border"
              textColor="text-blue"
              onClick={openServiceModal}
            />
          </div>
        </div>
      </div>
    </>
  );
}
