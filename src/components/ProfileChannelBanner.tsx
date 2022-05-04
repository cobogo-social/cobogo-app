export default function ProfileChannelBanner() {
  return (
    <div className="h-[207px] w-full bg-blue relative">
      <div className="w-full h-[92px] absolute bg-black/[0.8] bottom-0 flex justify-between items-center px-[145px]">
        <p className="text-[40px]">Channel Name</p>

        <div className="flex">
          <p className="mr-[40px]">
            <span className="mr-1 font-bold">XXXX</span>
            subscribers
          </p>

          <p>
            <span className="mr-1 font-bold">XX</span>
            stakers
          </p>
        </div>
      </div>
    </div>
  );
}
