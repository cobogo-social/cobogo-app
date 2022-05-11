interface CategoriesSelectProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  categories: any[];
  changeCategory: (event: unknown) => void;
}

export default function CategoriesSelect({
  categories,
  changeCategory,
}: CategoriesSelectProps) {
  return (
    <div className="flex">
      <select
        className="w-full sm:w-[432px] h-12 bg-black border-[1.5px] border-gray5 mb-8 px-4 outline-none hidden sm:block"
        onChange={changeCategory}
      >
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.attributes.name}
          </option>
        ))}
      </select>
    </div>
  );
}
