import { useState } from 'react';
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
    <div className="mb-12 flex flex-wrap w-[432px]">
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
