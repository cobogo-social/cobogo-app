import Footer from '@components/Footer';
import MainTopBar from '@components/MainTopBar';
import ProfileAbout from '@components/ProfileAbout';
import ProfileChannelBanner from '@components/ProfileChannelBanner';
import ProfileStatsBand from '@components/ProfileStatsBand';
import ProfileTopStakers from '@components/ProfileTopStakers';
import ProfileVideos from '@components/ProfileVideos';

export default function Index() {
  return (
    <div className="flex flex-col">
      <MainTopBar />

      <div className="h-[299px] w-full">
        <ProfileChannelBanner />

        <ProfileStatsBand />
      </div>

      <div className="w-full pt-[62px] px-[147px] flex justify-between items-start">
        <ProfileAbout />

        <ProfileTopStakers />
      </div>

      <ProfileVideos />

      <Footer />
    </div>
  );
}
