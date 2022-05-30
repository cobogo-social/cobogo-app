import Image from 'next/image';

export default function ProfileDistributionsGender() {
  return (
    <div className="relative">
      <div className="h-full absolute flex justify-center items-center left-[-20px]">
        <div className="bg-primary py-[10px]">
          <Image
            src="/images/gender-icon.svg"
            width={45}
            height={45}
            alt="gender icon"
          />
        </div>
      </div>

      <div className="w-[296px] h-[207px] border-[1px] border-gray10 flex flex-col justify-center items-center px-[30px]">
        <div>
          <p className="font-bold">gender distribution</p>

          <div className="flex items-center">
            <div className="w-[138px] h-[7px] bg-gray11 mr-[15px]">
              <div className="w-[50%] h-full bg-purple2" />
            </div>

            <p className="font-bold text-[30px]">50%</p>
          </div>

          <div className="flex items-center">
            <div className="w-[138px] h-[7px] bg-gray11 mr-[15px]">
              <div className="w-[50%] h-full bg-pink" />
            </div>

            <p className="font-bold text-[30px]">50%</p>
          </div>

          <div className="flex items-center">
            <div className="bg-purple2 w-[7px] h-[7px] mr-1" />

            <p className="text-gray6 font-bold mr-[12px]">men</p>

            <div className="bg-pink w-[7px] h-[7px] mr-1" />

            <p className="text-gray6 font-bold">women</p>
          </div>
        </div>
      </div>
    </div>
  );
}
