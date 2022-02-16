import axios from 'axios';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import SignInButton from './SignInButton';
import TopBar from './TopBar';

export default function Connect() {
  const { data: session } = useSession();
  const { push } = useRouter();

  useEffect(() => {
    if (session?.user) {
      axios
        .get('/api/cobogo/readAccountByEmail', {
          params: {
            email: session?.user.email,
          },
        })
        .then(async (response) => {
          if (response.data.data.length === 0) {
            await axios.post('/api/cobogo/createAccount', {
              name: session?.user.name,
              email: session?.user.email,
              image: session?.user.image,
            });
          }
        });
    }
  }, [push, session]);

  return (
    <div className="bg-primary w-full h-full p-8">
      <TopBar />
      <div className="flex flex-col justify-center items-start px-16 2xl:px-64">
        <div className="flex items-start w-full justify-between">
          <div>
            <p className="text-4xl text-white mb-4">connect</p>
            <p className="text-lg text-white mb-12">
              connect your YouTube account and channel.
            </p>

            <div className="mb-40">
              <SignInButton />
            </div>
          </div>

          <Image
            src="/images/cobogo-blocks.svg"
            width={281}
            height={195}
            alt="cobogo blocks"
          />
        </div>
      </div>
    </div>
  );
}
