import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Footer from '../components/Footer';
import StartSubmission from '../components/StartSubmission';
import Steps from '../components/Steps';

export default function Index() {
  return (
    <div className="w-full">
      <div className="grid grid-rows-[945px_70px] grid-cols-[332px_1fr]">
        <Steps />
        <StartSubmission />

        <Footer />
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (session?.user) {
    return {
      redirect: {
        destination: '/submit/connect',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
