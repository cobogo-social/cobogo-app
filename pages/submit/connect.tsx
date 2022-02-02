import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Connect from '../../components/Connect';
import Footer from '../../components/Footer';
import Steps from '../../components/Steps';

export default function Index() {
  return (
    <div className="w-full">
      <div className="grid grid-rows-[945px_70px] grid-cols-[332px_1fr]">
        <Steps />
        <Connect />

        <Footer />
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  // if (session?.user) {
  //   return {
  //     redirect: {
  //       destination: '/submit/create-profile',
  //       permanent: false,
  //     },
  //   };
  // }

  return {
    props: {},
  };
};
