import ReferralDashboardBand from './ReferralDashboardBand';
import ReferralLink from './ReferralLink';

export default function ReferralDashboard() {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex w-full flex-col items-start px-[204px]">
        <p className="text-[40px] mb-[31px]">invite YouTubers</p>

        <p className="text-[22px] mb-[44px]">
          you can earn 50 CBG for each Creator that joins the waitlist using
          your referral link!
        </p>

        <ReferralLink referralCode="testes" />

        <p className="mb-[80px] sm:text-lg">
          <a
            href="https://docs.cobogo.social/overview/getting-started/referral-program"
            className="font-bold text-blue"
            target="_blank"
            rel="noopener noreferrer"
          >
            learn more
          </a>{' '}
          about our <span className="font-bold">Referral Program.</span>
        </p>
      </div>

      <ReferralDashboardBand onboardedFriends={2} />
    </div>
  );
}
