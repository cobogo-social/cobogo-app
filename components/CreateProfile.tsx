import { useFormik } from 'formik';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Button from './Button';
import Categories from './Categories';
import CategoriesInput from './CategoriesInput';
import ChannelBanner from './ChannelBanner';
import TopBar from './TopBar';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import * as yup from 'yup';
import Loading from './Loading';
import axios from 'axios';

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
  const [isLoading, setIsLoading] = useState(false);

  const { data: session } = useSession();
  const { push } = useRouter();

  const schema = yup.object().shape({
    description: yup.string().required('description required'),
    handle: yup.string().required('handle required'),
  });

  const formik = useFormik({
    initialValues: {
      description: '',
      handle: '',
    },
    onSubmit: async (values) => {
      setIsLoading(true);

      schema
        .validate({
          description: values.description,
          handle: values.handle,
        })
        .then((valid) => {
          if (valid) {
            axios
              .post('/api/cobogo/createProfile', {
                description: values.description,
                handle: values.handle,
                categories: categoriesList.toString(),
                account_email: session.user.email,
              })
              .then(() => {
                setCreatedProfile(true);
                setIsLoading(false);
              })
              .catch((error) => {
                setIsLoading(false);
              });
          }
        })
        .catch((error) => {
          setIsLoading(false);
        });
    },
  });

  async function handleChangeCategories(event) {
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

  async function handleRequest(event) {
    if (event.key === 'Enter') {
      return;
    }
  }

  useEffect(() => {
    if (session?.error === 'RefreshAccessTokenError') {
      signIn('google');
    }
  }, [session]);

  useEffect(() => {
    if (createdProfile) {
      push('/submit/video');
    }
  }, [push, createdProfile]);

  return (
    <>
      <Loading isLoading={isLoading} />

      <div className="bg-primary w-full h-full p-8">
        <TopBar />
        <div className="flex flex-row justify-between items-start px-16 2xl:px-64">
          <form className="flex flex-col" onSubmit={formik.handleSubmit}>
            <p className="text-4xl text-white mb-4">create profile</p>

            <label htmlFor="description" className="text-lg text-white mb-4">
              write a description to be visible on your public profile.
            </label>
            <textarea
              id="description"
              name="description"
              className="w-[432px] h-32 bg-black border-[1.5px] border-details mb-8 p-2 outline-none text-white"
              onChange={formik.handleChange}
              onKeyPress={(e) => {
                e.key === 'Enter' && e.preventDefault();
              }}
              value={formik.values.description}
            />

            <label htmlFor="handle" className="text-lg text-white mb-4">
              choose a handle
            </label>
            <div className="flex">
              <div className="w-48 h-12 bg-secondary flex justify-center items-center border-[1.5px] border-r-0 border-details">
                <p className="text-white font-bold">https://cobogo-social/</p>
              </div>
              <input
                id="handle"
                name="handle"
                type="text"
                onChange={formik.handleChange}
                onKeyPress={(e) => {
                  e.key === 'Enter' && e.preventDefault();
                }}
                value={formik.values.handle}
                className="w-60 h-12 bg-black border-[1.5px] border-l-0 border-details mb-8 p-2 outline-none text-white"
              />
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
              text="send to review"
              color="bg-blue"
              hoverColor="brightness-90"
              width="w-40"
              height="h-9"
              fontSize=""
              onClick={handleRequest}
              onKeyDown={handleRequest}
            />
          </form>

          <ChannelBanner
            banner={banner}
            title={title}
            description={description}
          />
        </div>
      </div>
    </>
  );
}
