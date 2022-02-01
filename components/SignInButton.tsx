import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function SignInButton() {
  const { data: session } = useSession();
  const { push } = useRouter();

  async function signInAndRedirect() {
    await signIn('google');
    push('/submit/create-profile');
  }

  return session ? (
    <button
      className={`w-48 h-9 bg-red hover:brightness-90 font-bold text-white`}
      onClick={() => signOut()}
    >
      disconnect to YouTube
    </button>
  ) : (
    <button
      className={`w-48 h-9 bg-red hover:brightness-90 font-bold text-white`}
      onClick={signInAndRedirect}
    >
      connect to YouTube
    </button>
  );
}
