import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import api from '../services/cobogoApi';
import SignInButton from './SignInButton';
import TopBar from './TopBar';

export default function Connect() {
  const { data: session } = useSession();
  const { push } = useRouter();

  useEffect(() => {
    if (session?.user) {
      api
        .get(`/api/accounts?filters[email][$eq]=${session?.user.email}`)
        .then(async (response) => {
          if (response.data.data.length === 0) {
            await api.post('/api/accounts', {
              data: {
                name: session?.user.name,
                email: session?.user.email,
                image: session?.user.image,
              },
            });

            push('/submit/create-profile');
          } else {
            push('/submit/create-profile');
          }
        });
    }
  }, [push, session]);

  return (
    <div className="bg-primary w-full h-full p-8">
      <TopBar />
      <div className="flex flex-col justify-center items-start px-16">
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

        <div className="flex items-center w-full justify-between">
          <div className="flex">
            <div className="mr-4">
              <Image
                src="/images/music-channel.svg"
                width={60}
                height={60}
                alt="music channel"
              />
            </div>

            <div>
              <p className="text-lg text-white">is your channel about music?</p>
              <p className="text-lg text-white">
                Try{' '}
                <Link href="https://github.com/mzomia00/m-zomia">
                  <a
                    className="font-bold text-blue"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    μ-zomia
                  </a>
                </Link>
              </p>
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
