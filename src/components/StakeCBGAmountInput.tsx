export default function StakeCBGAmountInput() {
  return (
    <div className="flex">
      <input
        className="w-[115px] h-[48px] bg-black border-[1.5px] border-r-0 border-gray5 p-2 outline-none"
        type="text"
      />

      <div className="w-[76px] h-[48px] border-[1.5px] bg-black border-l-0 border-gray5 flex justify-center items-center">
        <p className="font-bold">CBG</p>
      </div>
    </div>
  );
}
