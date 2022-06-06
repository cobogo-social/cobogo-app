import ProfileStaker from './ProfileStaker';

export default function MobileProfileTopStakers() {
  return (
    <div className="px-[20px] mb-[40px] flex sm:hidden flex-col items-center">
      <p className="mb-[20px] text-[22px] text-start w-[328px]">top stakers</p>

      <ProfileStaker />

      <ProfileStaker />

      <ProfileStaker />
    </div>
  );
}
