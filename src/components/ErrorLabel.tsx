interface ErrorLabelProps {
  error: string;
}

export default function ErrorLabel({ error }: ErrorLabelProps) {
  return error ? (
    <div className="bg-red2 px-2 h-[26px] absolute flex justify-center items-center mt-[-12px] right-0">
      <p className="font-bold text-red">{error}</p>
    </div>
  ) : null;
}
