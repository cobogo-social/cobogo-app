import ProfileAbout from '@components/ProfileAbout';
import ProfileMediaKitAnalytics from '@components/ProfileMediaKitAnalytics';
import ProfileMediaKitSocial from '@components/ProfileMediaKitSocial';
import ProfileServices from '@components/ProfileServices';
import ProfileStake from '@components/ProfileStake';
import ProfileVideos from '@components/ProfileVideos';
import TopBar from '@components/TopBar';

export default function Index() {
  return (
    <div>
      <TopBar noOnboardedFriends noTokens transparent />

      <ProfileAbout />

      <ProfileMediaKitSocial />

      <ProfileMediaKitAnalytics
        audienceGenderDistribution18={25}
        audienceGenderDistribution2534={50}
        audienceGenderDistribution35={25}
        audienceTopCountries1={20}
        audienceTopCountries2={20}
        audienceTopCountries3={40}
        audienceGenderDistributionMen={50}
        audienceGenderDistributionWomen={50}
        openEditDistributionsModal={() => {}}
      />

      <ProfileServices services={[]} />

      <ProfileVideos title="teste" videos={[]} />

      <ProfileStake />
    </div>
  );
}
