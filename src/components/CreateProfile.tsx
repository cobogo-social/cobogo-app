import axios from 'axios';
import { useFormik } from 'formik';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { SetStateAction, useEffect, useState } from 'react';
import * as yup from 'yup';

import Button from './Button';
import Categories from './Categories';
import CategoriesInput from './CategoriesInput';
import ChannelBanner from './ChannelBanner';
import ErrorLabel from './ErrorLabel';
import ErrorModal from './ErrorModal';
import Loading from './Loading';
import StepContainer from './StepContainer';
import StepWrapper from './StepWrapper';
import TopBar from './TopBar';

interface CreateProfileProps {
  banner: string;
  title: string;
  description: string;
}

export default function CreateProfile({
  banner,
  title,
  description,
}: CreateProfileProps) {
  const [categoriesList, setCategoriesList] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [createdProfile, setCreatedProfile] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [handleError, setHandleError] = useState('');
  const { push } = useRouter();

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
      const readProfileByHandle = await axios.get(
        '/api/cobogo/readProfileByHandle',
        {
          params: {
            handle: values.handle,
          },
        },
      );

      if (readProfileByHandle.data.error) {
        setIsError(true);
      }

      if (!readProfileByHandle.data.data) {
        setIsLoading(true);

        const queryRef = sessionStorage.getItem('queryRef');

        await axios
          .post('/api/cobogo/createProfile', {
            description: values.description,
            handle: values.handle,
            categories: categoriesList.toString(),
            queryRef: queryRef || null,
          })
          .then((response) => {
            if (response.data.error) {
              setIsError(true);
            }

            setCreatedProfile(true);
            setIsLoading(false);
          });
      } else {
        setIsLoading(false);
        setHandleError('handle already exists');
      }
    },
  });

  function handleChangeCategories(event: {
    target: { value: SetStateAction<string> };
    key: string;
  }) {
    setInput(event.target.value);

    if (event.key === 'Enter') {
      if (categoriesList.length === 5) {
        return;
      }

      if (input) {
        setCategoriesList([...categoriesList, input]);
        setInput('');
      }
    }
  }

  function handleRemoveCategory(category: string) {
    setCategoriesList(categoriesList.filter((c) => c !== category));
  }

  function handleRequest(event: { key: string }) {
    if (event.key === 'Enter') {
      return;
    }
  }

  function handleValidateKeyPressedInDescription(event) {
    const keyPressed = event.key;

    if (keyPressed === 'Enter') {
      event.preventDefault();
    }
  }

  function handleValidateKeyPressedInHandle(event) {
    const keyPressed = event.key;

    if (
      '1234567890qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM-'.indexOf(
        keyPressed,
      ) < 0
    ) {
      event.preventDefault();
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
      <ErrorModal isError={isError} setIsError={setIsError} />

      <StepContainer>
        <TopBar />

        <StepWrapper>
          <form className="flex flex-col" onSubmit={formik.handleSubmit}>
            <p className="mb-4 text-4xl">create profile</p>

            <label htmlFor="description" className="mb-4 sm:text-lg">
              write a description to be visible on your public profile.
            </label>

            <div className="relative">
              {formik.touched.description && formik.errors.description ? (
                <ErrorLabel error={formik.errors.description} />
              ) : null}
              <textarea
                id="description"
                name="description"
                className={`w-full sm:w-[432px] h-32 bg-black border-[1.5px] ${
                  formik.touched.description && formik.errors.description
                    ? 'border-red'
                    : 'border-details'
                } mb-8 p-2 outline-none`}
                onChange={formik.handleChange}
                onKeyPress={handleValidateKeyPressedInDescription}
                value={formik.values.description}
              />
            </div>

            <label htmlFor="handle" className="text-lg sm:mb-4">
              choose a handle
            </label>

            <p className="mb-4 text-sm break-words text-gray3 sm:hidden">
              app.cobogo.social/{formik.values.handle}
            </p>

            <div className="flex">
              <div className="px-4 h-12 bg-secondary hidden sm:flex justify-center items-center border-[1.5px] border-r-0 border-details">
                <p className="font-bold">app.cobogo.social/</p>
              </div>

              <div className="relative w-full">
                {(formik.touched.handle && formik.errors.handle) ||
                handleError ? (
                  <ErrorLabel error={formik.errors.handle || handleError} />
                ) : null}

                <input
                  id="handle"
                  name="handle"
                  type="text"
                  onChange={formik.handleChange}
                  onKeyPress={handleValidateKeyPressedInHandle}
                  value={formik.values.handle}
                  className={`w-full h-12 bg-black border-[1.5px] sm:border-l-0 ${
                    (formik.touched.handle && formik.errors.handle) ||
                    handleError
                      ? 'border-red'
                      : 'border-details'
                  } mb-8 p-2 outline-none`}
                />
              </div>
            </div>

            <p className="mb-4 text-lg">choose categories</p>

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
              removeCategory={handleRemoveCategory}
            />

            <Button
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
        </StepWrapper>
      </StepContainer>
    </>
  );
}
