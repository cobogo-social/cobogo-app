import { signIn } from 'next-auth/react';

export default function SignInButton() {
  return (
    <button
      className={`w-48 h-9 bg-red hover:brightness-90 font-bold text-white`}
      onClick={() => signIn('google')}
    >
      connect to YouTube
    </button>
  );
}
