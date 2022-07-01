export default function CopiedBallon() {
  return (
    <div className="flex items-center justify-center flex-col absolute left-[-17px] bottom-[20px]">
      <div className="bg-blue p-2 py-1">
        <p className="font-bold text-xs text-white">copied</p>
      </div>

      <div className="border-t-[5px] border-r-[5px] border-l-[5px] border-t-blue border-blue/[0] w-0 h-0" />
    </div>
  );
}
