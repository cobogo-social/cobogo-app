interface DistributionProps {
  percent1: number;
  percent2: number;
  percent3?: number;
  placeholder1: string;
  placeholder2: string;
  placeholder3?: string;
  icon: JSX.Element;
  title: string;
  iconPosition: string;
}

export default function Distribution(props: DistributionProps) {
  return (
    <div className="relative">
      <div
        className={`h-full absolute flex justify-center items-center ${props.iconPosition}`}
      >
        <div className="bg-black py-[10px]">{props.icon}</div>
      </div>

      <div className="w-[310px] h-[207px] border border-gray10 flex flex-col justify-center items-center px-8">
        <div className="flex flex-col justify-center items-start">
          <p className="font-bold text-left w-full">{props.title}</p>

          <div className="flex items-center">
            <div className="w-[150px] h-[7px] bg-gray10 mr-4">
              <div
                style={{
                  width: `${props.percent1}%`,
                }}
                className="h-full bg-purple2"
              />
            </div>

            <p className="font-bold text-2xl">{props.percent1}%</p>
          </div>

          <div className="flex items-center">
            <div className="w-[150px] h-[7px] bg-gray10 mr-4">
              <div
                style={{
                  width: `${props.percent2}%`,
                }}
                className="h-full bg-pink"
              />
            </div>

            <p className="font-bold text-2xl">{props.percent2}%</p>
          </div>

          <div className="flex items-center">
            <div className="w-[150px] h-[7px] bg-gray10 mr-4">
              <div
                style={{
                  width: `${props.percent3}%`,
                }}
                className="w-[55%] h-full bg-violet"
              />
            </div>

            <p className="font-bold text-2xl">{props.percent3}%</p>
          </div>

          <div className="flex items-center">
            {props.placeholder1 && (
              <>
                <div className="bg-purple2 w-[7px] h-[7px] mr-1" />

                <p className="text-gray6 font-bold mr-3">
                  {props.placeholder1}
                </p>
              </>
            )}

            {props.placeholder2 && (
              <>
                <div className="bg-pink w-[7px] h-[7px] mr-1" />

                <p className="text-gray6 font-bold mr-3">
                  {props.placeholder2}
                </p>
              </>
            )}

            {props.placeholder3 && (
              <>
                <div className="bg-violet w-[7px] h-[7px] mr-1" />

                <p className="text-gray6 font-bold mr-3">
                  {props.placeholder3}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
