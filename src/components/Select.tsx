interface SelectProps {
  values: any[];
  changeValue: (event: unknown) => void;
  valueName?: string;
  placeholder: string;
  width?: string;
  height?: string;
  noMarginBottom?: boolean;
}

export default function Select(props: SelectProps) {
  const selectedValue = props.values?.find(
    (category) => props.valueName === category.attributes.name,
  );

  return (
    <div className="flex">
      <select
        className={`w-full h-12 bg-gray7 border border-gray10 ${
          props.noMarginBottom ? 'mb-0' : 'mb-10'
        } px-4 outline-none hover:cursor-pointer ${props.width} ${
          props.height
        }`}
        onChange={props.changeValue}
        defaultValue={selectedValue?.id}
      >
        <option>{props.placeholder}</option>

        {props.values?.map((category) => (
          <option key={category.id} value={category.id}>
            {category.attributes.name}
          </option>
        ))}
      </select>
    </div>
  );
}
