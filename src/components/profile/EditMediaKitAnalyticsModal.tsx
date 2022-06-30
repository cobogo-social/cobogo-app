import Image from 'next/image';
import { useEffect, useState } from 'react';

import Button from '../Button';
import RangeSlider from '../RangeSlider';

interface EditMediaKitAnalyticsModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export default function EditMediaKitAnalyticsModal({
  isOpen,
  setIsOpen,
}: EditMediaKitAnalyticsModalProps) {
  const [sectionIsOpen, setSectionIsOpen] = useState('');
  const [menValue, setMenValue] = useState(0);
  const [womenValue, setWomenValue] = useState(0);
  const [age18Value, setAge18Value] = useState(0);
  const [age2534Value, setAge2534Value] = useState(0);
  const [age35Value, setAge35Value] = useState(0);
  const [country1Value, setCountry1Value] = useState(0);
  const [country2Value, setCountry2Value] = useState(0);
  const [country3Value, setCountry3Value] = useState(0);

  function closeModal() {
    setIsOpen(false);
  }

  function request(event: { key: string }) {
    if (event.key === 'Enter') {
      return;
    }
  }

  function openSection(sectionName: string) {
    if (sectionIsOpen === sectionName) {
      setSectionIsOpen('');
    } else {
      setSectionIsOpen(sectionName);
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('active-modal');
    } else {
      document.body.classList.remove('active-modal');
    }
  }, [isOpen]);

  return isOpen ? (
    <div className="w-screen h-screen fixed top-0 right-0 z-10 flex justify-center items-center bg-black/[0.5]">
      <div className="relative bg-primary w-full sm:w-[598px] h-full sm:h-auto flex flex-col border border-gray10 p-[40px] sm:p-[70px] shadow-[0_0px_0px_10px_rgba(0,0,0,0.4)]">
        <div className="flex flex-col items-start justify-center">
          <div
            onClick={closeModal}
            className="absolute top-10 sm:top-0 right-0 mt-[20px] mr-[20px] hover:cursor-pointer"
          >
            <Image
              src="/images/x2-icon.svg"
              width={13}
              height={13}
              alt="x2 icon"
            />
          </div>

          <p className="text-white text-[40px] mb-4">media kit - analytics</p>

          <form className="flex flex-col w-full">
            <div
              onClick={() => openSection('gender')}
              className="flex items-center mb-4 hover:cursor-pointer"
            >
              <div className="flex mr-[10px]">
                <Image
                  src="/images/gender-icon.svg"
                  width={37}
                  height={37}
                  alt="gender icon"
                />
              </div>

              <p className="text-white text-[22px] mr-[10px] w-[380px]">
                gender distribution
              </p>

              <div className="w-full border border-gray10 mr-[10px]" />

              <div className="flex">
                <Image
                  src="/images/open-icon.svg"
                  width={12}
                  height={7}
                  alt="open icon"
                />
              </div>
            </div>

            {sectionIsOpen === 'gender' && (
              <div className="flex flex-col">
                <RangeSlider
                  color="#6808CF"
                  value={menValue}
                  setValue={setMenValue}
                  description="men"
                  descriptionColor="bg-purple2"
                />

                <RangeSlider
                  color="#D7ABFF"
                  value={100 - menValue}
                  setValue={setWomenValue}
                  descriptionOnBottom
                  description="women"
                  descriptionColor="bg-pink"
                />
              </div>
            )}

            <div
              onClick={() => openSection('age')}
              className="flex items-center mb-4 hover:cursor-pointer"
            >
              <div className="flex mr-[10px]">
                <Image
                  src="/images/age-icon.svg"
                  width={37}
                  height={32}
                  alt="age icon"
                />
              </div>

              <p className="text-white text-[22px] mr-[10px] w-[280px]">
                age distribution
              </p>

              <div className="w-full border border-gray10 mr-[10px]" />

              <div className="flex">
                <Image
                  src="/images/open-icon.svg"
                  width={12}
                  height={7}
                  alt="open icon"
                />
              </div>
            </div>

            {sectionIsOpen === 'age' && (
              <div className="flex flex-col">
                <RangeSlider
                  color="#6808CF"
                  value={age18Value}
                  setValue={setAge18Value}
                  description="-18"
                  descriptionColor="bg-purple2"
                />

                <RangeSlider
                  color="#D7ABFF"
                  value={age2534Value}
                  setValue={setAge2534Value}
                  description="25-34"
                  descriptionColor="bg-pink"
                  maxValue={100 - age18Value}
                />

                <RangeSlider
                  color="#B266FA"
                  value={100 - age18Value - age2534Value}
                  setValue={setAge35Value}
                  description="+35"
                  descriptionColor="bg-violet"
                />
              </div>
            )}

            <div
              onClick={() => openSection('country')}
              className={`flex items-center hover:cursor-pointer ${
                sectionIsOpen === 'country' ? 'mb-4' : 'mb-8'
              }`}
            >
              <div className="flex mr-[10px]">
                <Image
                  src="/images/country-icon.svg"
                  width={37}
                  height={27}
                  alt="country icon"
                />
              </div>

              <p className="text-white text-[22px] mr-[10px]  w-[210px]">
                top countries
              </p>

              <div className="w-full border border-gray10 mr-[10px]" />

              <div className="flex">
                <Image
                  src="/images/open-icon.svg"
                  width={12}
                  height={7}
                  alt="open icon"
                />
              </div>
            </div>

            {sectionIsOpen === 'country' && (
              <div className="mb-8 flex flex-col">
                <RangeSlider
                  color="#6808CF"
                  value={country1Value}
                  setValue={setCountry1Value}
                  description="-"
                  descriptionColor="bg-purple2"
                />

                <RangeSlider
                  color="#D7ABFF"
                  value={country2Value}
                  setValue={setCountry2Value}
                  description="-"
                  descriptionColor="bg-pink"
                  maxValue={100 - country1Value}
                />

                <RangeSlider
                  color="#B266FA"
                  value={100 - country1Value - country2Value}
                  setValue={setCountry3Value}
                  description="-"
                  descriptionColor="bg-violet"
                />
              </div>
            )}

            <Button
              text="save"
              color="bg-blue"
              width="w-[76px]"
              height="h-[38px]"
              onClick={request}
              onKeyDown={request}
            />
          </form>
        </div>
      </div>
    </div>
  ) : null;
}
