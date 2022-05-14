interface CategoriesSelectProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  categories: any[];
  changeCategory: (event: unknown) => void;
  categoryName?: string;
}

export default function CategoriesSelect({
  categories,
  changeCategory,
  categoryName,
}: CategoriesSelectProps) {
  return (
    <div className="flex">
      <select
        className="w-full sm:w-[432px] h-12 bg-black border-[1.5px] border-gray5 mb-8 px-4 outline-none hidden sm:block hover:cursor-pointer"
        onChange={changeCategory}
      >
        {categories.map((category) => {
          if (categoryName === category.attributes.name) {
            return (
              <option selected key={category.id} value={category.id}>
                {category.attributes.name}
              </option>
            );
          }
          return (
            <option key={category.id} value={category.id}>
              {category.attributes.name}
            </option>
          );
        })}
      </select>
    </div>
  );
}
