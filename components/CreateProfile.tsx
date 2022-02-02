import { useFormik } from 'formik';
import Image from 'next/image';
import { useState } from 'react';
import Button from './Button';
import Categories from './Categories';
import CategoriesInput from './CategoriesInput';
import SpaceOfficialBanner from './SpaceOfficialBanner';
import TopBar from './TopBar';

interface RequestBody {
  description: string;
  handle: string;
  categories: string[];
}

export default function Connect() {
  const [categoriesList, setCategoriesList] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [requestBody, setRequestBody] = useState<RequestBody>(
    {} as RequestBody
  );

  const formik = useFormik({
    initialValues: {
      description: '',
      handle: '',
    },
    onSubmit: (values) => {
      setRequestBody({ ...values, categories: categoriesList });
    },
  });

  async function handleChangeCategories(event) {
    setInput(event.target.value);

    if (event.key === 'Enter') {
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

    console.log(requestBody);
  }

  return (
    <div className="bg-primary w-full h-full p-8">
      <TopBar />
      <div className="flex flex-row justify-between items-start px-16">
        <form className="flex flex-col" onSubmit={formik.handleSubmit}>
          <p className="text-4xl text-white">create profile</p>

          <label htmlFor="description" className="text-lg text-white mb-4">
            write a description to be visible on your public profile.
          </label>
          <textarea
            id="description"
            name="description"
            className="w-[432px] h-32 bg-black border-[1.5px] border-details mb-8 p-2 outline-none text-white"
            onChange={formik.handleChange}
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
        <SpaceOfficialBanner />
      </div>
    </div>
  );
}
