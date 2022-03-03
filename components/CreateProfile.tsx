import axios from 'axios';
import { useFormik } from 'formik';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { SetStateAction, useEffect, useState } from 'react';
import referralCodeGenerator from 'referral-code-generator';
import * as yup from 'yup';

import Button from './Button';
import Categories from './Categories';
import CategoriesInput from './CategoriesInput';
import ChannelBanner from './ChannelBanner';
import ErrorLabel from './ErrorLabel';
import Loading from './Loading';
import StepWrapper from './StepWrapper';
import TopBar from './TopBar';

interface CreateProfileProps {
  banner: string;
  title: string;
  description: string;
  channelId: string;
}

export default function CreateProfile({
  banner,
  title,
  description,
  channelId,
}: CreateProfileProps) {
  const [categoriesList, setCategoriesList] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [createdProfile, setCreatedProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [handleError, setHandleError] = useState('');

  const { data: session } = useSession();
  const { push, query } = useRouter();

  const formik = useFormik({
    initialValues: {
      description: '',
      handle: '',
    },
    validationSchema: yup.object().shape({
      description: yup.string().required('description required'),
      handle: yup.string().required('handle required'),
    }),
    onSubmit: async (values) => {
      const response = await axios.get('/api/cobogo/readProfileByHandle', {
        params: {
          handle: values.handle,
        },
      });

      if (response.data.data.length === 0) {
        setIsLoading(true);

        const response = await axios.get(
          '/api/cobogo/readProfileByReferralCode',
          {
            params: {
              referral_code: query.ref,
            },
          }
        );

        if (response.data.data.length !== 0) {
          await axios
            .post('/api/cobogo/createProfile', {
              description: values.description,
              handle: values.handle,
              categories: categoriesList.toString(),
              account_email: session.user.email,
              channel_id: channelId,
              referral_code: referralCodeGenerator.alphaNumeric(
                'lowercase',
                2,
                2
              ),
              referral_profile_id: response.data.data[0].id,
            })
            .then(() => {
              setCreatedProfile(true);
              setIsLoading(false);
            });
        } else {
          await axios
            .post('/api/cobogo/createProfile', {
              description: values.description,
              handle: values.handle,
              categories: categoriesList.toString(),
              account_email: session.user.email,
              channel_id: channelId,
              referral_code: referralCodeGenerator.alphaNumeric(
                'lowercase',
                2,
                2
              ),
            })
            .then(() => {
              setCreatedProfile(true);
              setIsLoading(false);
            });
        }
      } else {
        setIsLoading(false);
        setHandleError('handle already exists');
      }
    },
  });

  async function handleChangeCategories(event: {
    target: { value: SetStateAction<string> };
    key: string;
  }) {
    setInput(event.target.value);

    if (event.key === 'Enter') {
      if (categoriesList.length === 5) {
        return;
      }
      setCategoriesList([...categoriesList, input]);
      setInput('');
    }
  }

  async function handleRemoveCategory(category: string) {
    setCategoriesList(categoriesList.filter((c) => c !== category));
  }

  async function handleRequest(event: { key: string }) {
    if (event.key === 'Enter') {
      return;
    }
  }

  useEffect(() => {
    if (createdProfile) {
      push('/submit/video');
    }
  }, [push, createdProfile]);

  return (
    <>
      <Loading isLoading={isLoading} />

      <div className="bg-primary w-full h-screen sm:h-full p-8">
        <TopBar />

        <StepWrapper>
          <form className="flex flex-col" onSubmit={formik.handleSubmit}>
            <p className="text-4xl text-white mb-4">create profile</p>

            <label
              htmlFor="description"
              className="text-base sm:text-lg text-white mb-4"
            >
              write a description to be visible on your public profile.
            </label>

            <div className="relative">
              {formik.touched.description && formik.errors.description ? (
                <ErrorLabel error={formik.errors.description} />
              ) : null}
              <textarea
                id="description"
                name="description"
                className={`w-[260px] sm:w-[432px] h-32 bg-black border-[1.5px] ${
                  formik.touched.description && formik.errors.description
                    ? 'border-red'
                    : 'border-details'
                } mb-8 p-2 outline-none text-white`}
                onChange={formik.handleChange}
                onKeyPress={(e) => {
                  e.key === 'Enter' && e.preventDefault();
                }}
                value={formik.values.description}
              />
            </div>

            <label htmlFor="handle" className="text-lg text-white mb-4">
              choose a handle
            </label>

            <div className="flex">
              <div className="px-4 h-12 bg-secondary hidden sm:flex justify-center items-center border-[1.5px] border-r-0 border-details">
                <p className="text-white font-bold">
                  https://app.cobogo.social/
                </p>
              </div>

              <div className="relative">
                {(formik.touched.handle && formik.errors.handle) ||
                handleError ? (
                  <ErrorLabel error={formik.errors.handle || handleError} />
                ) : null}

                <input
                  id="handle"
                  name="handle"
                  type="text"
                  onChange={formik.handleChange}
                  onKeyPress={(e) => {
                    e.key === 'Enter' && e.preventDefault();
                  }}
                  value={formik.values.handle}
                  className={`w-[260px] sm:w-[210px] h-12 bg-black border-[1.5px] sm:border-l-0 ${
                    (formik.touched.handle && formik.errors.handle) ||
                    handleError
                      ? 'border-red'
                      : 'border-details'
                  } mb-8 p-2 outline-none text-white`}
                />
              </div>
            </div>

            <p className="text-lg text-white mb-4">choose categories</p>

            <div className="flex">
              <div className="w-12 h-12 border-[1.5px] bg-black border-r-0 border-details flex justify-center items-center">
                <Image
                  src="/images/search-icon.svg"
                  width={19}
                  height={19}
                  alt="search icon"
                />
              </div>

              <CategoriesInput
                input={input}
                handleChangeCategories={handleChangeCategories}
              />
            </div>

            <Categories
              categories={categoriesList}
              handleRemoveCategory={handleRemoveCategory}
            />

            <Button
              disabled={banner ? false : true}
              text="send to review"
              color="bg-blue"
              hoverColor="brightness-90"
              width="w-40"
              height="h-9"
              onClick={handleRequest}
              onKeyDown={handleRequest}
            />
          </form>

          <ChannelBanner
            banner={banner}
            title={title}
            description={description}
          />
        </StepWrapp>
      </div>
    </>
  );
}
