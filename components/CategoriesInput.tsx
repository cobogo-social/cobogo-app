interface CategoriesInputProps {
  input: string;
  handleChangeCategories: (event: unknown) => void;
}

export default function CategoriesInput({
  input,
  handleChangeCategories,
}: CategoriesInputProps) {
  function validateKeyPressed(event) {
    event.key === 'Enter' && event.preventDefault();
  }

  return (
    <>
      <input
        className="w-full sm:w-96 h-12 bg-black border-[1.5px] border-l-0 border-details mb-4 text-white p-2 outline-none hidden sm:block"
        type="text"
        placeholder="search for a category and press enter"
        value={input}
        onChange={handleChangeCategories}
        onKeyPress={validateKeyPressed}
        onKeyDown={handleChangeCategories}
      />

      <input
        className="w-full sm:w-96 h-12 bg-black border-[1.5px] border-l-0 border-details mb-4 text-white p-2 outline-none block sm:hidden"
        type="text"
        placeholder="search for a category"
        value={input}
        onChange={handleChangeCategories}
        onKeyPress={validateKeyPressed}
        onKeyDown={handleChangeCategories}
      />
    </>
  );
}
