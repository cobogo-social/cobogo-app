interface DistributionProps {
  percent1: number;
  percent2: number;
  percent3?: number;
  placeholder1: string;
  placeholder2: string;
  placeholder3?: string;
  icon: JSX.Element;
  title: string;
}

export default function Distribution(props: DistributionProps) {
  return (
    <div className="relative">
      <div className="h-full absolute flex justify-center items-center left-[-10px]">
        <div className="bg-black py-[10px]">{props.icon}</div>
      </div>

      <div className="w-[296px] h-[207px] border-[1px] border-gray10 flex flex-col justify-center items-center px-[30px]">
        <div>
          <p className="font-bold">{props.title}</p>

          <div className="flex items-center">
            <div className="w-[138px] h-[7px] bg-gray10 mr-[15px]">
              <div
                style={{
                  width: `${props.percent1}%`,
                }}
                className="h-full bg-purple2"
              />
            </div>

            <p className="font-bold text-[23px]">{props.percent1}%</p>
          </div>

          <div className="flex items-center">
            <div className="w-[138px] h-[7px] bg-gray10 mr-[15px]">
              <div
                style={{
                  width: `${props.percent2}%`,
                }}
                className="h-full bg-pink"
              />
            </div>

            <p className="font-bold text-[23px]">{props.percent2}%</p>
          </div>

          <div className="flex items-center">
            {props.percent3 ? (
              <>
                <div className="w-[138px] h-[7px] bg-gray10 mr-[15px]">
                  <div
                    style={{
                      width: `${props.percent3}%`,
                    }}
                    className="w-[55%] h-full bg-violet"
                  />
                </div>

                <p className="font-bold text-[23px]">{props.percent3}%</p>
              </>
            ) : null}
          </div>

          <div className="flex items-center">
            <div className="bg-purple2 w-[7px] h-[7px] mr-1" />

            <p className="text-gray6 font-bold mr-[12px]">
              {props.placeholder1}
            </p>

            <div className="bg-pink w-[7px] h-[7px] mr-1" />

            <p className="text-gray6 font-bold mr-[12px]">
              {props.placeholder2}
            </p>

            {props.placeholder3 && (
              <>
                <div className="bg-violet w-[7px] h-[7px] mr-1" />

                <p className="text-gray6 font-bold mr-[12px]">
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
