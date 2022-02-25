interface CategoriesInputProps {
  input: string;
  handleChangeCategories: (event: any) => void;
}

export default function CategoriesInput({
  input,
  handleChangeCategories,
}: CategoriesInputProps) {
  return (
    <input
      className="w-[212px] sm:w-96 h-12 bg-black border-[1.5px] border-l-0 border-details mb-5 text-white p-2 outline-none"
      type="text"
      placeholder="search for a category and press enter"
      value={input}
      onChange={handleChangeCategories}
      onKeyPress={(e) => {
        e.key === 'Enter' && e.preventDefault();
      }}
      onKeyDown={handleChangeCategories}
    />
  );
}
