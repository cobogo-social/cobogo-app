import Image from 'next/image';

import Button from './Button';
import Categories from './Categories';
import CategoriesInput from './CategoriesInput';

interface EditProfileModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export default function EditProfileModal({
  isOpen,
  setIsOpen,
}: EditProfileModalProps) {
  function closeModal() {
    setIsOpen(false);
  }

  return isOpen ? (
    <div className="w-screen h-screen fixed top-0 right-0 z-10 flex justify-center items-center bg-black/[0.5]">
      <div className="relative bg-primary w-[550px] h-[745px] flex flex-col justify-center border-[1.5px] border-details px-[70px]">
        <div className="flex flex-col items-start justify-center">
          <div
            onClick={closeModal}
            className="absolute top-0 right-0 mt-[20px] mr-[20px] hover:cursor-pointer"
          >
            <Image
              src="/images/x2-icon.svg"
              width={13}
              height={13}
              alt="x2 icon"
            />
          </div>

          <p className="text-white text-[40px]">edit profile</p>

          <p className="text-white text-[22px] max-w-[438px] sm:mb-4">
            write a description to be visible on your public profile.
          </p>

          <form className="flex flex-col">
            <div className="relative">
              <textarea
                id="description"
                name="description"
                className="w-full sm:w-[432px] h-32 bg-black border-[1.5px] border-details mb-8 p-2 outline-none text-white"
              />
            </div>

            <label htmlFor="handle" className="text-[22px] text-white sm:mb-4">
              choose a handle
            </label>

            <p className="mb-4 text-sm break-words text-graylight sm:hidden">
              app.cobogo.social/
            </p>

            <div className="flex">
              <div className="px-4 h-12 bg-secondary hidden sm:flex justify-center items-center border-[1.5px] border-r-0 border-details">
                <p className="font-bold text-white">app.cobogo.social/</p>
              </div>

              <div className="relative w-full">
                <input
                  id="handle"
                  name="handle"
                  type="text"
                  className="w-full h-12 bg-black border-[1.5px] sm:border-l-0  mb-8 p-2 outline-none text-white border-details"
                />
              </div>
            </div>

            <p className="mb-4 text-[22px] text-white">choose categories</p>

            <div className="flex">
              <div className="w-12 h-12 border-[1.5px] bg-black border-r-0 border-details flex justify-center items-center">
                <Image
                  src="/images/search-icon.svg"
                  width={19}
                  height={19}
                  alt="search icon"
                />
              </div>

              <CategoriesInput />
            </div>

            <Categories categories={['category 1', 'category 2']} />

            <Button
              text="save"
              color="bg-blue"
              hoverColor="brightness-90"
              width="w-[76px]"
              height="h-[38px]"
            />
          </form>
        </div>
      </div>
    </div>
  ) : null;
}
