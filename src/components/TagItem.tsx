import Image from 'next/image';

interface TagItemProps {
  tag: string;
  removeTag?: (category: string) => void;
}

export default function TagItem({ tag, removeTag }: TagItemProps) {
  function removeATag() {
    removeTag(tag);
  }

  return (
    <div
      className={`h-8 bg-black border-[1.5px] border-gray5 flex justify-center items-center p-2 mr-2 mb-2 ${
        removeTag && 'hover:cursor-pointer'
      }`}
      onClick={removeTag ? removeATag : null}
    >
      <p className={`${removeTag ? 'mr-2' : 'mr-0'} font-bold text-violet`}>
        {tag.toLowerCase()}
      </p>

      {removeTag && (
        <Image src="/images/x-icon.svg" width={16} height={16} alt="x icon" />
      )}
    </div>
  );
}
