export default function StakeCBGSwapInput() {
  return (
    <div className="flex">
      <input
        className="w-[356px] h-[48px] bg-black border-[1.5px] border-r-0 border-gray5 p-2 outline-none"
        type="text"
        placeholder="0.0"
      />

      <div className="w-[76px] h-[48px] border-[1.5px] bg-secondary border-l-0 border-gray5 flex justify-center items-center">
        <p className="font-bold">CBG</p>
      </div>
    </div>
  );
}
