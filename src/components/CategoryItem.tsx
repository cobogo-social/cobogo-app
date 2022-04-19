import Image from 'next/image';

interface CategoryItemProps {
  category: string;
  removeCategory: (category: string) => void;
}

export default function CategoryItem({
  category,
  removeCategory,
}: CategoryItemProps) {
  function handleRemoveCategory() {
    removeCategory(category);
  }

  return (
    <div
      className="h-8 bg-black border-[1.5px] border-gray5 flex justify-center items-center p-2 mr-2 mb-2 hover:cursor-pointer"
      onClick={handleRemoveCategory}
    >
      <p className="mr-2 font-bold text-violet">{category.toLowerCase()}</p>

      <Image src="/images/x-icon.svg" width={16} height={16} alt="x icon" />
    </div>
  );
}