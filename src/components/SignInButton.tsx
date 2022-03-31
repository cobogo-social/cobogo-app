import { signIn } from 'next-auth/react';
import Image from 'next/image';

export default function SignInButton() {
  return (
    <button
      className="w-[232px] h-[38px] bg-grayyoutube hover:brightness-90 font-bold flex justify-start items-center"
      onClick={() => signIn('google')}
    >
      <div className="bg-redyoutube h-full flex justify-center items-center px-2 mr-6">
        <Image src="/images/ytb-icon.svg" width={28} height={19} />
      </div>

      <p className="text-white">connect to YouTube</p>
    </button>
  );
}
