interface ChannelsCategoriesMenuProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  categories: any[];
  searchByCategory: (categoryId: number) => void;
}

export default function ChannelsCategoriesMenu({
  categories,
  searchByCategory,
}: ChannelsCategoriesMenuProps) {
  return (
    <div className="w-[332px] bg-secondary py-[48px] px-[39px]">
      <p className="text-[24px] mb-[31px]">categories</p>

      <div className="text-gray3 flex flex-col items-start">
        {categories.map((category) => (
          <button
            key={category.id}
            className="mb-[15px] hover:cursor-pointer"
            onClick={() => searchByCategory(category.id)}
          >
            {category.attributes.name}
          </button>
        ))}
      </div>
    </div>
  );
}
