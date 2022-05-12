import Button from './Button';

interface ProfileStatsBandProps {
  openStakeStepsModals: () => void;
}

export default function ProfileStatsBand({
  openStakeStepsModals,
}: ProfileStatsBandProps) {
  return (
    <div className="h-[92px] w-full bg-gray7 flex justify-between items-center px-[145px]">
      <div className="flex">
        <div className="flex flex-col mr-[30px]">
          <p className="font-bold">your stake</p>

          <p className="font-bold text-gray6">
            <span className="text-blue">-</span> CBG
          </p>
        </div>

        <div className="flex flex-col mr-[30px]">
          <p className="font-bold">your rewards</p>

          <p className="font-bold text-gray6">
            <span className="text-blue">-</span> CBG
          </p>
        </div>

        <div className="flex flex-col mr-[30px]">
          <p className="font-bold">total staked</p>

          <p className="font-bold text-gray6">
            <span className="text-blue">-</span> CBG
          </p>
        </div>

        <div className="flex flex-col">
          <p className="font-bold">youtuber rewards</p>

          <p className="font-bold text-gray6">
            <span className="text-blue">-</span> CBG
          </p>
        </div>
      </div>

      <div className="flex">
        <div className="mr-[25px]">
          <Button
            text="withdraw"
            color="bg-gray7"
            hoverColor="brightness-90"
            width="w-[114px]"
            height="h-[38px]"
            borderColor="border-purple"
            borderSize="border-[1px]"
          />
        </div>

        <Button
          text="stake"
          color="bg-blue"
          hoverColor="brightness-90"
          width="w-[100px]"
          height="h-[38px]"
          onClick={openStakeStepsModals}
        />
      </div>
    </div>
  );
}
