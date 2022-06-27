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
        className="w-full sm:w-[432px] h-12 bg-gray7 border-[1px] border-gray10 mb-10 px-4 outline-none hover:cursor-pointer"
        onChange={changeCategory}
      >
        <option selected>select category</option>

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
