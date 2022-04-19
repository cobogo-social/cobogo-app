import CategoryItem from './CategoryItem';

interface CategoriesProps {
  categories: string[];
  removeCategory: (category: string) => void;
}

export default function Categories({
  categories,
  removeCategory,
}: CategoriesProps) {
  return (
    <div className="mb-8 flex flex-wrap w-full sm:w-[432px]">
      {categories.map((category) => (
        <CategoryItem
          key={category}
          category={category}
          removeCategory={removeCategory}
        />
      ))}
    </div>
  );
}
