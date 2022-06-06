export default function ProfileStaker() {
  return (
    <div className="w-[328px] sm:w-[430px] h-[70px] bg-gray4 flex justify-between items-center px-[10px] mb-[20px] shadow-[0_0px_4px_4px_rgba(0,0,0,0.25)]">
      <div className="flex items-center justify-center">
        <div className="bg-blue w-[50px] h-[50px] mr-[20px]" />

        <p className="font-bold">wallet address</p>
      </div>

      <p className="font-bold text-gray6">
        <span className="text-green">-</span> CBG
      </p>
    </div>
  );
}
