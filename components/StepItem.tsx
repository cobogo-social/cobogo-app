interface StepItemProps {
  number: string;
  text: string;
  last?: boolean;
}

export default function StepItem({ number, text, last }: StepItemProps) {
  if (!last) {
    return (
      <div className="flex items-center text-white mb-6">
        <div className="border-8 border-details w-12 h-10 flex items-center justify-center mr-6 text-xl font-bold">
          {number}
        </div>
        <p className="font-bold">{text}</p>
      </div>
    );
  } else {
    return (
      <div className="flex items-center text-white">
        <div className="border-8 border-details w-12 h-10 flex items-center justify-center mr-6 text-xl font-bold">
          {number}
        </div>
        <p className="font-bold">{text}</p>
      </div>
    );
  }
}
