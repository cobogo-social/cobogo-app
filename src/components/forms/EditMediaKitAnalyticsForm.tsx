import Button from '@components/Button';
import RangeSlider from '@components/RangeSlider';
import { LoadingContext } from '@contexts/LoadingContext';
import { MessageContext } from '@contexts/MessageContext';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';

interface EditMediaKitAnalyticsFormProps {
  buttonText: string;
  audienceGenderDistributionMen: number;
  audienceGenderDistributionWomen: number;
  audienceGenderDistributionOthers: number;
  audienceAgeDistribution18: number;
  audienceAgeDistribution2534: number;
  audienceAgeDistribution35: number;
  audienceTopCountries1: number;
  audienceTopCountries2: number;
  audienceTopCountries3: number;
  route?: string;
  handle: string;
  closeModal: () => void;
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
  const [othersValue, setOthersValue] = useState(
    props.audienceGenderDistributionOthers,
  );
  const [age18Value, setAge18Value] = useState(props.audienceAgeDistribution18);
  const [age2534Value, setAge2534Value] = useState(
    props.audienceAgeDistribution2534,
  );
  const [age35Value, setAge35Value] = useState(props.audienceAgeDistribution35);
  const [country1Value, setCountry1Value] = useState(
    props.audienceTopCountries1,
  );
  const [country2Value, setCountry2Value] = useState(
    props.audienceTopCountries2,
  );
  const [country3Value, setCountry3Value] = useState(
    props.audienceTopCountries3,
  );

  async function submit(event) {
    event.preventDefault();

    try {
      setLoading(true);

      await axios
        .post('/api/cobogo/updateProfile', {
          audienceGenderDistributionMen: menValue,
          audienceGenderDistributionWomen: womenValue,
          audienceGenderDistributionOthers: othersValue,
          audienceAgeDistribution18: age18Value,
          audienceAgeDistribution2534: age2534Value,
          audienceAgeDistribution35: age35Value,
          audienceTopCountries1: country1Value,
          audienceTopCountries2: country2Value,
          audienceTopCountries3: country3Value,
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
          <div className="mb-5">
            <RangeSlider
              color="#6808CF"
              value={menValue}
              setValue={setMenValue}
              description="men"
            />
          </div>

          <div className="mb-5">
            <RangeSlider
              color="#D7ABFF"
              value={womenValue}
              setValue={setWomenValue}
              description="women"
              maxValue={100 - menValue}
            />
          </div>

          <div className="mb-10">
            <RangeSlider
              color="#B266FA"
              value={100 - menValue - womenValue}
              setValue={setOthersValue}
              description="others"
            />
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
          <div className="mb-5">
            <RangeSlider
              color="#6808CF"
              value={age18Value}
              setValue={setAge18Value}
              description="-18"
            />
          </div>

          <div className="mb-5">
            <RangeSlider
              color="#D7ABFF"
              value={age2534Value}
              setValue={setAge2534Value}
              description="25-34"
              maxValue={100 - age18Value}
            />
          </div>

          <div className="mb-10">
            <RangeSlider
              color="#B266FA"
              value={100 - age18Value - age2534Value}
              setValue={setAge35Value}
              description="+35"
            />
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
        <div className="mb-10 flex flex-col">
          <div className="mb-5">
            <RangeSlider
              color="#6808CF"
              value={country1Value}
              setValue={setCountry1Value}
              description="-"
            />
          </div>

          <div className="mb-5">
            <RangeSlider
              color="#D7ABFF"
              value={country2Value}
              setValue={setCountry2Value}
              description="-"
              maxValue={100 - country1Value}
            />
          </div>

          <div className="mb-10">
            <RangeSlider
              color="#B266FA"
              value={100 - country1Value - country2Value}
              setValue={setCountry3Value}
              description="-"
            />
          </div>
        </div>
      )}

      <div className="fixed bottom-0 right-0 w-[600px] h-16 bg-gradient-to-t from-black to-black[0] z-40 px-[70px] py-10 flex items-end">
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
