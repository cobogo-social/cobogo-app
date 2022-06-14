import { Dispatch, SetStateAction } from 'react';

interface RangeSliderProps {
  color: string;
  value: number;
  setValue: Dispatch<SetStateAction<unknown>>;
  descriptionOnBottom?: boolean;
  description: string;
  descriptionColor: string;
  maxValue?: number;
}

export default function RangeSlider({
  color,
  value,
  setValue,
  descriptionOnBottom,
  description,
  descriptionColor,
  maxValue,
}: RangeSliderProps): JSX.Element {
  return (
    <div className="mb-8 relative">
      <div
        style={{
          left: `${
            value > maxValue ? maxValue - 1 : value < 0 ? 0 : value - 1
          }%`,
        }}
        className={`absolute flex items-center ${
          descriptionOnBottom ? 'bottom-[-15px]' : 'top-[-15px]'
        }`}
      >
        <div className={`flex ${descriptionColor} w-[7px] h-[7px] mr-2`} />

        <p className="font-bold">
          {value > maxValue ? maxValue : value < 0 ? 0 : value}% {description}
        </p>
      </div>

      <input
        style={{
          background: `linear-gradient(to right, ${color} 0%, ${color} ${
            value > maxValue ? maxValue : value
          }%, #444444 ${value > maxValue ? maxValue : value}%, #444444 100%)`,
        }}
        type="range"
        min="1"
        max="100"
        value={value > maxValue ? maxValue : value}
        onChange={(event) => setValue(event.target.value)}
        className="w-full h-[6px] appearance-none thumb-slider"
      />
    </div>
  );
}
