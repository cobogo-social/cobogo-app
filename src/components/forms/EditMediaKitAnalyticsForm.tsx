import Button from '@components/Button';
import RangeSlider from '@components/RangeSlider';
import Select from '@components/Select';
import { LoadingContext } from '@contexts/LoadingContext';
import { MessageContext } from '@contexts/MessageContext';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { SetStateAction, useContext, useState } from 'react';

interface EditMediaKitAnalyticsFormProps {
  buttonText: string;
  audienceGenderDistributionMen: number;
  audienceGenderDistributionWomen: number;
  audienceAgeDistribution18: number;
  audienceAgeDistribution2534: number;
  audienceTopCountries1: number;
  audienceTopCountries2: number;
  route?: string;
  handle: string;
  closeModal: () => void;
  countries: string[];
  country1Name: string;
  country2Name: string;
  country3Name: string;
  country1Id: number;
  country2Id: number;
  country3Id: number;
}

export default function EditMediaKitAnalyticsForm(
  props: EditMediaKitAnalyticsFormProps,
) {
  const [sectionIsOpen, setSectionIsOpen] = useState('');

  const { push } = useRouter();

  const { setMessage } = useContext(MessageContext);
  const { setLoading } = useContext(LoadingContext);

  const [menValue, setMenValue] = useState(props.audienceGenderDistributionMen);
  const [womenValue, setWomenValue] = useState(
    props.audienceGenderDistributionWomen,
  );
  const [age18Value, setAge18Value] = useState(props.audienceAgeDistribution18);
  const [age2534Value, setAge2534Value] = useState(
    props.audienceAgeDistribution2534,
  );
  const [country1Value, setCountry1Value] = useState(
    props.audienceTopCountries1,
  );
  const [country2Value, setCountry2Value] = useState(
    props.audienceTopCountries2,
  );

  const [country1, setCountry1] = useState('');
  const [country2, setCountry2] = useState('');
  const [country3, setCountry3] = useState('');

  async function submit(event) {
    event.preventDefault();

    try {
      setLoading(true);

      await axios
        .post('/api/cobogo/updateProfile', {
          audienceGenderDistributionMen: menValue,
          audienceGenderDistributionWomen: womenValue,
          audienceGenderDistributionOthers:
            100 - menValue - womenValue === 100
              ? 0
              : 100 - menValue - womenValue,
          audienceAgeDistribution18: age18Value,
          audienceAgeDistribution2534: age2534Value,
          audienceAgeDistribution35:
            100 - age18Value - age2534Value === 100
              ? 0
              : 100 - age18Value - age2534Value,
          audienceTopCountries1: country1Value,
          audienceTopCountries2: country2Value,
          audienceTopCountries3:
            100 - country1Value - country2Value === 100
              ? 0
              : 100 - country1Value - country2Value,
          audienceTopCountry1: country1 || props.country1Id,
          audienceTopCountry2: country2 || props.country2Id,
          audienceTopCountry3: country3 || props.country3Id,
        })
        .then(async (response) => {
          if (response.data.error) {
            setMessage({
              text: response.data.error,
              type: 'error',
            });
          } else {
            await push(props.route ? props.route : `/${props.handle}`);
          }

          if (props.closeModal) {
            props.closeModal();
          }

          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
      setMessage({
        text: error.message,
        type: 'error',
      });
    }
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

  function changeCountry1(event: {
    target: { value: SetStateAction<string> };
    key: string;
  }) {
    setCountry1(event.target.value);
  }

  function changeCountry2(event: {
    target: { value: SetStateAction<string> };
    key: string;
  }) {
    setCountry2(event.target.value);
  }

  function changeCountry3(event: {
    target: { value: SetStateAction<string> };
    key: string;
  }) {
    setCountry3(event.target.value);
  }

  return (
    <form className="flex flex-col w-full" onSubmit={submit}>
      <p className="text-white text-[40px] mb-5">media kit - analytics</p>

      <div
        onClick={() => openSection('gender')}
        className="flex items-center mb-5 hover:cursor-pointer"
      >
        <div className="flex mr-[10px]">
          <Image
            src="/images/gender-icon.svg"
            width={37}
            height={37}
            alt="gender icon"
          />
        </div>

        <p className="text-white text-[22px] mr-[10px]">gender</p>

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
        <div className="flex flex-col gap-5">
          <div className="flex gap-5">
            <RangeSlider
              color="#6808CF"
              value={menValue}
              setValue={setMenValue}
            />

            <p className="font-bold min-w-[68px]">men</p>
          </div>

          <div className="flex gap-5">
            <RangeSlider
              color="#D7ABFF"
              value={womenValue}
              setValue={setWomenValue}
              maxValue={100 - menValue}
            />

            <p className="font-bold min-w-[68px]">women</p>
          </div>

          <div className="flex gap-5 mb-10">
            <RangeSlider color="#B266FA" value={100 - menValue - womenValue} />

            <p className="font-bold min-w-[68px]">others</p>
          </div>
        </div>
      )}

      <div
        onClick={() => openSection('age')}
        className="flex items-center mb-5 hover:cursor-pointer"
      >
        <div className="flex mr-[10px]">
          <Image
            src="/images/bar-chart-icon.svg"
            width={37}
            height={32}
            alt="bar chart icon"
          />
        </div>

        <p className="text-white text-[22px] mr-[10px]">age</p>

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
        <div className="flex flex-col gap-5">
          <div className="flex gap-5">
            <RangeSlider
              color="#6808CF"
              value={age18Value}
              setValue={setAge18Value}
            />

            <p className="font-bold min-w-[68px]">-18</p>
          </div>

          <div className="flex gap-5">
            <RangeSlider
              color="#D7ABFF"
              value={age2534Value}
              setValue={setAge2534Value}
              maxValue={100 - age18Value}
            />

            <p className="font-bold min-w-[68px]">25-34</p>
          </div>

          <div className="flex gap-5 mb-10">
            <RangeSlider
              color="#B266FA"
              value={100 - age18Value - age2534Value}
            />

            <p className="font-bold min-w-[68px]">+35</p>
          </div>
        </div>
      )}

      <div
        onClick={() => openSection('country')}
        className={`flex items-center hover:cursor-pointer ${
          sectionIsOpen === 'country' ? 'mb-5' : 'mb-8'
        }`}
      >
        <div className="flex mr-[10px]">
          <Image
            src="/images/location-icon.svg"
            width={37}
            height={27}
            alt="location icon"
          />
        </div>

        <p className="text-white text-[22px] mr-[10px]">countries</p>

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
        <div className="flex flex-col gap-5">
          <div className="flex gap-5">
            <RangeSlider
              color="#6808CF"
              value={country1Value}
              setValue={setCountry1Value}
            />

            <Select
              values={props.countries}
              changeValue={changeCountry1}
              valueName={props.country1Name}
              placeholder="-"
              width="w-20"
              height="h-8"
              noMarginBottom
            />
          </div>

          <div className="flex gap-5">
            <RangeSlider
              color="#D7ABFF"
              value={country2Value}
              setValue={setCountry2Value}
              maxValue={100 - country1Value}
            />

            <Select
              values={props.countries}
              changeValue={changeCountry2}
              valueName={props.country2Name}
              placeholder="-"
              width="w-20"
              height="h-8"
              noMarginBottom
            />
          </div>

          <div className="flex gap-5 mb-10">
            <RangeSlider
              color="#B266FA"
              value={100 - country1Value - country2Value}
            />

            <Select
              values={props.countries}
              changeValue={changeCountry3}
              valueName={props.country3Name}
              placeholder="-"
              width="w-20"
              height="h-8"
              noMarginBottom
            />
          </div>
        </div>
      )}

      <div className="fixed bottom-0 right-0 w-screen sm:w-[600px] h-16 bg-gradient-to-t from-black to-black[0] z-30 px-5 sm:px-[70px] py-10 flex items-end">
        <Button
          text={props.buttonText}
          color="bg-blue"
          onClick={request}
          onKeyDown={request}
        />
      </div>
    </form>
  );
}
