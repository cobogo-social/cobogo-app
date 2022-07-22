import Image from 'next/image';

interface TagsInputProps {
  input?: string;
  changeTags?: (event: unknown) => void;
  tags: string[];
  editingTags?: boolean;
}

export default function TagsInput(props: TagsInputProps) {
  function validateKeyPressed(event) {
    event.key === 'Enter' && event.preventDefault();
  }

  return (
    <div className="flex">
      <div
        className={`w-12 h-12 border bg-gray7 border-r-0 border-gray10 flex justify-center items-center ${
          props.editingTags && 'border-blue'
        }`}
      >
        <Image
          src="/images/search-icon.svg"
          width={19}
          height={19}
          alt="search icon"
        />
      </div>

      <input
        className={`w-full sm:w-96 h-12 bg-gray7 border border-l-0 border-gray10 ${
          props.tags.length ? 'mb-5' : 'mb-10'
        } p-2 outline-none hidden sm:block ${
          props.editingTags && 'border-blue'
        }`}
        type="text"
        placeholder="type a tag and press enter"
        value={props.input}
        onChange={props.changeTags}
        onKeyPress={validateKeyPressed}
        onKeyDown={props.changeTags}
      />

      <input
        className="w-full sm:w-96 h-12 bg-gray7 border border-l-0 border-gray10 mb-4 p-2 outline-none block sm:hidden"
        type="text"
        placeholder="type a tag"
        value={props.input}
        onChange={props.changeTags}
        onKeyPress={validateKeyPressed}
        onKeyDown={props.changeTags}
      />
    </div>
  );
}
