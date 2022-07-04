interface SelectProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  values: any[];
  changeValue: (event: unknown) => void;
  valueName?: string;
  placeholder: string;
}

export default function Select(props: SelectProps) {
  return (
    <div className="flex">
      <select
        className="w-full sm:w-[432px] h-12 bg-gray7 border border-gray10 mb-10 px-4 outline-none hover:cursor-pointer"
        onChange={props.changeValue}
      >
        <option selected>{props.placeholder}</option>

        {props.values?.map((category) => {
          if (props.valueName === category.attributes.name) {
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
