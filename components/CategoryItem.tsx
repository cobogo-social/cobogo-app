import Image from 'next/image';

interface CategoryItemProps {
  category: string;
  onClick: (category: string) => void;
}

export default function CategoryItem({ category, onClick }: CategoryItemProps) {
  return (
    <div
      className="h-8 pbg-black border-[1.5px] border-details flex justify-center items-center p-1 mr-4 mb-4 hover:cursor-pointer"
      onClick={() => onClick(category)}
    >
      <p className="font-bold text-white mr-2">{category.toUpperCase()}</p>
      <Image src="/images/x-icon.svg" width={16} height={16} alt="x icon" />
    </div>
  );
}
