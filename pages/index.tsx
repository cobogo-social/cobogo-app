import Footer from '@components/Footer';
import MobileMenu from '@components/MobileMenu';
import PageContainer from '@components/PageContainer';
import StartSubmission from '@components/StartSubmission';
import StepsMenu from '@components/StepsMenu';
import { GetServerSideProps } from 'next';

export default function Index() {
  return (
    <div className="w-full">
      <PageContainer>
        <StepsMenu />

        <MobileMenu noSteps noLogout />

        <StartSubmission />

        <Footer />
      </PageContainer>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => ({
  redirect: {
    destination: '/submit',
    permanent: false,
  },
});
