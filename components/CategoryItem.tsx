import Image from 'next/image';

interface CategoryItemProps {
  category: string;
  onClick: (category: string) => void;
}

export default function CategoryItem({ category, onClick }: CategoryItemProps) {
  return (
    <div
      className="h-8 bg-black border-2 border-details flex justify-center items-center p-1 mr-4 mb-4 hover:cursor-pointer"
      onClick={() => onClick(category)}
    >
      <p className="font-bold text-violet mx-2">{category.toLowerCase()}</p>
      <Image src="/images/x-icon.svg" width={16} height={16} alt="x icon" />
    </div>
  );
}
