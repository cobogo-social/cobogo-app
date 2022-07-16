import { Dispatch, SetStateAction } from 'react';

interface RangeSliderProps {
  color: string;
  value: number;
  setValue?: Dispatch<SetStateAction<unknown>>;
  maxValue?: number;
}

export default function RangeSlider(props: RangeSliderProps) {
  return (
    <div className="relative flex-1">
      <div
        style={{
          left: `${
            props.value > props.maxValue
              ? props.maxValue
              : props.value < 0
              ? 0
              : props.value
          }%`,
        }}
        className="absolute bottom-[-20px]"
      >
        <p className="font-bold">
          {props.value > props.maxValue
            ? props.maxValue
            : props.value < 0
            ? 0
            : props.value}
          %
        </p>
      </div>

      <input
        style={{
          background: `linear-gradient(to right, ${props.color} 0%, ${
            props.color
          } ${
            props.value > props.maxValue ? props.maxValue : props.value
          }%, #444444 ${
            props.value > props.maxValue ? props.maxValue : props.value
          }%, #444444 100%)`,
        }}
        type="range"
        min="1"
        max="100"
        value={props.value > props.maxValue ? props.maxValue : props.value}
        onChange={(event) =>
          props.setValue ? props.setValue(event.target.value) : null
        }
        className="w-full h-[6px] appearance-none thumb-slider hover:cursor-pointer"
      />
    </div>
  );
}
