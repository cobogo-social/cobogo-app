import CategoryItem from './CategoryItem';

interface CategoriesProps {
  categories: string[];
  handleRemoveCategory: (category: string) => void;
}

export default function Categories({
  categories,
  handleRemoveCategory,
}: CategoriesProps) {
  return (
    <div className="mb-8 flex flex-wrap w-full sm:w-[432px]">
      {categories.map((category) => (
        <CategoryItem
          key={category}
          category={category}
          onClick={handleRemoveCategory}
        />
      ))}
    </div>
  );
}
