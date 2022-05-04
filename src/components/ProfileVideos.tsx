import ProfileVideo from './ProfileVideo';

export default function ProfileVideos() {
  return (
    <div className="flex flex-col w-full px-[147px] pb-[62px]">
      <p className="text-[22px] mb-[26px]">Channel Name's latest videos</p>

      <div className="flex">
        <ProfileVideo />

        <ProfileVideo />

        <ProfileVideo />

        <ProfileVideo />
      </div>
    </div>
  );
}
