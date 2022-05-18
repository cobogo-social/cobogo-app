import Image from 'next/image';

interface TagsInputProps {
  input?: string;
  changeTags?: (event: unknown) => void;
}

export default function TagsInput({ input, changeTags }: TagsInputProps) {
  function validateKeyPressed(event) {
    event.key === 'Enter' && event.preventDefault();
  }

  return (
    <div className="flex">
      <div className="w-12 h-12 border-[1.5px] bg-black border-r-0 border-gray5 flex justify-center items-center">
        <Image
          src="/images/search-icon.svg"
          width={19}
          height={19}
          alt="search icon"
        />
      </div>

      <input
        className="w-full sm:w-96 h-12 bg-black border-[1.5px] border-l-0 border-gray5 mb-4 p-2 outline-none hidden sm:block"
        type="text"
        placeholder="type a tag and press enter"
        value={input}
        onChange={changeTags}
        onKeyPress={validateKeyPressed}
        onKeyDown={changeTags}
      />

      <input
        className="w-full sm:w-96 h-12 bg-black border-[1.5px] border-l-0 border-gray5 mb-4 p-2 outline-none block sm:hidden"
        type="text"
        placeholder="type a tag"
        value={input}
        onChange={changeTags}
        onKeyPress={validateKeyPressed}
        onKeyDown={changeTags}
      />
    </div>
  );
}
