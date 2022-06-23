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

      <div className="w-[310px] h-[464px] border-[1px] border-gray10">
        <div className="bg-blue w-[310px] h-[204px]" />

        <div className="px-[30px] py-[40px] flex flex-col h-[260px] justify-between">
          <p className="text-[22px]">{name}</p>

          <p className="mb-[30px] break-words">
            {description.slice(0, 111)} (...)
          </p>

          <div>
            <Button
              color="bg-gray7"
              text="more info"
              borderColor="border-gray2"
              borderSize="border-[1px]"
              textColor="text-blue"
              onClick={openServiceModal}
            />
          </div>
        </div>
      </div>
    </>
  );
}
