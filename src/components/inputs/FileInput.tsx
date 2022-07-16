import { Dispatch, SetStateAction } from 'react';

interface FileInputProps {
  label: string;
  description: string;
  changeFile: Dispatch<SetStateAction<File>>;
}

export default function FileInput(props: FileInputProps) {
  return (
    <div className="flex flex-col">
      <label className="text-lg">{props.label}</label>

      <p className="font-bold text-sm break-words text-gray3">
        {props.description}
      </p>

      <p className="mb-5 text-sm break-words text-gray3">
        max size <strong>10 mb</strong>
      </p>

      <input
        type="file"
        name="file"
        id="file"
        accept="image/png, image/jpeg"
        className="file:mr-5 file:py-2 file:px-5 file:border file:font-bold file:text-white file:bg-primary hover:file:cursor-pointer"
        onChange={(event) => props.changeFile(event.target.files[0])}
      />
    </div>
  );
}
